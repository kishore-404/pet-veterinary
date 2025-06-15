import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db, storage } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Header from "../components/Header";


function SignQA() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    ownerName: "",
    petName: "",
    petBreed: "",
    petAge: "",
    vaccinated: false,
    petType: "",
    petWeight: "",
    petColor: "",
    allergies: "",
    petImage: null as File | null,
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else if (type === "file" && files) {
      console.log("📷 Image selected:", files[0]);
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleNext = () => {
    if (!formData.ownerName || !formData.petName || !formData.petBreed || !formData.petAge) {
      alert("Please fill all required fields in Step 1.");
      return;
    }
    setStep(2);
  };

  const handleSubmit = async () => {
    const uid = auth.currentUser?.uid;
    if (!uid) {
      alert("User not logged in.");
      return;
    }

    console.log("🟡 Starting pet profile submission...");
    setLoading(true);

    try {
      let petImageUrl = "";

      if (formData.petImage) {
        try {
          console.log("🟡 Creating imageRef...");
          const imageRef = ref(storage, `pets/${uid}/${formData.petImage.name}`);
          console.log("📁 imageRef created:", imageRef.fullPath);

          console.log("⬆️ Starting uploadBytes...");

          await Promise.race([
            uploadBytes(imageRef, formData.petImage),
            new Promise((_, reject) =>
              setTimeout(() => reject(new Error("Upload timeout after 10s")), 10000)
            ),
          ]);

          console.log("✅ uploadBytes complete");

          petImageUrl = await getDownloadURL(imageRef);
          console.log("🌐 Download URL:", petImageUrl);
        } catch (uploadErr: any) {
          console.error("❌ Image upload failed:", uploadErr.message || uploadErr);
          alert("Image upload failed. Try again or check your internet.");
          setLoading(false);
          return;
        }
      } else {
        console.warn("⚠️ No image provided.");
      }

      const userRef = doc(db, "users", uid);
      console.log("🟡 Saving pet profile...");

      await setDoc(
        userRef,
        {
          petProfile: {
            ownerName: formData.ownerName,
            petName: formData.petName,
            petBreed: formData.petBreed,
            petAge: formData.petAge,
            vaccinated: formData.vaccinated,
            petType: formData.petType,
            petWeight: formData.petWeight,
            petColor: formData.petColor,
            allergies: formData.allergies,
            petImageUrl,
          },
        },
        { merge: true }
      );

      console.log("✅ Pet profile saved. Redirecting...");
      navigate("/dashboard");
    } catch (err: any) {
      console.error("❌ Error during submission:", err.message || err);
      alert("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
<div className="flex flex-col mx-auto min-h-screen">
  <Header />
  <div className="flex-grow flex items-center justify-center bg-gray-50 py-10">
    <div className="w-full max-w-xl mx-4 sm:mx-6 lg:mx-8 bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="px-6 py-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          {step === 1 ? "Step 1: Owner & Pet Basics" : "Step 2: Pet Details"}
        </h2>

        {step === 1 && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Owner Name</label>
              <input
                type="text"
                name="ownerName"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Pet Name</label>
              <input
                type="text"
                name="petName"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Pet Breed</label>
              <input
                type="text"
                name="petBreed"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Pet Age</label>
              <input
                type="number"
                name="petAge"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handleChange}
              />
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                name="vaccinated"
                className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                onChange={handleChange}
              />
              <label className="ml-2 block text-sm font-medium text-gray-700">Vaccinated</label>
            </div>
            <button
              onClick={handleNext}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
            >
              Next
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Pet Type (e.g., Dog, Cat)</label>
              <input
                type="text"
                name="petType"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Pet Weight (kg)</label>
              <input
                type="number"
                name="petWeight"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Pet Color</label>
              <input
                type="text"
                name="petColor"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Allergies</label>
              <input
                type="text"
                name="allergies"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handleChange}
              />
            </div>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className={`w-full ${loading ? 'bg-green-400' : 'bg-green-600 hover:bg-green-700'} text-white font-medium py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105`}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>
        )}
      </div>
    </div>
  </div>
 
</div>

  );
}

export default SignQA;

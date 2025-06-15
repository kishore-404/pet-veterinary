import Header from "../components/Header";
import Footer from "../components/Footer";
import TickIcon from "../assets/images/tick.png";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import emailjs from "emailjs-com";
import { toast, Toaster } from "react-hot-toast"; // ✅ Added

interface FormValues {
  parentName: string;
  petName: string;
  meetDate: string;
  petBreed: string;
  email: string;
  symptoms: string;
  privacyPolicy: boolean;
}

const validationSchema = Yup.object({
  parentName: Yup.string().required("Parent Name is required"),
  petName: Yup.string().required("Pet Name is required"),
  meetDate: Yup.string().required("Meet Date is required"),
  petBreed: Yup.string().required("Pet Breed is required"),
  email: Yup.string().email("Invalid email address").required("Email is required"),
  symptoms: Yup.string().required("Symptoms are required"),
  privacyPolicy: Yup.boolean().oneOf([true], "You must accept the Privacy Policy"),
});

function BookNow() {
  const initialValues: FormValues = {
    parentName: "",
    petName: "",
    meetDate: "",
    petBreed: "",
    email: "",
    symptoms: "",
    privacyPolicy: false,
  };

  const sendEmail = (values: FormValues) => {
    const templateParams = {
      parentName: values.parentName,
      petName: values.petName,
      meetDate: values.meetDate,
      petBreed: values.petBreed,
      email: values.email,
      symptoms: values.symptoms,
      to_email: values.email,
    };

    const loadingToast = toast.loading("Sending confirmation email...");

    emailjs
      .send(
        "service_5f2o1je",
        "template_6qvuw2d",
        templateParams,
        "vpCDD5Np_dKJV4L4m"
      )
      .then(() => {
        toast.dismiss(loadingToast);
        toast.success("Meet booked! Confirmation email sent.");
      })
      .catch(() => {
        toast.dismiss(loadingToast);
        toast.error("Email failed. Please try again.");
      });
  };

  return (
    <div className="flex flex-col items-center">
      <Header />

      <section className="max-w-7xl px-5 w-full my-20">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => {
            sendEmail(values);
            resetForm();
          }}
        >
          {({ values, setFieldValue }) => (
            <Form className="mx-auto p-6 bg-custom-orange rounded-4xl shadow-md flex flex-col">
              <h2 className="text-2xl font-bold mb-20 text-center">Make a Meet</h2>
              <div className="flex justify-center">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-5">
                  {/* Parent Name */}
                  <div>
                    <label htmlFor="parentName" className="block text-sm font-medium mb-5">
                      Parent Name
                    </label>
                    <Field
                      type="text"
                      name="parentName"
                      className="2xl:w-[513px] xl:w-[500px] lg:w-[400px] w-full max-w-[513px] h-[47px] bg-white border border-gray-300 rounded-[10px] px-4 py-2"
                    />
                    <ErrorMessage name="parentName" component="div" className="text-red-600 text-sm" />
                  </div>

                  {/* Pet Name */}
                  <div>
                    <label htmlFor="petName" className="block text-sm font-medium mb-5">
                      Pet Name
                    </label>
                    <Field
                      type="text"
                      name="petName"
                      className="w-full max-w-[513px] h-[47px] bg-white border border-gray-300 rounded-[10px] px-4 py-2"
                    />
                    <ErrorMessage name="petName" component="div" className="text-red-600 text-sm" />
                  </div>

                  {/* Meet Date */}
                  <div>
                    <label htmlFor="meetDate" className="block text-sm font-medium mb-5">
                      Meet Date
                    </label>
                    <Field
                      type="date"
                      name="meetDate"
                      className="w-full max-w-[513px] h-[47px] bg-white border border-gray-300 rounded-[10px] px-4 py-2"
                    />
                    <ErrorMessage name="meetDate" component="div" className="text-red-600 text-sm" />
                  </div>

                  {/* Pet Breed */}
                  <div>
                    <label htmlFor="petBreed" className="block text-sm font-medium mb-5">
                      Pet Breed
                    </label>
                    <Field
                      type="text"
                      name="petBreed"
                      className="w-full max-w-[513px] h-[47px] bg-white border border-gray-300 rounded-[10px] px-4 py-2"
                    />
                    <ErrorMessage name="petBreed" component="div" className="text-red-600 text-sm" />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-5">
                      Email
                    </label>
                    <Field
                      type="email"
                      name="email"
                      className="w-full max-w-[513px] h-[47px] bg-white border border-gray-300 rounded-[10px] px-4 py-2"
                    />
                    <ErrorMessage name="email" component="div" className="text-red-600 text-sm" />
                  </div>

                  {/* Symptoms */}
                  <div>
                    <label htmlFor="symptoms" className="block text-sm font-medium mb-5">
                      Symptoms and notes:
                    </label>
                    <Field
                      type="text"
                      name="symptoms"
                      className="w-full max-w-[513px] h-[47px] bg-white border border-gray-300 rounded-[10px] px-4 py-2"
                    />
                    <ErrorMessage name="symptoms" component="div" className="text-red-600 text-sm" />
                  </div>

                  <div></div>

                  {/* Privacy Policy */}
                  <div className="md:col-span-2 flex items-center justify-center gap-2 mt-2">
                    <input
                      type="checkbox"
                      name="privacyPolicy"
                      checked={values.privacyPolicy}
                      onChange={(e) => setFieldValue("privacyPolicy", e.target.checked)}
                      className="w-8 h-8 rounded-[8px] appearance-none border border-gray-400 bg-white bg-no-repeat bg-center bg-contain transition-all duration-200 cursor-pointer"
                      style={{
                        backgroundImage: `url(${TickIcon})`,
                        backgroundSize: values.privacyPolicy ? "60%" : "0%",
                      }}
                    />
                    <label htmlFor="privacyPolicy" className="text-sm">
                      I have read and agree to the{" "}
                      <a href="#" className="text-black underline">
                        Privacy Policy
                      </a>.
                    </label>
                  </div>
                  <ErrorMessage name="privacyPolicy" component="div" className="text-red-600 text-sm md:col-span-2 text-center" />

                  {/* Submit Button */}
                  <div className="md:col-span-2 flex justify-center mt-4">
                    <button
                      type="submit"
                      className="xl:w-50 md:w-40 sm:w-40 w-40 rounded-full py-3 lg:text-lg md:text-lg text-sm font-normal cursor-pointer text-white bg-black"
                    >
                      Book now
                    </button>
                  </div>
                </div>
              </div>
            </Form>
          )}
        </Formik>

        {/* ✅ Toaster here */}
        <Toaster position="top-center" reverseOrder={false} />
      </section>

      <Footer />
    </div>
  );
}

export default BookNow;

import Header from "../components/Header";
import Footer from "../components/Footer";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Formik, Form, Field, ErrorMessage } from "formik";
import type { FormikHelpers } from "formik";
import * as Yup from "yup";
import { Eye, EyeOff } from "lucide-react";
import Left_Arrow from "../assets/images/about/left_arrow.png";
import Right_Arrow from "../assets/images/about/right_arrow.png";
import Login_slide_1 from "../assets/images/Login_slide_1.png";
import Gicon from "../assets/images/Gicon.png";

import "swiper/css";
import "swiper/css/navigation";
import { useState, useEffect, useRef } from "react";
import { auth, provider, db } from "../firebase";
import {
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getAdditionalUserInfo,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

type FormValues = {
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
};

function Login() {
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const isSignupRef = useRef(isSignup);
  useEffect(() => {
    isSignupRef.current = isSignup;
  }, [isSignup]);

  const loginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  });

  const signupSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm your password"),
  });

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const { user } = result;
      const isNew = getAdditionalUserInfo(result)?.isNewUser;

      if (user.uid) {
        const userDoc = doc(db, "users", user.uid);
        if (isNew) {
          await setDoc(userDoc, {
            name: user.displayName,
            email: user.email,
          });
          navigate("/sign-qa");
        } else {
          navigate("/dashboard");
        }
      }
    } catch (error) {
      console.error("Google login error:", error);
    }
  };

  const handleFormSubmit = async (
    values: FormValues,
    { setSubmitting, setErrors }: FormikHelpers<FormValues>
  ) => {
    try {
      if (isSignupRef.current) {
        const result = await createUserWithEmailAndPassword(auth, values.email, values.password);
        if (result.user?.uid) {
          await setDoc(doc(db, "users", result.user.uid), {
            name: values.name,
            email: values.email,
          });
          navigate("/sign-qa");
        }
      } else {
        const result = await signInWithEmailAndPassword(auth, values.email, values.password);
        const docSnap = await getDoc(doc(db, "users", result.user.uid));

        if (!docSnap.exists()) {
          setErrors({ email: "User doesn't exist. Please sign up first." });
          setIsSignup(true);
        } else {
          navigate("/dashboard");
        }
      }
    } catch (err: any) {
      console.error("Auth Error:", err);
      setErrors({ email: err.message || "Invalid credentials" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <Header />
      <section className="w-full px-5 py-10 flex justify-center items-center">
        <div className="w-full max-w-7xl flex flex-col lg:flex-row shadow-lg rounded-4xl overflow-hidden">
          <div className="w-full lg:w-1/2 bg-custom-peach flex flex-col justify-center px-8 py-12">
            <p className="text-5xl mb-4 text-center">
              {isSignup ? "Create Account" : "Hi there!"}
            </p>
            <p className="text-sm text-center pb-5">
              {isSignup
                ? "Sign up to access the SmartCare Community Dashboard"
                : "Welcome to SmartCare. Community Dashboard"}
            </p>

            <button
              type="button"
              onClick={handleGoogleLogin}
              className="border-white border-3 py-2 px-4 rounded-lg mb-4 mx-5 cursor-pointer flex justify-center items-center gap-5"
            >
              <img src={Gicon} alt="Google Icon" />
              <p>{isSignup ? "Sign up with Google" : "Log in with Google"}</p>
            </button>

            <div className="flex justify-center my-3 gap-5 items-center">
              <div className="w-30 border-b-1 border-black"></div>
              <div className="text-center mb-4">or</div>
              <div className="w-30 border-b-1 border-black"></div>
            </div>

            <Formik<FormValues>
              initialValues={{
                name: "",
                email: "",
                password: "",
                confirmPassword: "",
              }}
              validationSchema={isSignup ? signupSchema : loginSchema}
              onSubmit={handleFormSubmit}
            >
              {({ isSubmitting }) => (
                <Form className="mx-5">
                  {isSignup && (
                    <div className="mb-3">
                      <Field
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        className="w-full border-white border-3 rounded-lg px-4 py-2"
                      />
                      <ErrorMessage
                        name="name"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                  )}

                  <div className="mb-3">
                    <Field
                      type="email"
                      name="email"
                      placeholder="Your Email"
                      className="w-full border-white border-3 rounded-lg px-4 py-2"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  <div className="mb-3 relative">
                    <Field
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Password"
                      className="w-full border-white border-3 rounded-lg px-4 py-2 pr-12"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-3 top-2.5 text-gray-600"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  {isSignup && (
                    <div className="mb-3 relative">
                      <Field
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        className="w-full border-white border-3 rounded-lg px-4 py-2 pr-12"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                        className="absolute right-3 top-2.5 text-gray-600"
                      >
                        {showConfirmPassword ? (
                          <EyeOff size={20} />
                        ) : (
                          <Eye size={20} />
                        )}
                      </button>
                      <ErrorMessage
                        name="confirmPassword"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                  )}

                  {!isSignup && (
                    <div className="text-right text-sm text-blue-600 mb-6 cursor-pointer">
                      Forgot password?
                    </div>
                  )}

                  <div className="flex justify-center">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-40 rounded-full py-3 text-sm bg-black text-white"
                    >
                      {isSubmitting
                        ? isSignup
                          ? "Signing up..."
                          : "Logging in..."
                        : isSignup
                        ? "Sign Up"
                        : "Login"}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>

            <p className="text-sm mt-6 text-center">
              {isSignup ? "Already have an account?" : "Don’t have an account?"}{" "}
              <span
                className="text-blue-600 cursor-pointer"
                onClick={() => setIsSignup(!isSignup)}
              >
                {isSignup ? "Login" : "Sign up"}
              </span>
            </p>
          </div>

          <div className="w-full lg:w-1/2 relative">
            <Swiper
              modules={[Navigation]}
              navigation={{
                nextEl: ".custom-swiper-button-next",
                prevEl: ".custom-swiper-button-prev",
              }}
              loop
              className="w-full h-full"
            >
              <SwiperSlide>
                <img
                  src={Login_slide_1}
                  alt="Slide 1"
                  className="w-full h-full object-cover"
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  src={Login_slide_1}
                  alt="Slide 2"
                  className="w-full h-full object-cover"
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  src={Login_slide_1}
                  alt="Slide 3"
                  className="w-full h-full object-cover"
                />
              </SwiperSlide>
            </Swiper>

            <div className="absolute bottom-4 right-4 flex items-center gap-4 z-10">
              <div className="custom-swiper-button-prev cursor-pointer bg-white w-10 h-10 rounded-full flex items-center justify-center">
                <img src={Left_Arrow} alt="Previous" />
              </div>
              <div className="custom-swiper-button-next cursor-pointer bg-white w-10 h-10 rounded-full flex items-center justify-center">
                <img src={Right_Arrow} alt="Next" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Login;

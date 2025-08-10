"use client"

import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import myContext from "../../context/myContext"
import { Timestamp, addDoc, collection } from "firebase/firestore"
import { auth, fireDB } from "../../firebase/FirebaseConfig"
import { createUserWithEmailAndPassword } from "firebase/auth"
import toast from "react-hot-toast"
import Loader from "../../components/loader/Loader"
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, UserPlus } from "lucide-react"

const Signup = () => {
  const context = useContext(myContext)
  const { loading, setLoading } = context
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [userSignup, setUserSignup] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  })

  const userSignupFunction = async () => {
    if (userSignup.name === "" || userSignup.email === "" || userSignup.password === "") {
      toast.error("All fields are required")
      return
    }
    setLoading(true)
    try {
      // Firebase createUserWithEmailAndPassword for signup
      const users = await createUserWithEmailAndPassword(auth, userSignup.email, userSignup.password)
      // Create user object
      const user = {
        name: userSignup.name,
        email: users.user.email,
        uid: users.user.uid,
        role: userSignup.role,
        time: Timestamp.now(),
        date: new Date().toLocaleString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),
      }
      const userRefrence = collection(fireDB, "user")
      // Save user data to Firestore
      await addDoc(userRefrence, user)
      setUserSignup({
        name: "",
        email: "",
        password: "",
        role: "user",
      })
      toast.success("Signup Successfully")
      setLoading(false)
      navigate("/user-dashboard")
    } catch (error) {
      setLoading(false)
      // Handle Firebase error codes
      if (error.code === "auth/email-already-in-use") {
        toast.error("Email is already registered. Please login or use another email.")
      } else {
        toast.error("Enter strong password.")
      }
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 py-8 relative overflow-hidden">
      {loading && <Loader />}

      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-gradient-to-br from-[#C2985C] to-transparent opacity-10 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-gradient-to-tr from-[#C2985C] to-transparent opacity-10 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-gradient-to-r from-[#C2985C] to-transparent opacity-5 animate-spin-slow"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Main signup card */}
        <div className="bg-gradient-to-br from-[#C2985C] to-[#C2985C]/90 p-8 rounded-3xl shadow-2xl backdrop-blur-sm border border-white/10 transform transition-all duration-500 hover:scale-105 hover:shadow-3xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full mb-4 shadow-lg transform transition-all duration-300 hover:rotate-12">
              <UserPlus className="w-8 h-8 text-[#C2985C]" />
            </div>
            <h2 className="text-4xl font-bold text-white mb-2 tracking-wide">Join Us Today</h2>
            <p className="text-white/80 text-sm">Create your new account</p>
          </div>

          {/* Form */}
          <div className="space-y-6">
            {/* Name Input */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-white/60 group-focus-within:text-white transition-colors duration-200" />
              </div>
              <input
                type="text"
                placeholder="Full Name"
                value={userSignup.name}
                onChange={(e) => setUserSignup({ ...userSignup, name: e.target.value })}
                className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all duration-300 hover:bg-white/15"
              />
            </div>

            {/* Email Input */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-white/60 group-focus-within:text-white transition-colors duration-200" />
              </div>
              <input
                type="email"
                placeholder="Email Address"
                value={userSignup.email}
                onChange={(e) => setUserSignup({ ...userSignup, email: e.target.value })}
                className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all duration-300 hover:bg-white/15"
              />
            </div>

            {/* Password Input */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-white/60 group-focus-within:text-white transition-colors duration-200" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={userSignup.password}
                onChange={(e) => setUserSignup({ ...userSignup, password: e.target.value })}
                className="w-full pl-12 pr-12 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all duration-300 hover:bg-white/15"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-black/60  transition-colors duration-200"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>

            {/* Signup Button */}
            <button
              type="button"
              onClick={userSignupFunction}
              disabled={loading}
              className="group relative w-full bg-white text-[#C2985C] py-4 rounded-2xl font-bold text-lg transition-all duration-300 hover:bg-white/90 hover:shadow-lg transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-[#C2985C]/30 border-t-[#C2985C] rounded-full animate-spin"></div>
                    Creating Account...
                  </>
                ) : (
                  <>
                    Create Account
                    <ArrowRight className="w-5 h-5 transform transition-transform duration-300 group-hover:translate-x-1" />
                  </>
                )}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            </button>
          </div>

          {/* Divider */}
          <div className="my-8 flex items-center">
            <div className="flex-1 h-px bg-white/20"></div>
            <span className="px-4 text-white/60 text-sm">or</span>
            <div className="flex-1 h-px bg-white/20"></div>
          </div>

          {/* Login link */}
          <div className="text-center">
            <p className="text-white/80 text-sm">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-bold text-white hover:text-white/80 transition-colors duration-200 relative group"
              >
                Sign In
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </p>
          </div>
        </div>

        {/* Additional decorative elements */}
        <div className="absolute -top-4 -left-4 w-8 h-8 bg-[#C2985C] rounded-full opacity-60 animate-bounce delay-300"></div>
        <div className="absolute -top-2 -right-6 w-4 h-4 bg-white rounded-full opacity-40 animate-bounce delay-700"></div>
        <div className="absolute -bottom-6 -right-2 w-6 h-6 bg-[#C2985C] rounded-full opacity-50 animate-bounce delay-500"></div>
      </div>

      {/* Custom styles for animations */}
      <style jsx>{`
        @keyframes spin-slow {
          from {
            transform: translate(-50%, -50%) rotate(0deg);
          }
          to {
            transform: translate(-50%, -50%) rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        .shadow-3xl {
          box-shadow: 0 35px 60px -12px rgba(194, 152, 92, 0.25);
        }
      `}</style>
    </div>
  )
}

export default Signup

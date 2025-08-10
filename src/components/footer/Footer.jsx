"use client"

import { Link } from "react-router-dom"
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, Heart, ArrowUp } from "lucide-react"
import { useState, useEffect } from "react"

const Footer = () => {
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "https://www.instagram.com/ethereal_touch_2025/", label: "Instagram" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
  ]

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/allproduct" },
    { name: "Categories", href: "/categories" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
  ]

  const categories = [
    { name: "Men Scents", href: "/category/men" },
    { name: "Women Scents", href: "/category/women" },
    { name: "Cosmetics", href: "/category/cosmetic" },
    { name: "Accessories", href: "/category/accessories" },
  ]

  return (
    <div className="relative">
      {/* Main Footer */}
      <footer className="bg-black relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-gradient-to-br from-[#C2985C] to-transparent opacity-10 animate-pulse"></div>
          <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-gradient-to-tr from-[#C2985C] to-transparent opacity-10 animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 rounded-full bg-gradient-to-r from-[#C2985C] to-transparent opacity-5 animate-spin-slow"></div>
        </div>

        {/* Top Border */}
        <div className="h-1 bg-gradient-to-r from-transparent via-[#C2985C] to-transparent"></div>

        <div className="relative z-10 container mx-auto px-6 py-16">
          {/* Main Footer Content */}
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12 mb-12">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <div className="group">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#C2985C] to-[#C2985C]/80 rounded-full flex items-center justify-center shadow-lg transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-12">
                    <span className="text-white font-bold text-xl">
                      <img src="./img/Ethereal-Touch-20KB.jpg" alt="" srcset="" />
                    </span>
                  </div>
                  <h2 className="text-3xl font-bold text-white group-hover:text-[#C2985C] transition-colors duration-300">
                    Ethereal Touch
                  </h2>
                </div>
                <p className="text-white/70 text-lg leading-relaxed mb-6">
                  Discover premium fragrances and cosmetics that define elegance and sophistication. Your journey to
                  luxury begins here.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-white/80 hover:text-[#C2985C] transition-colors duration-300">
                    <Mail className="w-5 h-5" />
                    <span>etherealtouch2025@gmail.com</span>
                  </div>
                  <div className="flex items-center gap-3 text-white/80 hover:text-[#C2985C] transition-colors duration-300">
                    <Phone className="w-5 h-5" />
                    <span>+92 320 3731043</span>
                  </div>
                  <div className="flex items-center gap-3 text-white/80 hover:text-[#C2985C] transition-colors duration-300">
                    <MapPin className="w-5 h-5" />
                    <span>Karachi, Pakistan </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-6 relative">
                Quick Links
                <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-[#C2985C] transform transition-all duration-300 hover:w-full"></div>
              </h3>
              <ul className="space-y-4">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link.href}
                      className="group flex items-center text-white/80 hover:text-[#C2985C] transition-all duration-300 hover:translate-x-2"
                    >
                      <span className="w-2 h-2 bg-[#C2985C]/50 rounded-full mr-3 transform transition-all duration-300 group-hover:bg-[#C2985C] group-hover:scale-125"></span>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Categories */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-6 relative">
                Categories
                <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-[#C2985C] transform transition-all duration-300 hover:w-full"></div>
              </h3>
              <ul className="space-y-4">
                {categories.map((category, index) => (
                  <li key={index}>
                    <Link
                      to={category.href}
                      className="group flex items-center text-white/80 hover:text-[#C2985C] transition-all duration-300 hover:translate-x-2"
                    >
                      <span className="w-2 h-2 bg-[#C2985C]/50 rounded-full mr-3 transform transition-all duration-300 group-hover:bg-[#C2985C] group-hover:scale-125"></span>
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-6 relative">
                Stay Connected
                <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-[#C2985C] transform transition-all duration-300 hover:w-full"></div>
              </h3>
              <p className="text-white/70 mb-6">Subscribe to get updates on new products and exclusive offers.</p>
              <div className="space-y-4">
                <div className="relative group">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-[#C2985C] focus:border-transparent transition-all duration-300 hover:bg-white/15"
                  />
                  <Mail className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60 group-focus-within:text-[#C2985C] transition-colors duration-200" />
                </div>
                <button className="group relative w-full bg-gradient-to-r from-[#C2985C] to-[#C2985C]/80 text-white py-3 rounded-2xl font-bold transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 overflow-hidden">
                  <span className="relative z-10">Subscribe Now</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                </button>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-8"></div>

          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Copyright */}
            <div className="text-center md:text-left">
              <p className="text-white/70 text-lg">© 2024 Ethereal Touch. All rights reserved.</p>
              <p className="text-white/60 text-sm mt-1">
                Powered by{" "}
                <Link
                  to="#"
                  className="text-[#C2985C] hover:text-[#C2985C]/80 transition-colors duration-300 font-semibold"
                >
                  ARHAM HAMZA
                </Link>
              </p>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              <span className="text-white/70 text-sm mr-2">Follow us:</span>
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                      target="_blank"
                  href={social.href}
                  aria-label={social.label}
                  className="group relative w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-[#C2985C] transition-all duration-300 hover:scale-110 hover:rotate-12 overflow-hidden"
                >
                  <social.icon className="w-5 h-5 relative z-10" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
                </a>
              ))}
            </div>
          </div>

          {/* Made with Love */}
          <div className="text-center mt-8 pt-8 border-t border-white/10">
            <p className="text-white/60 flex items-center justify-center gap-2">
              Made with <Heart className="w-4 h-4 text-red-400 animate-pulse" fill="currentColor" /> for fragrance
              lovers
            </p>
          </div>
        </div>

        {/* Scroll to Top Button */}
        <button
          onClick={scrollToTop}
          className={`fixed bottom-8 right-8 z-50 w-12 h-12 bg-gradient-to-r from-[#C2985C] to-[#C2985C]/80 rounded-full flex items-center justify-center text-white shadow-2xl transition-all duration-300 hover:scale-110 hover:shadow-3xl ${
            showScrollTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
          }`}
        >
          <ArrowUp className="w-6 h-6" />
        </button>

        {/* Additional decorative elements */}
        <div className="absolute -top-4 -left-4 w-8 h-8 bg-[#C2985C] rounded-full opacity-60 animate-bounce delay-300"></div>
        <div className="absolute -top-2 -right-6 w-4 h-4 bg-white rounded-full opacity-40 animate-bounce delay-700"></div>
        <div className="absolute -bottom-6 -right-2 w-6 h-6 bg-[#C2985C] rounded-full opacity-50 animate-bounce delay-500"></div>
      </footer>

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

export default Footer

"use client"

import { Link, useNavigate } from "react-router-dom"
import SearchBar from "../searchBar/SearchBar"
import { useSelector } from "react-redux"
import { useState, useEffect } from "react"
import { Home, Package, UserPlus, LogIn, User, ShoppingCart, Shield, LogOut, Menu, X } from "lucide-react"

const Navbar = () => {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()
  const cartItems = useSelector((state) => state.cart)
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  // Update user state when localStorage changes
  useEffect(() => {
    const updateUser = () => {
      const userData = localStorage.getItem("users")
      if (userData) {
        try {
          setUser(JSON.parse(userData))
        } catch (error) {
          console.error("Error parsing user data:", error)
          setUser(null)
        }
      } else {
        setUser(null)
      }
    }

    // Initial load
    updateUser()

    // Listen for storage changes
    window.addEventListener("storage", updateUser)

    // Custom event for when user logs in/out
    window.addEventListener("userChanged", updateUser)

    return () => {
      window.removeEventListener("storage", updateUser)
      window.removeEventListener("userChanged", updateUser)
    }
  }, [])

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const logout = () => {
    localStorage.removeItem("users")
    setUser(null)
    // Dispatch custom event
    window.dispatchEvent(new Event("userChanged"))
    navigate("/login")
  }

  const toggleMobileMenu = () => setMobileMenuOpen(!isMobileMenuOpen)

  const closeMobileMenu = () => setMobileMenuOpen(false)

  const navItems = [
    { to: "/", label: "Home", icon: Home, show: true },
    { to: "/allproduct", label: "Products", icon: Package, show: true },
    { to: "/signup", label: "Signup", icon: UserPlus, show: !user },
    { to: "/login", label: "Login", icon: LogIn, show: !user },
    { to: "/user-dashboard", label: "Dashboard", icon: User, show: user?.role === "user" },
    { to: "/cart", label: `Cart (${cartItems.length})`, icon: ShoppingCart, show: user?.role === "user" },
    { to: "/admin-dashboard", label: "Admin", icon: Shield, show: user?.role === "admin" },
  ]

  const visibleNavItems = navItems.filter((item) => item.show)

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-black/95 backdrop-blur-md shadow-2xl border-b border-[#C2985C]/20"
            : "bg-black/90 backdrop-blur-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group" onClick={closeMobileMenu}>
              <div className="relative">
                <img
                  src="./img/Ethereal-Touch-20KB.jpg"
                  alt="Ethereal-Touch Logo"
                  className="w-12 h-12 rounded-full object-cover border-2 border-[#C2985C]/50 group-hover:border-[#C2985C] transition-all duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#C2985C]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <span className="text-xl font-bold text-white group-hover:text-[#C2985C] transition-colors duration-300">
                Ethereal Touch
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {visibleNavItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="group relative px-4 py-2 rounded-xl text-white hover:text-[#C2985C] transition-all duration-300 hover:bg-white/5"
                >
                  <div className="flex items-center space-x-2">
                    <item.icon className="w-4 h-4" />
                    <span className="font-medium">{item.label}</span>
                  </div>
                  <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-[#C2985C] group-hover:w-3/4 group-hover:left-1/8 transition-all duration-300"></div>
                </Link>
              ))}

              {user && (
                <button
                  onClick={logout}
                  className="group relative px-4 py-2 rounded-xl text-white hover:text-red-400 transition-all duration-300 hover:bg-white/5"
                >
                  <div className="flex items-center space-x-2">
                    <LogOut className="w-4 h-4" />
                    <span className="font-medium">Logout</span>
                  </div>
                  <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-red-400 group-hover:w-3/4 group-hover:left-1/8 transition-all duration-300"></div>
                </button>
              )}
            </div>

            {/* Desktop Search */}
            <div className="hidden md:block">
              <SearchBar />
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden relative p-2 rounded-xl text-white hover:text-[#C2985C] hover:bg-white/10 transition-all duration-300"
            >
              <div className="relative w-6 h-6">
                <Menu
                  className={`absolute inset-0 w-6 h-6 transition-all duration-300 ${
                    isMobileMenuOpen ? "rotate-180 opacity-0" : "rotate-0 opacity-100"
                  }`}
                />
                <X
                  className={`absolute inset-0 w-6 h-6 transition-all duration-300 ${
                    isMobileMenuOpen ? "rotate-0 opacity-100" : "-rotate-180 opacity-0"
                  }`}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div
          className={`md:hidden px-4 pb-4 transition-all duration-300 ${isScrolled ? "bg-black/95" : "bg-black/90"}`}
        >
          <SearchBar />
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 transition-all duration-500 ${
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={closeMobileMenu}></div>

        {/* Menu Panel */}
        <div
          className={`absolute top-0 right-0 h-full w-80 max-w-[85vw] bg-gradient-to-br from-[#C2985C] to-[#C2985C]/90 backdrop-blur-md border-l border-white/10 transform transition-transform duration-500 ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/20">
            <h2 className="text-2xl font-bold text-white">Menu</h2>
            <button
              onClick={closeMobileMenu}
              className="p-2 rounded-xl text-white hover:bg-white/10 transition-all duration-300"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* User Info */}
          {user && (
            <div className="p-6 border-b border-white/20">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-white font-semibold">{user.name || "user"}</p>
                  <p className="text-white/70 text-sm capitalize">{user.role}</p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Items */}
          <div className="flex-1 py-6">
            <nav className="space-y-2 px-6">
              {visibleNavItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={closeMobileMenu}
                  className="group flex items-center space-x-3 px-4 py-3 rounded-xl text-white hover:bg-white/10 transition-all duration-300"
                >
                  <item.icon className="w-5 h-5 text-white/70 group-hover:text-white transition-colors duration-300" />
                  <span className="font-medium">{item.label}</span>
                  <div className="ml-auto w-0 h-0.5 bg-white group-hover:w-6 transition-all duration-300"></div>
                </Link>
              ))}

              {user && (
                <button
                  onClick={() => {
                    logout()
                    closeMobileMenu()
                  }}
                  className="group flex items-center space-x-3 px-4 py-3 rounded-xl text-white hover:bg-red-500/20 transition-all duration-300 w-full"
                >
                  <LogOut className="w-5 h-5 text-white/70 group-hover:text-red-400 transition-colors duration-300" />
                  <span className="font-medium">Logout</span>
                  <div className="ml-auto w-0 h-0.5 bg-red-400 group-hover:w-6 transition-all duration-300"></div>
                </button>
              )}
            </nav>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-white/20">
            <p className="text-white/60 text-sm text-center">© 2024 Ethereal Touch</p>
          </div>
        </div>
      </div>

      {/* Spacer for fixed navbar */}
      <div className="h-16"></div>
    </>
  )
}

export default Navbar

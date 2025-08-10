"use client"

import { useNavigate } from "react-router-dom"
import { useState } from "react"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { ChevronDown, Sparkles, Tag, ArrowRight } from "lucide-react"

const category = [{ name: "MEN SCENTS" }, { name: "WOMEN SCENTS" }, { name: "COSMETIC" }]

// Use placeholder images or import your actual images
const images = [
  "./img/WhatsApp Image 2025-08-07 at 23.14.02_f77a7b45.jpg",
  "./img/compressed_image_1.jpg",
  "./img/WhatsApp Image 2025-08-07 at 22.46.25_8aa7f467.jpg", 
  "./img/WhatsApp Image 2025-08-07 at 23.02.38_25db1438.jpg",
  "./img/WhatsApp Image 2025-08-07 at 23.02.38_40718d05.jpg",
  "./img/WhatsApp Image 2025-08-07 at 23.12.14_868fc4e5.jpg",
]

const Category = () => {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState("Select Category")

  const handleSelect = (item) => {
    setSelected(item)
    setOpen(false)
    navigate(`/category/${item.toLowerCase()}`)
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    pauseOnHover: true,
    dotsClass: "slick-dots custom-dots",
  }

  return (
    <>
      {/* Custom CSS styles */}
      <style>{`
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
        
        /* Custom Slider Dots */
        .custom-dots {
          bottom: 20px;
        }
        .custom-dots li {
          margin: 0 8px;
        }
        .custom-dots li button:before {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.5);
          opacity: 1;
          transition: all 0.3s ease;
        }
        .custom-dots li.slick-active button:before {
          color: #C2985C;
          transform: scale(1.2);
        }
        .custom-dots li button:hover:before {
          color: rgba(194, 152, 92, 0.8);
        }
        
        /* Slider Container */
        .slick-slider {
          position: relative;
        }
        .slick-list {
          border-radius: 1rem;
          overflow: hidden;
        }
      `}</style>

      <div className="min-h-screen bg-black py-16 px-4 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-gradient-to-br from-[#C2985C] to-transparent opacity-10 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-gradient-to-tr from-[#C2985C] to-transparent opacity-10 animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-gradient-to-r from-[#C2985C] to-transparent opacity-5 animate-spin-slow"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#C2985C] to-[#C2985C]/80 rounded-full mb-6 shadow-2xl transform transition-all duration-300 hover:scale-110">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl font-bold text-white mb-4 tracking-wide">Discover Our Collections</h1>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Explore our premium categories and find your perfect scent
            </p>
          </div>

          {/* Image Slider */}
          <div className="mb-12">
            <div className="bg-gradient-to-br from-[#C2985C] to-[#C2985C]/90 p-4 rounded-3xl shadow-2xl backdrop-blur-sm border border-white/10 transform transition-all duration-500 hover:scale-105 hover:shadow-3xl">
              <div className="rounded-2xl overflow-hidden bg-white/10 backdrop-blur-sm">
                <Slider {...settings}>
                  {images.map((src, index) => (
                    <div key={index} className="relative group">
                      <div className="relative overflow-hidden">
                        <img
                          src={src}
                          alt={`Collection ${index + 1}`}
                          className="w-full h-[250px] sm:h-[300px] md:h-[400px] lg:h-[500px] object-cover transform transition-all duration-700 group-hover:scale-110"
                          onError={(e) => {
                            e.target.src = "https://via.placeholder.com/800x500/c2985c/ffffff?text=Collection+" + (index + 1);
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                        <div className="absolute bottom-8 left-8 right-8 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                          <h3 className="text-3xl font-bold text-white mb-2">Premium Collection</h3>
                          <p className="text-white/80 text-lg">Discover luxury fragrances crafted with excellence</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
          </div>

          {/* Category Cards Preview */}
          <div className="mt-16 grid md:grid-cols-3 gap-8">
            {category.map((item, index) => (
              <div
                key={index}
                onClick={() => handleSelect(item.name)}
                className="group cursor-pointer bg-gradient-to-br from-[#C2985C]/20 to-[#C2985C]/10 rounded-3xl p-8 backdrop-blur-sm border border-white/10 transform transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:from-[#C2985C]/30 hover:to-[#C2985C]/20"
              >
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#C2985C] to-[#C2985C]/80 rounded-2xl mb-6 shadow-lg transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-12">
                    <Tag className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-[#C2985C] transition-colors duration-300">
                    {item.name}
                  </h3>
                  <p className="text-white/70 mb-6 group-hover:text-white/90 transition-colors duration-300">
                    Discover our premium {item.name.toLowerCase()} collection
                  </p>
                  <div className="flex items-center justify-center gap-2 text-[#C2985C] font-semibold group-hover:gap-4 transition-all duration-300">
                    <span>Explore Collection</span>
                    <ArrowRight className="w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-300" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Additional decorative elements */}
          <div className="absolute -top-4 -left-4 w-8 h-8 bg-[#C2985C] rounded-full opacity-60 animate-bounce delay-300"></div>
          <div className="absolute -top-2 -right-6 w-4 h-4 bg-white rounded-full opacity-40 animate-bounce delay-700"></div>
          <div className="absolute -bottom-6 -right-2 w-6 h-6 bg-[#C2985C] rounded-full opacity-50 animate-bounce delay-500"></div>
        </div>
      </div>
    </>
  )
}

export default Category
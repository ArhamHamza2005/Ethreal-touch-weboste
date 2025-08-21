"use client"

import { useContext, useEffect, useState } from "react"
import Layout from "../../components/layout/Layout"
import myContext from "../../context/myContext"
import { useParams } from "react-router"
import { fireDB } from "../../firebase/FirebaseConfig"
import { doc, getDoc } from "firebase/firestore"
import Loader from "../../components/loader/Loader"
import { useDispatch, useSelector } from "react-redux"
import { addToCart, deleteFromCart } from "../../redux/cartSlice"
import toast from "react-hot-toast"
import { ShoppingCart, Trash2, Star, Shield, Truck, RotateCcw, ArrowLeft, Plus, Minus } from "lucide-react"
import { useNavigate } from "react-router"

const ProductInfo = () => {
  const context = useContext(myContext)
  const { loading, setLoading, userRole } = context
  const [product, setProduct] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const { id } = useParams()
  const navigate = useNavigate()

  // getProductData
  const getProductData = async () => {
    setLoading(true)
    try {
      const productTemp = await getDoc(doc(fireDB, "products", id))
      setProduct({ ...productTemp.data(), id: productTemp.id })
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  const cartItems = useSelector((state) => state.cart)
  const dispatch = useDispatch()

 const addCart = (item) => {
  const token = localStorage.getItem("users") // or whatever you save on login
  if (!token) {
    toast.error("Please login to add items to cart")
    navigate("/login")
    return
  }

  dispatch(addToCart(item))
  toast.success("Added to cart")
}
  const deleteCart = (item) => {
    dispatch(deleteFromCart(item))
    toast.success("Removed from cart")
  }

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems))
  }, [cartItems])

  useEffect(() => {
    getProductData()
  }, [])

  const isInCart = cartItems.some((p) => p.id === product.id)

  return (
    <Layout>
      <div className="min-h-screen bg-black py-8 px-4 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-gradient-to-br from-[#C2985C] to-transparent opacity-10 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-gradient-to-tr from-[#C2985C] to-transparent opacity-10 animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-gradient-to-r from-[#C2985C] to-transparent opacity-5 animate-spin-slow"></div>
        </div>

        <div className="relative z-10 container mx-auto max-w-7xl">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="group flex items-center gap-2 mb-8 px-6 py-3 bg-gradient-to-r from-[#C2985C] to-[#C2985C]/80 text-white rounded-2xl font-semibold transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1"
          >
            <ArrowLeft className="w-5 h-5 transform transition-transform duration-300 group-hover:-translate-x-1" />
            Back to Products
          </button>

          {loading ? (
            <div className="flex justify-center items-center min-h-[60vh]">
              <div className="bg-gradient-to-br from-[#C2985C] to-[#C2985C]/90 rounded-3xl p-12 shadow-2xl backdrop-blur-sm border border-white/10">
                <Loader />
              </div>
            </div>
          ) : (
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Product Images */}
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-[#C2985C] to-[#C2985C]/90 rounded-3xl p-8 shadow-2xl backdrop-blur-sm border border-white/10 transform transition-all duration-500 hover:scale-105">
                  <div className="relative overflow-hidden rounded-2xl bg-white/10 backdrop-blur-sm">
                    <img
                      src={product?.productImageUrl || "/placeholder.svg"}
                      alt={product?.title}
                      className="w-full h-96 object-contain transform transition-all duration-700 hover:scale-110"
                    />
                    {/* Image overlay effects */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                  </div>
                </div>

                {/* Features */}
                <div className="grid grid-cols-3 gap-4">
                  {[...Array(1)].map((_, i) => (
                    <div
                      key={i}
                      className="bg-gradient-to-br from-[#C2985C]/20 to-[#C2985C]/10 rounded-2xl p-4 text-center backdrop-blur-sm border border-white/10 transform transition-all duration-300 hover:scale-105"
                    >
                      <Shield className="w-6 h-6 text-[#C2985C] mx-auto mb-2" />
                      <p className="text-white text-sm font-medium">Secure Payment</p>
                    </div>
                  ))}
                  {[...Array(1)].map((_, i) => (
                    <div
                      key={i}
                      className="bg-gradient-to-br from-[#C2985C]/20 to-[#C2985C]/10 rounded-2xl p-4 text-center backdrop-blur-sm border border-white/10 transform transition-all duration-300 hover:scale-105"
                    >
                      <Truck className="w-6 h-6 text-[#C2985C] mx-auto mb-2" />
                      <p className="text-white text-sm font-medium">Fast Delivery</p>
                    </div>
                  ))}
                  {[...Array(1)].map((_, i) => (
                    <div
                      key={i}
                      className="bg-gradient-to-br from-[#C2985C]/20 to-[#C2985C]/10 rounded-2xl p-4 text-center backdrop-blur-sm border border-white/10 transform transition-all duration-300 hover:scale-105"
                    >
                      <RotateCcw className="w-6 h-6 text-[#C2985C] mx-auto mb-2" />
                      <p className="text-white text-sm font-medium">Easy Returns</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Product Details */}
              <div className="space-y-8">
                <div className="bg-gradient-to-br from-[#C2985C] to-[#C2985C]/90 rounded-3xl p-8 shadow-2xl backdrop-blur-sm border border-white/10 transform transition-all duration-500 hover:scale-105">
                  {/* Header Actions */}
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-2">
                      <div className="bg-white/20 text-white px-3 py-1 rounded-full text-sm font-bold">Premium</div>
                      <div className="bg-green-400/20 text-green-400 px-3 py-1 rounded-full text-sm font-bold">
                        In Stock
                      </div>
                    </div>
                    {/* <div className="flex gap-2">
                      <button className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 hover:scale-110">
                        <Heart className="w-5 h-5" />
                      </button>
                      <button className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 hover:scale-110">
                        <Share2 className="w-5 h-5" />
                      </button>
                    </div> */}
                  </div>

                  {/* Product Title */}
                  <h1 className="text-4xl font-bold text-white mb-4 leading-tight">{product?.title}</h1>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-6">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${i < 4 ? "text-yellow-400 fill-current" : "text-white/30"}`}
                        />
                      ))}
                    </div>
                    <span className="text-white/70 text-lg">(4.0)</span>
                    {/* <span className="text-white/50">• 127 reviews</span> */}
                  </div>

                  {/* Price */}
                  <div className="flex items-center gap-4 mb-8">
                    <span className="text-5xl font-bold text-white">Pkr {(product?.price * 0.8).toFixed()}</span>
                    <div className="space-y-1">
                      <span className="text-white/50 text-xl line-through">{product?.price}</span>
                      <div className="bg-green-400/20 text-green-400 px-2 py-1 rounded-full text-sm font-bold">
                        20% OFF
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold text-white mb-4">Description</h3>
                    <p className="text-white/80 text-lg leading-relaxed">
                      {product?.description ||
                        "Experience premium quality with this exceptional product designed for those who appreciate excellence and craftsmanship."}
                    </p>
                  </div>

                  {/* Quantity Selector */}
                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-white mb-4">Quantity</h3>
                    <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-2xl p-2 w-fit">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-12 h-12 rounded-xl bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-all duration-300 hover:scale-110"
                      >
                        <Minus className="w-5 h-5" />
                      </button>
                      <span className="mx-6 text-2xl font-bold text-white min-w-[3rem] text-center">{quantity}</span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-12 h-12 rounded-xl bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-all duration-300 hover:scale-110"
                      >
                        <Plus className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-4">
                    <button
                      onClick={() => (isInCart ? deleteCart(product) : addCart(product))}
                      className={`group/btn relative w-full py-4 rounded-2xl font-bold text-xl transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 overflow-hidden ${
                        isInCart
                          ? "bg-red-500/20 text-white hover:bg-red-500/30 border-2 border-red-500/50"
                          : "bg-white text-[#C2985C] hover:bg-white/90 border-2 border-white/20"
                      }`}
                    >
                      <span className="relative z-10 flex items-center justify-center gap-3">
                        {isInCart ? (
                          <>
                            <Trash2 className="w-6 h-6 transform transition-transform duration-300 group-hover/btn:rotate-12" />
                            Remove from Cart
                          </>
                        ) : (
                          <>
                            <ShoppingCart className="w-6 h-6 transform transition-transform duration-300 group-hover/btn:scale-110" />
                            Add to Cart
                          </>
                        )}
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
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
    </Layout>
  )
}

export default ProductInfo

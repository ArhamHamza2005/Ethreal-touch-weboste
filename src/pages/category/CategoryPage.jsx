"use client"

import { useNavigate, useParams } from "react-router"
import Layout from "../../components/layout/Layout"
import { useContext, useEffect } from "react"
import myContext from "../../context/myContext"
import Loader from "../../components/loader/Loader"
import { useDispatch, useSelector } from "react-redux"
import { addToCart, deleteFromCart } from "../../redux/cartSlice"
import toast from "react-hot-toast"
import { ShoppingCart, Trash2, Eye, Star, Heart, Package, ArrowLeft, Tag, Filter } from "lucide-react"

const CategoryPage = () => {
  const { categoryname } = useParams()
  const context = useContext(myContext)
  const { getAllProduct, loading } = context
  const navigate = useNavigate()

  // Filter products by category name
  const filterProduct = getAllProduct.filter((obj) => obj.category.toLowerCase() === categoryname.toLowerCase())

  const cartItems = useSelector((state) => state.cart)
  const dispatch = useDispatch()

  const addCart = (item) => {
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
    console.log("Category Name:", categoryname)
    console.log("Fetched Products:", getAllProduct)
    console.log("Filtered Products:", filterProduct)
  }, [categoryname, getAllProduct, filterProduct])

  return (
    <Layout>
      <div className="min-h-screen bg-black py-16 px-4 relative overflow-hidden">
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
            Back to Categories
          </button>

          {/* Header Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#C2985C] to-[#C2985C]/80 rounded-full mb-6 shadow-2xl transform transition-all duration-300 hover:scale-110">
              <Tag className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl font-bold text-white mb-4 tracking-wide capitalize">{categoryname} Collection</h1>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Discover our premium {categoryname?.toLowerCase()} products crafted with excellence
            </p>

            {/* Category Stats */}
            <div className="mt-8 inline-flex items-center gap-6 bg-gradient-to-br from-[#C2985C]/20 to-[#C2985C]/10 rounded-2xl px-8 py-4 backdrop-blur-sm border border-white/10">
              <div className="flex items-center gap-2">
                <Package className="w-5 h-5 text-[#C2985C]" />
                <span className="text-white font-semibold">{filterProduct.length} Products</span>
              </div>
              <div className="w-px h-6 bg-white/20"></div>
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-[#C2985C]" />
                <span className="text-white font-semibold">Premium Quality</span>
              </div>
            </div>
          </div>

          {/* Loading State */}
          {loading ? (
            <div className="flex justify-center items-center min-h-[60vh]">
              <div className="bg-gradient-to-br from-[#C2985C] to-[#C2985C]/90 rounded-3xl p-12 shadow-2xl backdrop-blur-sm border border-white/10">
                <Loader />
              </div>
            </div>
          ) : (
            <>
              {/* Products Grid */}
              {filterProduct.length > 0 ? (
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {filterProduct.map((item, index) => {
                    const { id, title, price, productImageUrl, description } = item
                    const inCart = cartItems.some((p) => p.id === item.id)

                    return (
                      <div
                        key={index}
                        className="group relative bg-gradient-to-br from-[#C2985C] to-[#C2985C]/90 rounded-3xl shadow-2xl backdrop-blur-sm border border-white/10 overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-3xl"
                      >
                        {/* Product Image Container */}
                        <div className="relative overflow-hidden rounded-t-3xl">
                          <div onClick={() => navigate(`/productinfo/${id}`)} className="cursor-pointer relative block">
                            <img
                              src={productImageUrl || "/placeholder.svg"}
                              alt={title}
                              className="w-full h-64 object-cover transform transition-all duration-700 group-hover:scale-110"
                            />
                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

                            {/* Quick View Button */}
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                              <button className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-2xl font-semibold transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 hover:bg-white/30">
                                <Eye className="w-5 h-5 inline mr-2" />
                                Quick View
                              </button>
                            </div>
                          </div>

                          {/* Wishlist Button */}
                          <button className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transform transition-all duration-300 hover:scale-110 opacity-0 group-hover:opacity-100">
                            <Heart className="w-5 h-5" />
                          </button>

                          {/* Badge */}
                          <div className="absolute top-4 left-4 bg-white/90 text-[#C2985C] px-3 py-1 rounded-full text-sm font-bold transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                            Premium
                          </div>
                        </div>

                        {/* Product Info */}
                        <div className="p-6 space-y-4">
                          {/* Title and Rating */}
                          <div>
                            <h3 className="text-xl font-bold text-white mb-2 line-clamp-2 group-hover:text-white/90 transition-colors duration-300">
                              {title}
                            </h3>
                            <div className="flex items-center gap-1 mb-3">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${i < 4 ? "text-yellow-400 fill-current" : "text-white/30"}`}
                                />
                              ))}
                              <span className="text-white/60 text-sm ml-2">(4.0)</span>
                            </div>
                          </div>

                          {/* Description */}
                          {description && (
                            <p className="text-white/70 text-sm line-clamp-2 leading-relaxed">{description}</p>
                          )}

                          {/* Price */}
                          <div className="flex items-center justify-between">
                            <div>
                              <span className="text-3xl font-bold text-white">${price}</span>
                              <span className="text-white/50 text-lg line-through ml-2">
                                ${(price * 1.2).toFixed(2)}
                              </span>
                            </div>
                            <div className="text-green-400 text-sm font-semibold bg-green-400/20 px-2 py-1 rounded-full">
                              20% OFF
                            </div>
                          </div>

                          {/* Action Button */}
                          <button
                            onClick={() => (inCart ? deleteCart(item) : addCart(item))}
                            className={`group/btn relative w-full py-4 rounded-2xl font-bold text-lg transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 overflow-hidden ${
                              inCart
                                ? "bg-red-500/20 text-white hover:bg-red-500/30 border-2 border-red-500/50"
                                : "bg-white text-[#C2985C] hover:bg-white/90 border-2 border-white/20"
                            }`}
                          >
                            <span className="relative z-10 flex items-center justify-center gap-2">
                              {inCart ? (
                                <>
                                  <Trash2 className="w-5 h-5 transform transition-transform duration-300 group-hover/btn:rotate-12" />
                                  Remove from Cart
                                </>
                              ) : (
                                <>
                                  <ShoppingCart className="w-5 h-5 transform transition-transform duration-300 group-hover/btn:scale-110" />
                                  Add to Cart
                                </>
                              )}
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></div>
                          </button>
                        </div>

                        {/* Floating decorative elements */}
                        <div className="absolute -top-2 -right-2 w-4 h-4 bg-white/30 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100"></div>
                        <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-[#C2985C]/50 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200"></div>
                      </div>
                    )
                  })}
                </div>
              ) : (
                /* Empty State */
                <div className="text-center py-20">
                  <div className="bg-gradient-to-br from-[#C2985C] to-[#C2985C]/90 rounded-3xl p-12 shadow-2xl backdrop-blur-sm border border-white/10 max-w-md mx-auto transform transition-all duration-500 hover:scale-105">
                    <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Package className="w-12 h-12 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-4">No Products Found</h2>
                    <p className="text-white/80 mb-8">We couldn't find any products in the {categoryname} category.</p>
                    <button
                      onClick={() => navigate("/allproduct")}
                      className="group relative bg-white text-[#C2985C] px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 hover:bg-white/90 hover:shadow-lg transform hover:-translate-y-1 overflow-hidden"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        Browse All Products
                        <Package className="w-5 h-5 transform transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                    </button>
                  </div>
                </div>
              )}
            </>
          )}

          {/* Category Summary */}
          {filterProduct.length > 0 && (
            <div className="mt-16 bg-gradient-to-br from-[#C2985C]/20 to-[#C2985C]/10 rounded-3xl p-8 backdrop-blur-sm border border-white/10">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-4">Explore More {categoryname} Products</h3>
                <p className="text-white/80 mb-6 max-w-2xl mx-auto">
                  Discover our complete collection of premium {categoryname?.toLowerCase()} products, each crafted with
                  attention to detail and quality.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <button
                    onClick={() => navigate("/allproduct")}
                    className="group relative bg-gradient-to-r from-[#C2985C] to-[#C2985C]/80 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      View All Products
                      <Package className="w-5 h-5 transform transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                  </button>
                  <button
                    onClick={() => navigate("/cart")}
                    className="group relative bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-2xl font-bold text-lg border-2 border-white/20 transition-all duration-300 hover:bg-white/20 hover:shadow-lg transform hover:-translate-y-1 overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      View Cart ({cartItems.length})
                      <ShoppingCart className="w-5 h-5 transform transition-transform duration-300 group-hover:scale-110" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                  </button>
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
          .line-clamp-2 {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
        `}</style>
      </div>
    </Layout>
  )
}

export default CategoryPage

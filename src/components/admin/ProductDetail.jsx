"use client"

import { useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import myContext from "../../context/myContext"
import Loader from "../loader/Loader"
import { deleteDoc, doc } from "firebase/firestore"
import { fireDB } from "../../firebase/FirebaseConfig"
import toast from "react-hot-toast"
import { Package, Plus, Edit, Trash2, Calendar, DollarSign, Tag } from "lucide-react"

const ProductDetail = () => {
  const context = useContext(myContext)
  const { loading, setLoading, getAllProduct, getAllProductFunction } = context
  const navigate = useNavigate()

  const deleteProduct = async (id) => {
    setLoading(true)
    try {
      await deleteDoc(doc(fireDB, "products", id))
      toast.success("Product Deleted successfully")
      getAllProductFunction()
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Product Management</h2>
          <p className="text-white/70">Manage your product inventory</p>
        </div>
        <Link
          to="/addproduct"
          className="group relative bg-black rounded-2xl px-6 py-3 text-white font-semibold transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 overflow-hidden"
        >
          <span className="relative z-10 flex items-center gap-2">
            <Plus className="w-5 h-5 transform transition-transform duration-300 group-hover:rotate-90" />
            Add Product
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
        </Link>
      </div>

      {/* Loader */}
      {loading && (
        <div className="flex justify-center py-12">
          <div className="bg-gradient-to-br from-[#C2985C] to-[#C2985C]/90 rounded-3xl p-8 shadow-2xl backdrop-blur-sm border border-white/10">
            <Loader />
          </div>
        </div>
      )}

      {/* Product Display */}
      {!loading && (
        <div className="space-y-6">
          {getAllProduct.length > 0 ? (
            <>
              {/* Desktop Table */}
              <div className="hidden lg:block bg-white/5 backdrop-blur-sm rounded-3xl overflow-hidden border border-white/10">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gradient-to-r from-[#C2985C] to-[#C2985C]/80">
                        <th className="px-6 py-4 text-left text-white font-semibold">S.No.</th>
                        <th className="px-6 py-4 text-left text-white font-semibold">Image</th>
                        <th className="px-6 py-4 text-left text-white font-semibold">Title</th>
                        <th className="px-6 py-4 text-left text-white font-semibold">Price</th>
                        <th className="px-6 py-4 text-left text-white font-semibold">Category</th>
                        <th className="px-6 py-4 text-left text-white font-semibold">Date</th>
                        <th className="px-6 py-4 text-center text-white font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {getAllProduct.map((item, index) => {
                        const { id, title, price, category, date, productImageUrl } = item
                        return (
                          <tr key={index} className="border-b border-white/10 hover:bg-white/5 transition-all duration-300">
                            <td className="px-6 py-4 text-white font-medium">{index + 1}</td>
                            <td className="px-6 py-4">
                              <div className="w-16 h-16 rounded-2xl overflow-hidden bg-white/10 backdrop-blur-sm border border-white/20">
                                <img
                                  src={productImageUrl || "/placeholder.svg"}
                                  alt={title}
                                  className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-110"
                                />
                              </div>
                            </td>
                            <td className="px-6 py-4 text-white font-medium max-w-xs truncate">{title}</td>
                            <td className="px-6 py-4 text-white font-bold">pkr {price}</td>
                            <td className="px-6 py-4">
                              <span className="bg-[#C2985C]/20 text-black px-3 py-1 rounded-full text-sm font-medium">
                                {category}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-white/70">{date}</td>
                            <td className="px-6 py-4">
                              <div className="flex items-center justify-center gap-2">
                                <button
                                  onClick={() => navigate(`/updateproduct/${id}`)}
                                  className="group p-2 bg-blue-500/20 hover:bg-blue-500/30 rounded-xl text-blue-400 transition-all duration-300 hover:scale-110"
                                >
                                  <Edit className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
                                </button>
                                <button
                                  onClick={() => deleteProduct(id)}
                                  className="group p-2 bg-red-500/20 hover:bg-red-500/30 rounded-xl text-red-400 transition-all duration-300 hover:scale-110"
                                >
                                  <Trash2 className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Mobile Card View */}
              <div className="lg:hidden space-y-4">
                {getAllProduct.map((item, index) => {
                  const { id, title, price, category, date, productImageUrl } = item
                  return (
                    <div
                      key={index}
                      className="bg-gradient-to-br from-[#C2985C] to-[#C2985C]/90 rounded-3xl p-6 shadow-2xl backdrop-blur-sm border border-white/10 transform transition-all duration-500 hover:scale-105"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-20 h-20 rounded-2xl overflow-hidden bg-white/10 backdrop-blur-sm border border-white/20 flex-shrink-0">
                          <img
                            src={productImageUrl || "/placeholder.svg"}
                            alt={title}
                            className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-110"
                          />
                        </div>
                        <div className="flex-1 space-y-3">
                          <div className="flex items-start justify-between">
                            <h3 className="text-xl font-bold text-white line-clamp-2">{title}</h3>
                            <span className="text-sm bg-white/20 text-white px-2 py-1 rounded-full">#{index + 1}</span>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center gap-2">
                              <DollarSign className="w-4 h-4 text-white/60" />
                              <span className="text-white font-bold">${price}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Tag className="w-4 h-4 text-white/60" />
                              <span className="text-white/80 text-sm">{category}</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-white/60" />
                            <span className="text-white/70 text-sm">{date}</span>
                          </div>

                          <div className="flex gap-2 pt-2">
                            <button
                              onClick={() => navigate(`/updateproduct/${id}`)}
                              className="group flex-1 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 py-2 px-4 rounded-xl font-medium transition-all duration-300 hover:scale-105"
                            >
                              <Edit className="w-4 h-4 inline mr-2 group-hover:rotate-12 transition-transform duration-300" />
                              Edit
                            </button>
                            <button
                              onClick={() => deleteProduct(id)}
                              className="group flex-1 bg-red-500/20 hover:bg-red-500/30 text-red-400 py-2 px-4 rounded-xl font-medium transition-all duration-300 hover:scale-105"
                            >
                              <Trash2 className="w-4 h-4 inline mr-2 group-hover:rotate-12 transition-transform duration-300" />
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </>
          ) : (
            <div className="text-center py-20">
              <div className="bg-gradient-to-br from-[#C2985C] to-[#C2985C]/90 rounded-3xl p-12 shadow-2xl backdrop-blur-sm border border-white/10 max-w-md mx-auto transform transition-all duration-500 hover:scale-105">
                <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Package className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">No Products Found</h3>
                <p className="text-white/80 mb-8">Start by adding your first product to the inventory.</p>
                <Link
                  to="/addproduct"
                  className="group relative bg-white text-[#C2985C] px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 hover:bg-white/90 hover:shadow-lg transform hover:-translate-y-1 overflow-hidden inline-block"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <Plus className="w-5 h-5 transform transition-transform duration-300 group-hover:rotate-90" />
                    Add First Product
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                </Link>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Summary */}
      {getAllProduct.length > 0 && (
        <div className="bg-gradient-to-br from-[#C2985C]/20 to-[#C2985C]/10 rounded-3xl p-6 backdrop-blur-sm border border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Package className="w-6 h-6 text-[#C2985C]" />
              <span className="text-white font-semibold">Total Products: {getAllProduct.length}</span>
            </div>
            <div className="text-white/70 text-sm">Last updated: {new Date().toLocaleDateString()}</div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductDetail

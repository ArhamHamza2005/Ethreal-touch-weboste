"use client"

import { Timestamp, addDoc, collection } from "firebase/firestore"
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { useContext, useState } from "react"
import myContext from "../../context/myContext"
import toast from "react-hot-toast"
import { fireDB } from "../../firebase/FirebaseConfig"
import { useNavigate } from "react-router"
import Loader from "../../components/loader/Loader"
import { Package, DollarSign, Upload, Tag, FileText, ArrowLeft, Plus, ImageIcon, Loader2 } from "lucide-react"

const categoryList = [
  { name: "MEN SCENTS" },
  { name: "WOMEN SCENTS" },
  { name: "COSMETIC" },
]




const AddProductPage = () => {
  const context = useContext(myContext)
  const { loading, setLoading } = context
  const navigate = useNavigate()
  const [imagePreview, setImagePreview] = useState(null)
  const [product, setProduct] = useState({
    title: "",
    price: "",
    productImageUrl: "",
    category: "",
    description: "",
    quantity: 1,
    time: Timestamp.now(),
    date: new Date().toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
  })
  const [imageFile, setImageFile] = useState(null)

  // Handle file change
  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImageFile(file)
      // Create preview
      const reader = new FileReader()
      reader.onload = (e) => setImagePreview(e.target.result)
      reader.readAsDataURL(file)
    }
  }

  // Upload image to Firebase Storage and get URL
  const uploadImage = async (file) => {
    const storage = getStorage()
    const storageRef = ref(storage, `products/${file.name}`)
    await uploadBytes(storageRef, file)
    const url = await getDownloadURL(storageRef)
    return url
  }

  // Add Product Function
  const addProductFunction = async () => {
    if (
      product.title === "" ||
      product.price === "" ||
      !imageFile ||
      product.category === "" ||
      product.description === ""
    ) {
      return toast.error("All fields are required")
    }
    setLoading(true)
    try {
      const imageUrl = await uploadImage(imageFile)
      const productRef = collection(fireDB, "products")
      await addDoc(productRef, { ...product, productImageUrl: imageUrl })
      toast.success("Product added successfully")
      navigate("/admin-dashboard")
    } catch (error) {
      console.log(error)
      toast.error("Failed to add product")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black py-8 px-4 relative overflow-hidden">
      {loading && <Loader />}

      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-gradient-to-br from-[#C2985C] to-transparent opacity-10 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-gradient-to-tr from-[#C2985C] to-transparent opacity-10 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-gradient-to-r from-[#C2985C] to-transparent opacity-5 animate-spin-slow"></div>
      </div>

      <div className="relative z-10 container mx-auto max-w-2xl">
        {/* Back Button */}
        <button
          onClick={() => navigate("/admin-dashboard")}
          className="group flex items-center gap-2 mb-8 px-6 py-3 bg-gradient-to-r from-[#C2985C] to-[#C2985C]/80 text-white rounded-2xl font-semibold transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1"
        >
          <ArrowLeft className="w-5 h-5 transform transition-transform duration-300 group-hover:-translate-x-1" />
          Back to Dashboard
        </button>

        {/* Main Form Card */}
        <div className="bg-gradient-to-br from-[#C2985C] to-[#C2985C]/90 p-8 rounded-3xl shadow-2xl backdrop-blur-sm border border-white/10 transform transition-all duration-500 hover:scale-105 hover:shadow-3xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full mb-4 shadow-lg transform transition-all duration-300 hover:rotate-12">
              <Plus className="w-8 h-8 text-[#C2985C]" />
            </div>
            <h2 className="text-4xl font-bold text-white mb-2 tracking-wide">Add New Product</h2>
            <p className="text-white/80 text-sm">Create a new product for your inventory</p>
          </div>

          {/* Form */}
          <div className="space-y-6">
            {/* Product Title */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Package className="h-5 w-5 text-white/60 group-focus-within:text-white transition-colors duration-200" />
              </div>
              <input
                type="text"
                name="title"
                value={product.title}
                onChange={(e) => setProduct({ ...product, title: e.target.value })}
                placeholder="Product Title"
                className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all duration-300 hover:bg-white/15"
              />
            </div>

            {/* Product Price */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <DollarSign className="h-5 w-5 text-white/60 group-focus-within:text-white transition-colors duration-200" />
              </div>
              <input
                type="number"
                name="price"
                value={product.price}
                onChange={(e) => setProduct({ ...product, price: e.target.value })}
                placeholder="Product Price"
                className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all duration-300 hover:bg-white/15"
              />
            </div>

            {/* Image Upload */}
            <div className="space-y-4">
              <label className="block text-white font-semibold mb-2">Product Image</label>
              <div className="relative">
                <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" id="image-upload" />
                <label
                  htmlFor="image-upload"
                  className="group cursor-pointer flex flex-col items-center justify-center w-full h-32 bg-white/10 backdrop-blur-sm border-2 border-dashed border-white/30 rounded-2xl hover:bg-white/15 transition-all duration-300"
                >
                  <Upload className="w-8 h-8 text-white/60 mb-2 group-hover:text-white transition-colors duration-200" />
                  <span className="text-white/80 font-medium">Click to upload image</span>
                  <span className="text-white/60 text-sm">PNG, JPG up to 10MB</span>
                </label>
              </div>

              {/* Image Preview */}
              {imagePreview && (
                <div className="relative">
                  <img
                    src={imagePreview || "/placeholder.svg"}
                    alt="Preview"
                    className="w-full h-48 object-cover rounded-2xl border border-white/20"
                  />
                  <div className="absolute top-2 right-2 bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-sm font-medium">
                    ✓ Image Selected
                  </div>
                </div>
              )}
            </div>

            {/* Category Select */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Tag className="h-5 w-5 text-white/60 group-focus-within:text-white transition-colors duration-200" />
              </div>
              <select
                value={product.category}
                onChange={(e) => setProduct({ ...product, category: e.target.value })}
                className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all duration-300 hover:bg-white/15 appearance-none"
              >
                <option value="" className="bg-[#C2985C] text-white">
                  Select Product Category
                </option>
                {categoryList.map((value, index) => (
                  <option key={index} value={value.name} className="bg-[#C2985C] text-white">
                    {value.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Description Textarea */}
            <div className="relative group">
              <div className="absolute top-4 left-4 pointer-events-none">
                <FileText className="h-5 w-5 text-white/60 group-focus-within:text-white transition-colors duration-200" />
              </div>
              <textarea
                value={product.description}
                onChange={(e) => setProduct({ ...product, description: e.target.value })}
                name="description"
                placeholder="Product Description"
                rows="5"
                className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all duration-300 hover:bg-white/15 resize-none"
              />
            </div>

            {/* Add Product Button */}
            <button
              onClick={addProductFunction}
              disabled={loading}
              className="group relative w-full bg-white text-[#C2985C] py-4 rounded-2xl font-bold text-lg transition-all duration-300 hover:bg-white/90 hover:shadow-lg transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Adding Product...
                  </>
                ) : (
                  <>
                    <Plus className="w-5 h-5 transform transition-transform duration-300 group-hover:rotate-90" />
                    Add Product
                  </>
                )}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            </button>
          </div>
        </div>

        {/* Additional Info Card */}
        <div className="mt-8 bg-gradient-to-br from-[#C2985C]/20 to-[#C2985C]/10 rounded-3xl p-6 backdrop-blur-sm border border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <ImageIcon className="w-6 h-6 text-[#C2985C]" />
            <h3 className="text-xl font-bold text-white">Image Guidelines</h3>
          </div>
          <ul className="text-white/80 space-y-2">
            <li>• Use high-quality images (minimum 800x800px)</li>
            <li>• Supported formats: PNG, JPG, JPEG</li>
            <li>• Maximum file size: 10MB</li>
            <li>• Square images work best for product display</li>
          </ul>
        </div>
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

export default AddProductPage

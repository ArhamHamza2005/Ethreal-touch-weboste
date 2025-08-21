"use client"

import { useDispatch, useSelector } from "react-redux"
import Layout from "../../components/layout/Layout"
import { Trash, Plus, Minus, ShoppingBag, Package, CreditCard } from "lucide-react"
import { decrementQuantity, deleteFromCart, incrementQuantity } from "../../redux/cartSlice"
import toast from "react-hot-toast"
import { useEffect, useState } from "react"
import { Timestamp, addDoc, collection } from "firebase/firestore"
import { fireDB } from "../../firebase/FirebaseConfig"
import BuyNowModal from "../../components/buyNowModal/BuyNowModal"
import { Navigate } from "react-router"

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart)
  const dispatch = useDispatch()

  const deleteCart = (item) => {
    dispatch(deleteFromCart(item))
    toast.success("Item removed from cart")
  }

  const handleIncrement = (id) => {
    dispatch(incrementQuantity(id))
  }

  const handleDecrement = (id) => {
    dispatch(decrementQuantity(id))
  }

  // Helper function to safely convert price to number
  const safePrice = (price) => {
    const numPrice = parseFloat(price)
    return isNaN(numPrice) ? 0 : numPrice
  }

  // Helper function to safely convert quantity to number
  const safeQuantity = (quantity) => {
    const numQuantity = parseInt(quantity)
    return isNaN(numQuantity) || numQuantity < 1 ? 1 : numQuantity
  }

  const cartItemTotal = cartItems
    .map((item) => safeQuantity(item.quantity))
    .reduce((prevValue, currValue) => prevValue + currValue, 0)

  const cartTotal = cartItems
    .map((item) => safePrice(item.price) * safeQuantity(item.quantity))
    .reduce((prevValue, currValue) => prevValue + currValue, 0)

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems))
  }, [cartItems])

  // user
  const user = JSON.parse(localStorage.getItem("users"))

  // Buy Now Function
  const [addressInfo, setAddressInfo] = useState({
    name: "",
    address: "",
    pincode: "",
    mobileNumber: "",
    time: Timestamp.now(),
    date: new Date().toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
  })

  const buyNowFunction = () => {
    // validation
    if (
      addressInfo.name === "" ||
      addressInfo.address === "" ||
      addressInfo.pincode === "" ||
      addressInfo.mobileNumber === ""
    ) {
      return toast.error("All Fields are required")
    }

    // Order Info
    const orderInfo = {
      cartItems,
      addressInfo,
      email: user.email,
      userid: user.uid,
      status: "confirmed",
      time: Timestamp.now(),
      date: new Date().toLocaleString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }),
    }

    try {
      const orderRef = collection(fireDB, "order")
      addDoc(orderRef, orderInfo)
      setAddressInfo({
        name: "",
        address: "",
        pincode: "",
        mobileNumber: "",
      })
      toast.success("Order Placed Successfully")
    } catch (error) {
      console.log(error)
    }
  }

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
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#C2985C] to-[#C2985C]/80 rounded-full mb-6 shadow-2xl transform transition-all duration-300 hover:scale-110">
              <ShoppingBag className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl font-bold text-white mb-4 tracking-wide">Shopping Cart</h1>
            <p className="text-white/70 text-lg">
              {cartItems.length > 0 ? `${cartItemTotal} items in your cart` : "Your cart is empty"}
            </p>
          </div>

          {cartItems.length > 0 ? (
            <div className="grid lg:grid-cols-12 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-8 space-y-6">
                {cartItems.map((item, index) => {
                  const { id, title, price, productImageUrl, quantity, category } = item
                  const itemPrice = safePrice(price)
                  const itemQuantity = safeQuantity(quantity)
                  const itemSubtotal = itemPrice * itemQuantity

                  return (
                    <div
                      key={index}
                      className="group bg-gradient-to-br from-[#C2985C] to-[#C2985C]/90 rounded-3xl p-6 shadow-2xl backdrop-blur-sm border border-white/10 transform transition-all duration-500 hover:scale-105 hover:shadow-3xl"
                    >
                      <div className="flex flex-col sm:flex-row gap-6">
                        {/* Product Image */}
                        <div className="flex-shrink-0">
                          <div className="relative overflow-hidden rounded-2xl bg-white/10 backdrop-blur-sm p-4">
                            <img
                              src={productImageUrl || "/placeholder.svg"}
                              alt={title}
                              className="w-32 h-32 object-contain transform transition-transform duration-300 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                          </div>
                        </div>

                        {/* Product Details */}
                        <div className="flex-1 space-y-4">
                          <div>
                            <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
                            <div className="flex items-center gap-2 mb-3">
                              <Package className="w-4 h-4 text-white/60" />
                              <span className="text-white/80 text-sm capitalize">{category}</span>
                            </div>
                            <p className="text-3xl font-bold text-white">
                              pkr {itemPrice.toFixed(2)}
                            </p>
                          </div>

                          {/* Quantity Controls */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-2xl p-2">
                              <button
                                onClick={() => handleDecrement(id)}
                                className="w-10 h-10 rounded-xl bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-all duration-300 hover:scale-110"
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                              <span className="mx-4 text-xl font-bold text-white min-w-[3rem] text-center">
                                {itemQuantity}
                              </span>
                              <button
                                onClick={() => handleIncrement(id)}
                                className="w-10 h-10 rounded-xl bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-all duration-300 hover:scale-110"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>

                            {/* Remove Button */}
                            <button
                              onClick={() => deleteCart(item)}
                              className="group flex items-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 rounded-2xl text-white transition-all duration-300 hover:scale-105"
                            >
                              <Trash className="w-4 h-4 group-hover:animate-bounce" />
                              <span className="font-medium">Remove</span>
                            </button>
                          </div>

                          {/* Subtotal */}
                          <div className="pt-4 border-t border-white/20">
                            <div className="flex justify-between items-center">
                              <span className="text-white/80">Subtotal:</span>
                              <span className="text-2xl font-bold text-white">
                                pkr {itemSubtotal.toFixed(2)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-4">
                <div className="sticky top-24">
                  <div className="bg-gradient-to-br from-[#C2985C] to-[#C2985C]/90 rounded-3xl p-8 shadow-2xl backdrop-blur-sm border border-white/10 transform transition-all duration-500 hover:scale-105">
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-8 pb-6 border-b border-white/20">
                      <CreditCard className="w-6 h-6 text-white" />
                      <h2 className="text-2xl font-bold text-white">Order Summary</h2>
                    </div>

                    {/* Price Details */}
                    <div className="space-y-6 mb-8">
                      <div className="flex justify-between items-center">
                        <span className="text-white/80 text-lg">Items ({cartItemTotal}):</span>
                        <span className="text-xl font-semibold text-white">pkr {cartTotal.toFixed(2)}</span>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-white/80 text-lg">Delivery:</span>
                        <span className="text-white font-medium">Location Based</span>
                      </div>

                      <div className="h-px bg-white/20"></div>

                      <div className="flex justify-between items-center">
                        <span className="text-2xl font-bold text-white">Total:</span>
                        <span className="text-3xl font-bold text-white">pkr {cartTotal.toFixed(2)}</span>
                      </div>
                    </div>

                    {/* Checkout Button */}
                    <div className="space-y-4">
                      {user ? (
                        <BuyNowModal
                          addressInfo={addressInfo}
                          setAddressInfo={setAddressInfo}
                          buyNowFunction={buyNowFunction}
                        />
                      ) : (
                        <Navigate to={"/login"} />
                      )}

                      <div className="text-center">
                        <p className="text-white/60 text-sm">
                          Secure checkout powered by <span className="text-white font-semibold">Ethereal Touch</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Empty Cart */
            <div className="text-center py-20">
              <div className="bg-gradient-to-br from-[#C2985C] to-[#C2985C]/90 rounded-3xl p-12 shadow-2xl backdrop-blur-sm border border-white/10 max-w-md mx-auto transform transition-all duration-500 hover:scale-105">
                <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <ShoppingBag className="w-12 h-12 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-4">Your Cart is Empty</h2>
                <p className="text-white/80 mb-8">Add some products to get started with your shopping journey.</p>
                <button
                  onClick={() => (window.location.href = "/allproduct")}
                  className="group relative bg-white text-[#C2985C] px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 hover:bg-white/90 hover:shadow-lg transform hover:-translate-y-1 overflow-hidden"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Continue Shopping
                    <Package className="w-5 h-5 transform transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                </button>
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

export default CartPage
"use client"

import { Tab, Tabs, TabList, TabPanel } from "react-tabs"
        import { Link } from "react-router-dom"; // Make sure this is imported at the top

import ProductDetail from "../../components/admin/ProductDetail"
import OrderDetail from "../../components/admin/OrderDetail"
import UserDetail from "../../components/admin/UserDetail"
import { useContext } from "react"
import myContext from "../../context/myContext"
import { useNavigate } from "react-router-dom"
import {
  Package,
  ShoppingBag,
  Users,
  User,
  Mail,
  Calendar,
  Shield,
  ArrowLeft,
  BarChart3,
  TrendingUp,
} from "lucide-react"

const AdminDashboard = () => {
  const user = JSON.parse(localStorage.getItem("users"))
  const context = useContext(myContext)
  const { getAllProduct, getAllOrder, getAllUser } = context
  const navigate = useNavigate()

  const stats = [
    {
      title: "Total Products",
      count: getAllProduct.length,
      icon: Package,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-500/20",
      iconColor: "text-blue-400",
    },
    {
      title: "Total Orders",
      count: getAllOrder.length,
      icon: ShoppingBag,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-500/20",
      iconColor: "text-green-400",
    },
    {
      title: "Total Users",
      count: getAllUser.length,
      icon: Users,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-500/20",
      iconColor: "text-purple-400",
    },
  ]

  return (
    <div className="min-h-screen bg-black py-8 px-4 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-gradient-to-br from-[#C2985C] to-transparent opacity-10 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-gradient-to-tr from-[#C2985C] to-transparent opacity-10 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-gradient-to-r from-[#C2985C] to-transparent opacity-5 animate-spin-slow"></div>
      </div>

      <div className="relative z-10 container mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <button
            onClick={() => navigate("/")}
            className="group flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#C2985C] to-[#C2985C]/80 text-white rounded-2xl font-semibold transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1"
          >
            <ArrowLeft className="w-5 h-5 transform transition-transform duration-300 group-hover:-translate-x-1" />
            Back to Home
          </button>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#C2985C] to-[#C2985C]/80 rounded-full mb-4 shadow-2xl transform transition-all duration-300 hover:scale-110">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white tracking-wide">Admin Dashboard</h1>
          </div>
          <div className="w-32"></div> {/* Spacer for centering */}
        </div>

        {/* Admin Profile Card */}
        <div className="mb-12">
          <div className="bg-gradient-to-br from-[#C2985C] to-[#C2985C]/90 rounded-3xl p-8 shadow-2xl backdrop-blur-sm border border-white/10 transform transition-all duration-500 hover:scale-105">
            <div className="flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 transform transition-all duration-300 hover:scale-110">
                  <User className="w-10 h-10 text-white" />
                </div>
                <div className="grid md:grid-cols-3 gap-6 text-center">
                  <div className="space-y-2">
                    <div className="flex items-center justify-center gap-2 text-white/80">
                      <User className="w-5 h-5" />
                      <span className="font-semibold">Name</span>
                    </div>
                    <p className="text-2xl font-bold text-white">{user?.name || "Admin"}</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-center gap-2 text-white/80">
                      <Mail className="w-5 h-5" />
                      <span className="font-semibold">Email</span>
                    </div>
                    <p className="text-xl font-bold text-white">{user?.email || "admin@example.com"}</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-center gap-2 text-white/80">
                      <Calendar className="w-5 h-5" />
                      <span className="font-semibold">Joined</span>
                    </div>
                    <p className="text-xl font-bold text-white">{user?.date || "Today"}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <Tabs className="space-y-8">
          {/* Stats Cards */}
          <TabList className="grid md:grid-cols-3 gap-6 mb-8">
            {stats.map((stat, index) => (
              <Tab
                key={index}
                className="group cursor-pointer bg-gradient-to-br from-[#C2985C] to-[#C2985C]/90 rounded-3xl p-8 shadow-2xl backdrop-blur-sm border border-white/10 transform transition-all duration-500 hover:scale-105 hover:shadow-3xl focus:outline-none"
              >
                <div className="text-center space-y-4">
                  <div
                    className={`inline-flex items-center justify-center w-16 h-16 ${stat.bgColor} rounded-2xl transform transition-all duration-300 group-hover:scale-110`}
                  >
                    <stat.icon className={`w-8 h-8 ${stat.iconColor}`} />
                  </div>
                  <div>
                    <h3 className="text-4xl font-bold text-white mb-2 transform transition-all duration-300 group-hover:scale-110">
                      {stat.count}
                    </h3>
                    <p className="text-white/80 font-semibold text-lg">{stat.title}</p>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-green-400">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-sm font-medium">Active</span>
                  </div>
                </div>
              </Tab>
            ))}
          </TabList>

          {/* Tab Panels */}
          <div className="bg-gradient-to-br from-[#C2985C] to-[#C2985C]/90 rounded-3xl shadow-2xl backdrop-blur-sm border border-white/10 overflow-hidden">
            <TabPanel>
              <div className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Package className="w-8 h-8 text-white" />
                  <h2 className="text-3xl font-bold text-white">Product Management</h2>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                  <ProductDetail />
                </div>
              </div>
            </TabPanel>

            <TabPanel>
              <div className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <ShoppingBag className="w-8 h-8 text-white" />
                  <h2 className="text-3xl font-bold text-white">Order Management</h2>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                  <OrderDetail />
                </div>
              </div>
            </TabPanel>

            <TabPanel>
              <div className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Users className="w-8 h-8 text-white" />
                  <h2 className="text-3xl font-bold text-white">User Management</h2>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                  <UserDetail />
                </div>
              </div>
            </TabPanel>
          </div>
        </Tabs>

        {/* Quick Actions */}



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
        
        /* Custom tab styles */
        .react-tabs__tab--selected {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1));
          transform: scale(1.05);
          box-shadow: 0 20px 40px -12px rgba(194, 152, 92, 0.3);
        }
        
        .react-tabs__tab-list {
          border: none;
          margin: 0;
        }
        
        .react-tabs__tab {
          border: none;
          background: none;
        }
      `}</style>
    </div>
  )
}

export default AdminDashboard

import { useContext } from "react";
import Layout from "../../components/layout/Layout";
import myContext from "../../context/myContext";
import Loader from "../../components/loader/Loader";

const UserDashboard = () => {
  const user = JSON.parse(localStorage.getItem("users"));
  const context = useContext(myContext);
  const { loading, getAllOrder } = context;

  // Improved date formatting function
  const formatOrderDate = (dateValue) => {
    if (!dateValue) return "N/A";
    
    try {
      let date;
      
      // Handle different date formats
      if (dateValue instanceof Date) {
        date = dateValue;
      } else if (typeof dateValue === 'string') {
        // Handle string dates
        date = new Date(dateValue);
      } else if (typeof dateValue === 'number') {
        // Handle timestamp (milliseconds)
        date = new Date(dateValue);
      } else if (dateValue.seconds) {
        // Handle Firestore timestamp
        date = new Date(dateValue.seconds * 1000);
      } else if (dateValue.toDate && typeof dateValue.toDate === 'function') {
        // Handle Firestore timestamp with toDate method
        date = dateValue.toDate();
      } else {
        // Try to convert whatever it is to a date
        date = new Date(dateValue);
      }

      // Check if the date is valid
      if (isNaN(date.getTime())) {
        console.error("Invalid date:", dateValue);
        return "Invalid Date";
      }

      // Format the date
      return date.toLocaleString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (error) {
      console.error("Date formatting error:", error, "Original value:", dateValue);
      return "Date Error";
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-5 lg:py-8 bg-black text-white">
        {/* Top */}
        <div className="top">
          <div className="py-7 rounded-xl border border-white bg-black">
            <div className="">
              <h1 className="text-center text-[#C2985C] text-[30px] font-bold font-serif">
                <span className="font-bold">Name : </span>
                {user?.name}
              </h1>
              <h1 className="text-center text-[#C2985C] text-lg font-serif font-bold hover:text-[#C2985C]">
                <span className="font-bold">Email : </span>
                {user?.email}
              </h1>
            </div>
          </div>
        </div>

        {/* bottom */}
        <div className="bottom">
          <div className="mx-auto my-4 max-w-6xl px-2 md:my-6 md:px-0">
            <span className="text-2xl font-serif lg:text-3xl font-bold text-[#C2985C] hover:text-[#C2985C]">
              Your Order Details
            </span>
            <div className="flex justify-center relative top-10">
              {loading && <Loader />}
            </div>
            {getAllOrder
              .filter((obj) => obj.userid === user?.uid)
              .map((order, index) => {
                // Try multiple date fields that might exist
                const orderDate = order?.time || order?.date || order?.createdAt || order?.timestamp;
                const orderTimeFormatted = formatOrderDate(orderDate);

                return (
                  <div key={index}>
                    {order.cartItems.map((item, i) => {
                      const {
                        id,
                        quantity,
                        price,
                        title,
                        productImageUrl,
                        category,
                      } = item;
                      const { status } = order;

                      return (
                        <div
                          key={i}
                          className="mt-5 flex flex-col overflow-hidden rounded-xl md:flex-row border border-white"
                        >
                          {/* Left */}
                          <div className="w-full border-r border-white bg-black md:max-w-xs">
                            <div className="p-8">
                              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-1">
                                <div className="mb-4">
                                  <div className="text-sm font-semibold text-white">
                                    Order Id
                                  </div>
                                  <div className="text-sm font-medium text-[#C2985C]">
                                    #{id || order.id || 'N/A'}
                                  </div>
                                </div>
                                <div className="mb-4">
                                  <div className="text-sm font-semibold text-white">
                                    Date
                                  </div>
                                  <div className="text-sm font-medium text-[#C2985C]">
                                    {orderTimeFormatted}
                                  </div>
                                </div>
                                <div className="mb-4">
                                  <div className="text-sm font-semibold text-white">
                                    Total Amount
                                  </div>
                                  <div className="text-sm font-medium text-[#C2985C]">
                                    pkr {Number(price || 0) * Number(quantity || 0)}
                                  </div>
                                </div>
                                <div className="mb-4">
                                  <div className="text-sm font-semibold text-white">
                                    Order Status
                                  </div>
                                  {status === "pending" ? (
                                    <div className="text-sm font-medium text-red-500 first-letter:uppercase">
                                      {status}
                                    </div>
                                  ) : (
                                    <div className="text-sm font-medium text-green-500 first-letter:uppercase">
                                      {status}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Right */}
                          <div className="flex-1 bg-black">
                            <div className="p-8">
                              <ul className="-my-7 divide-y divide-white">
                                <li className="flex flex-col justify-between py-7 md:flex-row md:space-x-5">
                                  <div className="flex flex-1 flex-col items-center md:items-stretch md:flex-row">
                                    <div className="flex-shrink-0">
                                      <img
                                        className="h-32 w-32 rounded-lg border border-white object-contain sm:h-40 sm:w-40"
                                        src={productImageUrl || "/placeholder.svg?height=160&width=160"}
                                        alt="product"
                                        onError={(e) => {
                                          e.target.src = "/placeholder.svg?height=160&width=160";
                                        }}
                                      />
                                    </div>
                                    <div className="mt-4 text-center md:ml-5 md:mt-0 md:text-left flex flex-col justify-between">
                                      <div className="flex-1">
                                        <p className="text-xl font-bold text-[#C2985C]">
                                          {title}
                                        </p>
                                        <p className="mt-1.5 text-sm font-medium text-white">
                                          {category}
                                        </p>
                                      </div>
                                      <p className="mt-4 text-sm font-medium text-white">
                                        X {quantity}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="mt-4 flex flex-col items-center md:ml-auto md:mt-0 md:items-end">
                                    <p className="text-right text-xl font-bold text-[#C2985C]">
                                      pkr {price}
                                    </p>
                                  </div>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserDashboard;

import { useEffect, useState , useRef } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc, updateDoc, arrayRemove } from "firebase/firestore";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

type CartItem = {
  sub_title: string;
  brands: string;
  sub_category: string;
  price: string;
  img: string;
  id?: string;
  quantity: number;
  addedAt: any;
};

type Order = {
  id: string;
  items: any[];
  total: string;
  customerInfo: {
    name: string;
    mobile: string;
    email: string;
    address: string;
    pincode: string;
    city: string;
    state: string;
  };
  paymentMethod: string;
  orderDate: Date;
  status: string;
  estimatedDelivery: Date;
};

function Dashboard() {
  const [petProfile, setPetProfile] = useState<any>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState<any>({});
  const [activeTab, setActiveTab] = useState<"profile" | "cart" | "orders">(
    "profile"
  );
  const [updatingCart, setUpdatingCart] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const navigate = useNavigate();
  const uid = auth.currentUser?.uid;
    const cardRef = useRef(null);
  const detailRefs = useRef([]);

  useEffect(() => {
    if (activeTab === "profile" && cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
      );

      gsap.fromTo(
        detailRefs.current,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          delay: 0.2,
          duration: 0.4,
          ease: "power2.out",
        }
      );
    }
  }, [activeTab]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const uid = user.uid;
        try {
          const userDoc = await getDoc(doc(db, "users", uid));
          if (userDoc.exists()) {
            const data = userDoc.data();
            setPetProfile(data.petProfile || null);
            setCartItems(data.cart || []);
            setOrders(data.orders || []);
          }
        } catch (err) {
          console.error("Error fetching user data:", err);
          toast.error("Failed to load user data");
        } finally {
          setLoading(false);
        }
      } else {
        navigate("/login"); // Redirect to login if not authenticated
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await auth.signOut();
    navigate("/login");
  };

  const handleEdit = () => {
    setFormData(petProfile); // prefill form
    setEditing(true);
  };

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleUpdate = async (e: any) => {
    e.preventDefault();
    if (!uid) return;

    const updatePromise = updateDoc(doc(db, "users", uid), {
      petProfile: formData,
    });

    toast.promise(updatePromise, {
      loading: "Updating pet profile...",
      success: "Pet profile updated successfully!",
      error: "Failed to update pet profile",
    });

    try {
      await updatePromise;
      setPetProfile(formData);
      setEditing(false);
    } catch (err) {
      console.error("Error updating pet profile:", err);
    }
  };

  const handleQuantityChange = async (itemId: string, newQuantity: number) => {
    if (!auth.currentUser || newQuantity < 1) return;

    setUpdatingCart(true);
    try {
      const uid = auth.currentUser.uid;
      const updatedItems = cartItems.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      );

      await updateDoc(doc(db, "users", uid), {
        cart: updatedItems,
      });

      setCartItems(updatedItems);
      toast.success("Quantity updated successfully");
    } catch (error) {
      console.error("Error updating quantity:", error);
      toast.error("Failed to update quantity");
    } finally {
      setUpdatingCart(false);
    }
  };

  const handleRemoveFromCart = async (item: CartItem) => {
    if (!auth.currentUser) return;

    // Show confirmation toast
    toast(
      (t) => (
        <div className="flex flex-col gap-2">
          <div className="font-medium">Remove item from cart?</div>
          <div className="text-sm text-gray-600">{item.sub_title}</div>
          <div className="flex gap-2">
            <button
              onClick={async () => {
                toast.dismiss(t.id);
                setUpdatingCart(true);
                try {
                  const uid = auth.currentUser!.uid;
                  await updateDoc(doc(db, "users", uid), {
                    cart: arrayRemove(item),
                  });

                  setCartItems((prev) =>
                    prev.filter((cartItem) => cartItem.id !== item.id)
                  );
                  setSelectedItems((prev) =>
                    prev.filter((id) => id !== item.id)
                  );
                  toast.success("Item removed from cart!");
                } catch (error) {
                  console.error("Error removing item:", error);
                  toast.error("Failed to remove item");
                } finally {
                  setUpdatingCart(false);
                }
              }}
              className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
            >
              Remove
            </button>
            <button
              onClick={() => toast.dismiss(t.id)}
              className="bg-gray-300 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      {
        duration: 10000,
        position: "top-center",
      }
    );
  };

  const handleSelectItem = (itemId: string) => {
    setSelectedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleSelectAll = () => {
    if (selectedItems.length === cartItems.length) {
      setSelectedItems([]);
      toast.success("All items deselected");
    } else {
      setSelectedItems(cartItems.map((item) => item.id || ""));
      toast.success("All items selected");
    }
  };

  const getTotalPrice = () => {
    return cartItems
      .filter((item) => selectedItems.includes(item.id || ""))
      .reduce((total, item) => {
        const price = parseFloat(item.price.replace(/[^0-9.]/g, ""));
        return total + price * item.quantity;
      }, 0)
      .toFixed(2);
  };

  const handleBuySelected = () => {
    if (selectedItems.length === 0) {
      toast.error("Please select items to purchase");
      return;
    }

    const selectedCartItems = cartItems.filter((item) =>
      selectedItems.includes(item.id || "")
    );

    // Navigate to checkout page with selected items
    navigate("/checkout", {
      state: {
        items: selectedCartItems,
        total: getTotalPrice(),
      },
    });

    toast.success(`Proceeding to checkout with ${selectedItems.length} items`);
  };

  const handleClearCart = async () => {
    if (!auth.currentUser || cartItems.length === 0) return;

    // Show confirmation toast
    toast(
      (t) => (
        <div className="flex flex-col gap-2">
          <div className="font-medium text-red-600">Clear entire cart?</div>
          <div className="text-sm text-gray-600">
            This action cannot be undone
          </div>
          <div className="flex gap-2">
            <button
              onClick={async () => {
                toast.dismiss(t.id);
                setUpdatingCart(true);
                try {
                  const uid = auth.currentUser!.uid;
                  await updateDoc(doc(db, "users", uid), {
                    cart: [],
                  });

                  setCartItems([]);
                  setSelectedItems([]);
                  toast.success("Cart cleared successfully!");
                } catch (error) {
                  console.error("Error clearing cart:", error);
                  toast.error("Failed to clear cart");
                } finally {
                  setUpdatingCart(false);
                }
              }}
              className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
            >
              Clear Cart
            </button>
            <button
              onClick={() => toast.dismiss(t.id)}
              className="bg-gray-300 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      {
        duration: 10000,
        position: "top-center",
      }
    );
  };

  const formatDate = (date: any) => {
    try {
      const parsedDate = new Date(date);

      if (
        Object.prototype.toString.call(parsedDate) !== "[object Date]" ||
        isNaN(parsedDate.getTime())
      ) {
        return "Invalid Date";
      }

      return parsedDate.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    } catch (error) {
      console.error("Date formatting failed for:", date);
      return "Invalid Date";
    }
  };

  const getPaymentMethodName = (method: string) => {
    const methods: { [key: string]: string } = {
      gpay: "Google Pay",
      phonepe: "PhonePe",
      paytm: "Paytm",
      upi: "UPI",
      cod: "Cash on Delivery",
    };
    return methods[method] || method;
  };

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      pending: "bg-yellow-100 text-yellow-800",
      confirmed: "bg-green-100 text-green-800",
      shipped: "bg-blue-100 text-blue-800",
      delivered: "bg-purple-100 text-purple-800",
      cancelled: "bg-red-100 text-red-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  const handleViewOrderDetails = (order: Order) => {
    setSelectedOrder(order);
  };
  const handleCloseOrderDetails = () => {
    setSelectedOrder(null);
  };

  const handleDeleteOrder = async (orderId: string) => {
    if (!auth.currentUser) return;

    // Show confirmation toast
    toast(
      (t) => (
        <div className="flex flex-col gap-2">
          <div className="font-medium text-red-600">Delete this order?</div>
          <div className="text-sm text-gray-600">
            This action cannot be undone
          </div>
          <div className="flex gap-2">
            <button
              onClick={async () => {
                toast.dismiss(t.id);
                setUpdatingCart(true); // You can rename this to setUpdating if you want
                try {
                  const uid = auth.currentUser!.uid;
                  const updatedOrders = orders.filter(
                    (order) => order.id !== orderId
                  );

                  await updateDoc(doc(db, "users", uid), {
                    orders: updatedOrders,
                  });

                  setOrders(updatedOrders);

                  // Close order details modal if it's the same order being deleted
                  if (selectedOrder && selectedOrder.id === orderId) {
                    setSelectedOrder(null);
                  }

                  toast.success("Order deleted successfully!");
                } catch (error) {
                  console.error("Error deleting order:", error);
                  toast.error("Failed to delete order");
                } finally {
                  setUpdatingCart(false);
                }
              }}
              className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
            >
              Delete
            </button>
            <button
              onClick={() => toast.dismiss(t.id)}
              className="bg-gray-300 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      {
        duration: 10000,
        position: "top-center",
      }
    );
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen items-center">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500 mx-auto"></div>
            <p className="mt-4 text-lg">Loading...</p>
          </div>
        </div>
        <Footer />
        <Toaster position="top-center" reverseOrder={false} />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen items-center">
      <Header />

      <div className="flex-1 container mx-auto py-4 px-4 sm:py-8">
        {/* Tab Navigation */}
        <div className="flex justify-center mb-6 sm:mb-8">
          <div className="bg-gray-100 p-1 rounded-xl flex w-full max-w-2xl">
            <button
              onClick={() => setActiveTab("profile")}
              className={`flex-1 px-3 py-2 sm:px-6 sm:py-3 rounded-lg font-semibold transition-colors text-sm sm:text-base ${
                activeTab === "profile"
                  ? "bg-orange-500 text-white"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              Pet Profile
            </button>
            <button
              onClick={() => setActiveTab("cart")}
              className={`flex-1 px-3 py-2 sm:px-6 sm:py-3 rounded-lg font-semibold transition-colors relative text-sm sm:text-base ${
                activeTab === "cart"
                  ? "bg-orange-500 text-white"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              My Cart
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab("orders")}
              className={`flex-1 px-3 py-2 sm:px-6 sm:py-3 rounded-lg font-semibold transition-colors relative text-sm sm:text-base ${
                activeTab === "orders"
                  ? "bg-orange-500 text-white"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              My Orders
              {orders.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {orders.length}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Pet Profile Tab */}
        {
        activeTab === "profile" && (
          <div className="flex flex-col items-center">
            <div className="flex-grow w-full max-w-2xl mx-auto p-4 sm:p-6 border rounded-lg shadow">
              <h2 className="text-xl sm:text-2xl font-bold mb-4">
                🐾 Pet Profile
              </h2>
              {!petProfile ? (
                <p className="text-center mt-10">No pet profile found.</p>
              ) : (
                <div className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <p className="break-words">
                      <strong>Owner Name:</strong> {petProfile.ownerName}
                    </p>
                    <p className="break-words">
                      <strong>Pet Name:</strong> {petProfile.petName}
                    </p>
                    <p className="break-words">
                      <strong>Breed:</strong> {petProfile.petBreed}
                    </p>
                    <p className="break-words">
                      <strong>Age:</strong> {petProfile.petAge}
                    </p>
                    <p className="break-words">
                      <strong>Vaccinated:</strong>{" "}
                      {petProfile.vaccinated ? "Yes" : "No"}
                    </p>
                    <p className="break-words">
                      <strong>Type:</strong> {petProfile.petType}
                    </p>
                    <p className="break-words">
                      <strong>Weight:</strong> {petProfile.petWeight} kg
                    </p>
                    <p className="break-words">
                      <strong>Color:</strong> {petProfile.petColor}
                    </p>
                  </div>
                  <p className="break-words col-span-full">
                    <strong>Allergies:</strong> {petProfile.allergies}
                  </p>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-4 mt-6">
                <button
                  onClick={handleEdit}
                  className="px-4 sm:px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Edit Profile
                </button>

                <button
                  onClick={handleLogout}
                  className="px-4 sm:px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
       
       )}

        {/* Cart Tab */}
        {activeTab === "cart" && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-8">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
                  My Cart
                </h2>
                {cartItems.length > 0 && (
                  <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                    <button
                      onClick={handleSelectAll}
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-600 transition-colors text-sm sm:text-base"
                    >
                      {selectedItems.length === cartItems.length
                        ? "Deselect All"
                        : "Select All"}
                    </button>
                    <button
                      onClick={handleClearCart}
                      disabled={updatingCart}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition-colors disabled:opacity-50 text-sm sm:text-base"
                    >
                      Clear Cart
                    </button>
                  </div>
                )}
              </div>

              {cartItems.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-4xl sm:text-6xl mb-4">🛒</div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-600 mb-2">
                    Your cart is empty
                  </h3>
                  <p className="text-gray-500 mb-6 text-sm sm:text-base">
                    Add some products to get started!
                  </p>
                  <button
                    onClick={() => navigate("/products")}
                    className="bg-orange-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-orange-600 transition-colors"
                  >
                    Browse Products
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {cartItems.map((item, index) => (
                    <div
                      key={item.id || index}
                      className="border rounded-xl p-3 sm:p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                        {/* Checkbox and Image */}
                        <div className="flex items-center gap-4 w-full sm:w-auto">
                          <input
                            type="checkbox"
                            checked={selectedItems.includes(item.id || "")}
                            onChange={() => handleSelectItem(item.id || "")}
                            className="w-5 h-5 text-orange-500 rounded focus:ring-orange-500"
                          />
                          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden">
                            <img
                              src={item.img}
                              alt={item.sub_title}
                              className="w-full h-full object-contain"
                            />
                          </div>
                        </div>

                        {/* Product Details */}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-base sm:text-lg text-gray-800 truncate">
                            {item.sub_title}
                          </h3>
                          <p className="text-gray-600 text-sm sm:text-base">
                            Brand: {item.brands}
                          </p>
                          <p className="text-gray-600 text-sm sm:text-base">
                            Category: {item.sub_category}
                          </p>
                          <p className="text-green-600 font-bold text-base sm:text-lg">
                            {item.price}
                          </p>
                        </div>

                        {/* Quantity and Remove Controls */}
                        <div className="flex items-center justify-between w-full sm:w-auto gap-4">
                          {/* Quantity Controls */}
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() =>
                                handleQuantityChange(
                                  item.id || "",
                                  item.quantity - 1
                                )
                              }
                              disabled={updatingCart || item.quantity <= 1}
                              className="bg-gray-200 hover:bg-gray-300 disabled:opacity-50 rounded-full w-8 h-8 flex items-center justify-center transition-colors"
                            >
                              -
                            </button>
                            <span className="font-semibold text-lg w-8 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                handleQuantityChange(
                                  item.id || "",
                                  item.quantity + 1
                                )
                              }
                              disabled={updatingCart}
                              className="bg-gray-200 hover:bg-gray-300 disabled:opacity-50 rounded-full w-8 h-8 flex items-center justify-center transition-colors"
                            >
                              +
                            </button>
                          </div>

                          {/* Remove Button */}
                          <button
                            onClick={() => handleRemoveFromCart(item)}
                            disabled={updatingCart}
                            className="text-red-500 hover:text-red-700 disabled:opacity-50 p-2 transition-colors"
                          >
                            <svg
                              className="w-5 h-5 sm:w-6 sm:h-6"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Cart Summary */}
                  {selectedItems.length > 0 && (
                    <div className="border-t pt-6 mt-6">
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
                        <span className="text-lg sm:text-xl font-semibold">
                          Total ({selectedItems.length} items):
                        </span>
                        <span className="text-xl sm:text-2xl font-bold text-green-600">
                          ₹{getTotalPrice()}
                        </span>
                      </div>
                      <button
                        onClick={handleBuySelected}
                        className="w-full bg-green-500 text-white py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg hover:bg-green-600 transition-colors"
                      >
                        Proceed to Checkout ({selectedItems.length} items)
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === "orders" && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">
                My Orders
              </h2>

              {orders.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-4xl sm:text-6xl mb-4">📦</div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-600 mb-2">
                    No orders yet
                  </h3>
                  <p className="text-gray-500 mb-6 text-sm sm:text-base">
                    Start shopping to see your orders here!
                  </p>
                  <button
                    onClick={() => navigate("/products")}
                    className="bg-orange-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-orange-600 transition-colors"
                  >
                    Browse Products
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div
                      key={order.id}
                      className="border rounded-xl p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-2">
                            <h3 className="font-semibold text-lg">
                              Order #{order.id}
                            </h3>
                            <span
                              className={`px-3 py-1 rounded-full text-sm font-semibold w-fit ${getStatusColor(
                                order.status
                              )}`}
                            >
                              {order.status.charAt(0).toUpperCase() +
                                order.status.slice(1)}
                            </span>
                          </div>
                          <div className="text-sm text-gray-600 space-y-1">
                            <p>Placed on: {formatDate(order.orderDate)}</p>
                            <p>Items: {order.items.length}</p>
                            <p>
                              Payment:{" "}
                              {getPaymentMethodName(order.paymentMethod)}
                            </p>
                            <p className="font-semibold text-green-600 text-base">
                              Total: ₹{order.total}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                          <button
                            onClick={() => handleViewOrderDetails(order)}
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
                          >
                            View Details
                          </button>

                          <button
                            onClick={() => handleDeleteOrder(order.id)}
                            disabled={updatingCart}
                            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 text-sm"
                          >
                            Delete Order
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <Footer />

      {/* Pet Profile Edit Modal */}
      {editing && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-4 sm:p-6 rounded-lg max-w-md w-full shadow-xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg sm:text-xl font-semibold mb-4">
              Edit Pet Profile
            </h3>
            <form onSubmit={handleUpdate} className="space-y-3">
              <input
                name="ownerName"
                value={formData.ownerName || ""}
                onChange={handleChange}
                placeholder="Owner Name"
                className="w-full p-2 sm:p-3 border rounded text-sm sm:text-base"
              />
              <input
                name="petName"
                value={formData.petName || ""}
                onChange={handleChange}
                placeholder="Pet Name"
                className="w-full p-2 sm:p-3 border rounded text-sm sm:text-base"
              />
              <input
                name="petBreed"
                value={formData.petBreed || ""}
                onChange={handleChange}
                placeholder="Pet Breed"
                className="w-full p-2 sm:p-3 border rounded text-sm sm:text-base"
              />
              <input
                name="petAge"
                value={formData.petAge || ""}
                onChange={handleChange}
                placeholder="Age"
                type="number"
                className="w-full p-2 sm:p-3 border rounded text-sm sm:text-base"
              />
              <input
                name="petWeight"
                value={formData.petWeight || ""}
                onChange={handleChange}
                placeholder="Weight (kg)"
                type="number"
                className="w-full p-2 sm:p-3 border rounded text-sm sm:text-base"
              />
              <input
                name="petColor"
                value={formData.petColor || ""}
                onChange={handleChange}
                placeholder="Color"
                className="w-full p-2 sm:p-3 border rounded text-sm sm:text-base"
              />
              <input
                name="allergies"
                value={formData.allergies || ""}
                onChange={handleChange}
                placeholder="Allergies"
                className="w-full p-2 sm:p-3 border rounded text-sm sm:text-base"
              />
              <input
                name="petType"
                value={formData.petType || ""}
                onChange={handleChange}
                placeholder="Pet Type"
                className="w-full p-2 sm:p-3 border rounded text-sm sm:text-base"
              />
              <label className="flex items-center gap-2 text-sm sm:text-base">
                <input
                  type="checkbox"
                  name="vaccinated"
                  checked={formData.vaccinated || false}
                  onChange={handleChange}
                />
                Vaccinated
              </label>

              <div className="flex flex-col sm:flex-row justify-end gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => setEditing(false)}
                  className="px-4 py-2 bg-gray-200 rounded text-sm sm:text-base"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 text-white rounded text-sm sm:text-base"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Toast Container */}
      <Toaster position="top-center" reverseOrder={false} />

      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-4 sm:p-6 rounded-lg max-w-2xl w-full shadow-xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg sm:text-xl font-semibold">
                Order Details
              </h3>
              <button
                onClick={handleCloseOrderDetails}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              {/* Order Info */}
              <div className="border-b pb-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-semibold">Order ID:</p>
                    <p className="text-gray-600">#{selectedOrder.id}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Status:</p>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                        selectedOrder.status
                      )}`}
                    >
                      {selectedOrder.status.charAt(0).toUpperCase() +
                        selectedOrder.status.slice(1)}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold">Order Date:</p>
                    <p className="text-gray-600">
                      {formatDate(selectedOrder.orderDate)}
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold">Estimated Delivery:</p>
                    <p className="text-gray-600">
                      {formatDate(selectedOrder.estimatedDelivery)}
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold">Payment Method:</p>
                    <p className="text-gray-600">
                      {getPaymentMethodName(selectedOrder.paymentMethod)}
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold">Total Amount:</p>
                    <p className="text-green-600 font-bold text-lg">
                      ₹{selectedOrder.total}
                    </p>
                  </div>
                </div>
              </div>

              {/* Customer Info */}
              <div className="border-b pb-4">
                <h4 className="font-semibold mb-2">Delivery Address</h4>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>
                    <strong>Name:</strong> {selectedOrder.customerInfo.name}
                  </p>
                  <p>
                    <strong>Mobile:</strong> {selectedOrder.customerInfo.mobile}
                  </p>
                  <p>
                    <strong>Email:</strong> {selectedOrder.customerInfo.email}
                  </p>
                  <p>
                    <strong>Address:</strong>{" "}
                    {selectedOrder.customerInfo.address}
                  </p>
                  <p>
                    <strong>City:</strong> {selectedOrder.customerInfo.city},{" "}
                    {selectedOrder.customerInfo.state}
                  </p>
                  <p>
                    <strong>Pincode:</strong>{" "}
                    {selectedOrder.customerInfo.pincode}
                  </p>
                </div>
              </div>

              {/* Order Items */}
              <div>
                <h4 className="font-semibold mb-3">
                  Items ({selectedOrder.items.length})
                </h4>
                <div className="space-y-3">
                  {selectedOrder.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 p-3 border rounded-lg"
                    >
                      <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                        <img
                          src={item.img}
                          alt={item.sub_title}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="flex-1">
                        <h5 className="font-semibold text-sm">
                          {item.sub_title}
                        </h5>
                        <p className="text-xs text-gray-600">
                          Brand: {item.brands}
                        </p>
                        <p className="text-xs text-gray-600">
                          Category: {item.sub_category}
                        </p>
                        <div className="flex justify-between items-center mt-1">
                          <span className="text-green-600 font-bold text-sm">
                            {item.price}
                          </span>
                          <span className="text-gray-600 text-sm">
                            Qty: {item.quantity}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-2 pt-4 border-t">
                <button
                  onClick={handleCloseOrderDetails}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Close
                </button>

                <button
                  onClick={() => handleDeleteOrder(selectedOrder.id)}
                  disabled={updatingCart}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50"
                >
                  Delete Order
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;

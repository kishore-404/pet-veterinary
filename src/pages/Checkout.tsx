import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { doc, updateDoc, arrayUnion, getDoc } from "firebase/firestore";
import Header from "../components/Header";
import Footer from "../components/Footer";
import toast, { Toaster } from 'react-hot-toast';

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
  items: CartItem[];
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
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  estimatedDelivery: Date;
};

function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { items, total } = location.state || { items: [], total: '0' };

  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    mobile: '',
    email: '',
    address: '',
    pincode: '',
    city: '',
    state: ''
  });

  const [paymentMethod, setPaymentMethod] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState<any>({});

  useEffect(() => {
    if (!items || items.length === 0) {
      toast.error("No items to checkout");
      navigate('/dashboard');
      return;
    }

    // Load user profile data if available
    const loadUserData = async () => {
      if (auth.currentUser) {
        try {
          const userDoc = await getDoc(doc(db, "users", auth.currentUser.uid));
          if (userDoc.exists()) {
            const data = userDoc.data();
            const profile = data.petProfile;
            if (profile) {
              setCustomerInfo(prev => ({
                ...prev,
                name: profile.ownerName || '',
                email: auth.currentUser?.email || ''
              }));
            }
          }
        } catch (error) {
          console.error("Error loading user data:", error);
        }
      }
    };

    loadUserData();
  }, [items, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCustomerInfo(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev: any) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: any = {};

    if (!customerInfo.name.trim()) newErrors.name = 'Name is required';
    if (!customerInfo.mobile.trim()) {
      newErrors.mobile = 'Mobile number is required';
    } else if (!/^\d{10}$/.test(customerInfo.mobile.replace(/\s/g, ''))) {
      newErrors.mobile = 'Please enter a valid 10-digit mobile number';
    }
    if (!customerInfo.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(customerInfo.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!customerInfo.address.trim()) newErrors.address = 'Address is required';
    if (!customerInfo.pincode.trim()) {
      newErrors.pincode = 'Pincode is required';
    } else if (!/^\d{6}$/.test(customerInfo.pincode)) {
      newErrors.pincode = 'Please enter a valid 6-digit pincode';
    }
    if (!customerInfo.city.trim()) newErrors.city = 'City is required';
    if (!customerInfo.state.trim()) newErrors.state = 'State is required';
    if (!paymentMethod) newErrors.paymentMethod = 'Please select a payment method';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const generateOrderId = () => {
    return 'ORD' + Date.now() + Math.random().toString(36).substr(2, 5).toUpperCase();
  };

  const handlePlaceOrder = async () => {
    if (!validateForm()) {
      toast.error("Please fill in all required fields correctly");
      return;
    }

    if (!auth.currentUser) {
      toast.error("Please login to place order");
      navigate('/login');
      return;
    }

    setIsProcessing(true);

    try {
      const orderId = generateOrderId();
      const orderDate = new Date();
      const estimatedDelivery = new Date();
      estimatedDelivery.setDate(orderDate.getDate() + 7); // 7 days from now

      const order: Order = {
        id: orderId,
        items: items,
        total: total,
        customerInfo: customerInfo,
        paymentMethod: paymentMethod,
        orderDate: orderDate,
        status: paymentMethod === 'cod' ? 'confirmed' : 'pending',
        estimatedDelivery: estimatedDelivery
      };

      // Simulate payment processing
      if (paymentMethod !== 'cod') {
        // Simulate online payment processing
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        // Simulate payment success (90% success rate)
        if (Math.random() > 0.1) {
          order.status = 'confirmed';
          toast.success(`Payment successful via ${paymentMethod.toUpperCase()}!`);
        } else {
          toast.error("Payment failed. Please try again.");
          setIsProcessing(false);
          return;
        }
      }

      // Add order to user's orders
      const uid = auth.currentUser.uid;
      await updateDoc(doc(db, "users", uid), {
        orders: arrayUnion(order)
      });

      // Remove purchased items from cart
      const userDoc = await getDoc(doc(db, "users", uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        const currentCart = userData.cart || [];
        const purchasedItemIds = items.map((item: CartItem) => item.id);
        const updatedCart = currentCart.filter((cartItem: CartItem) => 
          !purchasedItemIds.includes(cartItem.id)
        );

        await updateDoc(doc(db, "users", uid), {
          cart: updatedCart
        });
      }

      toast.success("Order placed successfully!");
      
      // Navigate to order confirmation
      navigate('/order-confirmation', { 
        state: { 
          order: order,
          isNewOrder: true 
        } 
      });

    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("Failed to place order. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const paymentOptions = [
    { id: 'gpay', name: 'Google Pay', icon: '📱', color: 'bg-blue-500' },
    { id: 'phonepe', name: 'PhonePe', icon: '💜', color: 'bg-purple-500' },
    { id: 'paytm', name: 'Paytm', icon: '💙', color: 'bg-blue-600' },
    { id: 'upi', name: 'Other UPI', icon: '🔄', color: 'bg-green-500' },
    { id: 'cod', name: 'Cash on Delivery', icon: '💵', color: 'bg-orange-500' }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      
      <div className="flex-1 container mx-auto py-6 px-4 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">Checkout</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Customer Information */}
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Customer Information</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={customerInfo.name}
                      onChange={handleInputChange}
                      className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                        errors.name ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter your full name"
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Mobile Number *
                    </label>
                    <input
                      type="tel"
                      name="mobile"
                      value={customerInfo.mobile}
                      onChange={handleInputChange}
                      className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                        errors.mobile ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter 10-digit mobile number"
                      maxLength={10}
                    />
                    {errors.mobile && <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={customerInfo.email}
                      onChange={handleInputChange}
                      className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                        errors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter your email address"
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Address *
                    </label>
                    <textarea
                      name="address"
                      value={customerInfo.address}
                      onChange={handleInputChange}
                      rows={3}
                      className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                        errors.address ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter your complete address"
                    />
                    {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Pincode *
                      </label>
                      <input
                        type="text"
                        name="pincode"
                        value={customerInfo.pincode}
                        onChange={handleInputChange}
                        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                          errors.pincode ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="123456"
                        maxLength={6}
                      />
                      {errors.pincode && <p className="text-red-500 text-sm mt-1">{errors.pincode}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        City *
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={customerInfo.city}
                        onChange={handleInputChange}
                        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                          errors.city ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="City"
                      />
                      {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        State *
                      </label>
                      <input
                        type="text"
                        name="state"
                        value={customerInfo.state}
                        onChange={handleInputChange}
                        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                          errors.state ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="State"
                      />
                      {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Methods */}
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Payment Method</h2>
                <div className="space-y-3">
                  {paymentOptions.map((option) => (
                    <div
                      key={option.id}
                      className={`border rounded-lg p-4 cursor-pointer transition-all ${
                        paymentMethod === option.id
                          ? 'border-orange-500 bg-orange-50'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                      onClick={() => setPaymentMethod(option.id)}
                    >
                      <div className="flex items-center space-x-3">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value={option.id}
                          checked={paymentMethod === option.id}
                          onChange={() => setPaymentMethod(option.id)}
                          className="text-orange-500 focus:ring-orange-500"
                        />
                        <div className={`w-10 h-10 rounded-lg ${option.color} flex items-center justify-center text-white font-bold`}>
                          {option.icon}
                        </div>
                        <span className="text-lg font-medium">{option.name}</span>
                      </div>
                    </div>
                  ))}
                </div>
                {errors.paymentMethod && <p className="text-red-500 text-sm mt-2">{errors.paymentMethod}</p>}
              </div>
            </div>

            {/* Right Column - Order Summary */}
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Order Summary</h2>
                <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                  {items.map((item: CartItem, index: number) => (
                    <div key={item.id || index} className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center overflow-hidden">
                        <img 
                          src={item.img} 
                          alt={item.sub_title}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-gray-800 truncate">{item.sub_title}</h3>
                        <p className="text-sm text-gray-600">Brand: {item.brands}</p>
                        <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-green-600">{item.price}</p>
                      </div>
                    </div>
                  ))}
                  
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center text-lg font-bold">
                      <span>Total Amount:</span>
                      <span className="text-green-600">₹{total}</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {paymentMethod === 'cod' ? 'Pay on delivery' : 'Pay now online'}
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={handlePlaceOrder}
                disabled={isProcessing}
                className={`w-full py-4 rounded-xl font-semibold text-lg transition-colors ${
                  isProcessing
                    ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                    : 'bg-green-500 text-white hover:bg-green-600'
                }`}
              >
                {isProcessing ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>
                      {paymentMethod === 'cod' ? 'Placing Order...' : 'Processing Payment...'}
                    </span>
                  </div>
                ) : (
                  `Place Order - ₹${total}`
                )}
              </button>

              {paymentMethod === 'cod' && (
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <div className="flex items-start space-x-2">
                    <span className="text-orange-500 text-xl">ℹ️</span>
                    <div>
                      <h4 className="font-semibold text-orange-800">Cash on Delivery</h4>
                      <p className="text-sm text-orange-700">
                        Please keep exact change ready. Our delivery partner will collect ₹{total} upon delivery.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}

export default Checkout;
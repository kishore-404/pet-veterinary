import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../components/Header";



function OrderConfirmation() {
  const location = useLocation();
  const navigate = useNavigate();
  const { order, isNewOrder } = location.state || {};
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (!order) {
      navigate('/dashboard');
      return;
    }

    if (isNewOrder) {
      setShowSuccess(true);
      // Auto redirect after 10 seconds
      const timer = setTimeout(() => {
        navigate('/dashboard');
      }, 10000);

      return () => clearTimeout(timer);
    }
  }, [order, isNewOrder, navigate]);

  if (!order) {
    return null;
  }

  const formatDate = (date: Date | string) => {
    const d = typeof date === 'string' ? new Date(date) : date;
    return d.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const getPaymentMethodName = (method: string) => {
    const methods: { [key: string]: string } = {
      'gpay': 'Google Pay',
      'phonepe': 'PhonePe',
      'paytm': 'Paytm',
      'upi': 'UPI',
      'cod': 'Cash on Delivery'
    };
    return methods[method] || method;
  };

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      'pending': 'bg-yellow-100 text-yellow-800',
      'confirmed': 'bg-green-100 text-green-800',
      'shipped': 'bg-blue-100 text-blue-800',
      'delivered': 'bg-purple-100 text-purple-800',
      'cancelled': 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      
      <div className="flex-1 container mx-auto py-6 px-4 max-w-4xl">
        {/* Success Animation */}
        {showSuccess && (
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-6 text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h1 className="text-3xl font-bold text-green-600 mb-2">Order Placed Successfully!</h1>
            <p className="text-gray-600 mb-4">Thank you for your purchase. Your order has been confirmed.</p>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
              <p className="text-green-800 font-semibold">Order ID: {order.id}</p>
            </div>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Order Details</h2>
              <p className="text-gray-600">Order placed on {formatDate(order.orderDate)}</p>
            </div>
            <div className="mt-4 sm:mt-0">
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(order.status)}`}>
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Order Information */}
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Order Summary</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Order ID:</span>
                    <span className="text-gray-600">{order.id}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Total Amount:</span>
                    <span className="text-green-600 font-bold">₹{order.total}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Payment Method:</span>
                    <span className="text-gray-600">{getPaymentMethodName(order.paymentMethod)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Expected Delivery:</span>
                    <span className="text-gray-600">{formatDate(order.estimatedDelivery)}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Delivery Address</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="font-medium text-gray-800">{order.customerInfo.name}</p>
                  <p className="text-gray-600">{order.customerInfo.mobile}</p>
                  <p className="text-gray-600">{order.customerInfo.email}</p>
                  <div className="mt-2">
                    <p className="text-gray-600">{order.customerInfo.address}</p>
                    <p className="text-gray-600">
                      {order.customerInfo.city}, {order.customerInfo.state} - {order.customerInfo.pincode}
                    </p>
                  </div>
                </div>
              </div>

              {order.paymentMethod === 'cod' && (
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <div className="flex items-start space-x-2">
                    <span className="text-orange-500 text-xl">💵</span>
                    <div>
                      <h4 className="font-semibold text-orange-800">Cash on Delivery</h4>
                      <p className="text-sm text-orange-700">
                        Please keep ₹{order.total} ready for payment upon delivery.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Items List */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Items ({order.items.length})
              </h3>
              <div className="space-y-4">
                {order.items.map((item :any, index :any) => (
                  <div key={item.id || index} className="border rounded-lg p-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                        <img 
                          src={item.img} 
                          alt={item.sub_title}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-800 truncate">{item.sub_title}</h4>
                        <p className="text-sm text-gray-600">Brand: {item.brands}</p>
                        <p className="text-sm text-gray-600">Category: {item.sub_category}</p>
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-sm text-gray-600">Qty: {item.quantity}</span>
                          <span className="font-semibold text-green-600">{item.price}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Tracking */}
          <div className="mt-8 pt-6 border-t">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Order Tracking</h3>
            <div className="flex items-center justify-between">
              <div className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  ['confirmed', 'shipped', 'delivered'].includes(order.status) 
                    ? 'bg-green-500 text-white' 
                    : 'bg-gray-300 text-gray-600'
                }`}>
                  ✓
                </div>
                <span className="text-xs mt-1 text-center">Confirmed</span>
              </div>
              <div className={`flex-1 h-1 mx-2 ${
                ['shipped', 'delivered'].includes(order.status) 
                  ? 'bg-green-500' 
                  : 'bg-gray-300'
              }`}></div>
              <div className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  ['shipped', 'delivered'].includes(order.status) 
                    ? 'bg-green-500 text-white' 
                    : 'bg-gray-300 text-gray-600'
                }`}>
                  🚚
                </div>
                <span className="text-xs mt-1 text-center">Shipped</span>
              </div>
              <div className={`flex-1 h-1 mx-2 ${
                order.status === 'delivered' 
                  ? 'bg-green-500' 
                  : 'bg-gray-300'
              }`}></div>
              <div className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  order.status === 'delivered' 
                    ? 'bg-green-500 text-white' 
                    : 'bg-gray-300 text-gray-600'
                }`}>
                  📦
                </div>
                <span className="text-xs mt-1 text-center">Delivered</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 pt-6 border-t flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/dashboard')}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Back to Dashboard
            </button>
            <button
              onClick={() => window.print()}
              className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
            >
              Print Order
            </button>
        
          </div>
        </div>

        {/* Help Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Need Help?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl mb-2">📞</div>
              <h4 className="font-medium text-gray-800">Call Support</h4>
              <p className="text-sm text-gray-600 mt-1">1800-123-4567</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl mb-2">💬</div>
              <h4 className="font-medium text-gray-800">Live Chat</h4>
              <p className="text-sm text-gray-600 mt-1">Available 24/7</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl mb-2">📧</div>
              <h4 className="font-medium text-gray-800">Email Us</h4>
              <p className="text-sm text-gray-600 mt-1">support@example.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderConfirmation;
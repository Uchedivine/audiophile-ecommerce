"use client";

interface OrderConfirmationProps {
  orderData: {
    orderId: string;
    items: Array<{
      id: string;
      name: string;
      price: number;
      quantity: number;
      image: string;
    }>;
    total: number;
    subtotal: number;
    shipping: number;
    tax: number;
    customerName: string;
    email: string;
  };
  onClose: () => void;
}

export default function OrderConfirmation({ orderData, onClose }: OrderConfirmationProps) {
  const { orderId, items, total, customerName, email } = orderData;
  
  // Show first item and count of others
  const firstItem = items[0];
  const otherItemsCount = items.length - 1;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-6">
      <div className="bg-white rounded-lg p-8 max-w-lg w-full animate-fadeIn">

        {/* Icon */}
        <div className="w-16 h-16 bg-[#D87D4A] rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h2 className="text-2xl font-bold uppercase tracking-wide mb-2 text-center">
          Thank you{customerName ? `, ${customerName.split(' ')[0]}` : ''}!
        </h2>

        <p className="text-gray-600 text-sm mb-2 text-center">
          Your order has been confirmed.
        </p>

        <p className="text-xs text-gray-500 mb-6 text-center">
          Order ID: <span className="font-mono font-semibold">{orderId}</span>
        </p>

        <p className="text-gray-600 text-sm mb-8 text-center">
          A confirmation email has been sent to <strong>{email}</strong>
        </p>

        {/* Order Summary */}
        <div className="bg-gray-100 rounded-lg overflow-hidden mb-6">
          <div className="bg-white p-6 border-b border-gray-200">
            {firstItem && (
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                  {firstItem.image && (
                    <img 
                      src={firstItem.image} 
                      alt={firstItem.name}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm truncate">{firstItem.name}</p>
                  <p className="text-xs text-gray-600">${firstItem.price.toLocaleString()}</p>
                </div>
                <p className="text-sm font-bold text-gray-800">x{firstItem.quantity}</p>
              </div>
            )}
            
            {otherItemsCount > 0 && (
              <div className="mt-4 pt-4 border-t border-gray-200 text-center">
                <p className="text-xs text-gray-500 font-semibold">
                  and {otherItemsCount} other item{otherItemsCount > 1 ? 's' : ''}
                </p>
              </div>
            )}
          </div>

          <div className="bg-black text-white p-6 flex flex-col justify-center">
            <p className="text-xs uppercase text-gray-400 mb-1">Grand Total</p>
            <p className="text-xl font-bold">${total.toFixed(2)}</p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full bg-[#D87D4A] text-white py-3 rounded-md uppercase font-semibold tracking-wide hover:bg-[#FBAF85] transition"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}
// app/components/CartModal.tsx
'use client';

import { useCart } from '@/app/context/CartContext';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartModal({ isOpen, onClose }: CartModalProps) {
  const { cartItems, cartCount, cartTotal, updateQuantity, clearCart } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-start justify-end">
      {/* Backdrop - Click to close */}
      <div 
        className="absolute inset-0" 
        onClick={onClose}
      ></div>

      {/* Cart Modal */}
      <div className="relative bg-white rounded-lg w-full max-w-[377px] m-6 md:m-8 mt-24 md:mt-32 shadow-xl">
        <div className="p-8">
          
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-[18px] font-bold uppercase tracking-[1.3px] text-black">
              Cart ({cartCount})
            </h2>
            {cartItems.length > 0 && (
              <button
                onClick={clearCart}
                className="text-[15px] text-black/50 hover:text-[#D87D4A] underline transition-colors"
              >
                Remove all
              </button>
            )}
          </div>

          {/* Cart Items or Empty State */}
          {cartItems.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-[15px] text-black/50">Your cart is empty</p>
            </div>
          ) : (
            <>
              {/* Cart Items List */}
              <div className="space-y-6 mb-8 max-h-[320px] overflow-y-auto">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-4">
                    {/* Product Image */}
                    <div className="bg-[#F1F1F1] rounded-lg w-[64px] h-[64px] flex items-center justify-center flex-shrink-0">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-[50px] h-[50px] object-contain"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-[15px] font-bold uppercase truncate text-black">
                        {item.name}
                      </h3>
                      <p className="text-[14px] text-black font-bold">
                        $ {item.price.toLocaleString()}
                      </p>
                    </div>

                    {/* Quantity Controls - Light Gray Background */}
                    <div className="bg-[#F1F1F1] flex items-center">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-3 py-2 text-black hover:text-[#D87D4A] font-bold text-[13px] transition-colors"
                      >
                        -
                      </button>
                      <span className="px-3 py-2 font-bold text-[13px] min-w-[20px] text-center text-black">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-3 py-2 text-black hover:text-[#D87D4A] font-bold text-[13px] transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Total */}
              <div className="flex justify-between items-center mb-6">
                <span className="text-[15px] text-black uppercase">Total</span>
                <span className="text-[18px] font-bold text-black">
                  $ {cartTotal.toLocaleString()}
                </span>
              </div>

              {/* Checkout Button */}
              <a href="/checkout">
                <button className="w-full bg-[#D87D4A] hover:bg-[#FBAF85] text-white uppercase text-[13px] font-bold tracking-[1px] py-[15px] transition-colors">
                  Checkout
                </button>
              </a>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
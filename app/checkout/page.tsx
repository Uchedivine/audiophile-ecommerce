'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '../context/CartContext';
import { useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import OrderConfirmation from './OrderConfirmation';

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  zipCode?: string;
  city?: string;
  country?: string;
  eMoneyNumber?: string;
  eMoneyPin?: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { cartItems, cartTotal, subtotal, shipping, tax } = useCart();
  const createOrderMutation = useMutation(api.orders.createOrder);

  const [paymentMethod, setPaymentMethod] = useState<'e-Money' | 'Cash on Delivery'>('e-Money');
  const [showConfirm, setShowConfirm] = useState(false);
  const [orderData, setOrderData] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    zipCode: '',
    city: '',
    country: '',
    eMoneyNumber: '',
    eMoneyPin: '',
  });

  // Validation functions
  const validateEmail = (email: string): string | undefined => {
    if (!email) return 'Email is required';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return 'Please enter a valid email address';
    return undefined;
  };

  const validatePhone = (phone: string): string | undefined => {
    if (!phone) return 'Phone number is required';
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    if (!phoneRegex.test(phone)) return 'Please enter a valid phone number';
    if (phone.replace(/\D/g, '').length < 10) return 'Phone number must be at least 10 digits';
    return undefined;
  };

  const validateName = (name: string): string | undefined => {
    if (!name) return 'Name is required';
    if (name.length < 2) return 'Name must be at least 2 characters';
    return undefined;
  };

  const validateRequired = (value: string, fieldName: string): string | undefined => {
    if (!value || value.trim() === '') return `${fieldName} is required`;
    return undefined;
  };

  const validateZipCode = (zipCode: string): string | undefined => {
    if (!zipCode) return 'ZIP code is required';
    if (zipCode.length < 3) return 'Please enter a valid ZIP code';
    return undefined;
  };

  const validateEMoneyNumber = (value: string): string | undefined => {
    if (paymentMethod === 'e-Money') {
      if (!value) return 'e-Money number is required';
      if (!/^\d+$/.test(value)) return 'e-Money number must contain only digits';
      if (value.length < 9) return 'e-Money number must be at least 9 digits';
    }
    return undefined;
  };

  const validateEMoneyPin = (value: string): string | undefined => {
    if (paymentMethod === 'e-Money') {
      if (!value) return 'e-Money PIN is required';
      if (!/^\d+$/.test(value)) return 'PIN must contain only digits';
      if (value.length !== 4) return 'PIN must be exactly 4 digits';
    }
    return undefined;
  };

  // Validate all fields
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {
      name: validateName(formData.name),
      email: validateEmail(formData.email),
      phone: validatePhone(formData.phone),
      address: validateRequired(formData.address, 'Address'),
      zipCode: validateZipCode(formData.zipCode),
      city: validateRequired(formData.city, 'City'),
      country: validateRequired(formData.country, 'Country'),
    };

    if (paymentMethod === 'e-Money') {
      newErrors.eMoneyNumber = validateEMoneyNumber(formData.eMoneyNumber);
      newErrors.eMoneyPin = validateEMoneyPin(formData.eMoneyPin);
    }

    // Remove undefined errors
    Object.keys(newErrors).forEach(key => {
      if (newErrors[key as keyof FormErrors] === undefined) {
        delete newErrors[key as keyof FormErrors];
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors({
        ...errors,
        [name]: undefined,
      });
    }
  };

  const handleBlur = (field: string) => {
    setTouched({ ...touched, [field]: true });

    // Validate field on blur
    let error: string | undefined;
    switch (field) {
      case 'name':
        error = validateName(formData.name);
        break;
      case 'email':
        error = validateEmail(formData.email);
        break;
      case 'phone':
        error = validatePhone(formData.phone);
        break;
      case 'address':
        error = validateRequired(formData.address, 'Address');
        break;
      case 'zipCode':
        error = validateZipCode(formData.zipCode);
        break;
      case 'city':
        error = validateRequired(formData.city, 'City');
        break;
      case 'country':
        error = validateRequired(formData.country, 'Country');
        break;
      case 'eMoneyNumber':
        error = validateEMoneyNumber(formData.eMoneyNumber);
        break;
      case 'eMoneyPin':
        error = validateEMoneyPin(formData.eMoneyPin);
        break;
    }

    if (error) {
      setErrors({ ...errors, [field]: error });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (cartItems.length === 0) {
      alert('Your cart is empty!');
      return;
    }

    // Mark all fields as touched
    const allTouched = Object.keys(formData).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {} as { [key: string]: boolean });
    setTouched(allTouched);

    // Validate form
    if (!validateForm()) {
      // Scroll to first error
      const firstError = document.querySelector('.border-red-500');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    setIsSubmitting(true);

    try {
      const sessionId = localStorage.getItem('cart_session_id') || '';

      const result = await createOrderMutation({
        sessionId,
        customerName: formData.name,
        email: formData.email.toLowerCase(), // Normalize email
        phone: formData.phone,
        shippingAddress: {
          street: formData.address,
          city: formData.city,
          state: '',
          zipCode: formData.zipCode,
          country: formData.country,
        },
      });

      // Send confirmation email
      const emailResponse = await fetch('/api/send-order-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email.toLowerCase(),
          customerName: formData.name,
          orderId: result.orderId,
          items: cartItems.map(item => ({
            name: item.name,
            price: item.price,
            quantity: item.quantity,
          })),
          subtotal,
          shipping,
          tax,
          total: cartTotal,
          shippingAddress: {
            street: formData.address,
            city: formData.city,
            state: '',
            zipCode: formData.zipCode,
            country: formData.country,
          },
        }),
      });

      const emailResult = await emailResponse.json();
      
      if (!emailResult.success) {
        console.error('Failed to send confirmation email:', emailResult.error);
      }

      setOrderData({
        orderId: result.orderId,
        items: cartItems,
        total: cartTotal,
        subtotal,
        shipping,
        tax,
        customerName: formData.name,
        email: formData.email,
      });

      setShowConfirm(true);

    } catch (error) {
      console.error('Order creation failed:', error);
      alert('Failed to create order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Input field component with error handling
  const InputField = ({ 
    label, 
    name, 
    type = 'text', 
    placeholder, 
    required = true,
    colSpan = false 
  }: { 
    label: string; 
    name: keyof typeof formData; 
    type?: string; 
    placeholder: string; 
    required?: boolean;
    colSpan?: boolean;
  }) => {
    const hasError = touched[name] && errors[name];
    
    return (
      <div className={`flex flex-col gap-1 ${colSpan ? 'md:col-span-2' : ''}`}>
        <div className="flex justify-between items-center">
          <label className="text-xs font-semibold text-gray-800">{label}</label>
          {hasError && (
            <span className="text-xs text-red-500 font-semibold">{errors[name]}</span>
          )}
        </div>
        <input
          type={type}
          name={name}
          value={formData[name]}
          onChange={handleInputChange}
          onBlur={() => handleBlur(name)}
          placeholder={placeholder}
          className={`border rounded-md px-4 py-2 focus:ring-2 focus:outline-none text-gray-900 placeholder-gray-400 bg-white transition-colors ${
            hasError 
              ? 'border-red-500 focus:ring-red-500' 
              : 'border-gray-200 focus:ring-[#D87D4A]'
          }`}
          required={required}
          aria-invalid={hasError ? 'true' : 'false'}
          aria-describedby={hasError ? `${name}-error` : undefined}
        />
      </div>
    );
  };

  // Redirect if cart is empty
  if (cartItems.length === 0 && !showConfirm) {
    return (
      <main className="min-h-screen bg-white text-black">
        <div className="max-w-6xl mx-auto px-6 py-20 text-center">
          <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
          <button
            onClick={() => router.push('/')}
            className="bg-[#D87D4A] text-white px-6 py-3 rounded-md hover:bg-[#FBAF85] transition"
          >
            Continue Shopping
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white text-black">
      {showConfirm && orderData && (
        <OrderConfirmation 
          orderData={orderData}
          onClose={() => {
            setShowConfirm(false);
            router.push('/');
          }} 
        />
      )}

      <div className="max-w-6xl mx-auto px-6 py-20">
        <button
          onClick={() => router.back()}
          className="text-gray-600 hover:text-[#D87D4A] mb-6 transition"
        >
          ← Go Back
        </button>

        <h1 className="text-3xl font-bold tracking-wide uppercase mb-10">Checkout</h1>

        <div className="grid md:grid-cols-[2fr,1fr] gap-8">
          
          <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
            
            {/* Billing */}
            <section className="mb-8">
              <h2 className="text-sm text-[#D87D4A] font-bold uppercase tracking-widest mb-4">
                Billing Details
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <InputField 
                  label="Name" 
                  name="name" 
                  placeholder="Alexei Ward" 
                />
                <InputField 
                  label="Email Address" 
                  name="email" 
                  type="email"
                  placeholder="alexei@mail.com" 
                />
                <InputField 
                  label="Phone Number" 
                  name="phone" 
                  type="tel"
                  placeholder="+1 202-555-0136"
                  colSpan
                />
              </div>
            </section>

            {/* Shipping */}
            <section className="mb-8">
              <h2 className="text-sm text-[#D87D4A] font-bold uppercase tracking-widest mb-4">
                Shipping Info
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <InputField 
                  label="Address" 
                  name="address" 
                  placeholder="1137 Williams Avenue"
                  colSpan
                />
                <InputField 
                  label="ZIP Code" 
                  name="zipCode" 
                  placeholder="10001"
                />
                <InputField 
                  label="City" 
                  name="city" 
                  placeholder="New York"
                />
                <InputField 
                  label="Country" 
                  name="country" 
                  placeholder="United States"
                  colSpan
                />
              </div>
            </section>

            {/* Payment */}
            <section>
              <h2 className="text-sm text-[#D87D4A] font-bold uppercase tracking-widest mb-4">
                Payment Details
              </h2>

              <div className="grid md:grid-cols-2 gap-6 items-start">
                <p className="text-xs font-semibold text-gray-800 mt-2">Payment Method</p>

                <div className="flex flex-col gap-3">
                  <label
                    className={`flex items-center border rounded-md px-4 py-2 cursor-pointer transition-colors ${
                      paymentMethod === 'e-Money' ? 'border-[#D87D4A] bg-[#D87D4A]/5' : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="e-Money"
                      checked={paymentMethod === 'e-Money'}
                      onChange={() => setPaymentMethod('e-Money')}
                      className="mr-3 accent-[#D87D4A]"
                    />
                    e-Money
                  </label>

                  <label
                    className={`flex items-center border rounded-md px-4 py-2 cursor-pointer transition-colors ${
                      paymentMethod === 'Cash on Delivery' ? 'border-[#D87D4A] bg-[#D87D4A]/5' : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="Cash on Delivery"
                      checked={paymentMethod === 'Cash on Delivery'}
                      onChange={() => setPaymentMethod('Cash on Delivery')}
                      className="mr-3 accent-[#D87D4A]"
                    />
                    Cash on Delivery
                  </label>
                </div>

                {paymentMethod === 'e-Money' && (
                  <div className="md:col-span-2 grid md:grid-cols-2 gap-6 mt-6">
                    <InputField 
                      label="e-Money Number" 
                      name="eMoneyNumber" 
                      placeholder="238521993"
                      required={paymentMethod === 'e-Money'}
                    />
                    <InputField 
                      label="e-Money PIN" 
                      name="eMoneyPin" 
                      type="text"
                      placeholder="6891"
                      required={paymentMethod === 'e-Money'}
                    />
                  </div>
                )}

                {paymentMethod === 'Cash on Delivery' && (
                  <div className="md:col-span-2 mt-6 p-4 bg-gray-50 rounded-md border border-gray-200 flex items-start gap-3">
                    <span className="text-2xl">💵</span>
                    <p className="text-sm text-gray-600">
                      The 'Cash on Delivery' option enables you to pay in cash when your order is delivered to your doorstep. Just make sure your address is correct so that your order will not be cancelled.
                    </p>
                  </div>
                )}
              </div>
            </section>
          </form>

          {/* Summary */}
          <aside className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm self-start">
            <h2 className="text-lg font-bold uppercase mb-6">Summary</h2>

            <div className="flex flex-col gap-4 mb-8 max-h-64 overflow-y-auto">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-md border border-gray-200 overflow-hidden flex-shrink-0">
                      {item.image && (
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="font-bold text-sm truncate">{item.name}</p>
                      <p className="text-gray-600 text-xs">${item.price.toLocaleString()}</p>
                    </div>
                  </div>
                  <p className="text-sm font-semibold text-gray-800">x{item.quantity}</p>
                </div>
              ))}
            </div>

            <div className="space-y-2 text-sm mb-6">
              <div className="flex justify-between">
                <span className="uppercase text-gray-600">Total</span>
                <span className="font-bold text-gray-900">${subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span className="uppercase text-gray-600">Shipping</span>
                <span className="font-bold text-gray-900">${shipping.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span className="uppercase text-gray-600">VAT (Included)</span>
                <span className="font-bold text-gray-900">${tax.toFixed(2)}</span>
              </div>

              <div className="flex justify-between pt-4 border-t">
                <span className="uppercase text-gray-600">Grand Total</span>
                <span className="font-bold text-[#D87D4A]">${cartTotal.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full bg-[#D87D4A] text-white py-3 uppercase tracking-widest font-semibold rounded-md hover:bg-[#FBAF85] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Processing...' : 'Continue & Pay'}
            </button>
          </aside>

        </div>
      </div>
    </main>
  );
}
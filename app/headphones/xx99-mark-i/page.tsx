// app/headphones/xx99-mark-i/page.tsx
'use client';

import { useState } from 'react';
import { useCart } from '@/app/context/CartContext';
import CartModal from '@/app/components/CartModal';

export default function XX99MarkIPage() {
  const [quantity, setQuantity] = useState(1);
  const { addToCart, cartCount } = useCart();
  const [showCartModal, setShowCartModal] = useState(false);

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  };

  const handleAddToCart = () => {
    addToCart(
      {
        id: 'xx99-mark-i',
        name: 'XX99 Mark I',
        price: 1750,
        image: '/hd2.png',
        slug: '/headphones/xx99-mark-i',
      },
      quantity
    );

    // Reset quantity after adding
    setQuantity(1);

    // Show cart modal
    setShowCartModal(true);
  };

  return (
    <main>
      {/* HEADER */}
      <header className="bg-[#0E0E0E] border-b border-white/10 relative z-50">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-[165px]">
          <div className="flex items-center justify-between h-24">
            {/* Logo */}
            <a href="/">
              <h1 className="text-white text-[25px] font-bold">
                audiophile
              </h1>
            </a>

            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-[34px] text-white text-[13px] font-bold tracking-[2px] uppercase">
              <a href="/" className="hover:text-[#D87D4A] transition-colors">Home</a>
              <a href="/headphones" className="text-[#D87D4A]">Headphones</a>
              <a href="/speakers" className="hover:text-[#D87D4A] transition-colors">Speakers</a>
              <a href="/earphones" className="hover:text-[#D87D4A] transition-colors">Earphones</a>
            </nav>

            {/* Cart Icon with Badge */}
            <button
              onClick={() => setShowCartModal(true)}
              className="text-white hover:text-[#D87D4A] transition-colors relative"
            >
              <svg width="23" height="20" fill="currentColor">
                <path d="M8.625 15a1.875 1.875 0 1 0 0 3.75 1.875 1.875 0 0 0 0-3.75ZM0 0v1.875h1.875L5.314 9.412l-1.21 2.175A2.25 2.25 0 0 0 5.789 14.25h11.737v-1.875H6.133a.188.188 0 0 1-.187-.187l.03-.132.792-1.462h7.518a1.875 1.875 0 0 0 1.64-1.006l3.398-6a.937.937 0 0 0-.447-1.343.937.937 0 0 0-.398-.094H4.105L3.19 0H0Zm16.578 15a1.875 1.875 0 1 0 0 3.75 1.875 1.875 0 0 0 0-3.75Z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#D87D4A] text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* BACK BUTTON */}
      <section className="bg-white pt-[79px] md:pt-[33px]">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-[165px]">
          <a href="/headphones" className="text-[15px] font-medium text-black hover:text-[#D87D4A] transition-colors">
            Go Back
          </a>
        </div>
      </section>

      {/* PRODUCT DETAIL SECTION */}
      <section className="bg-white pt-[24px] md:pt-[56px] pb-[88px] md:pb-[120px]">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-[165px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-[125px] items-center">
            {/* Product Image */}
            <div className="bg-[#F1F1F1] rounded-lg flex items-center justify-center h-[352px] md:h-[560px]">
              <img
                src="/hd2.png"
                alt="XX99 Mark I Headphones"
                className="w-[200px] md:w-[350px] h-auto object-contain"
              />
            </div>

            {/* Product Info */}
            <div>
              <h1 className="text-[28px] md:text-[40px] font-bold uppercase leading-[1.1] tracking-[1.5px] mb-6 text-black">
                XX99 Mark I<br />Headphones
              </h1>
              <p className="text-black text-[15px] font-medium leading-[25px] mb-8">
                As the gold standard for headphones, the classic XX99 Mark I
                offers detailed and accurate audio reproduction for
                audiophiles, mixing engineers, and music aficionados alike in
                studios and on the go.
              </p>

              {/* Price */}
              <p className="text-[18px] font-bold tracking-[1.3px] mb-[31px] text-black">
                $ 1,750
              </p>

              {/* Quantity and Add to Cart */}
              <div className="flex items-center gap-4">
                <div className="bg-[#F1F1F1] flex items-center">
                  <button
                    onClick={decrementQuantity}
                    className="px-4 py-[15px] text-black hover:text-[#D87D4A] font-bold text-[13px] transition-colors"
                  >
                    -
                  </button>
                  <span className="px-5 py-[15px] font-bold text-[13px] text-black">{quantity}</span>
                  <button
                    onClick={incrementQuantity}
                    className="px-4 py-[15px] text-black hover:text-[#D87D4A] font-bold text-[13px] transition-colors"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={handleAddToCart}
                  className="bg-[#D87D4A] hover:bg-[#FBAF85] text-white uppercase text-[13px] font-bold tracking-[1px] px-[31px] py-[15px] transition-colors"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES & IN THE BOX SECTION */}
      <section className="bg-white pb-[88px] md:pb-[120px]">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-[165px]">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-[125px]">
            {/* Features - Takes 2 columns */}
            <div className="lg:col-span-2">
              <h2 className="text-[24px] md:text-[32px] font-bold uppercase tracking-[1px] mb-6 md:mb-8 text-black">
                Features
              </h2>
              <div className="text-black text-[15px] font-medium leading-[25px] space-y-6">
                <p>
                  As the headphones all others are measured against, the XX99
                  Mark I demonstrates over five decades of audio expertise,
                  redefining the critical listening experience. These
                  headphones are built with authentic alcantara and
                  aluminium, distinctive materials that deliver
                  uncompromising listening sessions.
                </p>
                <p>
                  With these headphones, you will enjoy superior comfort with
                  a padded headband and soft protein leather ear pads. These
                  adjustable fit cups, designed to fit all head sizes,
                  combined with over-ear design for more comfort during long
                  listening sessions. The XX99 Mark I will deliver a truly
                  authentic listening experience.
                </p>
              </div>
            </div>

            {/* In The Box - Takes 1 column */}
            <div>
              <h2 className="text-[24px] md:text-[32px] font-bold uppercase tracking-[1px] mb-6 md:mb-8 text-black">
                In the Box
              </h2>
              <ul className="space-y-2">
                <li className="flex items-start gap-6">
                  <span className="text-[#D87D4A] font-bold text-[15px] min-w-[20px]">1x</span>
                  <span className="text-black text-[15px] font-medium">Headphone Unit</span>
                </li>
                <li className="flex items-start gap-6">
                  <span className="text-[#D87D4A] font-bold text-[15px] min-w-[20px]">2x</span>
                  <span className="text-black text-[15px] font-medium">Replacement Earcups</span>
                </li>
                <li className="flex items-start gap-6">
                  <span className="text-[#D87D4A] font-bold text-[15px] min-w-[20px]">1x</span>
                  <span className="text-black text-[15px] font-medium">User Manual</span>
                </li>
                <li className="flex items-start gap-6">
                  <span className="text-[#D87D4A] font-bold text-[15px] min-w-[20px]">1x</span>
                  <span className="text-black text-[15px] font-medium">3.5mm 5m Audio Cable</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY SECTION */}
      <section className="bg-white pb-[120px] md:pb-[160px]">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-[165px]">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-5 lg:gap-[30px]">
            {/* Left column - 2 stacked images */}
            <div className="md:col-span-2 space-y-5 lg:space-y-[30px]">
              <div className="rounded-lg overflow-hidden">
                <img
                  src="/pd3.png"
                  alt="Product gallery image 1"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-lg overflow-hidden">
                <img
                  src="/pd4.png"
                  alt="Product gallery image 2"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Right column - 1 large image */}
            <div className="md:col-span-3 rounded-lg overflow-hidden">
              <img
                src="/pd5.png"
                alt="Product gallery image 3"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* YOU MAY ALSO LIKE SECTION */}
      <section className="bg-white pb-[120px] md:pb-[160px]">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-[165px]">
          <h2 className="text-[24px] md:text-[32px] font-bold uppercase tracking-[1px] text-center mb-10 md:mb-16 text-black">
            You May Also Like
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-14 md:gap-[30px]">
            {/* XX99 Mark II */}
            <div className="text-center">
              <div className="bg-[#F1F1F1] rounded-lg flex items-center justify-center h-[265px] md:h-[318px] mb-8 md:mb-10">
                <img
                  src="/hd1.png"
                  alt="XX99 Mark II"
                  className="w-[140px] md:w-[180px] h-auto object-contain"
                />
              </div>
              <h3 className="text-[24px] font-bold uppercase tracking-[1.7px] mb-8 text-black">
                XX99 Mark II
              </h3>
              <a href="/headphones/xx99-mark-ii">
                <button className="bg-[#D87D4A] hover:bg-[#FBAF85] text-white uppercase text-[13px] font-bold tracking-[1px] px-[31px] py-[15px] transition-colors">
                  See Product
                </button>
              </a>
            </div>

            {/* XX59 */}
            <div className="text-center">
              <div className="bg-[#F1F1F1] rounded-lg flex items-center justify-center h-[265px] md:h-[318px] mb-8 md:mb-10">
                <img
                  src="/hd3.png"
                  alt="XX59"
                  className="w-[140px] md:w-[180px] h-auto object-contain"
                />
              </div>
              <h3 className="text-[24px] font-bold uppercase tracking-[1.7px] mb-8 text-black">
                XX59
              </h3>
              <a href="/headphones/xx59">
                <button className="bg-[#D87D4A] hover:bg-[#FBAF85] text-white uppercase text-[13px] font-bold tracking-[1px] px-[31px] py-[15px] transition-colors">
                  See Product
                </button>
              </a>
            </div>

            {/* ZX9 Speaker */}
            <div className="text-center">
              <div className="bg-[#F1F1F1] rounded-lg flex items-center justify-center h-[265px] md:h-[318px] mb-8 md:mb-10">
                <img
                  src="/speaker1.png"
                  alt="ZX9 Speaker"
                  className="w-[140px] md:w-[180px] h-auto object-contain"
                />
              </div>
              <h3 className="text-[24px] font-bold uppercase tracking-[1.7px] mb-8 text-black">
                ZX9 Speaker
              </h3>
              <a href="/speakers/zx9">
                <button className="bg-[#D87D4A] hover:bg-[#FBAF85] text-white uppercase text-[13px] font-bold tracking-[1px] px-[31px] py-[15px] transition-colors">
                  See Product
                </button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORY CARDS SECTION */}
      <section className="bg-white py-[120px] md:py-[120px]">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-[165px]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[10px] lg:gap-[30px]">
            {/* Headphones Card */}
            <div className="bg-[#F1F1F1] rounded-lg flex flex-col items-center pt-[88px] pb-[22px] px-6 relative group">
              <div className="absolute -top-[52px] w-[160px] h-[160px]">
                <img
                  src="/hd2.png"
                  alt="Headphones"
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="text-[15px] md:text-[18px] font-bold uppercase tracking-[1.3px] text-black mt-[78px] mb-[17px]">
                Headphones
              </h3>
              <a
                href="/headphones"
                className="text-[13px] font-bold uppercase tracking-[1px] text-black hover:text-[#D87D4A] transition-colors flex items-center gap-[13px] group"
              >
                Shop
                <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1.32178 1L6.32178 6L1.32178 11" stroke="#D87D4A" strokeWidth="2" />
                </svg>
              </a>
            </div>

            {/* Speakers Card */}
            <div className="bg-[#F1F1F1] rounded-lg flex flex-col items-center pt-[88px] pb-[22px] px-6 relative group">
              <div className="absolute -top-[52px] w-[160px] h-[160px]">
                <img
                  src="/speaker1.png"
                  alt="Speakers"
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="text-[15px] md:text-[18px] font-bold uppercase tracking-[1.3px] text-black mt-[78px] mb-[17px]">
                Speakers
              </h3>
              <a
                href="/speakers"
                className="text-[13px] font-bold uppercase tracking-[1px] text-black hover:text-[#D87D4A] transition-colors flex items-center gap-[13px] group"
              >
                Shop
                <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1.32178 1L6.32178 6L1.32178 11" stroke="#D87D4A" strokeWidth="2" />
                </svg>
              </a>
            </div>

            {/* Earphones Card */}
            <div className="bg-[#F1F1F1] rounded-lg flex flex-col items-center pt-[88px] pb-[22px] px-6 relative group">
              <div className="absolute -top-[52px] w-[160px] h-[160px]">
                <img
                  src="/ep1.png"
                  alt="Earphones"
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="text-[15px] md:text-[18px] font-bold uppercase tracking-[1.3px] text-black mt-[78px] mb-[17px]">
                Earphones
              </h3>
              <a
                href="/earphones"
                className="text-[13px] font-bold uppercase tracking-[1px] text-black hover:text-[#D87D4A] transition-colors flex items-center gap-[13px] group"
              >
                Shop
                <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1.32178 1L6.32178 6L1.32178 11" stroke="#D87D4A" strokeWidth="2" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* BEST AUDIO GEAR SECTION */}
      <section className="bg-white py-[120px] md:py-[120px]">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-[165px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-[125px] items-center">
            {/* Left Column - Text Content */}
            <div className="text-center lg:text-left order-2 lg:order-1">
              <h2 className="text-[28px] md:text-[40px] font-bold uppercase leading-[1.1] tracking-[1.5px] mb-8 text-black">
                Bringing you the <span className="text-[#D87D4A]">best</span> audio gear
              </h2>
              <p className="text-black text-[15px] font-medium leading-[25px]">
                Located at the heart of New York City, Audiophile is the
                premier store for high end headphones, earphones, speakers,
                and audio accessories. We have a large showroom and luxury
                demonstration rooms available for you to browse and
                experience a wide range of our products. Stop by our store to
                meet some of the fantastic people who make Audiophile the
                best place to buy your portable audio equipment.
              </p>
            </div>

            {/* Right Column - Image */}
            <div className="order-1 lg:order-2">
              <div className="rounded-lg overflow-hidden">
                <img
                  src="/hp1.png"
                  alt="Person enjoying audio gear"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#101010] text-white">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-[165px]">
          {/* Orange line at top */}
          <div className="h-[4px] w-[101px] bg-[#D87D4A] mx-auto lg:mx-0"></div>

          {/* Footer Content */}
          <div className="pt-[48px] md:pt-[56px] lg:pt-[71px] pb-[48px]">
            {/* Top Row - Logo and Navigation */}
            <div className="flex flex-col lg:flex-row justify-between items-center mb-[48px] md:mb-[32px]">
              {/* Logo */}
              <a href="/">
                <h2 className="text-[25px] font-bold mb-[48px] lg:mb-0">
                  audiophile
                </h2>
              </a>

              {/* Navigation */}
              <nav className="flex flex-col md:flex-row items-center gap-4 md:gap-[34px] text-[13px] font-bold tracking-[2px] uppercase">
                <a href="/" className="hover:text-[#D87D4A] transition-colors">Home</a>
                <a href="/headphones" className="hover:text-[#D87D4A] transition-colors">Headphones</a>
                <a href="/speakers" className="hover:text-[#D87D4A] transition-colors">Speakers</a>
                <a href="/earphones" className="hover:text-[#D87D4A] transition-colors">Earphones</a>
              </nav>
            </div>

            {/* Middle Row - Description and Social Icons */}
            <div className="flex flex-col lg:flex-row justify-between items-center lg:items-end mb-[48px]">
              {/* Description */}
              <p className="text-white/50 text-[15px] font-medium leading-[25px] text-center lg:text-left max-w-[540px] mb-[48px] lg:mb-0">
                Audiophile is an all in one stop to fulfill your audio
                needs. We're a small team of music lovers and sound
                specialists who are devoted to helping you get the most out
                of personal audio. Come and visit our demo facility - we're
                open 7 days a week.
              </p>

              {/* Social Icons */}
              <div className="flex items-center gap-4">
                <a href="#" className="hover:text-[#D87D4A] transition-colors">
                  <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.593 1.323-1.325V1.325C24 .593 23.407 0 22.675 0z" fill="currentColor" />
                  </svg>
                </a>
                <a href="#" className="hover:text-[#D87D4A] transition-colors">
                  <svg width="24" height="20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 2.557a9.83 9.83 0 01-2.828.775A4.932 4.932 0 0023.337.608a9.864 9.864 0 01-3.127 1.195A4.916 4.916 0 0016.616.248c-3.179 0-5.515 2.966-4.797 6.045A13.978 13.978 0 011.671 1.149a4.93 4.93 0 001.523 6.574 4.903 4.903 0 01-2.229-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.935 4.935 0 01-2.224.084 4.928 4.928 0 004.6 3.419A9.9 9.9 0 010 17.54a13.94 13.94 0 007.548 2.212c9.142 0 14.307-7.721 13.995-14.646A10.025 10.025 0 0024 2.557z" fill="currentColor" />
                  </svg>
                </a>
                <a href="#" className="hover:text-[#D87D4A] transition-colors">
                  <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" fill="currentColor" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Bottom Row - Copyright */}
            <div className="text-center lg:text-left">
              <p className="text-white/50 text-[15px] font-bold">
                Copyright 2021. All Rights Reserved
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Cart Modal */}
      <CartModal
        isOpen={showCartModal}
        onClose={() => setShowCartModal(false)}
      />
    </main>
  );
}
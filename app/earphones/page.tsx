// app/earphones/page.tsx
export default function EarphonesPage() {
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
              <a href="/headphones" className="hover:text-[#D87D4A] transition-colors">Headphones</a>
              <a href="/speakers" className="hover:text-[#D87D4A] transition-colors">Speakers</a>
              <a href="/earphones" className="text-[#D87D4A]">Earphones</a>
            </nav>

            {/* Cart Icon */}
            <button className="text-white hover:text-[#D87D4A] transition-colors">
              <svg width="23" height="20" fill="currentColor">
                <path d="M8.625 15a1.875 1.875 0 1 0 0 3.75 1.875 1.875 0 0 0 0-3.75ZM0 0v1.875h1.875L5.314 9.412l-1.21 2.175A2.25 2.25 0 0 0 5.789 14.25h11.737v-1.875H6.133a.188.188 0 0 1-.187-.187l.03-.132.792-1.462h7.518a1.875 1.875 0 0 0 1.64-1.006l3.398-6a.937.937 0 0 0-.447-1.343.937.937 0 0 0-.398-.094H4.105L3.19 0H0Zm16.578 15a1.875 1.875 0 1 0 0 3.75 1.875 1.875 0 0 0 0-3.75Z"/>
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* PAGE HEADER */}
      <section className="bg-[#191919] text-white">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-[165px]">
          <div className="flex items-center justify-center h-[192px] md:h-[246px]">
            <h1 className="text-[28px] md:text-[40px] font-bold uppercase tracking-[2px]">
              Earphones
            </h1>
          </div>
        </div>
      </section>

      {/* PRODUCTS SECTION */}
      <section className="bg-white py-[64px] md:py-[120px]">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-[165px]">
          
          {/* YX1 Wireless Earphones - Product 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-[125px] items-center mb-[120px] md:mb-[160px]">
            {/* Image */}
            <div className="bg-[#F1F1F1] rounded-lg flex items-center justify-center h-[352px] md:h-[560px]">
              <img 
                src="/ep1.png" 
                alt="YX1 Wireless Earphones"
                className="w-[200px] md:w-[350px] h-auto object-contain"
              />
            </div>

            {/* Content */}
            <div>
              <p className="text-[#D87D4A] text-[14px] font-normal tracking-[10px] uppercase mb-4">
                New Product
              </p>
              <h2 className="text-black text-[28px] md:text-[40px] font-bold uppercase leading-[1.1] tracking-[1.5px] mb-6">
                YX1 Wireless<br />Earphones
              </h2>
              <p className="text-black/50 text-[15px] font-medium leading-[25px] mb-8">
                Tailor your listening experience with bespoke dynamic drivers from the new YX1 Wireless Earphones. Enjoy incredible high-fidelity sound even in noisy environments with its active noise cancellation feature.
              </p>
              <a href="/earphones/yx1">
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
                className="text-[13px] font-bold uppercase tracking-[1px] text-black/50 hover:text-[#D87D4A] transition-colors flex items-center gap-[13px] group"
              >
                Shop
                <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1.32178 1L6.32178 6L1.32178 11" stroke="#D87D4A" strokeWidth="2"/>
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
                className="text-[13px] font-bold uppercase tracking-[1px] text-black/50 hover:text-[#D87D4A] transition-colors flex items-center gap-[13px] group"
              >
                Shop
                <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1.32178 1L6.32178 6L1.32178 11" stroke="#D87D4A" strokeWidth="2"/>
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
                className="text-[13px] font-bold uppercase tracking-[1px] text-black/50 hover:text-[#D87D4A] transition-colors flex items-center gap-[13px] group"
              >
                Shop
                <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1.32178 1L6.32178 6L1.32178 11" stroke="#D87D4A" strokeWidth="2"/>
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
              <h2 className="text-black text-[28px] md:text-[40px] font-bold uppercase leading-[1.1] tracking-[1.5px] mb-8">
                Bringing you the <span className="text-[#D87D4A]">best</span> audio gear
              </h2>
              <p className="text-black/50 text-[15px] font-medium leading-[25px]">
                Located at the heart of New York City, Audiophile is the premier store for high end headphones, earphones, speakers, and audio accessories. We have a large showroom and luxury demonstration rooms available for you to browse and experience a wide range of our products. Stop by our store to meet some of the fantastic people who make Audiophile the best place to buy your portable audio equipment.
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
                Audiophile is an all in one stop to fulfill your audio needs. We're a small team of music lovers and sound specialists who are devoted to helping you get the most out of personal audio. Come and visit our demo facility - we're open 7 days a week.
              </p>

              {/* Social Icons */}
              <div className="flex items-center gap-4">
                <a href="#" className="hover:text-[#D87D4A] transition-colors">
                  <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.593 1.323-1.325V1.325C24 .593 23.407 0 22.675 0z" fill="currentColor"/>
                  </svg>
                </a>
                <a href="#" className="hover:text-[#D87D4A] transition-colors">
                  <svg width="24" height="20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 2.557a9.83 9.83 0 01-2.828.775A4.932 4.932 0 0023.337.608a9.864 9.864 0 01-3.127 1.195A4.916 4.916 0 0016.616.248c-3.179 0-5.515 2.966-4.797 6.045A13.978 13.978 0 011.671 1.149a4.93 4.93 0 001.523 6.574 4.903 4.903 0 01-2.229-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.935 4.935 0 01-2.224.084 4.928 4.928 0 004.6 3.419A9.9 9.9 0 010 17.54a13.94 13.94 0 007.548 2.212c9.142 0 14.307-7.721 13.995-14.646A10.025 10.025 0 0024 2.557z" fill="currentColor"/>
                  </svg>
                </a>
                <a href="#" className="hover:text-[#D87D4A] transition-colors">
                  <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" fill="currentColor"/>
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
    </main>
  )
}
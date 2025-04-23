"use client"

import Image from "next/image"

export function PartnersCarousel() {
  // Create placeholder images
  const logos = [
    "/images/partner1.png",
    "/images/partner2.png",
    "/images/partner3.png",
    "/images/partner4.png",
    "/images/partner5.png",
    "/images/partner6.png",
    "/images/partner7.png",
  ]
  
  // Duplicate for seamless loop
  const duplicatedLogos = [...logos, ...logos, ...logos]
  
  return (
    <section className="py-16 bg-black/50 relative overflow-hidden">
      <div className="container mx-auto px-4 mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-center">Our Partners</h2>
      </div>
      
      {/* Centered container with mask for fade effect */}
      <div 
        className="w-[50vw] mx-auto overflow-hidden pointer-events-none"
        style={{
          maskImage: 'linear-gradient(to right, transparent, black 100px, black calc(100% - 100px), transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 100px, black calc(100% - 100px), transparent)'
        }}
      >
        <div 
          className="flex items-center justify-center"
          style={{ 
            width: '200%',
            animation: 'scrollPartners 30s linear infinite'
          }}
        >
          {duplicatedLogos.map((logo, index) => (
            <div 
              key={index} 
              className="flex-shrink-0 mx-12"
              style={{ width: "160px", height: "80px" }}
            >
              <div className="bg-gray-800/40 rounded-lg p-4 flex items-center justify-center h-full">
                <div 
                  className="w-full h-full rounded flex items-center justify-center text-white font-medium"
                  style={{ 
                    background: `hsl(${(index * 40) % 360}, 70%, 60%)`,
                    position: 'relative'
                  }}
                >
                  <span className="absolute inset-0 flex items-center justify-center">
                    Partner {index % logos.length + 1}
                  </span>
                  <Image
                    src={logo}
                    alt={`Partner ${index % logos.length + 1}`}
                    width={120}
                    height={60}
                    className="max-w-full max-h-full object-contain opacity-0"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none'
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Add the CSS animation */}
      <style jsx global>{`
        @keyframes scrollPartners {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  )
} 
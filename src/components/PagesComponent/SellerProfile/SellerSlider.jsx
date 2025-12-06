"use client";
import React from "react";
import Image from "next/image";
import { buildSliderUrl, ensureArray } from "@/utils/sellerHelpers"; // adjust path if needed

const SellerSlider = ({ slider }) => {
  const images = ensureArray(slider);

  if (!images.length) {
    return null; // or return a placeholder
  }

  return (
    <div className="seller-slider" style={{ display: "flex", gap: 8, overflowX: "auto" }}>
      {images.map((img, idx) => {
        const src = buildSliderUrl(img);
        return (
          <div key={idx} style={{ minWidth: 300, height: 200, position: "relative" }}>
            {/* If you prefer <img> instead of next/image, replace below */}
            <Image
              src={src}
              alt={`slider-${idx}`}
              fill
              style={{ objectFit: "cover", borderRadius: 6 }}
              // you might need to add the domain to next.config.js images.domains
              onError={(e) => { e.currentTarget.style.display = "none"; }}
            />
          </div>
        );
      })}
    </div>
  );
};

export default SellerSlider;

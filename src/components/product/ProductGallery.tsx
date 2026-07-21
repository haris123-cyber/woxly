"use client";

import { useState } from "react";
import Image from "next/image";

interface ProductGalleryProps {
  images: string[];
  name: string;
}

export default function ProductGallery({ images, name }: ProductGalleryProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Fallback if no images provided
  const displayImages = images.length > 0 ? images : ["/images/products/nike-air-max-270.png"];

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4">
      {/* Thumbnail List */}
      <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-x-visible md:overflow-y-auto max-h-[500px] flex-shrink-0">
        {displayImages.map((img, index) => (
          <button
            key={index}
            onClick={() => setActiveImageIndex(index)}
            className={`relative h-16 w-16 md:h-20 md:w-20 rounded-xl overflow-hidden bg-muted flex-shrink-0 border-2 transition-all cursor-pointer ${
              activeImageIndex === index ? "border-accent shadow-md scale-95" : "border-border/50 hover:border-border"
            }`}
            aria-label={`View image ${index + 1} of ${name}`}
          >
            <Image
              src={img}
              alt={`${name} thumbnail ${index + 1}`}
              fill
              sizes="80px"
              className="object-cover"
            />
          </button>
        ))}
      </div>

      {/* Main Image View */}
      <div className="flex-1 relative aspect-square bg-muted border border-border/80 rounded-2xl overflow-hidden shadow-inner group">
        <Image
          src={displayImages[activeImageIndex]}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          priority
        />
      </div>
    </div>
  );
}

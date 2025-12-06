"use client";
import Image from "next/image";

const SellerSlider = ({ slider = [] }) => {
    if (!slider.length) {
        return <p>No slider images available.</p>;
    }

    return (
        <div className="seller-slider">
            {slider.map((img, index) => (
                <Image
                    key={index}
                    src={img}
                    width={800}
                    height={400}
                    alt={`slider-${index}`}
                />
            ))}
        </div>
    );
};

export default SellerSlider;

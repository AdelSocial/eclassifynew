"use client";

const SellerSocialLinks = ({ seller }) => {
    if (!seller) return null;

    return (
        <div className="social-links">
            <h3>Follow Us</h3>

            {seller.facebook && (
                <a href={seller.facebook} target="_blank">Facebook</a>
            )}

            {seller.instagram && (
                <a href={seller.instagram} target="_blank">Instagram</a>
            )}

            {seller.whatsapp && (
                <a href={`https://wa.me/${seller.whatsapp}`} target="_blank">
                    WhatsApp
                </a>
            )}
        </div>
    );
};

export default SellerSocialLinks;

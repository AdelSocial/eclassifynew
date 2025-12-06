"use client";
import React from "react";

const socials = [
  { key: "facebook", label: "Facebook" },
  { key: "twitter", label: "Twitter" },
  { key: "instagram", label: "Instagram" },
  { key: "youtube", label: "YouTube" },
];

const SellerSocialLinks = ({ seller = {} }) => {
  if (!seller) return null;

  const hasAny = socials.some(s => seller[s.key]);
  if (!hasAny) return null;

  return (
    <div className="social-links-box">
      <h4>Social</h4>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        {socials.map(p => {
          const url = seller[p.key];
          if (!url) return null;
          // simple normalization: if user stored handle instead of full URL, try prefix
          const href = url.startsWith("http") ? url : `https://${url}`;
          return (
            <a key={p.key} href={href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
              {p.label}
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default SellerSocialLinks;

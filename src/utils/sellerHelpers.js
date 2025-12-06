export const buildSliderUrl = (img) => {
  if (!img) return "";
  if (typeof img !== "string") return "";
  // if already an absolute url
  if (img.startsWith("http://") || img.startsWith("https://")) return img;
  // otherwise, treat as filename stored in uploads
  return `${process.env.NEXT_PUBLIC_BASE_URL || ""}/uploads/seller_slider/${img}`;
};

export const ensureArray = (val) => {
  if (!val) return [];
  if (Array.isArray(val)) return val;
  try {
    // if JSON string
    const parsed = JSON.parse(val);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    // if comma separated string
    if (typeof val === "string") return val.split(",").map(s => s.trim()).filter(Boolean);
    return [];
  }
};

export const ensureHoursObject = (val) => {
  if (!val) return {};
  if (typeof val === "string") {
    try { return JSON.parse(val); } catch (e) { return {}; }
  }
  return val;
};

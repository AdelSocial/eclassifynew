"use client";
import React from "react";
import { ensureHoursObject } from "@/utils/sellerHelpers"; // adjust path

const WeekDays = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];

const SellerStoreHours = ({ hours }) => {
  const hoursObj = ensureHoursObject(hours);

  // if hours is an array (old format), convert to object
  let normalized = {};
  if (Array.isArray(hoursObj)) {
    // attempt map [ { day, open, close, is_closed } ] -> { Monday: "10am - 6pm"}
    hoursObj.forEach(item => {
      if (item && item.day) normalized[item.day] = item.is_closed ? "Closed" : `${item.open} - ${item.close}`;
    });
  } else {
    normalized = hoursObj;
  }

  if (!Object.keys(normalized).length) return null;

  return (
    <div className="store-hours-box">
      <h4>Store Hours</h4>
      <div>
        {WeekDays.map(day => (
          <div key={day} className="store-hour-row" style={{ display: "flex", justifyContent: "space-between", padding: "4px 0" }}>
            <span style={{ fontWeight: 600 }}>{day}</span>
            <span>{normalized[day] ?? "Closed"}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SellerStoreHours;

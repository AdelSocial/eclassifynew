"use client";
import { useState } from "react";

export default function CreateLive() {
  const [data, setData] = useState(null);
  const [userId, setUserId] = useState(""); // user table id

  const createLive = async () => {
    if (!userId) {
      alert("Enter valid user ID");
      return;
    }

    const res = await fetch("https://admin.libwana.com/api/live/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: userId, // ONLY user_id needed
      }),
    });

    const response = await res.json();
    setData(response.live); // Laravel sends data inside "live"
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Create Live Stream</h2>

      <input
        type="number"
        placeholder="Enter User ID (from users table)"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        style={{ padding: 8, marginBottom: 10, width: 250 }}
      />

      <br />

      <button onClick={createLive} style={{ padding: "10px 20px" }}>
        Start Live Stream
      </button>

      {data && (
        <div style={{ marginTop: 20 }}>
          <a
            href={`dashboard/live/host?appID=${data.appID}&serverSecret=${data.serverSecret}&liveID=${data.liveID}&userID=${data.userID}&userName=${data.userName}`}
            style={{ color: "blue", textDecoration: "underline" }}
          >
            Go to Host Page
          </a>
        </div>
      )}
    </div>
  );
}

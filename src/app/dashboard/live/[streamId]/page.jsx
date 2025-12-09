// 'use client'
// import React, { useEffect, useRef, useState } from 'react';
// import ChatMessages from '@/components/PagesComponent/Chat/ChatMessages';
// import Link from 'next/link';

// export default function LiveStreamPage({ params }) {
//   const videoRef = useRef(null);
//   const [broadcast, setBroadcast] = useState(null);
//   const [expired, setExpired] = useState(false);
 
//   useEffect(() => { 
//     // 1) Fetch broadcast metadata by streamId
//     fetch(`/api/broadcasts/${params.streamId}`)
//       .then(res => res.json()) 
//       .then((data) => {
//         setBroadcast(data);
//         const now = new Date();
//         const exp = new Date(data.expiresAt);
//         setExpired(now > exp);

//         if (now >= new Date(data.startsAt) && now < exp) {
//           videoRef.current.src = data.videoUrl;
//           videoRef.current.play().catch(() => {});
//         }
//       })
//       .catch(console.error);
//   }, [params.streamId]);

//   if (!broadcast) { 
//     return <p>Loading broadcast...</p>;
//   }
//   if (expired) {
//     return <p>This promotion has ended.</p>;
//   } 

//   return (
//     <div className="p-4">
//       <h2 className="text-2xl font-bold mb-4">🔴 Live Broadcasting</h2>

//       <div className="flex flex-col md:flex-row gap-4">
//         {/* Video + business overlay */}
//         <div className="flex-1 relative">
//           <video
//             ref={videoRef}
//             controls
//             className="w-full h-auto rounded shadow border"
//           />
//           {/* Business info overlay */}
//           <div className="absolute bottom-4 left-4 bg-white bg-opacity-75 p-3 rounded shadow">
//             <h3 className="font-semibold">{broadcast.business.name}</h3>
//             <Link href={broadcast.business.link}>
//               <a target="_blank" className="text-blue-600 underline">
//                 Learn more
//               </a>
//             </Link>
//           </div>
//         </div>
 
//         {/* Chat */}
//         <div className="w-full md:w-[30%] max-h-[500px] overflow-y-auto rounded border shadow p-3 bg-white">
//           <h3 className="text-lg font-semibold mb-3">💬 Live Chat</h3>
//           <ChatMessages streamId={params.streamId} isLive={true} />
//         </div>
//       </div>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";

// export default function CreateLive() {
//   const [data, setData] = useState(null);
//   const [userId, setUserId] = useState(""); // user table id

//   const createLive = async () => {
//     if (!userId) {
//       alert("Enter valid user ID");
//       return;
//     }

//     const res = await fetch("https://admin.libwana.com/api/live/create", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         user_id: userId, // ONLY user_id needed
//       }),
//     });

//     const response = await res.json();
//     setData(response.live); // Laravel sends data inside "live"
//   };

//   return (
//     <div style={{ padding: 20 }}>
//       <h2>Create Live Stream</h2>

//       <input
//         type="number"
//         placeholder="Enter User ID (from users table)"
//         value={userId}
//         onChange={(e) => setUserId(e.target.value)}
//         style={{ padding: 8, marginBottom: 10, width: 250 }}
//       />

//       <br />

//       <button onClick={createLive} style={{ padding: "10px 20px" }}>
//         Start Live Stream
//       </button>

//       {data && (
//         <div style={{ marginTop: 20 }}>
//           <a
//             href={`/live/host?appID=${data.appID}&serverSecret=${data.serverSecret}&liveID=${data.liveID}&userID=${data.userID}&userName=${data.userName}`}
//             style={{ color: "blue", textDecoration: "underline" }}
//           >
//             Go to Host Page
//           </a>
//         </div>
//       )}
//     </div>
//   );
// }

// "use client";
// import { useEffect, useState } from "react";

// export default function CreateLive() {
//   const [users, setUsers] = useState([]);
//   const [userId, setUserId] = useState("");
//   const [data, setData] = useState(null);
 
//   // Load users
//   useEffect(() => {
//     fetch("https://admin.libwana.com/api/zegocloudUsers")
//       .then((res) => res.json())
//       .then((d) => setUsers(d));
//   }, []);

//   const createLive = async () => {
//     if (!userId) return alert("Select a user");

//     const res = await fetch("https://admin.libwana.com/api/live/create", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ user_id: userId }),
//     });

//     const response = await res.json();
//     setData(response.live);
//   };

//   return (
//     <div style={{ padding: 20 }}>
//       <h2>Create Live Stream</h2>

//       {/* Dropdown */}
//       <select
//         value={userId}
//         onChange={(e) => setUserId(e.target.value)}
//         style={{ padding: 8, width: 250 }}
//       >
//         <option value="">Select User</option>
//         {users.map((u) => (
//           <option key={u.id} value={u.id}>
//             {u.id} — {u.name}
//           </option>
//         ))}
//       </select>
 
//       <br /><br />

//       <button onClick={createLive}>Start Live Stream</button>

//       {data && (
//         <div>
//           <a href={`/dashboard/live/host?appID=${data.appID}&serverSecret=${data.serverSecret}&liveID=${data.liveID}&userID=${data.userID}&userName=${data.userName}`}>
//             Go to Host Page
//           </a>
//         </div>
//       )}
//     </div>
//   );
// }
// pages/live/[liveId].tsx  (or app directory equivalent)
// This example uses React + Next.js pages dir. Make sure it runs client-side only.
"use client";

import { useEffect, useState } from "react";

export default function LivePage({ params }) {
  const liveId = params.streamId; // from URL [...]/live/abc123

  const [loading, setLoading] = useState(true);
  const [zegodata, setZegodata] = useState(null);
  const [error, setError] = useState(null);

  // Fetch Zego token from Laravel API
  useEffect(() => {
    if (!liveId) return;

    const fetchToken = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/live/${liveId}/token`,
          {
            method: "GET",
            credentials: "include",
            headers: { Accept: "application/json" },
          }
        );

        if (res.status === 401) {
          setError("You must be logged in to view this stream.");
          return;
        }

        if (!res.ok) {
          throw new Error("Failed to fetch streaming token.");
        }

        const data = await res.json();
        setZegodata(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchToken();
  }, [liveId]);

  if (loading) return <div>Loading live stream…</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;
  if (!zegodata?.token) return <div>Stream unavailable.</div>;

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <ZegoPlayer zegodata={zegodata} />
    </div>
  );
}

// ===============================
// Zego Player Component (Client Only)
// ===============================

function ZegoPlayer({ zegodata }) {
  const { appID, token, roomID, userID, userName } = zegodata;

  useEffect(() => {
    let kitInstance = null;

    const initZego = async () => {
      // Dynamically import Zego to prevent SSR issues
      const { ZegoUIKitPrebuilt } = await import(
        "@zegocloud/zego-uikit-prebuilt"
      );

      kitInstance = ZegoUIKitPrebuilt.create(appID, token);

      // Join Live Room
      kitInstance.joinRoom({
        container: document.querySelector("#zego-container"),
        scenario: {
          mode: ZegoUIKitPrebuilt.Live,
        },
        userID: String(userID),
        userName: String(userName),
        roomID: String(roomID),

        // Auto Camera & Mic OFF for audience
        turnOnCameraWhenJoining: false,
        turnOnMicrophoneWhenJoining: false,

        // Max 50 users
        maxUsers: 50,
      });
    };

    initZego();

    // Cleanup on unmount
    return () => {
      try {
        kitInstance?.destroy();
      } catch (e) {
        console.warn("Zego cleanup error", e);
      }
    };
  }, [appID, token, roomID, userID, userName]);

  return (
    <div
      id="zego-container"
      style={{ width: "100%", height: "100%", background: "#000" }}
    />
  );
}

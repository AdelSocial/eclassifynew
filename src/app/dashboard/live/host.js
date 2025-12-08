"use client";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useEffect, useRef } from "react";

export default function HostPage() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const query = new URLSearchParams(window.location.search);

    const appID = Number(query.get("appID"));
    const serverSecret = query.get("serverSecret");
    const liveID = query.get("liveID");
    const userID = query.get("userID");       // numeric user table id
    const userName = query.get("userName");   // fetched from users table via Laravel controller

    if (!appID || !serverSecret || !liveID || !userID || !userName) {
      console.error("Missing required query params");
      return;
    }

    // Use liveID as roomID
    const roomID = liveID;

    // Create Zego token
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomID,
      userID,
      userName
    );

    const ui = ZegoUIKitPrebuilt.create(kitToken);

    ui.startLiveStreaming(containerRef.current, {
      role: "host",
      showPreJoinView: false,
    });
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ width: "100%", height: "100vh" }}
    ></div>
  );
}

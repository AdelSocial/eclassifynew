 "use client";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useEffect, useRef } from "react";

export default function AudiencePage() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const query = new URLSearchParams(window.location.search);

    const appID = Number(query.get("appID"));
    const serverSecret = query.get("serverSecret");
    const liveID = query.get("liveID");

    // Audience is NOT coming from users table → generate random viewer
    const userID = "viewer_" + Math.floor(Math.random() * 999999);
    const userName = "Viewer";

    if (!appID || !serverSecret || !liveID) {
      console.error("Missing required query params");
      return;
    }

    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      liveID,
      userID,
      userName
    );

    const ui = ZegoUIKitPrebuilt.create(kitToken);

    ui.startLiveStreaming(containerRef.current, {
      role: "audience",
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

import { useEffect, useState } from "react";
import {
  createSocket,
  type ClientToServerEvents,
  type ServerToClientEvents,
} from "@/lib/socket";
import type { Socket } from "socket.io-client";

interface RawDeviceData {
  device_unique_id: string;
  timestamp: string;
  data: {
    param_name: string;
    param_value: string | number;
    param_type: string;
  }[];
}

interface NormalizedDeviceData {
  deviceId: string;
  timestamp: string;
  params: Record<string, string | number>;
}

export const useSocket = (
  jwt: string | null,
  deviceId: string | undefined
): NormalizedDeviceData | null => {
  const [latestData, setLatestData] = useState<NormalizedDeviceData | null>(
    null
  );

  useEffect(() => {
    if (!jwt || !deviceId) return;

    const socket: Socket<ServerToClientEvents, ClientToServerEvents> =
      createSocket(jwt);

    socket.on("connect", () => {
      // console.log("✅ Socket connected");
      socket.emit("joinAndGetData", { deviceUniqueId: deviceId });
    });

    socket.on("realTime", (rawData) => {
      // console.log("📡 Real-time data:", rawData);

      try {
        const parsed: RawDeviceData =
          typeof rawData === "string" ? JSON.parse(rawData) : rawData;

        const params = parsed.data?.reduce((acc, curr) => {
          acc[curr.param_name] = curr.param_value;
          return acc;
        }, {} as Record<string, string | number>);

        setLatestData({
          deviceId: parsed.device_unique_id,
          timestamp: parsed.timestamp,
          params,
        });
      } catch (e) {
        console.error("❌ Failed to parse device data", e);
      }
    });

    // socket.onAny((event, ...args) => {
    //   console.log("📥 Received:", event, args);
    // });

    socket.on("error", (error) => {
      console.error("❌ Socket error:", error.message);
    });

    socket.on("disconnect", () => {
      // console.log("🔌 Socket disconnected");
    });

    return () => {
      // console.log("🧹 Cleaning up socket");
      socket.disconnect();
    };
  }, [jwt, deviceId]);

  return latestData;
};

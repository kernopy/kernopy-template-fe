import api from "@/lib/axios";
import type { DevicesResponse } from "@/lib/types/api";
export const getDevices = async (): Promise<DevicesResponse> => {
  const response = await api.get("/api/v1/device/");
  return response.data;
};

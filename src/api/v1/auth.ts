import api from "@/lib/axios";
import type { TokenResponse } from "@/lib/types/api";
export const getToken = async (): Promise<TokenResponse> => {
  const organisation_unique_id = import.meta.env.VITE_APP_ORG_UNIQUE_ID!;
  const secret = import.meta.env.VITE_APP_ORG_SECRET!;

  const response = await api.post("/api/v1/auth/token", {
    organisation_unique_id: organisation_unique_id,
    secret: secret,
  });
  return response.data;
};

interface GenericResponse {
  message: string;
  success: boolean;
  status_code: number;
}
export interface TokenResponse extends GenericResponse {
  token: string | null;
}

export interface DevicesResponse extends GenericResponse {
  data: {
    name: string;
    descriptions: string;
    device_unique_id: string;
    primary_key: string;
  }[];
}
export interface DeviceResponse extends GenericResponse {
  name: string;
  descriptions: string;
  device_unique_id: string;
  primary_key: string;
}

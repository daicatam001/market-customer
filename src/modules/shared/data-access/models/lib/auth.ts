export interface RegisterUser {
  name: string;
  phone: string;
  province: number | null;
  district: number | null;
  wardId: number | null;
  address: string;
  sessionId: string | null;
}

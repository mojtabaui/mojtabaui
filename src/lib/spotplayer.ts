import axios from "axios";

const API_KEY = process.env.SPOTPLAYER_API_KEY!;
const BASE_URL = "https://panel.spotplayer.ir/api/v1";

const client = axios.create({
  baseURL: BASE_URL,
  headers: { "l-key": API_KEY },
});

export async function createLicense(courseId: string, userId: string) {
  const { data } = await client.post("/license/create", {
    course_id: courseId,
    user_id: userId,
  });
  return data as { license: string; expires_at?: string };
}

export async function getLicense(licenseKey: string) {
  const { data } = await client.get(`/license/${licenseKey}`);
  return data;
}

export async function revokeLicense(licenseKey: string) {
  const { data } = await client.delete(`/license/${licenseKey}`);
  return data;
}

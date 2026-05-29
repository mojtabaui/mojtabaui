import axios from "axios";

const MERCHANT_ID = process.env.ZARINPAL_MERCHANT_ID!;
const CALLBACK_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/verify`;

const BASE_URL = "https://api.zarinpal.com/pg/v4/payment";

export async function requestPayment(amount: number, description: string, email: string) {
  const { data } = await axios.post(`${BASE_URL}/request.json`, {
    merchant_id: MERCHANT_ID,
    amount,
    description,
    email,
    callback_url: CALLBACK_URL,
  });
  return data;
}

export async function verifyPayment(authority: string, amount: number) {
  const { data } = await axios.post(`${BASE_URL}/verify.json`, {
    merchant_id: MERCHANT_ID,
    amount,
    authority,
  });
  return data;
}

export function getPaymentUrl(authority: string) {
  return `https://www.zarinpal.com/pg/StartPay/${authority}`;
}

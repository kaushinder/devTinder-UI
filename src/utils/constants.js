// ✅ All environment-specific values come from .env
// ✅ Never hardcode IPs or secrets here

export const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:7777";

export const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID || "";
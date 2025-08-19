export const bkashConfig = {
  username: process.env.BKASH_USERNAME || "sandboxUsername",
  password: process.env.BKASH_PASSWORD || "sandboxPassword",
  appKey: process.env.BKASH_APP_KEY || "sandboxAppKey",
  appSecret: process.env.BKASH_APP_SECRET || "sandboxAppSecret",
  baseUrl: "https://checkout.sandbox.bka.sh/v1.0/",
  callbackUrl: "https://my-daily-hisab.vercel.app/api/bkash/callback",
};

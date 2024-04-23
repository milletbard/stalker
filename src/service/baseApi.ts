import { ofetch } from "ofetch";

export const FugleApi = ofetch.create({
  baseURL: process.env.NEXT_PUBLIC_FUGL_API || "",
  headers: { "X-API-KEY": process.env.NEXT_PUBLIC_FUGLE_KEY || "" },
});

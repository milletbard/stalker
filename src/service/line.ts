import { ofetch } from "ofetch";

export const LineApi = ofetch.create({
  baseURL: process.env.NEXT_PUBLIC_LINE_DOMAIN || "",
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_LINE_NOTIFY_TOKEN}`,
  },
});

export const postLineNotify = async (body: FormData) => {
  await LineApi("/notify", {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    method: "POST",
    body,
  });
};

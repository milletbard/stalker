import { ofetch } from "ofetch";

export const LineApi = ofetch.create({
  baseURL: process.env.NEXT_PUBLIC_LINE_DOMAIN || "",
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_LINE_NOTIFY_TOKEN}`,
  },
});

export const postLineNotify = (message?: string) => {
  const url =
    "https://script.google.com/macros/s/AKfycbx9FCHVnzljKFHyGogEKKjOBuGl5g3LCX79iVsxUiYGXiro04K78nSnFqTOMMMuAdQdbA/exec";

  const form = new FormData();
  form.append("message", message || "");
  form.append("token", (window as any).linetoken || "");

  fetch(url, {
    method: "POST",
    body: form,
  });
};

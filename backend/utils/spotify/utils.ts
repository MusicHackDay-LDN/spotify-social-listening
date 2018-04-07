import fetch, { RequestInit } from "node-fetch";

export const fetchWithToken = (
  token: string,
  url: string,
  options?: RequestInit
) =>
  fetch(url, {
    ...options,
    headers: {
      ...(options ? options.headers : {}),
      Authorization: `Bearer ${token}`
    }
  });

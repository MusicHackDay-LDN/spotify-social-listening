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
  }).then(x => {
    if (x.status !== 200) {
      return x.json().then(data => {
        throw new Error(
          `${x.status}\n${url}\n${JSON.stringify(data, null, 4)}`
        );
      });
    }

    return x.json();
  });

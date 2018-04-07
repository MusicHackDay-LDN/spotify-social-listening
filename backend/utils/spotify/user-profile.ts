import { fetchWithToken } from "./utils";

export type Profile = {
  birthdate: string;
  country: string;
  display_name: string | null;
  email: string;
  external_urls: ExternalUrls;
  followers: Followers;
  href: string;
  id: string;
  images?: (ImagesEntity)[] | null;
  product: string;
  type: string;
  uri: string;
};

export type ExternalUrls = {
  spotify: string;
};

export type Followers = {
  href?: null;
  total: number;
};

export type ImagesEntity = {
  height?: null;
  url: string;
  width?: null;
};

export const getUserProfile = (token: string): Promise<Profile> =>
  fetchWithToken(token, "https://api.spotify.com/v1/me");

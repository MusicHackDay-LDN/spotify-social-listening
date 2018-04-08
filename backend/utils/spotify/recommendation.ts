import { fetchWithToken } from "./utils";

export type Response = {
  tracks: Track[];
  seeds: Seed[];
};

export type Seed = {
  initialPoolSize: number;
  afterFilteringSize: number;
  afterRelinkingSize: number;
  id: string;
  type: string;
  href: null;
};

export type Track = {
  album: Album;
  artists: Artist[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: ExternalIDS;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  name: string;
  popularity: number;
  preview_url: null | string;
  track_number: number;
  type: TrackType;
  uri: string;
};

export type Album = {
  album_type: AlbumType;
  artists: Artist[];
  available_markets: string[];
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  name: string;
  type: AlbumTypeEnum;
  uri: string;
};

export enum AlbumType {
  Album = "ALBUM"
}

export type Artist = {
  external_urls: ExternalUrls;
  href: string;
  id: string;
  name: string;
  type: ArtistType;
  uri: string;
};

export type ExternalUrls = {
  spotify: string;
};

export enum ArtistType {
  Artist = "artist"
}

export type Image = {
  height: number;
  url: string;
  width: number;
};

export enum AlbumTypeEnum {
  Album = "album"
}

export type ExternalIDS = {
  isrc: string;
};

export enum TrackType {
  Track = "track"
}

export const getRecommendations = (
  token: string,
  genres: string[],
  limit: number = 1
): Promise<Response> =>
  fetchWithToken(
    token,
    `https://api.spotify.com/v1/recommendations/?seed_genres=${genres.join(
      ","
    )}&limit=${limit}`
  );

import { fetchWithToken } from "./utils";

type GenreSeeds = {
  genres: string[];
};

export const getGenreSeeds = (token: string): Promise<GenreSeeds> =>
  fetchWithToken(
    token,
    "https://api.spotify.com/v1/recommendations/available-genre-seeds"
  );

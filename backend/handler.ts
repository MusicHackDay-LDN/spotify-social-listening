import { getUserProfile, getGenreSeeds } from "./utils/spotify";

import { shortid } from "./utils/shortid";
import { shuffle } from "./utils/shuffle";
import * as db from "./utils/db";
import { getRecommendations, Track } from "./utils/spotify/recommendation";

const trackToField = (track: Track) => ({
  id: track.id,
  name: track.name,
  image: track.album.images.length > 0 ? track.album.images[0].url : null,
  artists: track.artists.map(artist => ({
    name: artist.name
  }))
});

export async function upvoteCurrentSong(event, context, callback) {
  try {
    await db.upvoteCurrentPartySong(event.code);

    const { Item: party } = await db.getParty(event.code);

    return callback(null, party);
  } catch (e) {
    return callback(e);
  }
}

export async function downvoteCurrentSong(event, context, callback) {
  try {
    await db.downvoteCurrentPartySong(event.code);

    const { Item: party } = await db.getParty(event.code);

    return callback(null, party);
  } catch (e) {
    return callback(e);
  }
}

export async function goToNextSong(event, context, callback) {
  const token = event.hostToken;

  try {
    const { Item: party } = await db.getParty(event.code);

    const recommendations = await getRecommendations(token, party.genres, 1);

    const track = trackToField(recommendations.tracks[0]);

    await db.updateParty(event.code, "activeTrack", track);

    return callback(null, party);
  } catch (e) {
    return callback(e);
  }
}

export async function createParty(event, context, callback) {
  const token = event.input.hostToken;

  try {
    const userProfile = await getUserProfile(token);

    // TODO: refresh token
    // event.input.hostRefreshToken

    const { genres } = await getGenreSeeds(token);

    const partyGenres = shuffle(genres).slice(0, 5);

    const recommendations = await getRecommendations(token, partyGenres, 1);

    const track = trackToField(recommendations.tracks[0]);

    // TODO: make sure that this id is not duplicated

    const item = {
      code: +shortid(5),
      name: event.input.name,
      activeTrack: track,
      currentAverageAttributes: {},
      history: [],
      genres: partyGenres,
      host: {
        id: userProfile.id,
        name: userProfile.display_name || userProfile.id,
        image:
          userProfile.images && userProfile.images.length > 0
            ? userProfile.images[0].url
            : null
      },
      guests: []
    };

    await db.createParty(item);

    return callback(null, item);
  } catch (e) {
    return callback(e);
  }
}

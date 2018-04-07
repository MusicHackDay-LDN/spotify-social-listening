import { getUserProfile, getGenreSeeds } from "./utils/spotify";

import { shortid } from "./utils/shortid";
import { shuffle } from "./utils/shuffle";
import * as db from "./utils/db";

export async function createParty(event, context, callback) {
  try {
    const userProfile = await getUserProfile(event.input.hostToken);

    // TODO: refresh token
    // event.input.hostRefreshToken

    const { genres } = await getGenreSeeds(event.input.hostToken);

    const partyGenres = shuffle(genres).slice(0, 5);

    // TODO: make sure that this id is not duplicated

    const item = {
      code: +shortid(5),
      name: event.input.name,
      activeTrack: {},
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

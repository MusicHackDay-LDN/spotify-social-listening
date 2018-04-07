import { getUserProfile } from "./utils/spotify";

import { shortid } from "./utils/shortid";
import * as db from "./utils/db";

export async function createParty(event, context, callback) {
  try {
    const userProfile = await getUserProfile(event.input.hostToken);

    // TODO: make sure that this id is not duplicated

    const item = {
      code: +shortid(5),
      name: event.input.name,
      activeTrack: {},
      currentAverageAttributes: {},
      history: [],
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

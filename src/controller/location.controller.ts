import { Request, Response } from "express";
import {
  CreateLocationInput,
  UpdateLocationInput,
} from "../schema/location.schema";
import {
  createLocation,
  deleteLocation,
  findAndUpdateLocation,
  findLocation,
} from "../service/location.service";

export async function createLocationHandler(
  req: Request<{}, {}, CreateLocationInput["body"]>,
  res: Response
) {
  const userId = res.locals.user._id;

  const body = req.body;

  const location = await createLocation({ ...body, user: userId });

  return res.send(location);
}

export async function updateLocationHandler(
  req: Request<UpdateLocationInput["params"]>,
  res: Response
) {
  const userId = res.locals.user._id;

  const locationId = req.params.locationId;
  const update = req.body;

  const location = await findLocation({ locationId });

  if (!location) {
    return res.sendStatus(404);
  }

  if (String(location.user) !== userId) {
    return res.sendStatus(403);
  }

  const updatedLocation = await findAndUpdateLocation({ locationId }, update, {
    new: true,
  });

  return res.send(updatedLocation);
}

export async function getLocationHandler(
  req: Request<UpdateLocationInput["params"]>,
  res: Response
) {
  const locationId = req.params.locationId;
  const location = await findLocation({ locationId });

  if (!location) {
    return res.sendStatus(404);
  }

  return res.send(location);
}

export async function deleteLocationHandler(
  req: Request<UpdateLocationInput["params"]>,
  res: Response
) {
  const userId = res.locals.user._id;
  const locationId = req.params.locationId;

  const location = await findLocation({ locationId });

  if (!location) {
    return res.sendStatus(404);
  }

  if (String(location.user) !== userId) {
    return res.sendStatus(403);
  }

  await deleteLocation({ locationId });

  return res.sendStatus(200);
}

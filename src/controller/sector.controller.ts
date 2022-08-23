import { Request, Response } from "express";
import {
  CreateSectorInput,
  UpdateSectorInput,
} from "../schema/sector.schema";
import {
  createSector,
  deleteSector,
  findAndUpdateSector,
  findSector,
} from "../service/sector.service";

export async function createSectorHandler(
  req: Request<{}, {}, CreateSectorInput["body"]>,
  res: Response
) {
  const userId = res.locals.user._id;

  const body = req.body;

  const sector = await createSector({ ...body, user: userId });

  return res.send(sector);
}

export async function updateSectorHandler(
  req: Request<UpdateSectorInput["params"]>,
  res: Response
) {
  const userId = res.locals.user._id;

  const sectorId = req.params.sectorId;
  const update = req.body;

  const sector = await findSector({ sectorId });

  if (!sector) {
    return res.sendStatus(404);
  }

  if (String(sector.user) !== userId) {
    return res.sendStatus(403);
  }

  const updatedSector = await findAndUpdateSector({ sectorId }, update, {
    new: true,
  });

  return res.send(updatedSector);
}

export async function getSectorHandler(
  req: Request<UpdateSectorInput["params"]>,
  res: Response
) {
  const sectorId = req.params.sectorId;
  const sector = await findSector({ sectorId });

  if (!sector) {
    return res.sendStatus(404);
  }

  return res.send(sector);
}

export async function deleteSectorHandler(
  req: Request<UpdateSectorInput["params"]>,
  res: Response
) {
  const userId = res.locals.user._id;
  const sectorId = req.params.sectorId;

  const sector = await findSector({ sectorId });

  if (!sector) {
    return res.sendStatus(404);
  }

  if (String(sector.user) !== userId) {
    return res.sendStatus(403);
  }

  await deleteSector({ sectorId });

  return res.sendStatus(200);
}

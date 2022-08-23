import { Request, Response } from "express";
import {
  CreateTechnicianInput,
  UpdateTechnicianInput,
} from "../schema/technician.schema";
import {
  createTechnician,
  deleteTechnician,
  findAndUpdateTechnician,
  findTechnician,
} from "../service/technician.service";

export async function createTechnicianHandler(
  req: Request<{}, {}, CreateTechnicianInput["body"]>,
  res: Response
) {
  const userId = res.locals.user._id;

  const body = req.body;

  const technician = await createTechnician({ ...body, user: userId });

  return res.send(technician);
}

export async function updateTechnicianHandler(
  req: Request<UpdateTechnicianInput["params"]>,
  res: Response
) {
  const userId = res.locals.user._id;

  const TechnicianId = req.params.TechnicianId;
  const update = req.body;

  const technician = await findTechnician({ TechnicianId });

  if (!technician) {
    return res.sendStatus(404);
  }

  if (String(technician.user) !== userId) {
    return res.sendStatus(403);
  }

  const updatedTechnician = await findAndUpdateTechnician({ TechnicianId }, update, {
    new: true,
  });

  return res.send(updatedTechnician);
}

export async function getTechnicianHandler(
  req: Request<UpdateTechnicianInput["params"]>,
  res: Response
) {
  const TechnicianId = req.params.TechnicianId;
  const technician = await findTechnician({ TechnicianId });

  if (!technician) {
    return res.sendStatus(404);
  }

  return res.send(technician);
}

export async function deleteTechnicianHandler(
  req: Request<UpdateTechnicianInput["params"]>,
  res: Response
) {
  const userId = res.locals.user._id;
  const TechnicianId = req.params.TechnicianId;

  const technician = await findTechnician({ TechnicianId });

  if (!technician) {
    return res.sendStatus(404);
  }

  if (String(technician.user) !== userId) {
    return res.sendStatus(403);
  }

  await deleteTechnician({ TechnicianId });

  return res.sendStatus(200);
}

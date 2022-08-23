import { Request, Response } from "express";
import {
  CreateCompanyInput,
  UpdateCompanyInput,
} from "../schema/company.schema";
import {
  createCompany,
  deleteCompany,
  findAndUpdateCompany,
  findCompany,
} from "../service/company.service";

export async function createCompanyHandler(
  req: Request<{}, {}, CreateCompanyInput["body"]>,
  res: Response
) {
  const userId = res.locals.user._id;

  const body = req.body;

  const company = await createCompany({ ...body, user: userId });

  return res.send(company);
}

export async function updateCompanyHandler(
  req: Request<UpdateCompanyInput["params"]>,
  res: Response
) {
  const userId = res.locals.user._id;

  const companyId = req.params.companyId;
  const update = req.body;

  const company = await findCompany( { companyId });

  if (!company) {
    return res.sendStatus(404);
  }

  if (String(company.user) !== userId) {
    return res.sendStatus(403);
  }

  const updatedCompany = await findAndUpdateCompany({ companyId }, update, {
    new: true,
  });

  return res.send(updatedCompany);
}

export async function getCompanyHandler(
  req: Request<UpdateCompanyInput["params"]>,
  res: Response
) {
  const companyId = req.params.companyId;
  const company = await findCompany( { companyId });

  if ( !company ) {
    return res.sendStatus(404);
  }

  return res.send( company );
}

export async function deleteCompanyHandler(
  req: Request<UpdateCompanyInput["params"]>,
  res: Response
) {
  const userId = res.locals.user._id;
  const companyId = req.params.companyId;

  const company = await findCompany( { companyId });

  if (!company) {
    return res.sendStatus(404);
  }

  if ( String( company.user) !== userId) {
    return res.sendStatus(403);
  }

  await deleteCompany({companyId });

  return res.sendStatus(200);
}

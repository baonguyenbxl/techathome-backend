import { object, number, string, TypeOf } from "zod";

/**
 * @openapi
 * components:
 *   schema:
 *     Product:
 *       type: object
 *       required:
 *        - title
 *        - description
 *        - price
 *        - image
 *       properties:
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         price:
 *           type: number
 *         image:
 *           type: string
 */

const payload = {
  body: object({
    title: string({
      required_error: "Title is required",
    }),
    description: string({
      required_error: "Description is required",
    }).min(120, "Description should be at least 120 characters long"),
    price: number({
      required_error: "Price is required",
    }),
    image: string({
      required_error: "Image is required",
    }),
  }),
};

const params = {
  params: object({
    paymentId: string({
      required_error: "paymentId is required",
    }),
  }),
};

export const createimport { Request, Response } from "express";
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
Schema = object({
  ...payload,
});

export const updateProductSchema = object({
  ...payload,
  ...params,
});

export const deleteProductSchema = object({
  ...params,
});

export const getProductSchema = object({
  ...params,
});

export type CreateProductInput = TypeOf<typeof createProductSchema>;
export type UpdateProductInput = TypeOf<typeof updateProductSchema>;
export type ReadProductInput = TypeOf<typeof getProductSchema>;
export type DeleteProductInput = TypeOf<typeof deleteProductSchema>;

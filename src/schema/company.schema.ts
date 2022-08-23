import { object, number, string, TypeOf } from "zod";

/**
 * @openapi
 * components:
 *   schema:
 *     Company:
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
    companyId: string({
      required_error: "companyId is required",
    }),
  }),
};

export const createCompanySchema = object({
  ...payload,
});

export const updateCompanySchema = object({
  ...payload,
  ...params,
});

export const deleteCompanySchema = object({
  ...params,
});

export const getCompanySchema = object({
  ...params,
});

export type CreateCompanyInput = TypeOf<typeof createCompanySchema>;
export type UpdateCompanyInput = TypeOf<typeof updateCompanySchema>;
export type ReadCompanyInput = TypeOf<typeof getCompanySchema>;
export type DeleteCompanyInput = TypeOf<typeof deleteCompanySchema>;

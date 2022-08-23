import { object, number, string, TypeOf } from "zod";

/**
 * @openapi
 * components:
 *   schema:
 *     Location:
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
    locationId: string({
      required_error: "locationId is required",
    }),
  }),
};

export const createLocationSchema = object({
  ...payload,
});

export const updateLocationSchema = object({
  ...payload,
  ...params,
});

export const deleteLocationSchema = object({
  ...params,
});

export const getLocationSchema = object({
  ...params,
});

export type CreateLocationInput = TypeOf<typeof createLocationSchema>;
export type UpdateLocationInput = TypeOf<typeof updateLocationSchema>;
export type ReadLocationInput = TypeOf<typeof getLocationSchema>;
export type DeleteLocationInput = TypeOf<typeof deleteLocationSchema>;

import { object, number, string, TypeOf } from "zod";

/**
 * @openapi
 * components:
 *   schema:
 *     Account:
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
    accountId: string({
      required_error: "accountId is required",
    }),
  }),
};

export const createAccountSchema = object({
  ...payload,
});

export const updateAccountSchema = object({
  ...payload,
  ...params,
});

export const deleteAccountSchema = object({
  ...params,
});

export const getAccountSchema = object({
  ...params,
});

export type CreateAccountInput = TypeOf<typeof createAccountSchema>;
export type UpdateAccountInput = TypeOf<typeof updateAccountSchema>;
export type ReadAccountInput = TypeOf<typeof getAccountSchema>;
export type DeleteAccountInput = TypeOf<typeof deleteAccountSchema>;

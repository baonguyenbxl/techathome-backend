import { Request, Response } from "express";
import {
  CreatePaymentInput,
  UpdatePaymentInput,
} from "../schema/payment.schema";
import {
  createPayment,
  deletePayment,
  findAndUpdatePayment,
  findPayment,
} from "../service/payment.service";

export async function createPaymentHandler(
  req: Request<{}, {}, CreatePaymentInput["body"]>,
  res: Response
) {
  const userId = res.locals.user._id;

  const body = req.body;

  const payment = await createPayment({ ...body, user: userId });

  return res.send(payment);
}

export async function updatePaymentHandler(
  req: Request<UpdatePaymentInput["params"]>,
  res: Response
) {
  const userId = res.locals.user._id;

  const paymentId = req.params.paymentId;
  const update = req.body;

  const payment = await findPayment({ paymentId });

  if (!payment) {
    return res.sendStatus(404);
  }

  if (String(payment.user) !== userId) {
    return res.sendStatus(403);
  }

  const updatedPayment = await findAndUpdatePayment({ paymentId }, update, {
    new: true,
  });

  return res.send(updatedPayment);
}

export async function getPaymentHandler(
  req: Request<UpdatePaymentInput["params"]>,
  res: Response
) {
  const paymentId = req.params.paymentId;
  const payment = await findPayment({ paymentId });

  if (!payment) {
    return res.sendStatus(404);
  }

  return res.send(payment);
}

export async function deletePaymentHandler(
  req: Request<UpdatePaymentInput["params"]>,
  res: Response
) {
  const userId = res.locals.user._id;
  const paymentId = req.params.paymentId;

  const payment = await findPayment({ paymentId });

  if (!payment) {
    return res.sendStatus(404);
  }

  if (String(payment.user) !== userId) {
    return res.sendStatus(403);
  }

  await deletePayment({ paymentId });

  return res.sendStatus(200);
}

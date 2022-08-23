import { Request, Response } from "express";
import {
  CreateAccountInput,
  UpdateAccountInput,
} from "../schema/account.schema";
import {
  createAccount,
  deleteAccount,
  findAndUpdateAccount,
  findAccount,
} from "../service/account.service";

export async function createAccountHandler(
  req: Request<{}, {}, CreateAccountInput["body"]>,
  res: Response
) {
  const userId = res.locals.user._id;

  const body = req.body;

  const account = await createAccount({ ...body, user: userId });

  return res.send(account);
}

export async function updateAccountHandler(
  req: Request<UpdateAccountInput["params"]>,
  res: Response
) {
  const userId = res.locals.user._id;

  const accountId = req.params.accountId;
  const update = req.body;

  const account = await findAccount({ accountId });

  if (!account) {
    return res.sendStatus(404);
  }

  if ( String( account.user) !== userId) {
    return res.sendStatus(403);
  }

  const updatedAccount = await findAndUpdateAccount( { accountId }, update, {
    new: true,
  });

  return res.send(updatedAccount);
}

export async function getAccountHandler(
  req: Request<UpdateAccountInput["params"]>,
  res: Response
) {
  const accountId = req.params.accountId;
  const account = await findAccount( { accountId });

  if ( !account ) {
    return res.sendStatus(404);
  }

  return res.send( account );
}

export async function deleteAccountHandler(
  req: Request<UpdateAccountInput["params"]>,
  res: Response
) {
  const userId = res.locals.user._id;
  const accountId = req.params.accountId;

  const account = await findAccount({ accountId });

  if ( !account ) {
    return res.sendStatus(404);
  }

  if ( String( account.user) !== userId) {
    return res.sendStatus(403);
  }

  await deleteAccount( { accountId });

  return res.sendStatus(200);
}

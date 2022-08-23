import { Request, Response } from "express";
import
  {
    CreateJobInput,
    UpdateJobInput,
  } from "../schema/job.schema";
import
  {
    createJob,
    deleteJob,
    findAndUpdateJob,
    findJob,
  } from "../service/job.service";

export async function createJobHandler (
  req: Request<{}, {}, CreateJobInput[ "body" ]>,
  res: Response
)
{
  const userId = res.locals.user._id;

  const body = req.body;

  const job = await createJob( { ...body, user: userId } );

  return res.send( job );
}

export async function updateJobHandler (
  req: Request<UpdateJobInput[ "params" ]>,
  res: Response
)
{
  const userId = res.locals.user._id;

  const JobId = req.params.JobId;
  const update = req.body;

  const job = await findJob( { JobId } );

  if ( !job )
  {
    return res.sendStatus( 404 );
  }

  if ( String( job.user ) !== userId )
  {
    return res.sendStatus( 403 );
  }

  const updatedJob = await findAndUpdateJob( { JobId }, update, {
    new: true,
  } );

  return res.send( updatedJob );
}

export async function getJobHandler (
  req: Request<UpdateJobInput[ "params" ]>,
  res: Response
)
{
  const JobId = req.params.JobId;
  const job = await findJob( { JobId } );

  if ( !job )
  {
    return res.sendStatus( 404 );
  }

  return res.send( job );
}

export async function deleteJobHandler (
  req: Request<UpdateJobInput[ "params" ]>,
  res: Response
)
{
  const userId = res.locals.user._id;
  const JobId = req.params.JobId;

  const job = await findJob( { JobId } );

  if ( !job )
  {
    return res.sendStatus( 404 );
  }

  if ( String( job.user ) !== userId )
  {
    return res.sendStatus( 403 );
  }

  await deleteJob( { JobId } );

  return res.sendStatus( 200 );
}

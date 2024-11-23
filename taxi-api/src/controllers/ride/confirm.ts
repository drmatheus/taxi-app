import { Request, Response } from 'express';
import { ConfirmRideDTO } from '../../dtos/ride/confirmRideDTO';
import rideConfirmService from '../../services/ride/confirm';

async function rideConfirmController(req: Request, res: Response) {
  const rideData = res.locals as ConfirmRideDTO;

  const confirmation = await rideConfirmService(rideData);

  return res.status(200).json(confirmation);
}

export default rideConfirmController;

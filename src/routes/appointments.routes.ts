import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import { parseISO } from 'date-fns';

import AppointmentRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const appointmentRouter = Router();
// const appointmentsRepository = new AppointmentRepository();

appointmentRouter.use(ensureAuthenticated);

appointmentRouter.get('/', async (request, response) => {
  const appointmentsRepository = getCustomRepository(AppointmentRepository);

  const appointments = await appointmentsRepository.find();

  return response.json(appointments);
});

appointmentRouter.post('/', async (request, response) => {
  const { provider_id, date } = request.body;
  const parsedDate = parseISO(date);

  const createAppointment = new CreateAppointmentService();
  // const createAppointment = new CreateAppointmentService(appointmentsRepository);

  // const appointment = createAppointment.execute({
  //   date: parsedDate,
  //   provider,
  // });
  const appointment = await createAppointment.execute({
    date: parsedDate,
    provider_id,
  });

  return response.json(appointment);
});

export default appointmentRouter;

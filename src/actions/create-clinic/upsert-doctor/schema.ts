import { z } from "zod";

export const upsertDoctorSchema = z
  .object({
    id: z.string().uuid().optional(),
    clinicId: z.string().uuid().optional(),
    name: z.string().trim().min(1, { message: "Nome é obrigatório" }),
    speciality: z
      .string()
      .trim()
      .min(1, { message: "Especialidade é obrigatória" }),
    appointmentPriceInCents: z
      .number()
      .min(1, { message: "Preço é obrigatório" }),

    availableFromWeekday: z
      .number()
      .min(0)
      .max(6, { message: "Dia inicial é obrigatório" }),

    availableToWeekday: z.number().min(0).max(6, {
      message: "Dia final é obrigatório",
    }),

    availableFromTime: z
      .string()
      .min(1, { message: "Horário de início é obrigatório" }),

    availableToTime: z
      .string()
      .min(1, { message: "Horário de término é obrigatório" }),
  })
  .refine(
    (data) => {
      return data.availableFromTime < data.availableToTime;
    },
    {
      message: "Horário de início deve ser anterior ao horário de término",
      path: ["availableToTime"],
    },
  )
  .refine(
    (data) => {
      return data.availableFromWeekday < data.availableToWeekday;
    },
    {
      message: "Dia inicial deve ser anterior ao dia final",
      path: ["availableToWeekday"],
    },
  );

export type upsertDoctorSchema = z.infer<typeof upsertDoctorSchema>;

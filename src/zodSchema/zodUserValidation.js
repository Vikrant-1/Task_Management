import zod from "zod";
export const zodUserSignUp = zod.object({
  firstname: zod.string().min(3, "").max(50),
  lastname: zod.string().min(3, "").max(50),
  username: zod.string().min(3).max(50),
  password: zod.string().min(6).max(15),
});

zodUserSignUp.required({
  firstname: true,
  lastname: true,
  username: true,
  password: true,
});

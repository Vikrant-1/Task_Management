import zod from "zod";
export const zodUserRegisterValidation = zod.object({
  firstname: zod.string().min(3, "").max(50),
  lastname: zod.string().min(3, "").max(50),
  username: zod.string().min(3).max(50),
  password: zod.string().min(6).max(15),
});

zodUserRegisterValidation.required({
  firstname: true,
  lastname: true,
  username: true,
  password: true,
});

export const zodUserLoginValidation = zod.object({
  username: zod.string().min(3).max(50),
  password: zod.string().min(6).max(15),
}).required({username:true, password:true});

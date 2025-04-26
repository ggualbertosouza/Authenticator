type CreateUserInputDto = {
  name: string;
  email: string;
  password: string;
};

type UpdateUserInputDto = {
  name?: string;
  email?: string;
};

export { CreateUserInputDto, UpdateUserInputDto };

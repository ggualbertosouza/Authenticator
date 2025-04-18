class CreateUserInputDto {
  // #TODO Sanitização aqui
  constructor(
    public readonly name: string,
    public readonly email: string,
    public readonly password: string,
  ) {}
}

export { CreateUserInputDto };

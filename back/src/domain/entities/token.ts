class RefreshToken {
  private constructor(
    private readonly _id: string | undefined,
    private readonly _token: string,
    private readonly _userId: string,
    private readonly _expiresAt: Date
  ) {}

  public static create(input: {
    token: string;
    userId: string;
    expiresAt: Date;
  }): RefreshToken {
    return new RefreshToken(
      undefined,
      input.token,
      input.userId,
      input.expiresAt
    );
  }

  public isExpired(): boolean {
    return new Date() > this._expiresAt;
  }

  public toJSON() {
    return {
      id: this._id,
      token: this._token,
      userId: this._userId,
      expiresAt: this._expiresAt,
    };
  }
}

export default RefreshToken;

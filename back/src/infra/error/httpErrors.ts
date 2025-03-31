class HttpError extends Error {
  status: number;
  messageKey: string;
  name: string;

  constructor(status: number, messageKey: string) {
    super(messageKey);
    this.status = status;
    this.messageKey = messageKey;
    this.name = messageKey;
  }
}

export default HttpError;

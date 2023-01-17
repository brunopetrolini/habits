export class NotificationNonCanceledError extends Error {
  constructor() {
    super("This notification isn't cancelled.");
    this.name = NotificationNonCanceledError.name;
  }
}

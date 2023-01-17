export class NotificationAlreadyCanceledError extends Error {
  constructor() {
    super('This notification already cancelled.');
    this.name = NotificationAlreadyCanceledError.name;
  }
}

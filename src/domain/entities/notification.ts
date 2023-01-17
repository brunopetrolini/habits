import {
  NotificationAlreadyCanceledError,
  NotificationNonCanceledError,
} from '@domain/errors';
import { randomUUID } from 'crypto';

interface NotificationCtor {
  id?: string;
  recipientId: string;
  content: string;
  category: string;
}

export class Notification {
  private _id: string;
  public recipientId: string;
  public content: string;
  public category: string;
  private _readAt: Date | null;
  private _canceledAt: Date | null;
  private _createdAt: Date;

  constructor(ctor: NotificationCtor) {
    this._id = ctor.id ? ctor.id : randomUUID();
    this.recipientId = ctor.recipientId;
    this.content = ctor.content;
    this.category = ctor.category;
    this._readAt = null;
    this._canceledAt = null;
    this._createdAt = new Date();
  }

  public get id(): string {
    return this._id;
  }

  public get createdAt(): Date {
    return this._createdAt;
  }

  public get canceledAt(): Date | null {
    return this._canceledAt;
  }

  public get readAt(): Date | null {
    return this._readAt;
  }

  public read(): void {
    this._readAt = new Date();
  }

  public unread(): void {
    this._readAt = null;
  }

  public cancel(): void {
    if (this._canceledAt) {
      throw new NotificationAlreadyCanceledError();
    }
    this._canceledAt = new Date();
  }

  public uncanceled(): void {
    if (!this._canceledAt) {
      throw new NotificationNonCanceledError();
    }
    this._canceledAt = null;
  }
}

import { Notification } from '@domain/entities';
import {
  NotificationAlreadyCanceledError,
  NotificationNonCanceledError,
} from '@domain/errors';

describe('Notification Entity', () => {
  it('should be able to create a notification', () => {
    const notification = new Notification({
      recipientId: 'any-recipient-id',
      content: 'any-content',
      category: 'any-category',
    });

    expect(notification).toBeTruthy();
    expect(notification).toHaveProperty('id');
    expect(notification.createdAt).toEqual(expect.any(Date));
  });

  it('it should not be create a new id  when one has already been informed', () => {
    const notification = new Notification({
      id: 'any-notification-id',
      recipientId: 'any-recipient-id',
      content: 'any-content',
      category: 'any-category',
    });

    expect(notification.id).toBe('any-notification-id');
  });

  it('should be able to cancel a notification', () => {
    const notification = new Notification({
      recipientId: 'any-recipient-id',
      content: 'any-content',
      category: 'any-category',
    });

    notification.cancel();

    expect(notification.canceledAt).toEqual(expect.any(Date));
  });

  it('should not be able to cancel a notification that has already been cancelled', () => {
    const notification = new Notification({
      recipientId: 'any-recipient-id',
      content: 'any-content',
      category: 'any-category',
    });

    notification.cancel();

    expect(() => notification.cancel()).toThrow(
      NotificationAlreadyCanceledError,
    );
  });

  it('should be able to revert a notification cancel', () => {
    const notification = new Notification({
      recipientId: 'any-recipient-id',
      content: 'any-content',
      category: 'any-category',
    });

    notification.cancel();
    notification.uncanceled();

    expect(notification.canceledAt).toBeNull();
  });

  it('should not be able to revert a notification cancel that has not been cancelled', () => {
    const notification = new Notification({
      recipientId: 'any-recipient-id',
      content: 'any-content',
      category: 'any-category',
    });

    expect(() => notification.uncanceled()).toThrow(
      NotificationNonCanceledError,
    );
  });

  it('should be able to read a notification', () => {
    const notification = new Notification({
      recipientId: 'any-recipient-id',
      content: 'any-content',
      category: 'any-category',
    });

    notification.read();

    expect(notification.readAt).toEqual(expect.any(Date));
  });

  it('should be able to unread a notification', () => {
    const notification = new Notification({
      recipientId: 'any-recipient-id',
      content: 'any-content',
      category: 'any-category',
    });

    notification.unread();

    expect(notification.readAt).toBeNull();
  });
});

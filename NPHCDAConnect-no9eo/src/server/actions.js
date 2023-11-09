import HttpError from '@wasp/core/HttpError.js'

export const createMessage = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const message = await context.entities.Message.create({
    data: {
      content: args.content,
      receiverId: args.receiverId,
      isRead: false,
      userId: context.user.id
    }
  });

  return message;
}

export const markMessageAsRead = async ({ messageId }, context) => {
  if (!context.user) { throw new HttpError(401) };

  const message = await context.entities.Message.findUnique({
    where: { id: messageId }
  });

  message.isRead = true;

  return context.entities.Message.update({
    where: { id: messageId },
    data: { isRead: true }
  });
}

export const uploadDocument = async ({ name, file }, context) => {
  if (!context.user) { throw new HttpError(401) }

  const ownerId = context.user.id;
  const createdDocument = await context.entities.Document.create({
    data: {
      name,
      file,
      ownerId
    }
  });

  return createdDocument;
}
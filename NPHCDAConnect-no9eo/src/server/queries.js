import HttpError from '@wasp/core/HttpError.js'

export const getUser = async ({ userId }, context) => {
  if (!context.user) { throw new HttpError(401) };

  const user = await context.entities.User.findUnique({
    where: { id: userId }
  });

  if (!user) throw new HttpError(404, 'No user with id ' + userId);

  return user;
}

export const getMessages = async ({ userId }, context) => {
  if (!context.user) { throw new HttpError(401) }

  return context.entities.Message.findMany({
    where: { userId }
  });
}

export const getDocuments = async ({userId}, context) => {
  if (!context.user) { throw new HttpError(401) };

  return context.entities.Document.findMany({
    where: {
      ownerId: userId
    }
  });
}
import { builder } from '../builder.js';
import { findCurrentUser } from '../../data/users.js';

const User = builder.objectRef<{
  id: string;
  name: string;
  email: string;
}>('User');

User.implement({
  fields: (t) => ({
    id: t.exposeID('id'),
    name: t.exposeString('name'),
    email: t.exposeString('email'),
  }),
});

builder.queryFields((t) => ({
  me: t.field({
    type: User,
    nullable: true,
    resolve: async () => {
      return findCurrentUser();
    },
  }),
  requestId: t.string({
    resolve: (_parent, _args, context) => context.requestId,
  }),
  user: t.field({
    type: User,
    nullable: true,
    args: {
      id: t.arg.id({ required: true }),
    },
    resolve: async (_parent, args, context) => {
      return context.loaders.userById.load(args.id.toString());
    },
  }),
}));

import { Schema as S, type ClientSchema } from "@triplit/client";

export const schema = {
  todos: {
    schema: S.Schema({
      id: S.Id(),
      text: S.String(),
      completed: S.Boolean({ default: false }),
      created_at: S.Date({ default: S.Default.now() }),
    }),
  },
} satisfies ClientSchema;

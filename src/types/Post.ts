import { Prisma } from "@prisma/client";

export type Post = Prisma.PostGetPayload<{
  include: {
    author?: true;
    bookmarks?: true;
  };
}>;

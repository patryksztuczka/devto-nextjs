import { type NextApiRequest, type NextApiResponse } from "next";

import { prisma } from "../../server/db";

const create = async (req: NextApiRequest, res: NextApiResponse) => {
  const { title, body, authorId, published } = req.body;

  await prisma.post.create({
    data: {
      title,
      body,
      author: {
        connect: {
          id: authorId,
        },
      },
      published,
    },
  });

  res.status(200);
};

export default create;

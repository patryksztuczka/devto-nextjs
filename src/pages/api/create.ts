import { type NextApiRequest, type NextApiResponse } from "next";

import { prisma } from "../../server/db";

const create = async (req: NextApiRequest, res: NextApiResponse) => {
  const { title, body, authorId, published } = req.body;

  try {
    const post = await prisma.post.create({
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

    res.status(200).send(post);
  } catch (error) {
    console.log(error);
  }
};

export default create;

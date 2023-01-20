import { type NextApiRequest, type NextApiResponse } from "next";

import { prisma } from "../../../server/db";

const posts = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const posts = await prisma.post.findMany({
      where: {
        published: true,
      },
      include: {
        author: true,
      },
    });

    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
  }
};

export default posts;

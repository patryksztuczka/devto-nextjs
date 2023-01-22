import { type NextApiRequest, type NextApiResponse } from "next";

import { prisma } from "../../../server/db";

const post = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const post = await prisma.post.findFirst({
      where: {
        id: req.query.postId as string,
      },
      include: {
        author: true,
        bookmarks: true,
      },
    });

    res.status(200).json(post);
  } catch (error) {
    console.log(error);
  }
};

export default post;

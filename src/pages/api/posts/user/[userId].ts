import { type NextApiRequest, type NextApiResponse } from "next";

import { prisma } from "../../../../server/db";

const userPosts = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const posts = await prisma.post.findMany({
      where: {
        authorId: req.query.userId as string,
      },
      include: {
        author: true,
        bookmarks: true,
      },
    });

    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
  }
};

export default userPosts;

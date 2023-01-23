import { type NextApiRequest, type NextApiResponse } from "next";

import { prisma } from "../../../../server/db";

const followersCount = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const bookmarksCount = await prisma.postFollower.aggregate({
      _count: {
        userId: true,
      },
      where: {
        postId: {
          equals: req.query.postId as string,
        },
      },
    });

    res.status(200).json(bookmarksCount._count.userId);
  } catch (error) {
    console.log(error);
  }
};

export default followersCount;

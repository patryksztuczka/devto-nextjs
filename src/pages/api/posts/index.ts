import { type NextApiRequest, type NextApiResponse } from "next";

import { prisma } from "../../../server/db";

const posts = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log("BODY", req.query);
  try {
    const getPosts = async () => {
      return await prisma.post.findMany({
        skip: Number(req.query.skip),
        take: 10,
        where: {
          published: true,
        },
        include: {
          author: true,
          bookmarks: true,
        },
      });
    };

    const getTotalRows = async () => {
      return await prisma.post.aggregate({
        _count: {
          published: true,
        },
        where: {
          published: true,
        },
      });
    };

    const [posts, total] = await Promise.allSettled([
      getPosts(),
      getTotalRows(),
    ]);

    res.status(200).json({ posts, total });
  } catch (error) {
    console.log(error);
  }
};

export default posts;

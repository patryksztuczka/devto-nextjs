import { type NextApiRequest, type NextApiResponse } from "next";

import { prisma } from "../../../server/db";

const search = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const posts = await prisma.post.findMany({
      where: {
        published: true,
        title: {
          search: req.query.title as string,
        },
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

export default search;

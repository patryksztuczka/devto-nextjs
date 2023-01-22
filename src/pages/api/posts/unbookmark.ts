import { type NextApiRequest, type NextApiResponse } from "next";

import { prisma } from "../../../server/db";

const unbookmark = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const bookmark = await prisma.postFollower.delete({
      where: {
        postId_userId: {
          ...req.body,
        },
      },
    });

    res.status(200).json(bookmark);
  } catch (error) {
    console.log(error);
  }
};

export default unbookmark;

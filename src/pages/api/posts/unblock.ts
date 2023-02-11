import { type NextApiRequest, type NextApiResponse } from "next";

import { prisma } from "../../../server/db";

const unblock = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const unblock = await prisma.post.update({
      where: {
        id: req.body.postId,
      },
      data: {
        blocked: false,
      },
    });

    res.status(200).json(unblock);
  } catch (error) {
    console.log(error);
  }
};

export default unblock;

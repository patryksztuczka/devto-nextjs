import { type NextApiRequest, type NextApiResponse } from "next";

import { prisma } from "../../../server/db";

const block = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const block = await prisma.post.update({
      where: {
        id: req.body.postId,
      },
      data: {
        blocked: true,
      },
    });

    res.status(200).json(block);
  } catch (error) {
    console.log(error);
  }
};

export default block;

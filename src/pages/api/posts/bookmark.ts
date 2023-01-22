import { type NextApiRequest, type NextApiResponse } from "next";

import { prisma } from "../../../server/db";

const bookmark = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log("bookmark post", req.body);
  try {
    const bookmark = await prisma.postFollower.create({
      data: {
        ...req.body,
      },
    });

    res.status(200).json(bookmark);
  } catch (error) {
    console.log(error);
  }
};

export default bookmark;

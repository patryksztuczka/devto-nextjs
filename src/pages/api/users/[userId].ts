import { type NextApiRequest, type NextApiResponse } from "next";

import { prisma } from "../../../server/db";

const getUser = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId } = req.query;

  try {
    const user = await prisma.user.findFirst({
      where: {
        id: {
          equals: userId as string,
        },
      },
    });

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
};

export default getUser;

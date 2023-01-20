import { type NextApiRequest, type NextApiResponse } from "next";

import { prisma } from "../../../server/db";

const users = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const users = await prisma.user.findMany();

    res.status(200).json(users);
  } catch (error) {
    console.log(error);
  }
};

export default users;

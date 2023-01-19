import React from "react";
import axios from "axios";
import { User } from "@prisma/client";

import { prisma } from "../../server/db";

export async function getStaticPaths() {
  try {
    const response = await prisma.user.findMany();

    const paths = response.map((user: User) => ({
      params: { userId: user.id.toString() },
    }));

    return {
      paths,
      fallback: true,
    };
  } catch (error) {
    console.log(error);
  }
}

export async function getStaticProps({ params }: any) {
  try {
    const user = await prisma.user.findFirst({
      where: {
        id: {
          equals: params.userId,
        },
      },
    });

    return {
      props: {
        user,
      },
    };
  } catch (error) {
    console.log(error);
  }
}

const ProfilePage = ({ user }: any) => {
  return <div>{`Profile page of ${user.name}`}</div>;
};

export default ProfilePage;

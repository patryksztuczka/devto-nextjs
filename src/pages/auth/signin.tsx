import React from "react";
import { getProviders, signIn } from "next-auth/react";
import GoogleIcon from "../../assets/icons/GoogleIcon";

export async function getServerSideProps(context: any) {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}

const SignIn = ({ providers }: any) => {
  return (
    <div className="flex h-[calc(100vh-56px)] bg-gray-100">
      <div className="flex h-fit w-full flex-col gap-8 bg-white p-5 shadow-shadow1">
        <h1 className="text-center text-2xl font-bold">
          Welcome to DEV Community
        </h1>
        {Object.values(providers).map((provider: any) => (
          <main key={provider.name} className="max-w-xl">
            <div
              onClick={() => signIn(provider.id)}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-md bg-red-400 font-semibold text-white"
            >
              <div className="h-6 w-6">
                <GoogleIcon />
              </div>
              Continue with {provider.name}
            </div>
          </main>
        ))}
      </div>
    </div>
  );
};

export default SignIn;

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";

import BarsIcon from "../../assets/icons/BarsIcon";
import SearchIcon from "../../assets/icons/SearchIcon";
import Button from "../Button/Button";
import UserDropdown from "../UserDropdown/UserDropdown";

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-10 flex h-14 items-center justify-center bg-white px-4 shadow-header">
      <div className="flex w-full justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-10 w-10 cursor-pointer items-center justify-center rounded hover:bg-blue-200">
            <div className="h6 w-6">
              <BarsIcon />
            </div>
          </div>
          <Link href="/">
            <Image
              src="https://dev-to-uploads.s3.amazonaws.com/uploads/logos/resized_logo_UQww2soKuUsjaOGNB38o.png"
              alt="logo"
              width={50}
              height={40}
            />
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/search"
            className="flex h-10 w-10 items-center justify-center"
          >
            <div className="flex h-10 w-10 cursor-pointer items-center justify-center rounded hover:bg-blue-200">
              <div className="h-6 w-6">
                <SearchIcon />
              </div>
            </div>
          </Link>
          {!session && (
            <Link href="/auth/signin">
              <Button text="Log in" />
            </Link>
          )}
          {session && <UserDropdown />}
        </div>
      </div>
    </header>
  );
};

export default Navbar;

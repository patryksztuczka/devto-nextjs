import Image from "next/image";
import Link from "next/link";
import React from "react";
import BarsIcon from "../../assets/icons/BarsIcon";
import SearchIcon from "../../assets/icons/SearchIcon";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-10 flex h-14 items-center justify-center bg-white px-4 shadow-header">
      <div className="flex w-full justify-between">
        <div className="flex items-center gap-4">
          <div className="h-6 w-6">
            <BarsIcon />
          </div>
          <Image
            src="https://dev-to-uploads.s3.amazonaws.com/uploads/logos/resized_logo_UQww2soKuUsjaOGNB38o.png"
            alt="logo"
            width={50}
            height={40}
          />
        </div>
        <div className="flex">
          <Link
            href="/search"
            className="flex h-10 w-10 items-center justify-center"
          >
            <div className="h-6 w-6">
              <SearchIcon />
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

import React, { useState, useRef } from "react";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

import profileImagePlaceholder from "../../assets/images/profile-image-placeholder.png";
import { useDetectOutsideClick } from "../../hooks/useDetectOutsideClick";
import { userMenuOptions } from "../../constants/constants";

const UserDropdown = () => {
  const { data: session } = useSession();

  const dropdownRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleDropdownToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleDropdownClose = () => {
    setIsOpen(false);
  };

  useDetectOutsideClick(dropdownRef, handleDropdownClose);

  return (
    <div ref={dropdownRef} className="relative">
      <div
        className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full hover:bg-blue-200"
        onClick={handleDropdownToggle}
      >
        <Image
          src={session?.user?.image || profileImagePlaceholder}
          alt="profile image"
          width={32}
          height={32}
          className="rounded-full"
        />
      </div>
      {isOpen && (
        <div className="absolute top-14 right-0 w-64 rounded bg-white p-2">
          <div className="border-b pb-2">
            <Link href={`/user/${session?.user?.id}`}>
              <div className="cursor-pointer rounded p-2 font-semibold hover:bg-blue-200 hover:text-blue-700 hover:underline">
                {session?.user?.name}
              </div>
            </Link>
          </div>
          <div className="border-b py-2">
            {userMenuOptions.map((option) => (
              <Link href={option.route}>
                <div className="cursor-pointer rounded p-2 hover:bg-blue-200 hover:text-blue-700 hover:underline">
                  {option.label}
                </div>
              </Link>
            ))}
          </div>
          <div className="pt-2">
            <div
              className="cursor-pointer rounded p-2 hover:bg-blue-200 hover:text-blue-700 hover:underline"
              onClick={() => signOut()}
            >
              Sign Out
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;

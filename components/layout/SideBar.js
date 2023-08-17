import { signOut, useSession } from "next-auth/react";
import { FiChevronDown } from 'react-icons/fi';
import { useRouter } from "next/router";
import React, { useState, Fragment } from 'react';

function SideBar() {
  const { data: session, status } = useSession();
  const router = useRouter();

  function handleLogout() {
    localStorage.removeItem("concerts");
    localStorage.removeItem("location");
    localStorage.removeItem("radius");
    signOut();
    router.push("/login");
  }

  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const handleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <Fragment>
    {session && session.user && (
        <div className="relative">
            <button 
                className="bg-white shadow-sm hover:bg-gray-400 text-gray-900 font-bold rounded-full flex items-center h-[5vh] min-h-[30px] transition duration-300"
                onClick={handleDropdown}
            >
                <div className="flex items-center">
                    <div className="w-1/3 mr-[0.6vw] ml-[0.6vw]">
                        <img className="rounded-full h-[1.8vw] w-[1.8vw] min-h-[1.5rem] min-w-[1.5rem]" src={session.user.image} alt={session.user.name} />
                    </div>
                    <div className="w-1/3 mr-[0.15vw]">
                        <span>{session.user.name.split(" ")[0]}</span>
                    </div>
                    <div className="w-1/3 mr-[0.3vw]">
                        <FiChevronDown className="ml-2" />
                    </div>
                </div>
            </button>
            {isDropdownOpen && 
            <div className="absolute top-full mt-2 right-0 bg-white border rounded-md shadow-lg z-10">
                <button className="block px-4 py-2 hover:bg-gray-200" onClick={handleLogout}>
                    Logout
                </button>
            </div>}
        </div>
    )}
    </Fragment>
  )
}

export default SideBar;


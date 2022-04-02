import Image from "next/image";
import HeaderIcon from "./HeaderIcon"
import { BellIcon, ChatIcon, ChevronDownIcon, HomeIcon, UserGroupIcon, ViewGridIcon } from "@heroicons/react/solid"
import { FlagIcon, PlayIcon, SearchIcon, ShoppingCartIcon } from "@heroicons/react/outline"

import { signOut, useSession } from "next-auth/react";


function Header() {
    const { data: session } = useSession();
    return (
        <div className="sticky top-0 z-50 bg-white flex items-center p-2 lg:px-5 shadow-md">
            {/* left */}
            <div className="flex items-center">
                <Image src="https://links.papareact.com/5me" width={40} height={40} alt="ggg" layout="fixed" />
                <div className="flex ml-2 items-center rounded-full bg-gray-100 p-2">
                    <SearchIcon className="h-6 text-gray-600" />
                    <input className="hidden md:inline-flex flex ml-2 items-center bg-transparent outline-none" type="text" placeholder="Search Facebook" />
                </div>
            </div>

            {/* Center */}
            <div className="flex justify-center flex-grow">
                <div className="flex space-x-6 md:space-x-2">
                    <HeaderIcon active Icon={HomeIcon} />
                    <HeaderIcon Icon={FlagIcon} />
                    <HeaderIcon Icon={PlayIcon} />
                    <HeaderIcon Icon={ShoppingCartIcon} />
                    <HeaderIcon Icon={UserGroupIcon} />

                </div>
            </div>
            {/* Right */}
            <div className="flex items-center sm:space-x-2 justify-end">
                {/* progile pic */}

                <Image onClick={signOut} className=" rounded-full cursor-pointer" src={session.user.image} width={40} height={40} layout="fixed" alt="gg" />

                <p className="whitespace-nowrap font-semibold pr-3">{session.user.name}</p>
                <BellIcon className="icon" />
                <ChatIcon className="icon" />
                <ChevronDownIcon className="icon" />
                <ViewGridIcon className="icon" />
            </div>
        </div>
    )
};
export default Header;
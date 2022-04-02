import { useSession } from "next-auth/react"
import { BellIcon, CalendarIcon, ChatIcon, ChevronDownIcon, ClockIcon, DesktopComputerIcon, HomeIcon, ShoppingBagIcon, UserGroupIcon, UserIcon, ViewGridIcon } from "@heroicons/react/solid"
import { FlagIcon, PlayIcon, SearchIcon, ShoppingCartIcon } from "@heroicons/react/outline"

import SidebarRow from "./SidebarRow";

function Sidebar() {
    const { data: session } = useSession();

    return (
        <div className="p-2 mt-5 max-w-[600px] xl:min-w-[300px]">
            <SidebarRow src={session.user.image} title={session.user.name} />
            <SidebarRow Icon={UserIcon} title="친구" />
            <SidebarRow Icon={UserGroupIcon} title="그룹" />
            <SidebarRow Icon={ShoppingBagIcon} title="마켓플레이스" />
            <SidebarRow Icon={DesktopComputerIcon} title="Watch" />
            <SidebarRow Icon={CalendarIcon} title="이벤트" />
            <SidebarRow Icon={ClockIcon} title="최신" />
            <SidebarRow Icon={ChevronDownIcon} title="친구" />
        </div>
    )
}

export default Sidebar
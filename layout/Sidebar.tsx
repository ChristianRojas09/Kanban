import BoardsList from "@/components/BoardsList";
import ToggleTheme from "@/components/ToggleTheme";
import { useBoard } from "@/hooks/useBoard";
import { useDispatch } from "react-redux";
import { selectSidebar, toggleSidebar } from "@/store/uiSlice";
import { useSelector } from "react-redux";
import { IconAntennaBars1 } from "@tabler/icons-react";

const Sidebar = () => {
  const boards = useBoard({ boards: [] });
  const dispatch = useDispatch();
  const sidebarIsOpen = useSelector(selectSidebar);
  return (
    <div className="w-[260px]  md:w-[300px] border-r border-r-gray1  dark:border-r-black1 relative  hidden sm:inline-block ">
      <BoardsList boards={boards} />
      <div className="absolute bottom-12 w-full px-4 space-y-4">
        <ToggleTheme />
        <div
          className=" text-gray3 flex items-center gap-x-4 mx-auto  cursor-pointer"
          onClick={() => dispatch(toggleSidebar())}
        >
          <IconAntennaBars1 />
          <h3 className="">Hide Sidebar</h3>
        </div>
      </div>
      {!sidebarIsOpen && (
        <div
          className="fixed bottom-9 bg-[#31363F]  px-5 py-4 rounded-r-full cursor-pointer hover:bg-primary1 transition left-0"
          onClick={() => dispatch(toggleSidebar())}
        >
          <IconAntennaBars1 />
        </div>
      )}
    </div>
  );
};

export default Sidebar;

import { useDispatch, useSelector } from "react-redux";
import Button from "../components/UI/Button";
import Dropdown from "@/components/UI/Dropdown";
import { selectBoard, setActiveModal } from "@/store/uiSlice";
import ModalEnum from "@/model/ModalEnum";
import { useQuery } from "@tanstack/react-query";
import Board from "@/model/Board";
import { IconChevronDown, IconDeviceMobile, IconMoonStars, IconPlus, IconSun } from "@tabler/icons-react";

const Header = () => {
  const dispatch = useDispatch();
  const { data } = useQuery<{ boards: Board[] }>({ queryKey: ["boards"] });
  const activeBoard = useSelector(selectBoard);
  const isDisables =
    data?.boards?.length === 0 ||
    data?.boards?.[activeBoard]?.columns.length === 0;
  return (
    <div className="flex items-center justify-between">
      <div className="sm:flex items-center justify-between w-full hidden">
        <div className="px-8 py-8  border-r border-r-gray1 dark:border-[#35374B] w-[260px] md:w-[300px] ">
          <IconMoonStars className="dark:hidden" />
          <IconSun className="dark:block hidden" />
        </div>
        <div className="px-7 flex flex-1 items-center justify-between">
          <h1 className="text-2xl md:text-3xl"></h1>
          <div className="flex items-center gap-6">
            <Button
              label="+ Create New Task"
              type="primary large"
              disabled={isDisables}
              onClick={() => dispatch(setActiveModal(ModalEnum.CREATE_TASK))}
            />
            <Dropdown
              disable={data?.boards.length === 0}
              items={[
                {
                  label: "Edit Board",
                  onClick: () => dispatch(setActiveModal(ModalEnum.EDIT_BOARD)),
                  className: "text-gray3",
                },
                {
                  label: "Delete Board",
                  onClick: () =>
                    dispatch(setActiveModal(ModalEnum.DELETE_BOARD)),
                  className: "text-destructive2",
                },
              ]}
            />
          </div>
        </div>
      </div>
      {/* Mobile Header */}
      <div className="sm:hidden  items-center justify-between  w-full flex px-4 py-5">
        <div
          className="flex"
          onClick={() => dispatch(setActiveModal(ModalEnum.MOBILE_MENU))}
        >
          <IconDeviceMobile className="mr-4" />
          <div className="flex items-center gap-x-2">
            <h2 className="">{data?.boards?.[activeBoard]?.name}</h2>
            <IconChevronDown />
          </div>
        </div>
        <div className="flex items-center gap-x-4">
          <button
            className={`bg-[#AD88C6] py-4 px-6 rounded-full ${
              isDisables ? "opacity-25 cursor-not-allowed" : ""
            }`}
            onClick={() => {
              dispatch(setActiveModal(ModalEnum.CREATE_TASK));
            }}
            disabled={isDisables}
          >
            <IconPlus />
          </button>
          <Dropdown
            disable={data?.boards.length === 0}
            items={[
              {
                label: "Edit Board",
                onClick: () => dispatch(setActiveModal(ModalEnum.EDIT_BOARD)),
                className: "text-gray3",
              },
              {
                label: "Delete Board",
                onClick: () => dispatch(setActiveModal(ModalEnum.DELETE_BOARD)),
                className: "text-destructive2",
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
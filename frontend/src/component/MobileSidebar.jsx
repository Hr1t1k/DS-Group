import { useState } from "react";
import AuthLogo from "../assets/AuthLogo.svg";
import { NavLink, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import auth from "../../firebase.config";
import { GoHome } from "react-icons/go";

import { IoPersonOutline } from "react-icons/io5";
import { GrNotes } from "react-icons/gr";
import { FiLogOut } from "react-icons/fi";

import { MdCancel } from "react-icons/md";
import { BiMenuAltRight } from "react-icons/bi";

const MobileSidebar = () => {
  const [menubar, setmenubar] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <div className="md:hidden absolute right-4 top-6 ">
        <BiMenuAltRight
          onClick={() => setmenubar(!menubar)}
          role="button"
          color="#AAA5F8"
          size={40}
        />
      </div>
      <div
        className={`w-[260px] fixed lg:hidden right-0 top-0 bottom-0 h-screen text-[#FFECE5] bg-black flex flex-col gap-8 py-6 px-3 z-10 ${
          menubar ? "translate-x-[0%]" : "translate-x-[100%] hidden"
        }`}
      >
        {" "}
        <aside>
          <MdCancel onClick={() => setmenubar(!menubar)} size={40} />
          <div className="w-full flex justify-center">
            <img src={AuthLogo} alt="" className="w-[90px] my-7" />
          </div>
          <div className="flex flex-col justify-between h-[60vh]">
            <div>
              <NavLink to="/dashboard/gifttracking">
                {({ isActive }) => (
                  <div
                    className={`${
                      isActive && "bg-[#FFECE5] text-primary"
                    } flex items-center rounded-lg p-2 gap-4 hover:bg-[#FFECE5] hover:text-primary my-2`}
                  >
                    <GoHome size={30} />
                    <span className="text-base leading-[120%]">
                      Gift Tracking
                    </span>
                  </div>
                )}
              </NavLink>

              <NavLink to="/dashboard/states">
                {({ isActive }) => (
                  <div
                    className={`${
                      isActive && "bg-[#FFECE5] text-primary"
                    } flex items-center rounded-lg p-2 gap-4 hover:bg-[#FFECE5] hover:text-primary my-2`}
                  >
                    <GrNotes size={30} />
                    <span className="text-base leading-[120%]">States</span>
                  </div>
                )}
              </NavLink>
              <NavLink to="/dashboard/gift-items">
                {({ isActive }) => (
                  <div
                    className={`${
                      isActive && "bg-[#FFECE5] text-primary"
                    } flex items-center rounded-lg p-2 gap-4 hover:bg-[#FFECE5] hover:text-primary my-2`}
                  >
                    <GoHome size={30} />
                    <span className="text-base leading-[120%]">Gift Items</span>
                  </div>
                )}
              </NavLink>
            </div>
            <div>
              <div
                className={`"bg-[#FFECE5] text-primary" flex items-center rounded-lg p-2 gap-4 hover:bg-[#FFECE5] hover:text-primary my-2`}
              >
                <IoPersonOutline size={30} />
                <span className="text-base leading-[120%]">
                  {auth.currentUser.email}
                </span>
              </div>
              <NavLink className="flex items-center   p-2 gap-4 hover:bg-[#FFECE5] hover:text-primary my-2">
                <FiLogOut size={30} />
                <span
                  className="text-base leading-[120%] text-error"
                  onClick={() => {
                    signOut(auth).then(() => {
                      navigate("/");
                    });
                  }}
                >
                  Logout
                </span>
              </NavLink>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
};

export default MobileSidebar;

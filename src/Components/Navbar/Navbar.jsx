import {
  Navbar,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  IconButton,
  Collapse,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  ChevronDownIcon,
  Cog6ToothIcon,
  InboxArrowDownIcon,
  LifebuoyIcon,
  PowerIcon,
} from "@heroicons/react/24/outline";
import { useContext, useEffect, useState } from "react";
import {
  AiOutlineClose,
  AiOutlineBars,
  AiOutlineMail,
  AiOutlineHome,
  AiOutlineAppstoreAdd,
  AiOutlineShoppingCart,
  AiOutlineLogin,
} from "react-icons/ai";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../Providers/AuthProvider";
function ProfileMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logOut } = useContext(AuthContext);
  const handleSignOut = () => {
    logOut();
    return Swal.fire({
      position: "top-end",
      icon: "success",
      title: "User logged out successfully",
      showConfirmButton: false,
      timer: 1000,
    });
  };
  const profileMenuItems = (
    <ul className="space-y-2 font-semibold p-2">
      <li className="md:hidden text-white text-center">
        <NavLink className="flex gap-1">{user.displayName || ""}</NavLink>
      </li>
      <li>
        <NavLink className="flex items-center gap-1">
          <AiOutlineMail className="w-5 h-4"></AiOutlineMail>{" "}
          {user.email || "No email"}
        </NavLink>
      </li>
      <li>
        <NavLink className="flex gap-1">
          <UserCircleIcon className="w-5"></UserCircleIcon> My Profile
        </NavLink>
      </li>
      <li>
        <NavLink className="flex gap-1">
          <Cog6ToothIcon className="w-5"></Cog6ToothIcon> Edit Profile
        </NavLink>
      </li>
      <li>
        <NavLink className="flex gap-1">
          <InboxArrowDownIcon className="w-5"></InboxArrowDownIcon>Inbox
        </NavLink>
      </li>
      <li>
        <NavLink className="flex gap-1">
          <LifebuoyIcon className="w-5"></LifebuoyIcon> Help
        </NavLink>
      </li>
      <li>
        <NavLink onClick={handleSignOut} className="flex gap-1 text-red-500">
          <PowerIcon className="w-5"></PowerIcon>Sign Out
        </NavLink>
      </li>
    </ul>
  );
  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        {user && (
          <div className="flex items-center gap-1">
            <p className="text-lg font-semibold text-white hidden md:block text-center">
              {user.displayName || ""}
            </p>
            <Button
              variant="text"
              color="blue-gray"
              className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
            >
              <img
                className="rounded-full w-10 h-10"
                src={
                  user.photoURL ||
                  "https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg"
                }
                alt=""
              />

              <ChevronDownIcon
                strokeWidth={2.5}
                className={`h-3 w-3 transition-transform ${
                  isMenuOpen ? "rotate-180" : ""
                }`}
              />
            </Button>
          </div>
        )}
      </MenuHandler>
      <MenuList className="p-1">{profileMenuItems}</MenuList>
    </Menu>
  );
}

const CustomizeNavbar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const { user } = useContext(AuthContext);
  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setIsNavOpen(false)
    );
  }, []);
  const navLinks = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-10 font-semibold list-none">
      <li>
        <NavLink
          to="/"
          className={({ isActive, isPending }) =>
            isPending
              ? "pending"
              : isActive
              ? " block py-1 lg:py-2 pl-3 pr-4 md:bg-transparent  md:p-0 text-gray-400"
              : " block py-1 lg:py-2 pl-3 pr-4 md:bg-transparent hover:text-gray-400 text-white md:p-0"
          }
          aria-current="page"
          variant="small"
        >
          <button className="flex items-center gap-2">
            <AiOutlineHome className="text-xl" /> Home
          </button>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/addProduct"
          className={({ isActive, isPending }) =>
            isPending
              ? "pending"
              : isActive
              ? " block py-1 lg:py-2 pl-3 pr-4 md:bg-transparent  md:p-0 text-gray-400"
              : " block py-1 lg:py-2 pl-3 pr-4 md:bg-transparent text-white hover:text-gray-400 md:p-0"
          }
          aria-current="page"
          variant="small"
        >
          <button className="flex items-center gap-2">
            <AiOutlineAppstoreAdd className="text-xl" />
            Add Product
          </button>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/cart"
          className={({ isActive, isPending }) =>
            isPending
              ? "pending"
              : isActive
              ? " block py-1 lg:py-2 pl-3 pr-4 md:bg-transparent  md:p-0 text-gray-400"
              : " block py-1 lg:py-2 pl-3 pr-4 md:bg-transparent text-white hover:text-gray-400 md:p-0"
          }
          aria-current="page"
          variant="small"
        >
          <button className="flex items-center gap-2">
            <AiOutlineShoppingCart className="text-xl" />
            Cart
          </button>
        </NavLink>
      </li>
    </ul>
  );
  return (
    <Navbar className="sticky z-10 h-max max-w-full rounded-none py-4 px-4 bg-black">
      <div className="relative flex items-center justify-between">
        <IconButton
          variant="text"
          className="h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden text-white"
          ripple={false}
          onClick={() => setIsNavOpen(!isNavOpen)}
        >
          {isNavOpen ? (
            <AiOutlineClose className="text-xl" />
          ) : (
            <AiOutlineBars className="text-xl" />
          )}
        </IconButton>
        <NavLink
          to="/"
          className="mr-4 ml-2 my-2  text-2xl font-bold cursor-pointer text-white luna flex gap-2 items-center"
        >
          <img className="h-8" src="/logo.png" alt="" />
          Automotive Oasis
        </NavLink>
        <div className="hidden lg:block">{navLinks}</div>
        <div>
          {user ? (
            <ProfileMenu />
          ) : (
            <NavLink
              to="/login"
              className={({ isActive, isPending }) =>
                isPending
                  ? "pending"
                  : isActive
                  ? " block py-1 md:py-2 pl-3 pr-4 md:bg-transparent  md:p-0 text-gray-400 font-bold mr-5"
                  : " block py-1 md:py-2 pl-3 pr-4 md:bg-transparent text-white hover:text-gray-400 md:p-0 font-bold mr-5"
              }
              aria-current="page"
              variant="small"
            >
              <button className="flex items-center gap-2">
                <AiOutlineLogin className="text-xl" />
                Login
              </button>
            </NavLink>
          )}
        </div>
      </div>
      <Collapse open={isNavOpen} className="overflow-hidden">
        {navLinks}
      </Collapse>
    </Navbar>
  );
};

export default CustomizeNavbar;

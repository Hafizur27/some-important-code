import { useState } from "react";
import { MdMenu } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <button
        className="text-3xl p-2 duration-200 lg:hidden "
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <RxCross2 /> : <MdMenu />}
      </button>
      <ul
        className={`absolute p-4 font-semibold bg-red-400 rounded-md ms-2 mt-2 text-white lg:flex lg:gap-4 lg:text-xl lg:static lg:bg-transparent lg:ms-0 lg:mt-0 lg:text-black lg:rounded-none ${
          isOpen ? "top-8" : "-top-40"
        } `}
      >
        <li>NavBar</li>
        <li>Home</li>
        <li>Products</li>
        <li>About</li>
        <li>Contact</li>
      </ul>
    </div>
  );
};

export default NavBar;

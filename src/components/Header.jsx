import React from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useSelector } from "react-redux";

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
        // Sign-out successful.
      })
      .catch((error) => {
        navigate("/error");
      });
  };
  return (
    <div className="absolute z-50 px-8 py-2 bg-gradient-to-b from-black w-full flex justify-between">
      <img
        className="w-44"
        src="https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production/consent/87b6a5c0-0104-4e96-a291-092c11350111/01938dc4-59b3-7bbc-b635-c4131030e85f/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
      />
      {user && (
        <div className="flex w-3/12 justify-end">
          <img
            className="w-[30px] h-auto object-contain rounded mr-2"
            src={user?.photoURL}
          />
          <button
            className="font-bold cursor-pointer text-white"
            onClick={() => handleSignOut()}
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;

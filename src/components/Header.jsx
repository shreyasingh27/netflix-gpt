import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addUser, removeUser } from "../utils/userSlice";
import { LANGUAGES_SUPPORTED, LOGO_URL } from "../utils/constants";
import { auth } from "../utils/firebase";
import { addGptMovies, toggleGptSearch } from "../utils/gptSearchSlice";
import { changeLanguage } from "../utils/configSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // navigate("/");
        // Sign-out successful.
      })
      .catch((error) => {
        navigate("/error");
      });
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    // Unsiubscribe when component unmounts
    return () => unsubscribe();
  }, []);
  const handleToggle = () => {
    // if (showGpt == true) {
    //   dispatch(addGptMovies({ movieNames: null, movieResults: null }));
    // }
    dispatch(toggleGptSearch());
  };
  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };
  const showGpt = useSelector((store) => store.gpt.showGptSearch);
  return (
    <div className="bg-black md:bg-transparent md:absolute z-50 px-8 py-2 bg-gradient-to-b from-black w-full flex justify-between flex-col md:flex-row">
      <Link to="/">
        <img className="w-30 md:w-44 mx-auto md:mx-0" src={LOGO_URL} />
      </Link>
      {user && (
        <>
          <div className="flex justify-center w-12/12 md:w-5/12 md:justify-end">
            {showGpt && (
              <select
                onChange={handleLanguageChange}
                className="mr-2 text-white bg-black hover:bg-black-800  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 self-center cursor-pointer"
              >
                {LANGUAGES_SUPPORTED.map((language) => {
                  return (
                    <option
                      key={language.identifier}
                      value={language.identifier}
                    >
                      {language.name}
                    </option>
                  );
                })}
              </select>
            )}

            <button
              onClick={handleToggle}
              className="mr-2 text-white bg-red-700 hover:bg-red-800  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 self-center cursor-pointer"
            >
              {showGpt ? "Home Page" : "GPT Search"}
            </button>
            <img
              className="w-[30px] h-auto object-contain rounded mr-2 self-center"
              src={user?.photoURL}
            />
            <button
              className="font-bold cursor-pointer text-white self-center"
              onClick={handleSignOut}
            >
              Sign out
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Header;

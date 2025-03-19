import React, { useRef, useState } from "react";
import Header from "./Header";
import { Link } from "react-router-dom";
import { checkValidData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BG_URL, USER_PROFILE_URL } from "../utils/constants";
import { auth } from "../utils/firebase";

const Login = () => {
  const [isSignInForm, SetIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();

  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);
  console.log(name);

  const handleButtonClick = () => {
    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);
    if (message) return;

    if (!isSignInForm) {
      // Sign Up Logic
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            // displayName: name.current.value,
            displayName: "Shreya",
            photoURL: USER_PROFILE_URL,
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
            })
            .catch((error) => {
              setErrorMessage(error.message);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    } else {
      // Sign In Logic
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    }
  };

  const toggleSignInForm = () => {
    SetIsSignInForm(!isSignInForm);
  };
  return (
    <div>
      <Header />
      <div className="absolute w-full">
        <img className="h-[100vh] w-full object-cover" src={BG_URL} />
      </div>
      <div className="h-[100vh] flex justify-center items-center m-auto">
        <form
          className=" max-w-[400px] text-sm relative w-5/12 bg-black/80 text-white p-7 py-10 rounded-lg backdrop-opacity-80"
          onSubmit={(e) => e.preventDefault()}
        >
          <h1 className="font-bold text-xl mb-4">
            {isSignInForm ? "Sign In" : "Sign Up"}
          </h1>
          {!isSignInForm && (
            <input
              ref={name}
              type="text"
              placeholder="Full Name"
              className="p-2 mb-5 border border-gray-600 bg-gray-800/70  w-full rounded"
            />
          )}

          <input
            ref={email}
            type="text"
            placeholder="Email Address"
            className="p-2 mb-5 border border-gray-600 bg-gray-800/70  w-full rounded"
          />
          <input
            ref={password}
            type="password"
            placeholder="Password"
            className="p-2 mb-5 border border-gray-600 bg-gray-800/70  w-full rounded"
          />
          <p className="text-xs text-red-500 mb-2">{errorMessage}</p>
          <button
            className="p-2 w-full bg-red-500 rounded cursor-pointer"
            onClick={handleButtonClick}
          >
            {isSignInForm ? "Sign In" : "Sign Up"}
          </button>
          <p className=" text-xs mt-3 text-gray-400">
            {isSignInForm ? "Are you new to Netflix? " : "Already registered? "}

            <Link
              onClick={() => toggleSignInForm()}
              className="font-semibold text-white"
            >
              {isSignInForm ? "Sign Up" : "Sign In"} now
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;

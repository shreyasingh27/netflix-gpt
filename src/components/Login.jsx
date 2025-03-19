import React, { useRef, useState } from "react";
import Header from "./Header";
import { Link, useNavigate } from "react-router-dom";
import { checkValidData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const navigate = useNavigate();
  const [isSignInForm, SetIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();
  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);
  const toggleForm = () => {
    SetIsSignInForm(!isSignInForm);
  };
  const handleButtonClick = (e) => {
    e.preventDefault();
    const message = checkValidData(
      email.current.value,
      password.current.value
      //name.current.value
    );
    setErrorMessage(message);
    if (message) return;
    if (!isSignInForm) {
      //Sign Up Logic
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up logic
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL:
              "https://occ-0-5690-3662.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABStlS0MPUGcy6Ovyeia-3ddnnXNb2Lri4P4H4QCFuR_yaGs0umyqHUDOZcOBKF8MFUGHX07txAW70z7wq_S9AKGQ_MixrLQ.png?r=a4b",
          })
            .then(() => {
              const { uid, displayName, email, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  displayName: displayName,
                  email: email,
                  photoURL: photoURL,
                })
              );
              navigate("/browse");
            })
            .catch((error) => {
              // An error occurred
              setErrorMessage(error.message);
            });

          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);

          // ..
        });
    } else {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
          navigate("/browse");

          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    }
  };
  return (
    <div>
      <Header />
      <div className="absolute w-full">
        <img
          className="h-[100vh] w-full object-cover"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/50fcc930-ba3f-4cae-9257-9f920e30a998/web/IN-en-20250310-TRIFECTA-perspective_739387a0-ff14-44ed-a5af-36e5aa4d236e_small.jpg"
        />
      </div>
      <div className="h-[100vh] flex justify-center items-center m-auto">
        <form className=" max-w-[400px] text-sm relative w-5/12 bg-black/80 text-white p-7 py-10 rounded-lg backdrop-opacity-80">
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
            onClick={(e) => handleButtonClick(e)}
          >
            {isSignInForm ? "Sign In" : "Sign Up"}
          </button>
          <p className=" text-xs mt-3 text-gray-400">
            {isSignInForm ? "Are you new to Netflix? " : "Already registered? "}

            <Link
              onClick={() => toggleForm()}
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

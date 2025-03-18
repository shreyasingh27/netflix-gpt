import React, { useState } from "react";
import Header from "./Header";
import { Link } from "react-router-dom";

const Login = () => {
  const [isSignInForm, SetIsSignInForm] = useState(true);
  function toggleForm() {
    SetIsSignInForm(!isSignInForm);
  }
  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          className="h-[100vh] w-full object-cover"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/50fcc930-ba3f-4cae-9257-9f920e30a998/web/IN-en-20250310-TRIFECTA-perspective_739387a0-ff14-44ed-a5af-36e5aa4d236e_small.jpg"
        />
      </div>
      <div className="h-[100vh] flex justify-center items-center m-auto">
        <form className="text-sm relative w-5/12 bg-black/80 text-white p-7 py-10 rounded-lg backdrop-opacity-80">
          <h1 className="font-bold text-xl mb-4">
            {isSignInForm ? "Sign In" : "Sign Up"}
          </h1>
          {!isSignInForm && (
            <input
              type="text"
              placeholder="Full Name"
              className="p-2 mb-5 border border-gray-600 bg-gray-800/70  w-full rounded"
            />
          )}

          <input
            type="text"
            placeholder="Email Address"
            className="p-2 mb-5 border border-gray-600 bg-gray-800/70  w-full rounded"
          />
          <input
            type="password"
            placeholder="Password"
            className="p-2 mb-5 border border-gray-600 bg-gray-800/70  w-full rounded"
          />
          <button className="p-2 w-full bg-red-500 rounded">
            {isSignInForm ? "Sign In" : "Sign Up"}
          </button>
          <p className=" text-xs mt-3 text-gray-400">
            {isSignInForm ? "Are you new to Netflix? " : "Already registered? "}

            <Link
              onClick={() => toggleForm()}
              className="font-semibold text-white"
            >
              {isSignInForm ? "Sign In" : "Sign Up"} now
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;

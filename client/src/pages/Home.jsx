import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signOutUserStart, signOutUserSuccess, signOutUserFailure } from "../redux/user/userSlice";

const Home = () => {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch("/api/auth/signout");
      const data = await res.json();
      if (data.success === false) {
        dispatch(signOutUserFailure(data.message));
        return;
      }
      dispatch(signOutUserSuccess());
      navigate("/sign-in");
    } catch (error) {
      dispatch(signOutUserFailure(error.message));
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="text-center p-6 max-w-lg w-full bg-white shadow-lg rounded-lg">
        <h1 className="text-4xl font-semibold text-gray-800 mb-6">
          Welcome, {currentUser ? currentUser.username : "Guest"}!
        </h1>
        {currentUser ? (
          <>
            <p className="text-lg text-gray-600 mb-6">
              Glad to see you again! Explore your profile or sign out.
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => navigate("/profile")}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg shadow-lg transition duration-300"
              >
                Go to Profile
              </button>
              <button
                onClick={handleSignOut}
                disabled={loading}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-lg shadow-lg transition duration-300 disabled:opacity-50"
              >
                {loading ? "Signing out..." : "Sign Out"}
              </button>
            </div>
          </>
        ) : (
          <>
            <p className="text-lg text-gray-600 mb-6">
              Please sign in or create an account to enjoy our features.
            </p>
            <button
              onClick={() => navigate("/sign-in")}
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-lg shadow-lg transition duration-300"
            >
              Sign In / Sign Up
            </button>
          </>
        )}
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
    </div>
  );
};

export default Home;

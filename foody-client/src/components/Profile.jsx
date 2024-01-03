import React, { useContext, useRef } from "react";
import { AuthContext } from "../context/AuthProvider";

const Profile = ({ user }) => {
  const { logOut, loading } = useContext(AuthContext);

  const drawerRef = useRef();

  const handleLogout = () => {
    logOut()
      .then(() => {
        // Sign-out successful.
        closeDrawer();
        window.location.reload();
      })
      .catch((error) => {
        // An error happened.
      });
  };

  const closeDrawer = () => {
    drawerRef.current.checked = false; // Uncheck the checkbox
  };

  return (
    <div>
      <div className="drawer drawer-end z-50">
        <input
          id="my-drawer-4"
          type="checkbox"
          className="drawer-toggle"
          ref={drawerRef}
        />
        <div className="drawer-content">
          {/* Page content here */}
          <label
            htmlFor="my-drawer-4"
            className="drawer-button btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              {user.photoURL ? (
                <img alt="Tailwind CSS Navbar component" src={user.photoURL} />
              ) : (
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://i0.wp.com/bicolandiatravels.com/wp-content/uploads/2022/07/blank-profile-picture-mystery-man-avatar-973460.png?ssl=1"
                />
              )}
            </div>
          </label>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
            {/* Sidebar content here */}
            <li>
              <a href="/update-profile" onClick={closeDrawer}>
                Profile
              </a>
            </li>
            <li>
              <a onClick={closeDrawer}>Order</a>
            </li>
            <li>
              <a onClick={closeDrawer}>Settings</a>
            </li>
            <li>
              <a
                onClick={handleLogout}
                className="bg-green text-white hover:text-black"
              >
                Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Profile;

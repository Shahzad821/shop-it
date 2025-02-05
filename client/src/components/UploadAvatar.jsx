import React, { useState } from "react";
import UserLayout from "./UserLayout";
import { useSelector } from "react-redux";
import useUpdateAvatar from "../hooks/userUpdateAvatar";
import Loader from "./loader";

const AvatarUpload = () => {
  const { user } = useSelector((state) => state.auth);
  const [avatar, setAvatar] = useState(null);
  const { updateAvatar, loading } = useUpdateAvatar();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (avatar) {
      updateAvatar(avatar);
    }
  };

  return (
    <UserLayout>
      <div className="flex justify-center items-center">
        <div className="w-full max-w-lg p-6  rounded-lg">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <h2 className="text-2xl font-semibold mb-4 font-mono text-gray-800 text-center">
              Upload Avatar
            </h2>

            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <figure className="avatar">
                  <img
                    src={
                      avatar
                        ? avatar
                        : user?.avatar?.url || "/assets/default_avatar.jpg"
                    }
                    alt="avatar preview"
                    className="w-16 h-16 rounded-full object-cover"
                  />
                </figure>
              </div>

              <div className="flex-1">
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="avatar"
                >
                  Choose Avatar
                </label>
                <input
                  type="file"
                  name="avatar"
                  id="avatar"
                  accept="image/*"
                  className="mt-2 block w-full text-sm text-gray-700 file:py-2 file:px-4 file:rounded-md file:border file:border-gray-300 file:bg-gray-50 file:text-gray-700 file:hover:bg-gray-100"
                  onChange={handleFileChange}
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 bg-yellow-500 text-white font-semibold rounded-md disabled:opacity-50 flex justify-center"
              disabled={!avatar || loading}
            >
              {loading ? <Loader w="6" h="6" color="white" /> : "Update"}
            </button>
          </form>
        </div>
      </div>
    </UserLayout>
  );
};

export default AvatarUpload;

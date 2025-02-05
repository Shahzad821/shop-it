import React from "react";
import { useSelector } from "react-redux";
import { formateDate } from "../helper/FormateDate";
import UserLayout from "./UserLayout";

const AboutME = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <UserLayout>
      <div className="mt-5 flex justify-center md:items-start ">
        <div className="flex flex-col items-center md:flex-row  md:justify-around w-full  ">
          {/* Avatar Section */}
          <div className="w-3/4 md:w-1/3 mb-5 md:mb-0 self-center md:self-start">
            <img
              className="rounded-full w-32 h-32 object-cover mx-auto "
              src={user?.avatar?.url || "/assets/default_avatar.jpg"}
              alt="Profile Avatar"
            />
          </div>

          {/* User Info Section */}
          <div className="w-3/4 md:w-2/3 text-center md:text-left">
            <h4 className="text-lg font-semibold text-gray-600 font-mono">
              Full Name
            </h4>
            <p className="text-gray-700">{user?.name || "John Doe"}</p>

            <h4 className="text-lg font-semibold mt-4  text-gray-600 font-mono">
              Email Address
            </h4>
            <p className="text-gray-700 ">
              {user?.email || "johndoe@example.com"}
            </p>

            <h4 className="text-lg font-semibold mt-4  text-gray-600 font-mono">
              Joined On
            </h4>
            <p className="text-gray-700">
              {formateDate(user?.createdAt.toString()) || "2023-09-19"}
            </p>
          </div>
        </div>
      </div>
    </UserLayout>
  );
};

export default AboutME;

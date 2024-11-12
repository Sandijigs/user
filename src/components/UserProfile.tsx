import React, { useState } from "react";
import { User } from "../interfaces/User";
import { Switch } from "antd";

interface UserProfileProps {
  user: User;
  onStatusToggle: (userId: string) => void; // Accept the toggle function as a prop
}

const UserProfile: React.FC<UserProfileProps> = ({ user, onStatusToggle }) => {
  const [active, setActive] = useState(user.status === "active");

  const toggleSwitch = () => {
    // Toggle the status locally
    setActive(!active);

    // Pass the change to the parent component to update localStorage
    onStatusToggle(user.id);
  };

  return (
    <div className="w-[90vw] sm:w-auto h-28 md:h-36 bg-white rounded-xl border-[0.5px] border-neutral-200 overflow-hidden font-sans">
      <div className="flex justify-between">
        <div className="flex items-center space-x-8">
          <div className="h-28 md:h-36 w-24 md:w-38 rounded-l-xl overflow-hidden">
            <img
              src={user.profilePhoto}
              alt={`${user.name}'s profile`}
              className="w-full h-full object-cover" // Ensure image fills the container
            />
          </div>
          <div className="md:space-y-[5px] flex flex-col items-start">
            <h2 className=" text-base md:text-xl font-semibold">{user.name}</h2>
            <p className="text-xs md:text-sm">{user.role.toUpperCase()}</p>
            <p className="text-xs md:text-sm text-gray-500 mb-2">
              {user.email}
            </p>

            <div className="cursor-pointer">
              <Switch
                checked={active}
                checkedChildren={<p>ACTIVE</p>}
                unCheckedChildren={<p className="text-[#009CBD]">INACTIVE</p>}
                onChange={toggleSwitch}
                style={{
                  backgroundColor: active ? "#009CBD" : "#F5F5F5",
                  color: active ? "white" : "#009CBD",
                  height: "23px",
                  width: "100px",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

import { useEffect, useState } from "react";
// import { Pagination } from "antd";
import UserProfile from "../components/UserProfile";
import { User } from "../interfaces/User";
import mockData from "../../utils/mockData.json";
import Cards from "../components/Cards";
import { saveToLocalStorage, getFromLocalStorage } from "../../utils/storage";

const Home = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [activeUsers, setActiveUsers] = useState<User[]>([]);
  const [inActiveUsers, setInActiveUsers] = useState<User[]>([]);
  // const [page, setPage] = useState(1);
  // const perPage = 8;

  // Function to initialize users from localStorage or mockData
  const handleGetUsers = () => {
    const localStorageUsers = getFromLocalStorage("mockData");

    if (!localStorageUsers || localStorageUsers.length === 0) {
      // If localStorage is empty, use mockData and save it to localStorage
      setUsers(mockData); // Load mock data
      const active = mockData.filter((profile) => profile.status === "active");
      setActiveUsers(active);
      const inactive = mockData.filter(
        (profile) => profile.status === "inactive"
      );
      setInActiveUsers(inactive);
      saveToLocalStorage("mockData", mockData);
    } else {
      // Otherwise, use the data from localStorage
      setUsers(localStorageUsers);
      const active = localStorageUsers.filter(
        (profile: User) => profile.status === "active"
      );
      setActiveUsers(active);
      const inactive = localStorageUsers.filter(
        (profile: User) => profile.status === "inactive"
      );
      setInActiveUsers(inactive);
    }
  };

  useEffect(() => {
    handleGetUsers();
  }, []); // Run once when component mounts

  // Handle user status toggle and update localStorage
  const toggleUserStatus = (userId: string) => {
    // Update the status only for the user on the current page
    const updatedUsers = [...users];
    const userIndex = updatedUsers.findIndex((user) => user.id === userId);
    if (userIndex !== -1) {
      updatedUsers[userIndex] = {
        ...updatedUsers[userIndex],
        status:
          updatedUsers[userIndex].status === "active" ? "inactive" : "active",
      };

      setUsers(updatedUsers); // Update global users state
      saveToLocalStorage("mockData", updatedUsers); // Save updated users in localStorage

      // Update active and inactive users count
      setActiveUsers(updatedUsers.filter((user) => user.status === "active"));
      setInActiveUsers(
        updatedUsers.filter((user) => user.status === "inactive")
      );
    }
  };

  // Pagination logic: calculate the users to display on the current page
  // const indexOfLastUser = page * perPage;
  // console.log("index of last user", indexOfLastUser);
  // const indexOfFirstUser = indexOfLastUser - perPage;
  // console.log("index of first user", indexOfFirstUser);
  // const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  // console.log("current usere her ", currentUsers);

  return (
    <div className="w-full h-full mb-5 md:mb-0 font-sans">
      <div className="flex justify-center mt-0 md:mt-5">
        <div className="w-full md:w-[90%] h-auto md:h-36 mt-5 flex flex-col md:flex-row items-center gap-7 md:justify-between mx-auto px-10">
          <Cards
            bgColor="bg-blue-50"
            BorderColor="border-l-primary border-b-blue-100 border-t-blue-100 border-r-blue-100"
            title="Total Number of Users"
            number={users.length}
            iconColor="text-primary"
          />
          <Cards
            bgColor="bg-green-50"
            BorderColor="border-l-green-600 border-b-green-100 border-t-green-100 border-r-green-100"
            title="Total Number of Active Users"
            number={activeUsers.length}
            iconColor="text-green-600"
          />
          <Cards
            bgColor="bg-orange-50"
            BorderColor="border-l-orange-400 border-b-orange-100 border-t-orange-100 border-r-orange-100"
            title="Total Number of Inactive Users"
            number={inActiveUsers.length}
            iconColor="text-orange-400"
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-center mt-0 md:mt-5">
        <div className="w-screen md:w-[90%] h-full md:h-[90%] md:bg-[#F5F5F5] md:m-10 md:p-10 md:rounded-xl md:border-[0.5px] md:border-neutral-200 mt-5 md:mt-0">
          <div className="flex flex-col items-center md:p-4 md:grid grid-cols-1 md:grid-cols-2 gap-8">
            {users.map((user, i) => (
              <UserProfile
                key={i}
                user={user}
                onStatusToggle={toggleUserStatus}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Pagination Component */}
      {/* <div className="w-full flex px-24">
        <Pagination
          current={page}
          onChange={(page) => setPage(page)}
          total={users.length}
          className="m-auto mr-0 border-[#DB353A]"
          pageSize={perPage}
        />
      </div> */}
    </div>
  );
};

export default Home;

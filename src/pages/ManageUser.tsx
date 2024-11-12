/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { Table, Button, Popconfirm, message, Modal } from "antd";
import { User } from "../interfaces/User";
import { getFromLocalStorage, saveToLocalStorage } from "../../utils/storage";
import mockData from "../../utils/mockData.json";
import { FaPlus } from "react-icons/fa";
import AddUserModal from "../components/modals/addUserModal";
const ManageUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const handleGetUsers = () => {
    const localStorageUsers = getFromLocalStorage("mockData");

    if (!localStorageUsers || localStorageUsers.length === 0) {
      setUsers(mockData);
    } else {
      setUsers(localStorageUsers);
    }
  };

  // Fetch users on component mount
  useEffect(() => {
    handleGetUsers();
  }, []);

  // Handle Delete
  const handleDelete = (id: string) => {
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
    saveToLocalStorage("mockData", updatedUsers); // Save updated data back to localStorage
    message.success("User deleted successfully");
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  // Define columns for the Ant Design Table
  const columns = [
    {
      title: "Name",
      key: "name",
      render: (record: User) => (
        <div className="flex items-center space-x-4">
          <div
            className="h-10 w-10 rounded-full overflow-hidden"
            style={{ flexShrink: 0 }}
          >
            <img
              src={record.profilePhoto} // Directly use profilePhoto
              alt={`${record.name}'s profile`}
              className="w-full h-full object-cover"
            />
          </div>
          <span>{record.name}</span>
        </div>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: User) => (
        <div>
          <Popconfirm
            title="Are you sure you want to delete?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" danger>
              Delete
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full h-full px-4 sm:px-6 md:px-14 font-sans ">
      {/* Button Section */}
      <div className="py-6 flex w-full justify-end">
        <Button
          type="primary"
          onClick={() => setIsModalVisible(!isModalVisible)}
          className="flex items-center justify-center px-6 py-2 font-bold text-white bg-primary rounded-md shadow-lg hover:bg-teal-600"
        >
          <FaPlus className="mr-2" />
          Add User
        </Button>
      </div>

      {/* Table Section with Horizontal Scroll */}
      <div className="overflow-x-auto mb-5">
        <Table
          columns={columns}
          dataSource={users}
          rowKey="id"
          pagination={false}
          // footer={() => <span>Total users: {users.length}</span>}
          className="users-table table-auto border-0 md:border md:border-gray-300 md:border-x md:border-t md:border-b rounded-lg shadow-lg bg-transparent md:bg-white"
          components={{
            header: {
              cell: (props: any) => {
                return (
                  <th
                    {...props}
                    style={{
                      backgroundColor: "#009CBD",
                      color: "white",
                      borderBottom: "2px solid #ddd",
                    }}
                  />
                );
              },
            },
          }}
        />
      </div>
      {/* Modal for Adding User */}
      <Modal
        title="Add New User"
        open={isModalVisible}
        onCancel={handleModalClose}
        footer={null} // No footer buttons since the AddUser form has its own
        width={800}
      >
        {/* AddUser Form inside the Modal */}
        <AddUserModal
          handleGetUsers={handleGetUsers}
          handleModalClose={handleModalClose}
        />
      </Modal>
    </div>
  );
};

export default ManageUsers;

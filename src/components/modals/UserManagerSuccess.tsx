import React from "react";

interface UserManagerSucessModalProps {
  message: string;
  onClose: () => void;
}

const UserManagerSucessModal: React.FC<UserManagerSucessModalProps> = ({
  message,
  onClose,
}) => {
  const handleOkClick = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-80 text-center">
        <h2 className="text-xl font-semibold text-green-600">Success</h2>
        <p className="text-gray-700 mt-2">{message}</p>
        <button
          onClick={handleOkClick}
          className="mt-4 bg-primary text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition duration-200"
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default UserManagerSucessModal;

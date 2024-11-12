/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/AddUserModal.tsx
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  getFromLocalStorage,
  saveToLocalStorage,
} from "../../../utils/storage";
import { User } from "../../interfaces/User";
// import SuccessModal from "../modals/SuccessModal";
import UserManagerSucessModal from "./UserManagerSuccess";

interface AddUserModalProps {
  handleGetUsers: () => void;
  handleModalClose: () => void;
}
const AddUserModal = ({
  handleGetUsers,
  handleModalClose,
}: AddUserModalProps) => {
  const [showModal, setShowModal] = useState(false);
  // Form validation schema using Yup
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    role: Yup.string().required("Role is required"),
    status: Yup.string().required("Status is required"),
    // Profile photo validation in Yup schema
    profilePhoto: Yup.mixed()
      .required("Profile photo is required")
      .test("fileSize", "File too large", (value) => {
        // Explicitly define 'value' as a File or null type
        if (value) {
          const file = value as File; // Type assertion to 'File'
          return file.size <= 5 * 1024 * 1024; // 5 MB max file size
        }
        return false; // If value is null or undefined, return false
      })
      .test("fileFormat", "Unsupported file format", (value) => {
        if (value) {
          const file = value as File;
          return ["image/jpeg", "image/png", "image/gif"].includes(file.type);
        }
        return false; // If value is null or undefined, return false
      }),
  });

  // Formik setup
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      role: "",
      status: "",
      profilePhoto: null,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("Form data:", values);
      handleFormSubmit(values);
    },
  });

  const handleFormSubmit = (values: any) => {
    // Retrieve the existing users from localStorage
    const localStorageUsers = getFromLocalStorage("mockData") || []; // Default to an empty array if no data

    // Create new user object
    const newUser: User = {
      id: localStorageUsers.length.toString(), // ID should be the current length of the array
      name: values.name,
      email: values.email,
      role: values.role,
      status: values.status,
      profilePhoto: values.profilePhoto
        ? URL.createObjectURL(values.profilePhoto)
        : "", // Create an object URL for the profile photo if it exists
    };

    // Add the new user to the existing array
    localStorageUsers.push(newUser);

    //Save the updated users Array to local Storage.
    saveToLocalStorage("mockData", localStorageUsers);
    //clear form
    formik.resetForm();

    //show success modal

    setShowModal(true);
  };
  const closeModal = () => {
    handleModalClose();
    handleGetUsers();
  };

  return (
    <div className="p-6">
      <form className="  space-y-4" onSubmit={formik.handleSubmit}>
        <div>
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
          />
          {formik.touched.name && formik.errors.name && (
            <p className="text-red-500 text-xs">{formik.errors.name}</p>
          )}
        </div>

        {/* Email Input */}
        <div>
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-red-500 text-xs">{formik.errors.email}</p>
          )}
        </div>

        {/* Role Select */}
        <div>
          <label className="block text-gray-700">Role</label>
          <select
            name="role"
            value={formik.values.role}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
          >
            <option
              value=""
              label="Select your role"
              disabled
              className="text-gray-400"
            ></option>
            {/* Empty, disabled option */}
            <option value="admin">Admin</option>
            <option value="user">User</option>
            <option value="guest">Guest</option>
          </select>
          {formik.touched.role && formik.errors.role && (
            <p className="text-red-500 text-xs">{formik.errors.role}</p>
          )}
        </div>

        {/* Status Select */}
        <div>
          <label className="block text-gray-700">Status</label>
          <select
            name="status"
            value={formik.values.status}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
          >
            <option
              value=""
              label="Select "
              disabled
              className="text-gray-400"
            ></option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          {formik.touched.status && formik.errors.status && (
            <p className="text-red-500 text-xs">{formik.errors.status}</p>
          )}
        </div>

        {/* Profile Photo Upload */}
        <div>
          <label className="block text-gray-700">Profile Photo</label>

          <input
            type="file"
            accept="image/*"
            name="profilePhoto"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                if (!file.type.startsWith("image/")) {
                  alert("Please select a valid image file.");
                  return;
                }
                formik.setFieldValue("profilePhoto", file); // Set the file if it’s valid
              }
            }}
            onBlur={formik.handleBlur}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
          />

          {formik.touched.profilePhoto && formik.errors.profilePhoto && (
            <p className="text-red-500 text-xs">{formik.errors.profilePhoto}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={!formik.isValid || formik.isSubmitting} // Disable button if form is invalid or submitting
          className={`${
            !formik.isValid || formik.isSubmitting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-primary"
          } text-white px-4 py-2 rounded-lg transition duration-200`}
        >
          Add User
        </button>
      </form>

      {showModal && (
        <UserManagerSucessModal
          message="User has been successfully added!"
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default AddUserModal;

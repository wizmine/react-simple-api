import React, { useState } from "react";
import axios from "axios";
import { IFormData } from "../types/types";

const AddUserForm: React.FC = () => {
  const [validationErrors, setValidationErrors] = useState<{ [key: string]: string[] } | null>(
    null
  );
  const [formData, setFormData] = useState<IFormData>({
    name: "",
    email: "",
    password: "",
    phone: "",
    positionId: 0,
    photo: null,
  });

  const positions = [
    { id: 1, name: "Lawyer" },
    { id: 2, name: "Content Manager" },
    { id: 3, name: "Security" },
    { id: 4, name: "Designer" },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, files } = e.target as HTMLInputElement;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "file" ? (files ? files[0] : null) : value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const { name, email, password, phone, positionId, photo } = formData;

    const data = {
      name: name,
      email: email,
      password: password,
      phone: phone,
      position_id: positionId,
      photo: photo,
    };

    try {
      await axios.post("http://localhost:8000/api/users", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("User added successfully!");

      setFormData({
        name: "",
        email: "",
        password: "",
        phone: "",
        positionId: 0,
        photo: null,
      });

      setValidationErrors(null);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorResponse = error.response?.data;

        if (errorResponse && errorResponse.errors) {
          setValidationErrors(errorResponse.errors);
        } else {
          setValidationErrors(null);
          console.error(errorResponse?.message || error.message);
        }
      } else {
        console.error(error);
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Add User</h2>

        <div>
          <label>
            Name:
            <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
          </label>
        </div>
        <div>
          <label>
            Email:
            <input type="email" name="email" value={formData.email} onChange={handleInputChange} />
          </label>
        </div>
        <div>
          <label>
            Password:
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div>
          <label>
            Phone:
            <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} />
          </label>
        </div>
        <div>
          <label>
            Position:
            <select
              name="positionId"
              value={formData.positionId || ""}
              onChange={handleInputChange}
            >
              <option value="" disabled>
                Select position
              </option>
              {positions.map((position) => (
                <option key={position.id} value={position.id}>
                  {position.name}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div>
          <label>
            Photo:
            <input type="file" name="photo" onChange={handleInputChange} />
          </label>
        </div>
        <button type="submit">Add User</button>
      </form>
      {validationErrors && (
        <div className="validation-errors">
          {Object.entries(validationErrors).map(([field, messages]) => (
            <div key={field}>
              <strong>{field}:</strong>
              <ul>
                {messages.map((msg, index) => (
                  <li key={index}>{msg}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AddUserForm;

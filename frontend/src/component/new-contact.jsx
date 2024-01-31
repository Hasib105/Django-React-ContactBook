import React, { useState, useEffect } from "react";
import axios from "axios";
import "./new-contact.scss";

const NewContact = () => {
  const [image, setImage] = useState("");
  const [division, setDivision] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [divisionOptions, setDivisionOptions] = useState([]);

  useEffect(() => {
   
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/divisions/", {
        headers: {
          Authorization: `JWT ${localStorage.getItem("access_token")}`,
        },
      });

      // Set the input fields with the fetched data
      const contact = response.data;
      setName(contact.name);
      setPhoneNumber(contact.phoneNumber);
      setDivision(contact.division);
      setImage(contact.image);
      const divisions = response.data.map((division) => division.name);
      setDivisionOptions(divisions);
 
    } catch (error) {
      console.error(error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    } else {
      setImage("");
    }
  };

  const handleDivisionChange = (e) => {
    setDivision(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

   
    const formData = new FormData();
    formData.append("name", name);
    formData.append("phoneNumber", phoneNumber);
    if (image) {
      formData.append("image", image);
    }
    formData.append("division", division);

    try {
  
      await axios.post("http://127.0.0.1:8000/contacts/", formData, {
        headers: {
          Authorization: `JWT ${localStorage.getItem("access_token")}`,
        },
      });

    
      setName("");
      setPhoneNumber("");
      setImage("");
      setDivision("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="add-new-user">
      <h2>Add New Contact</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={handleNameChange}
        />
        <label htmlFor="phoneNumber">Phone Number:</label>
        <input
          type="text"
          id="number"
          name="number"
          value={number}
          onChange={handlePhoneNumberChange}
        />
        <label htmlFor="image">Image:</label>
        <input
          type="file"
          id="image"
          name="image"
          accept="image/*"
          onChange={handleImageChange}
        />
        {image && (
          <img
            src={image}
            alt="Selected"
            style={{ width: "100px", height: "100px" }}
          />
        )}
        <label htmlFor="division">Division:</label>
        <select
          id="division"
          name="division"
          value={division}
          onChange={handleDivisionChange}
        >
          <option value="">Select Division</option>
          {divisionOptions &&
            divisionOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
        </select>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default NewContact;

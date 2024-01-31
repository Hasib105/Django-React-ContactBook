import React, { useState, useEffect } from "react";
import axios from "axios";
import "./edit-contact.scss";

const EditContact = ({ contactId }) => {
  const [image, setImage] = useState("");
  const [division, setDivision] = useState("");
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  useEffect(() => {
    // Fetch contact data from the backend and set the input fields
    fetchContactData();
  }, [contactId]);

  const fetchContactData = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/contacts/${contactId}`,
        {
          headers: {
            Authorization: `JWT ${localStorage.getItem("access_token")}`,
          },
        }
      );

      // Set the input fields with the fetched data
      const contact = response.data;
      setName(contact.name);
      setNumber(contact.number);
      setDivision(contact.division);
      setImage(contact.image);
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

  const handleNumberChange = (e) => {
    setNumber(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create form data object
    const formData = new FormData();
    formData.append("name", name);
    formData.append("number", number);
    if (image) {
      formData.append("image", image);
    }
    formData.append("division", division);

    try {
      // Make API call to update the contact
      await axios.patch(
        `http://127.0.0.1:8000/contacts/${contactId}`,
        formData,
        {
          headers: {
            Authorization: `JWT ${localStorage.getItem("access_token")}`,
          },
        }
      );

      // Reset form fields after successful submission
      setName("");
      setNumber("");
      setImage("");
      setDivision("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="edit-contact">
      <h2>Edit Contact</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={handleNameChange}
        />
        <input
          type="text"
          placeholder="Phone Number"
          value={number}
          onChange={handleNumberChange}
        />
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {image && (
          <img
            src={image}
            alt="Selected"
            style={{ width: "100px", height: "100px" }}
          />
        )}
        <select value={division} onChange={handleDivisionChange}>
          <option value="">Select Division</option>
          <option value="barisal">barisal</option>
          <option value="dhaka">dhaka</option>
          <option value="chittagong">chittagong</option>
          <option value="mymensingh">mymensingh</option>
          <option value="rajshahi">rajshahi</option>
          <option value="rangpur">Rangpur</option>
          <option value="khulna">khulna</option>
          <option value="sylhet">Sylhet</option>
        </select>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default EditContact;

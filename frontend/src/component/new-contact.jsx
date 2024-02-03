import React, { useState, useEffect } from "react";
import axios from "axios";
import "./new-contact.scss";
import { useNavigate } from "react-router-dom";


const NewContact = () => {
  const [image, setImage] = useState(null);
  const [division, setDivision] = useState("");
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const navigate = useNavigate()

  useEffect(() => {
    // Fetch data from the backend and set the input fields
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/contacts/", {
        headers: {
          Authorization: `JWT ${localStorage.getItem("access_token")}`,
        },
      });

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
    setImage(file);
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

    const formData = new FormData();
    formData.append("name", name);
    formData.append("number", number);
    formData.append("division", division);
    if (image) {
      formData.append("image", image);
    }

    try {
      await axios.post("http://127.0.0.1:8000/contacts/", formData, {
        headers: {
          Authorization: `JWT ${localStorage.getItem("access_token")}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setName("");
      setNumber("");
      setImage(null);
      setDivision("");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="add-new-user">
      <h2>Add New Contact</h2>
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
            src={URL.createObjectURL(image)}
            alt="Selected"
            style={{ width: "100px", height: "100px" }}
          />
        )}
        <select value={division} onChange={handleDivisionChange}>
          <option value="">Select Division</option>
          <option value="barisal">Barisal</option>
          <option value="dhaka">Dhaka</option>
          <option value="chittagong">Chittagong</option>
          <option value="mymensingh">Mymensingh</option>
          <option value="rajshahi">Rajshahi</option>
          <option value="rangpur">Rangpur</option>
          <option value="khulna">Khulna</option>
          <option value="sylhet">Sylhet</option>
        </select>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default NewContact;

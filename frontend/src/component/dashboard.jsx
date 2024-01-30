import React, { useEffect, useState } from "react";
import axios from "axios";
import "./dashboard.scss";
import { Link } from "react-router-dom";

function Dashboard() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const accessToken = localStorage.getItem("access_token"); // Assuming you store the access token in localStorage

        const response = await axios.get("http://127.0.0.1:8000/contacts/", {
          headers: {
            Authorization: `JWT ${accessToken}`,
          },
        });
        setUsers(response.data);
      } catch (error) {
        setError("An error occurred while fetching user data.");
      }
    };

    fetchCurrentUser();
  }, []);

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <button className="add-user-btn">
        <Link to="/new-contact">Add New User</Link>
      </button>
      {error ? (
        <div className="error-message">{error}</div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone Number</th>
              <th>Image</th>
              <th>Division</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.number}</td>
                <td>
                  {user.image ? (
                    <img src={user.image} alt="User" className="user-image" />
                  ) : (
                    <span>No Image</span>
                  )}
                </td>
                <td>{user.division || "N/A"}</td>
                <td>
                  <button className="edit-btn">Edit</button>
                  <button className="delete-btn">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Dashboard;

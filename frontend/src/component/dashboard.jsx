import React from "react";
import "./dashboard.scss";
import { Link } from "react-router-dom";

function Dashboard() {
  const users = [
    { id: 1, name: "John Doe", phoneNumber: "123-456-7890" },
    { id: 2, name: "Jane Smith", phoneNumber: "987-654-3210" },
    // Add more user data here
  ];

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <button className="add-user-btn">
        <Link to="/new-contact">Add New User</Link>
      </button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone Number</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.phoneNumber}</td>
              <td>
                <button className="edit-btn">Edit</button>
                <button className="delete-btn">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;

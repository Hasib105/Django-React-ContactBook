import React from 'react'
import './new-contact.scss'

const NewContact = () => {
  return (
    <div className="add-new-user">
      <h2>Add New User</h2>
      <form>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" />

        <label htmlFor="phoneNumber">Phone Number:</label>
        <input type="text" id="phoneNumber" name="phoneNumber" />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default NewContact
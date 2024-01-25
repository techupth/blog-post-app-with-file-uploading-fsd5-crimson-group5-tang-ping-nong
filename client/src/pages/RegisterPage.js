import { useState } from "react";
import { useAuth } from "../contexts/authentication";

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState({});

  const { register } = useAuth();

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();

    formData.append("username", username);
    formData.append("password", password);
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);

    for (let avatarKey in avatar) {
      formData.append("avatar", avatar[avatarKey]);
    }

    register(formData);
  };

  const handleFileChange = (event) => {
    const selectedFiles = event.target.files[0];

    // Check if the user is attempting to upload more than 2 files
    if (Object.keys(avatar).length + 1 > 2) {
      alert("You can only upload up to 2 files.");
      event.target.value = null;
      return;
    }

    // Check if the selected file is an image
    if (!selectedFiles.type.startsWith("image/")) {
      alert("Please select a valid image file.");
      event.target.value = null;
      return;
    }

    // Check if the selected file is within the size limit (10MB)
    if (selectedFiles.size > 10 * 1024 * 1024) {
      alert("File size should be less than 10MB.");
      event.target.value = null;
      return;
    }

    // Generate a unique ID for the file
    const uniqueId = Date.now();

    // Update the avatar state
    setAvatar((prevAvatar) => ({
      ...prevAvatar,
      [uniqueId]: selectedFiles,
    }));
  };

  const handleRemoveImage = (event, avatarKey) => {
    event.preventDefault();
    delete avatar[avatarKey];
    setAvatar({ ...avatar });

    // Reset the value of the file input to clear the selection
    const fileInput = document.getElementById("avatar");
    if (fileInput) {
      fileInput.value = null;
    }
  };

  const inlineStyles = {
    width: "250px",
    height: "250px",
    objectfit: "cover",
  };

  return (
    <div className="register-form-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h1>Register Form</h1>
        <div className="input-container">
          <label>
            Username
            <input
              id="username"
              name="username"
              type="text"
              placeholder="Enter username here"
              onChange={(event) => {
                setUsername(event.target.value);
              }}
              value={username}
            />
          </label>
        </div>
        <div className="input-container">
          <label>
            Password
            <input
              id="password"
              name="password"
              type="text"
              placeholder="Enter password here"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              value={password}
            />
          </label>
        </div>
        <div className="input-container">
          <label>
            First Name
            <input
              id="firstname"
              name="firstname"
              type="text"
              placeholder="Enter first name here"
              onChange={(event) => {
                setFirstName(event.target.value);
              }}
              value={firstName}
            />
          </label>
        </div>
        <div className="input-container">
          <label>
            Last Name
            <input
              id="lastname"
              name="lastname"
              type="text"
              placeholder="Enter last name here"
              onChange={(event) => {
                setLastName(event.target.value);
              }}
              value={lastName}
            />
          </label>
        </div>
        <div className="input-container">
          <label>
            Avatar
            <input
              id="avatar"
              name="avatar"
              type="file"
              placeholder="Choose your avatar here"
              multiple
              onChange={handleFileChange}
            />
          </label>
          <div className="image-list-preview-container">
            {Object.keys(avatar).map((avatarKey) => {
              const file = avatar[avatarKey];
              return (
                <div key={avatarKey} className="image-preview-container">
                  <img
                    className="image-preview"
                    style={inlineStyles}
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                  />
                  <button
                    className="image-remove-button"
                    onClick={(event) => handleRemoveImage(event, avatarKey)}
                  >
                    x
                  </button>
                </div>
              );
            })}
          </div>
        </div>
        <div className="form-actions">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default RegisterPage;

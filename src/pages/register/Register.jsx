import { useState } from "react";
import "./Register.css";
import axios from "axios";
import upload from "../../utils/upload";
import req from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [file, setFile] = useState(null);
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    img: "",
    country: "",
    isSeller: false,
    desc: "",
    phone: "",
  });

  console.log(user);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSeller = (e) => {
    setUser((prev) => ({ ...prev, isSeller: e.target.checked }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = await upload(file);

    try {
      await req.post("/auth/register", {
        ...user,
        img: url,
      });

      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="register">
      <form onSubmit={handleSubmit}>
        <div className="left">
          <h1>Create new Account</h1>
          <label htmlFor="">Username</label>
          <input
            type="text"
            placeholder="darq"
            required
            name="username"
            onChange={handleChange}
          />

          <label htmlFor="">Email</label>
          <input
            type="email"
            name="email"
            required
            placeholder="email"
            onChange={handleChange}
          />
          <label>Password</label>
          <input
            type="password"
            name="password"
            required
            onChange={handleChange}
          />
          <label htmlFor="">Profile Picture</label>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />

          <label htmlFor="">Country</label>
          <input
            type="text"
            name="country"
            placeholder="Morocco"
            required
            onChange={handleChange}
          />
          <button type="submit">Register</button>
        </div>
        <div className="right">
          <h1>I want to become a seller</h1>
          <div className="toggle">
            <label>Activate the seller account</label>
            <label className="switch">
              <input type="checkbox" onChange={handleSeller} />
              <span className="slider round"></span>
            </label>
          </div>
          <label htmlFor="">Phone Number</label>
          <input
            type="number"
            name="phone"
            placeholder="+1 234 567 89"
            required
            onChange={handleChange}
          />
          <label>Description</label>
          <textarea
            name="desc"
            cols="30"
            rows="10"
            onChange={handleChange}
          ></textarea>
        </div>
      </form>
    </div>
  );
}

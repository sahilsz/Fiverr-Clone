import { useState } from "react";
import "./Featured.css";
import { useNavigate } from "react-router-dom";

export default function Featured() {
  const [input, setInput] = useState("");

  const navigate = useNavigate();

  function handleSubmit() {
    navigate(`/gigs?search=${input}`);
  }

  return (
    <div className="featured">
      <div className="container">
        <div className="left">
          <h1>
            Find the perfect <i>freelance</i> services for your Business
          </h1>
          <div className="search">
            <div className="searchInput">
              <img src="./img/search.png" alt="" />
              <input
                type="text"
                placeholder='Try "building AI solution'
                onChange={(e) => setInput(e.target.value)}
              />
            </div>
            <button onClick={handleSubmit}>Search</button>
          </div>
          <div className="popular">
            <span>Popular:</span>
            <button>AI Services</button>
            <button>Web Design</button>
            <button>WordPress</button>
            <button>Logo Design</button>
          </div>
        </div>
        <div className="right">
          <img src="./img/man.png" alt="" />
        </div>
      </div>
    </div>
  );
}

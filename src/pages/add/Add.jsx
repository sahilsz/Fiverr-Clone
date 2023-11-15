import "./Add.css";
import { useState, useReducer } from "react";

import { INITIAL_STATE, gigReducer } from "../../reducers/gigReducers";
import upload from "../../utils/upload";

export default function Add() {
  const [coverFile, setCoverFile] = useState(null);
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  const [state, dispatch] = useReducer(gigReducer, INITIAL_STATE);

  console.log(state);
  function handleChange(e) {
    dispatch({
      type: "CHANGE_INPUT",
      payload: { name: e.target.name, value: e.target.value },
    });
  }

  function handleFeature(e) {
    e.preventDefault();
    dispatch({
      type: "ADD_FEATURES",
      payload: e.target[0].value,
    });
    e.target[0].value = "";
  }

  async function handleUpload() {
    setUploading(true);
    try {
      const cover = await upload(coverFile);

      const images = await Promise.all(
        [...files].map(async (file) => {
          const url = await upload(file);
          return url;
        })
      );

      setUploading(false);
      dispatch({ type: "ADD_IMAGES", payload: { cover, images } });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="add">
      <div className="container">
        <h1>Add New Gig</h1>
        <div className="sections">
          <div className="left">
            <label htmlFor="">Title</label>
            <input
              name="title"
              onChange={handleChange}
              type="text"
              placeholder="e.g. I will do something I'm realling good at"
            />
            <label htmlFor="cat">Category</label>
            onChange={handleChange}
            <select name="cat" id="cat" onChange={handleChange}>
              <option value="design">Design</option>
              <option value="web">Web Development</option>
              <option value="animation">Animation</option>
              <option value="music">Music</option>
            </select>
            <div className="images">
              <div className="imagesInput">
                <label htmlFor="">Cover Image</label>
                <input
                  type="file"
                  onChange={(e) => setCoverFile(e.target.files[0])}
                />
                <label htmlFor="">Upload Images</label>
                <input
                  type="file"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                />
              </div>
              <button onClick={handleUpload}>
                {uploading ? "Uploading..." : "Upload"}
              </button>
            </div>
            <label htmlFor="">Description</label>
            <textarea
              name="desc"
              onChange={handleChange}
              id=""
              cols="30"
              rows="16"
              placeholder="Brief descriptions to introduce your service to customers"
            ></textarea>
            <button>Create</button>
          </div>
          <div className="right">
            <label htmlFor="">Service Title</label>
            <input
              name="shortTitle"
              type="text"
              placeholder="e.g. One-page web design"
              onChange={handleChange}
            />

            <label htmlFor="">Short Description</label>
            <textarea
              name="shortDesc"
              id=""
              cols="30"
              rows="10"
              placeholder="Short description of your service"
              onChange={handleChange}
            ></textarea>

            <label htmlFor="">Delivery Time (e.g. 3 days)</label>
            <input
              name="deliveryTime"
              onChange={handleChange}
              type="number"
              min={1}
            />

            <label htmlFor="">Revision Number</label>
            <input
              name="revisionNumber"
              onChange={handleChange}
              type="number"
              min={1}
            />

            <label htmlFor="">Add Features</label>
            <form className="addFeatures" onSubmit={handleFeature}>
              <input
                type="text"
                placeholder="e.g. page desing"
                name="features"
              />
              <button type="submit">add</button>
            </form>
            <div className="addedFeatures">
              {state?.features?.map((f) => (
                <div className="item" key={f}>
                  <button
                    onClick={() =>
                      dispatch({ type: "REMOVE_FEATURE", payload: f })
                    }
                  >
                    {f}
                    <span>X</span>
                  </button>
                </div>
              ))}
            </div>

            <label htmlFor="">Price</label>
            <input type="number" min={1} name="price" onChange={handleChange} />
          </div>
        </div>
      </div>
    </div>
  );
}

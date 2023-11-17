import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import { addPost } from "../store/postSlice";
import {useNavigate} from "react-router";
import store from "./../store/index";
import localStorageHandler from "../LocalStorageHandler";
import { useUser } from "../userContext";

import "./NewPost.css";


const NewPost = () => {
  
  const [ caption, setCaption ] = useState("");
   const { username: contextUsername, setUser } = useUser();
   const [media, setMedia] = useState(null);
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const [touched, setTouched] = useState(false);



   const handleCaptionChange = (event) => {
     setCaption(event.target.value);
   };

   const handleMediaChange = (event) => {
     const file = event.target.files[0];
     setMedia(file);
   };

  const handleCreatePost = () => {

    if(!caption) setTouched(true)
    else {
      const state = JSON.parse(JSON.stringify(store.getState().posts.posts));

      const newPost = {
        id: state.length + 1,
        username: contextUsername,
        img: "https://jovial-sammet-j3svpro5t.storage.iran.liara.space/products/1.jpg",
        likes: [],
        share: 0,
        saves: [],
        comments: [],
        caption: caption
      };
     
      dispatch(addPost(newPost));
      setCaption("");
      setMedia(null);
      const newState = JSON.parse(JSON.stringify(store.getState().posts.posts));
      localStorageHandler.setItem("data", newState);
      navigate("/");
    }
   };



  return (
    <div className="post-container">
      <h1 className="newPost-title">New Post</h1>
      <div
        style={{
          borderRadius: "10px",
        }}
      >
        {media && (
          <img
            src={URL.createObjectURL(media)}
            alt="Uploaded Media"
            style={{
              width: "100%",
            }}
          />
        )}
        <textarea
          placeholder="Write your caption..."
          value={caption}
          onChange={handleCaptionChange}
          className={`text-area ${touched && !caption ? "input-required" : ""}`}
          rows={4}
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleMediaChange}
          style={{ marginBottom: "10px", marginLeft: "1rem" }}
        />
        <br />
        <button
          onClick={handleCreatePost}
          style={{
            marginLeft: "1rem",
            backgroundColor: "#3897f0",
            color: "white",
            padding: "10px",
            borderRadius: "5px",
            cursor: "pointer",
            border: "none",
            marginBottom: "1rem",
          }}
        >
          Post
        </button>
      </div>
    </div>
  );
}

export default NewPost






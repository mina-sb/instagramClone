import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {useNavigate} from 'react-router';
import {useUser} from "../userContext";
import localStorageHandler from "../LocalStorageHandler";
import { useDispatch } from "react-redux";
import {updateInitialState} from "../store/postSlice";

import Post from './Post';
import "./Posts.css";



const Posts = () => {
  const {username: contextUsername, setUser} = useUser();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.posts.posts);
  const navigate = useNavigate();
  const [ posts, setPosts ] = useState([]);

  useEffect(() => {
    if(contextUsername) {
      const retrievedData = localStorageHandler.getItem("data");
      if(retrievedData) {
        setPosts(retrievedData); 
        dispatch(updateInitialState(retrievedData));
      }
      else {
        localStorageHandler.setItem("data", data);
        setPosts(data); 
      }
    } else {
      navigate('/')
    }
}, []);
  
  const newPostHandler = () => {
     navigate("/new-post");
  }
  
  return (
    <div>
      <h1>Hello, {contextUsername}</h1>
      <ul className="posts">
        {posts &&
          posts.map((post) => (
            <li key={post.id}>
              <Post
                username={post.username}
                id={post.id}
                likes={post.likes}
                img={post.img}
                caption = {post.caption}
              />
            </li>
          ))}
      </ul>
      <div className="new-post-btn" onClick={newPostHandler}>
        +
      </div>
    </div>
  );
}

export default Posts
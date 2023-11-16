import React, {useEffect, useState} from 'react';
import { useSelector } from "react-redux";
import Post from './Post';
import "./Posts.css";



const Posts = () => {

  const data = useSelector((state) => state.posts.posts);
  const [ posts, setPosts ] = useState([]);
  useEffect(() => {
    setPosts(data); 
}, []);
  
  
  return (
    <div>
      <h1>Home</h1>
      <ul className="posts">
        {posts &&
          posts.map((post) => (
            <li key={post.id}>
              <Post
                username={post.username}
                id={post.id}
                likes={post.likes}
                img={post.img}
              />
            </li>
          ))}
      </ul>
      <div className="new-post-btn">+</div>
    </div>
  );
}

export default Posts
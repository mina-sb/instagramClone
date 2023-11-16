import React, {useEffect, useState} from 'react'
import img from "../assets/1.jpg";
import Post from './Post';
import "./Posts.css";



const Posts = () => {
  const [posts, setPosts] = useState([]);
  const data = [
    { id: 1, username: "mina" },
    { id: 2, username: "mina" },
    { id: 3, username: "ali" },
  ];
  let elements;

  useEffect(() => {
    setPosts(data);
    
}, []);
  
  
  return (
    <div>
      <h1>Home</h1>
      <ul className="posts">
        {posts.map((post) => (
          <li key={post.id}>
            <Post username={post.username} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Posts
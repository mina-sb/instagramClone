import React, {useEffect, useState} from 'react'
import Post from './Post';
import "./Posts.css";



const Posts = () => {
  const [posts, setPosts] = useState([]);
  const data = [
    { id: 1, username: "mina", like: [], share: [], save: [], comments: [] },
    { id: 2, username: "mina", like: [], share: [], save: [], comments: [] },
    { id: 3, username: "ali", like: [], share: [], save: [], comments: [] },
  ];

  useEffect(() => {
    setPosts(data);
    
}, []);
  
  
  return (
    <div>
      <h1>Home</h1>
      <ul className="posts">
        {posts.map((post) => (
          <li key={post.id}>
            <Post username={post.username} id={post.id} likelist={post.like} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Posts
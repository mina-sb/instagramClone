import React, {useEffect, useState} from 'react'
import './Post.css';


const Post = ({ username, id, likelist }) => {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    user && !user.likedPosts.includes(id) && setLiked(true);
    user && !user.savedPosts.includes(id) && setSaved(true);
  }, [liked]);

  const likePost = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      if (liked) {
        user.likedPosts.push(id);
        localStorage.setItem("user", JSON.stringify(user));
        setLiked((prevState) => !prevState);
        likelist.push(user.userInfo.username);
        console.log(likelist)
      } else {
        user.likedPosts.pop(id);
        localStorage.setItem("user", JSON.stringify(user));
        setLiked((prevState) => !prevState);
        likelist.pop(user.userInfo.username);
        console.log(likelist);

      }
    }
  };

  const savePost = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      if (saved) {
        user.savedPosts.push(id);
        localStorage.setItem("user", JSON.stringify(user));
        setSaved((prevState) => !prevState);
      } else {
        user.savedPosts.pop(id);
        localStorage.setItem("user", JSON.stringify(user));
        setSaved((prevState) => !prevState);
      }
    }
  };

  return (
    <div className="post-container">
      <div className="user-info">
        <img src="https://placekitten.com/400/400" className="profile" />
        <span className="username">{username}</span>
      </div>
      <img
        className="post-image"
        src="https://placekitten.com/400/400"
        alt="Post"
      />
      <div className="post-buttons">
        <div>
          {liked ? (
            <i class="bx bx-heart post-button mr-2 ml-1" onClick={likePost}></i>
          ) : (
            <i
              class="bx bxs-heart post-button mr-2 ml-1"
              onClick={likePost}
            ></i>
          )}
          <i class="bx bx-message-rounded-dots bx-flip-horizontal post-button mr-2"></i>
          <i class="bx bx-send post-button mr-2"></i>
        </div>
        {saved ? (
          <i class="bx bx-bookmark post-button" onClick={savePost}></i>
        ) : (
          <i class="bx bxs-bookmark-star post-button" onClick={savePost}></i>
        )}
      </div>
      <div className="caption">
        <b>{username}</b>
        <span>
          Also, this is inside a web browser (Safari) and only seems to be
          working on this account. My personal account still looks like a mobile
          version on desktop (with all the left menu stuff at the top)
        </span>
      </div>
    </div>
  );
};

export default Post
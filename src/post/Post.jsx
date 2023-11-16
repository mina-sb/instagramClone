import React from 'react'
import './Post.css';


const Post = ({username}) => {
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
          <i class="bx bx-heart post-button mr-2 ml-1"></i>
          <i class="bx bx-message-rounded-dots bx-flip-horizontal post-button mr-2"></i>
          <i class="bx bx-send post-button mr-2"></i>
        </div>
        <i class="bx bx-bookmark post-button"></i>
      </div>
      <div className="caption">
        <b>{username}</b>{" "}
        <span>
          Also, this is inside a web browser (Safari) and only seems to be
          working on this account. My personal account still looks like a mobile
          version on desktop (with all the left menu stuff at the top)
        </span>
      </div>
    </div>
  );
}

export default Post
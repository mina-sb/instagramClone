import React, {useEffect, useState} from 'react';
import { useDispatch , useSelector } from "react-redux";
import { postLike, postSave, addComment } from "../store/postSlice";
import store from "./../store/index";

import './Post.css';


const Post = ({ username, id, img }) => {
  const [liked, setLiked] = useState(false);
  const [ saved, setSaved ] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [ comment, setComment ] = useState('');
  const [comments, setComments] = useState("");

  const [likedBy , setLikedBy] = useState(' ')
  const dispatch = useDispatch();


  /* useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    user && !user.likedPosts.includes(id) && setLiked(true);
    user && !user.savedPosts.includes(id) && setSaved(true);
  }, [ liked ]);
   */
  useEffect(() => {
    const likes = store.getState().posts.posts[ id - 1 ].likes;
    if(likes.length)
      setLikedBy('Liked by ' + likes.join(' '))
    else
      setLikedBy(false)
   
  } , [liked])
  const savePost = () => {
    /*  const user = JSON.parse(localStorage.getItem("user"));
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
    } */
    dispatch(postSave({ id, username }));
    setSaved((prevState) => !prevState);
    console.log(JSON.parse(JSON.stringify(store.getState().posts.posts)));
  };
  const likePost = () => {
    /*     const user = JSON.parse(localStorage.getItem("user"));
       if (user) {
         if (liked) {
           user.likedPosts.push(id);
           localStorage.setItem("user", JSON.stringify(user));
           setLiked((prevState) => !prevState);
           likeArray.push(user.userInfo.username);
           console.log(likeArray);
         } else {
           user.likedPosts.pop(id);
           localStorage.setItem("user", JSON.stringify(user));
           setLiked((prevState) => !prevState);
           likeArray.pop(user.userInfo.username);
           console.log(likeArray);
         }
       } */
    dispatch(postLike({ id, username }));
    setLiked((prevState) => !prevState);
    console.log(JSON.parse(JSON.stringify(store.getState().posts.posts)));
  };
  const isCommentsOpen = () => {
    setShowComments(!showComments);
  }
  const handleKeyDown = (e) => {
    if(e.key === "Enter" && comment) {
      dispatch(addComment({id, username, comment}));
      setComment('')
    }
    loadComments()
  };

  const loadComments = () => {
    const commentss = JSON.parse(JSON.stringify(store.getState().posts.posts[ id - 1 ].comments));

    const y = commentss.map((cm) => {
      return (
        <li className="comment-item">
          <img src="https://placekitten.com/400/400" className="profile mr-2" />
          <p className="comment">
            <b className="ml-1">{cm.username}</b>
            {cm.comment}
          </p>
        </li>
      );
    });
setComments(y)
  }

  return (
    <div className="post-container">
      <div className="user-info">
        <img src="https://placekitten.com/400/400" className="profile" />
        <span className="username">{username}</span>
      </div>
      <img className="post-image" src={img} alt="Post" />
      <div className="post-buttons">
        <div>
          {liked ? (
            <i
              class="bx bxs-heart post-button mr-2 ml-1"
              onClick={likePost}
            ></i>
          ) : (
            <i class="bx bx-heart post-button mr-2 ml-1" onClick={likePost}></i>
          )}
          <i
            class="bx bx-message-rounded-dots bx-flip-horizontal post-button mr-2"
            onClick={isCommentsOpen}
          ></i>
          <i class="bx bx-send post-button mr-2"></i>
        </div>
        {saved ? (
          <i class="bx bxs-bookmark-star post-button" onClick={savePost}></i>
        ) : (
          <i class="bx bx-bookmark post-button" onClick={savePost}></i>
        )}
      </div>
      <div className="likes">
        <img
          src="https://placekitten.com/400/400"
          className="profile small mr-ngtv"
        />
        <img
          src="https://placekitten.com/400/400"
          className="profile small mr-ngtv"
        />
        <img
          src="https://placekitten.com/400/400"
          className="profile small mr-ngtv"
        />
        <span className="like-by-span"> {likedBy ? likedBy : ""} </span>
      </div>
      <div className="caption">
        <b className="mr-2">{username}</b>
        <span>
          Also, this is inside a web browser (Safari) and only seems to be
          working on this account. My personal account still looks like a mobile
          version on desktop (with all the left menu stuff at the top)
        </span>
      </div>
      {showComments ? (
        <div className="comments">
          <ul className="comments-list">{comments}</ul>
          <hr className="hr" />
          <div className="addComment">
            <img src="https://placekitten.com/400/400" className="profile" />
            <textarea
              type="text"
              id="username"
              placeholder={`Add a comment for ${username}...`}
              className="input-comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              onKeyDown={handleKeyDown}
              style={{ resize: "none", overflow: "hidden", minHeight: "15px"  }}
            />
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
    
  
};

export default Post
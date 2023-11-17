import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import {postLike, postSave, addComment, sharePost} from "../store/postSlice";
import localStorageHandler from "../LocalStorageHandler";
import store from "./../store/index";
import { useUser } from "../userContext";
import './Post.css';
import Modal from '../UlElements/Modal';


const Post = ({ username, id, img, caption }) => {
  const { username: contextUsername, setUser } = useUser();
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [likedBy, setLikedBy] = useState(" ");
  const dispatch = useDispatch();

  useEffect(() => {
    setLiked(
      store.getState().posts.posts[id - 1].likes.includes(contextUsername)
    );
    setSaved(
      store.getState().posts.posts[id - 1].saves.includes(contextUsername)
    );
    setShowComments(true);
    loadComments();
  }, []);

  useEffect(() => {
    const likes = store.getState().posts.posts[id - 1].likes;
    if (likes.length) setLikedBy("Liked by " + likes.join(","));
    else setLikedBy(false);
  }, [liked]);

  const savePost = () => {
    dispatch(postSave({ id, contextUsername }));
    setSaved((prevState) => !prevState);
    const state = JSON.parse(JSON.stringify(store.getState().posts.posts));
    localStorageHandler.setItem("data", state);
  };
  const likePost = () => {
    dispatch(postLike({ id, contextUsername }));
    setLiked((prevState) => !prevState);
    const state = JSON.parse(JSON.stringify(store.getState().posts.posts));
    localStorageHandler.setItem("data", state);
  };
  const isCommentsOpen = () => {
    setShowComments(!showComments);
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && comment) {
      dispatch(addComment({ id, contextUsername, comment }));
      setComment("");
    }
    const state = JSON.parse(JSON.stringify(store.getState().posts.posts));
    localStorageHandler.setItem("data", state);
    loadComments();
  };

  const handleShareClick = () => {
    setIsModalOpen((prev) => !prev);
    dispatch(sharePost({ id }));
    const state = JSON.parse(JSON.stringify(store.getState().posts.posts));
    localStorageHandler.setItem("data", state);
  };

  const handleCloseModal = () => {
    setIsModalOpen((prev) => !prev);
  };
  const loadComments = () => {
    const commentss = JSON.parse(
      JSON.stringify(store.getState().posts.posts[id - 1].comments)
    );
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
    setComments(y);
  };

  return (
    <>
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
              <i
                class="bx bx-heart post-button mr-2 ml-1"
                onClick={likePost}
              ></i>
            )}
            <i
              class="bx bx-message-rounded-dots bx-flip-horizontal post-button mr-2"
              onClick={isCommentsOpen}
            ></i>
            <i
              class="bx bx-send post-button mr-2"
              onClick={handleShareClick}
            ></i>
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
          <span>{caption}</span>
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
                style={{
                  resize: "none",
                  overflow: "hidden",
                  minHeight: "15px",
                }}
              />
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
      {isModalOpen && <Modal onClose={handleCloseModal} />}
    </>
  );
};

export default Post
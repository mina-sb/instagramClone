import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [
      {
        id: 1,
        username: "ahmad",
        img: "https://jovial-sammet-j3svpro5t.storage.iran.liara.space/products/1.jpg",
        likes: [],
        share: [],
        saves: [],
        comments: [],
      },
      {
        id: 2,
        username: "mina",
        img: "https://jovial-sammet-j3svpro5t.storage.iran.liara.space/products/5.jpg",
        likes: [],
        share: [],
        saves: [],
        comments: [],
      },
      {
        id: 3,
        username: "ali",
        img: "https://jovial-sammet-j3svpro5t.storage.iran.liara.space/products/2.jpg",
        likes: [],
        share: [],
        saves: [],
        comments: [],
      },
    ],
  },
  reducers: {
    addPost: (state, action) => {
      state.posts.push(action.payload);
    },
    postLike: (state, action) => {
      const { id: postId, username: userId } = action.payload;
      const post = state.posts.find((post) => post.id === postId);
      if (post) {
        if (!post.likes.includes(userId)) {
          post.likes.push(userId);
        } else {
          post.likes = post.likes.filter((id) => id !== userId);
        }
      }
    },
    postSave: (state, action) => {
      const { id: postId, username: userId } = action.payload;
      let result;
      const post = state.posts.find((post) => post.id === postId);
      if (post) {
        if (!post.saves.includes(userId)) {
          post.saves.push(userId);
          result = true;
        } else {
          post.saves = post.saves.filter((id) => id !== userId);
          result = false;
        }
      }
    },
    addComment: (state, action) => {
      const { id: postId, username, comment } = action.payload;
      const postIndex = state.posts.findIndex((post) => post.id === postId);
      if(postIndex !== -1) {
        const com = {
          comment: comment,
          username: username,
        };
        state.posts[postIndex].comments.push(com);
      }
    },

    // Additional reducers for likes, saves, comments, shares, etc.
  },
});

export const { addPost, postLike, postSave, addComment } = postSlice.actions;
export default postSlice.reducer;

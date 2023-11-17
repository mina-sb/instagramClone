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
        share: 0,
        saves: [],
        comments: [],
        caption:
          "Embark on a journey of innovation with our cutting-edge demo. Explore seamless features, experience breakthrough technology, and redefine possibilities. Join us in shaping the future together.",
      },
      {
        id: 2,
        username: "mina",
        img: "https://jovial-sammet-j3svpro5t.storage.iran.liara.space/products/5.jpg",
        likes: [],
        share: 0,
        saves: [],
        comments: [],
        caption:
          "Embark on a journey of innovation with our cutting-edge demo. Explore seamless features, experience breakthrough technology, and redefine possibilities. Join us in shaping the future together.",
      },
      {
        id: 3,
        username: "ali",
        img: "https://jovial-sammet-j3svpro5t.storage.iran.liara.space/products/2.jpg",
        likes: [],
        share: 0,
        saves: [],
        comments: [],
        caption:
          "Embark on a journey of innovation with our cutting-edge demo. Explore seamless features, experience breakthrough technology, and redefine possibilities. Join us in shaping the future together.",
      },
    ],
  },
  reducers: {
    postLike: (state, action) => {
      const { id: postId, contextUsername: userId } = action.payload;
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
      const { id: postId, contextUsername: userId } = action.payload;
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
      const { id: postId, contextUsername, comment } = action.payload;
      const postIndex = state.posts.findIndex((post) => post.id === postId);
      if (postIndex !== -1) {
        const com = {
          comment: comment,
          username: contextUsername,
        };
        state.posts[postIndex].comments.push(com);
      }
    },
    addPost: (state, action) => {
      const newPost = action.payload;
      state.posts.push(newPost);
    },
    sharePost: (state, action) => {
      const { id: postId } = action.payload;
      const post = state.posts.find((post) => post.id === postId);
      if (post) {
        post.share++;
      }
    },
    updateInitialState: (state, action) => {
      state.posts = action.payload || [];
    },
  },
});

export const {
  postLike,
  postSave,
  addComment,
  addPost,
  sharePost,
  updateInitialState,
} = postSlice.actions;
export default postSlice.reducer;

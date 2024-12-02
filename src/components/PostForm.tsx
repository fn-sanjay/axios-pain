import React, { useState, useEffect } from "react";
import { usePosts } from "../hooks/usePosts";
import { useNavigate } from "react-router-dom";
import { Post } from "../services/api";

interface PostFormProps {
  postId?: number; // Optional for creating new post
}

const PostForm: React.FC<PostFormProps> = ({ postId }) => {
  const { post, createNewPost, updateExistingPost, loading, error } = usePosts();
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    if (postId && post) {
      setTitle(post.title);
      setBody(post.body);
    }
  }, [postId, post]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newPost: Post = { id: postId ?? Date.now(), title, body };

    if (postId) {
      updateExistingPost(postId, newPost);
    } else {
      createNewPost(newPost);
    }

    navigate("/posts");
  };

  return (
    <div>
      <h2>{postId ? "Edit Post" : "Create Post"}</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Body"
        />
        <button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Save Post"}
        </button>
      </form>
    </div>
  );
};

export default PostForm;

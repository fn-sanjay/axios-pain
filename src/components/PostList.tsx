import React from "react";
import { usePosts } from "../hooks/usePosts";
import { useNavigate } from "react-router-dom";

const PostList: React.FC = () => {
  const { posts, loading, error, removePost } = usePosts();
  const navigate = useNavigate();

  if (loading) return <p>Loading posts...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Post List</h1>
      <button onClick={() => navigate("/create-post")}>Create New Post</button>
      <ul>
        {posts?.map((post) => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
            <button onClick={() => navigate(`/posts/${post.id}`)}>View Details</button>
            <button onClick={() => navigate(`/edit-post/${post.id}`)}>Edit</button>
            <button onClick={() => removePost(post.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;

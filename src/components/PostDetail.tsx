import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { usePosts } from "../hooks/usePosts";

const PostDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { post, comments, fetchPost, fetchComments, loading, error } = usePosts();

  useEffect(() => {
    if (id) {
      fetchPost(Number(id));
      fetchComments(Number(id));
    }
  }, [id, fetchPost, fetchComments]);

  if (loading) return <p>Loading post...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>{post?.title}</h1>
      <p>{post?.body}</p>

      <h2>Comments</h2>
      <ul>
        {comments?.map((comment) => (
          <li key={comment.id}>
            <p>{comment.name}</p>
            <p>{comment.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostDetail;

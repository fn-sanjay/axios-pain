import { useState, useEffect, useCallback } from "react";
import {
  fetchAllPosts,
  fetchPostById,
  fetchCommentsByPostId,
  fetchCommentsByQuery,
  createPost,
  updatePost,
  patchPost,
  deletePost,
  Post,
  Comment
} from "../services/api";

interface UsePostsResult {
  posts: Post[] | null;
  post: Post | null;
  comments: Comment[] | null;
  loading: boolean;
  error: string | null;
  fetchPost: (id: number) => void;
  fetchComments: (id: number) => void;
  createNewPost: (post: Post) => void;
  updateExistingPost: (id: number, post: Post) => void;
  patchPostDetails: (id: number, post: Partial<Post>) => void;
  removePost: (id: number) => void;
}

export const usePosts = (): UsePostsResult => {
  const [posts, setPosts] = useState<Post[] | null>(null); // All posts
  const [post, setPost] = useState<Post | null>(null); // Selected post
  const [comments, setComments] = useState<Comment[] | null>(null); // Comments for the post
  const [loading, setLoading] = useState<boolean>(false); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state
  const [cache, setCache] = useState<Record<number, Post>>({}); // Cache for posts
  const [commentsCache, setCommentsCache] = useState<Record<number, Comment[]>>({}); // Cache for comments

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchAllPosts();
      setPosts(data);
    } catch (err) {
      setError("Failed to fetch posts");
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchPost = useCallback(async (id: number) => {
    setLoading(true);
    setError(null);

    try {
      if (cache[id]) {
        setPost(cache[id]);
      } else {
        const data = await fetchPostById(id);
        setPost(data);
        setCache((prevCache) => ({ ...prevCache, [id]: data }));
      }
    } catch (err) {
      setError("Failed to fetch post");
    } finally {
      setLoading(false);
    }
  }, [cache]);

  const fetchComments = useCallback(async (id: number) => {
    setLoading(true);
    setError(null);

    try {
      if (commentsCache[id]) {
        setComments(commentsCache[id]);
      } else {
        const commentsFromPost = await fetchCommentsByPostId(id);
        const commentsFromQuery = await fetchCommentsByQuery(id);
        const allComments = [...commentsFromPost, ...commentsFromQuery];
        setComments(allComments);
        setCommentsCache((prevCache) => ({ ...prevCache, [id]: allComments }));
      }
    } catch (err) {
      setError("Failed to fetch comments");
    } finally {
      setLoading(false);
    }
  }, [commentsCache]);

  const createNewPost = async (post: Post) => {
    setLoading(true);
    setError(null);

    try {
      const createdPost = await createPost(post);
      setPosts((prevPosts) => (prevPosts ? [...prevPosts, createdPost] : [createdPost]));
    } catch (err) {
      setError("Failed to create post");
    } finally {
      setLoading(false);
    }
  };

  const updateExistingPost = async (id: number, post: Post) => {
    setLoading(true);
    setError(null);

    try {
      const updatedPost = await updatePost(id, post);
      setPosts((prevPosts) =>
        prevPosts ? prevPosts.map((p) => (p.id === id ? updatedPost : p)) : [updatedPost]
      );
    } catch (err) {
      setError("Failed to update post");
    } finally {
      setLoading(false);
    }
  };

  const patchPostDetails = async (id: number, post: Partial<Post>) => {
    setLoading(true);
    setError(null);

    try {
      const patchedPost = await patchPost(id, post);
      setPosts((prevPosts) =>
        prevPosts ? prevPosts.map((p) => (p.id === id ? patchedPost : p)) : [patchedPost]
      );
    } catch (err) {
      setError("Failed to patch post");
    } finally {
      setLoading(false);
    }
  };

  const removePost = async (id: number) => {
    setLoading(true);
    setError(null);

    try {
      await deletePost(id);
      setPosts((prevPosts) => prevPosts ? prevPosts.filter((post) => post.id !== id) : []);
    } catch (err) {
      setError("Failed to delete post");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return {
    posts,
    post,
    comments,
    loading,
    error,
    fetchPost,
    fetchComments,
    createNewPost,
    updateExistingPost,
    patchPostDetails,
    removePost
  };
};

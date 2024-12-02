import axios from "axios";

// Define Post and Comment types
export interface Post {
  id: number;
  title: string;
  body: string;
}

export interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

// Fetch all posts
export const fetchAllPosts = async (): Promise<Post[]> => {
  const response = await api.get<Post[]>("/posts");
  return response.data;
};

// Fetch a specific post by ID
export const fetchPostById = async (id: number): Promise<Post> => {
  const response = await api.get<Post>(`/posts/${id}`);
  return response.data;
};

// Fetch comments for a specific post by ID using `/posts/{id}/comments`
export const fetchCommentsByPostId = async (id: number): Promise<Comment[]> => {
  const response = await api.get<Comment[]>(`/posts/${id}/comments`);
  return response.data;
};

// Fetch comments using query parameters `/comments?postId={id}`
export const fetchCommentsByQuery = async (id: number): Promise<Comment[]> => {
  const response = await api.get<Comment[]>("/comments", {
    params: { postId: id },
  });
  return response.data;
};

// Create a new post (POST)
export const createPost = async (post: Post): Promise<Post> => {
  const response = await api.post<Post>("/posts", post);
  return response.data;
};

// Update an existing post (PUT)
export const updatePost = async (id: number, post: Post): Promise<Post> => {
  const response = await api.put<Post>(`/posts/${id}`, post);
  return response.data;
};

// Partially update an existing post (PATCH)
export const patchPost = async (id: number, post: Partial<Post>): Promise<Post> => {
  const response = await api.patch<Post>(`/posts/${id}`, post);
  return response.data;
};

// Delete a post (DELETE)
export const deletePost = async (id: number): Promise<void> => {
  await api.delete(`/posts/${id}`);
};

export default api;

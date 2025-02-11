import { useMutation, useQuery, QueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Post } from "./lib/models/post";

const usePosts = () =>
  useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const response = await axios.get<Post[]>(
        `${import.meta.env.VITE_APP_API_URL}/posts`
      );
      return response.data;
    },
  });

const useAddPost = (client: QueryClient) =>
  useMutation({
    mutationFn: async (title: string) => {
      const post = await axios.post<Post>(
        `${import.meta.env.VITE_APP_API_URL}/posts`,
        {
          title,
          views: 0,
        }
      );

      return post.data;
    },
    onSettled: async () => {
      return await client.invalidateQueries({ queryKey: ["posts"] });
    },
  });

export { usePosts, useAddPost };

import { useMutation, useQuery, QueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Task } from "../models/task";
import { User } from "../models/user";

const useTasks = () =>
  useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const response = await axios.get<Task[]>(
        `${import.meta.env.VITE_APP_API_URL}/tasks`
      );
      return response.data;
    },
  });

const useAddTask = (client: QueryClient) =>
  useMutation({
    mutationFn: async ({ title, user }: { title: string; user: string }) => {
      const task = await axios.post<Task>(
        `${import.meta.env.VITE_APP_API_URL}/tasks`,
        {
          user,
          title,
          created: new Date().toISOString(),
          last_modified: new Date().toISOString(),
        }
      );

      return task.data;
    },
    onSettled: async () => {
      return await client.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

const useDeleteTask = (client: QueryClient) =>
  useMutation({
    mutationFn: async (taskId: number) => {
      await axios.delete(`${import.meta.env.VITE_APP_API_URL}/tasks/${taskId}`);
    },
    onSettled: async () => {
      return await client.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

const useEditTask = (client: QueryClient) =>
  useMutation({
    mutationFn: async ({ taskId, title }: { taskId: number; title: string }) => {
      const task = await axios.patch<Task>(
        `${import.meta.env.VITE_APP_API_URL}/tasks/${taskId}`,
        {
          title,
          last_modified: new Date().toISOString(),
        }
      );

      return task.data;
    },
    onSettled: async () => {
      return await client.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

const fetchUsers = async () => {
  const response = await axios.get<User[]>(`${import.meta.env.VITE_APP_API_URL}/users`);
  return response.data;
};

const validateLogin = async (username: string, password: string) => {
  const users = await fetchUsers();
  return users.find((user: User) => user.username === username && user.password === password);
};

export { useTasks, useAddTask, useDeleteTask, useEditTask, fetchUsers, validateLogin };

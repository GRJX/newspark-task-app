import { useMutation, useQuery, QueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Task } from "./models/task";

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
    mutationFn: async (title: string) => {
      const task = await axios.post<Task>(
        `${import.meta.env.VITE_APP_API_URL}/tasks`,
        {
          title,
          views: 0,
        }
      );

      return task.data;
    },
    onSettled: async () => {
      return await client.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

const fetchUsers = async () => {
  const response = await axios.get(`${import.meta.env.VITE_APP_API_URL}/users`);
  return response.data;
};

const validateLogin = async (username: string, password: string) => {
  const users = await fetchUsers();
  console.log("Fetched users:", users);
  console.log("Validating username:", username, "with password:", password);
  return users.find((user: any) => user.username === username && user.password === password);
};

export { useTasks, useAddTask, fetchUsers, validateLogin };

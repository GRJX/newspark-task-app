import { useQueryClient } from "@tanstack/react-query";
import styles from "./tasks.module.scss";
import Loader from "../components/loader/loader";
import { useAddTask, useTasks, useDeleteTask, useEditTask, fetchUsers } from "../service/queries";
import { useEffect, useState } from "react";
import { User } from "../../service/models/user";
import Modal from "../components/modal/EditModal";
import DeleteModal from "../components/modal/DeleteModal";
import { useNavigate } from "react-router-dom";
import LogoutButton from "../components/logoutButton/LogoutButton";
import Pagination from "../components/pagination/Pagination";

const Tasks = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { data: tasks, isFetching } = useTasks();
  const addTask = useAddTask(queryClient);
  const deleteTask = useDeleteTask(queryClient);
  const editTask = useEditTask(queryClient);
  const [users, setUsers] = useState<User[]>([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentTaskId, setCurrentTaskId] = useState<number | null>(null);
  const [currentTaskTitle, setCurrentTaskTitle] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showEditMessage, setShowEditMessage] = useState(false);
  const [showDeleteMessage, setShowDeleteMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 10;
  const [modalErrorMessage, setModalErrorMessage] = useState("");
  const timeout = 10000;
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const usersData = await fetchUsers();
      setUsers(usersData);
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    if (addTask.isSuccess) {
      setShowSuccessMessage(true);
      setShowEditMessage(false);
      setShowDeleteMessage(false);
      setShowErrorMessage(false);
      const timer = setTimeout(() => {
        setShowSuccessMessage(false);
      }, timeout);
      return () => clearTimeout(timer);
    }
  }, [addTask.isSuccess]);

  useEffect(() => {
    if (editTask.isSuccess) {
      setShowEditMessage(true);
      setShowSuccessMessage(false);
      setShowDeleteMessage(false);
      setShowErrorMessage(false);
      const timer = setTimeout(() => {
        setShowEditMessage(false);
      }, timeout);
      return () => clearTimeout(timer);
    }
  }, [editTask.isSuccess]);

  useEffect(() => {
    if (deleteTask.isSuccess) {
      setShowDeleteMessage(true);
      setShowSuccessMessage(false);
      setShowEditMessage(false);
      setShowErrorMessage(false);
      const timer = setTimeout(() => {
        setShowDeleteMessage(false);
      }, timeout);
      return () => clearTimeout(timer);
    }
  }, [deleteTask.isSuccess]);

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user") || "{}");
    if (!user.id) {
      navigate("/login");
    }
  }, [navigate]);

  if (isFetching) {
    return <Loader />;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const titleElement = form.elements.item(0) as HTMLInputElement;

    const titleValue = titleElement?.value;
    titleElement.value = "";

    if (!titleValue.trim()) {
      setShowErrorMessage(true);
      setShowSuccessMessage(false);
      setShowEditMessage(false);
      setShowDeleteMessage(false);
      const timer = setTimeout(() => {
        setShowErrorMessage(false);
      }, timeout);
      return () => clearTimeout(timer);
    }

    const user = JSON.parse(sessionStorage.getItem("user") || "{}");
    if (user.id) {
      addTask.mutate({ title: titleValue, user: user.id });
    }
  };

  const handleEdit = (taskId: number, title: string) => {
    setCurrentTaskId(taskId);
    setCurrentTaskTitle(title);
    setIsEditModalOpen(true);
  };

  const handleDelete = (taskId: number) => {
    setCurrentTaskId(taskId);
    setIsDeleteModalOpen(true);
  };

  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
    setCurrentTaskId(null);
    setCurrentTaskTitle("");
    setModalErrorMessage("");
  };

  const handleEditModalSubmit = (title: string) => {
    if (!title.trim()) {
      setModalErrorMessage("Task title cannot be empty");
      setShowErrorMessage(false);
      setShowSuccessMessage(false);
      setShowEditMessage(false);
      setShowDeleteMessage(false);
      const timer = setTimeout(() => {
        setModalErrorMessage("");
      }, timeout);
      return () => clearTimeout(timer);
    }

    if (currentTaskId !== null) {
      editTask.mutate({ taskId: currentTaskId, title });
    }
    handleEditModalClose();
  };

  const handleDeleteModalClose = () => {
    setIsDeleteModalOpen(false);
    setCurrentTaskId(null);
  };

  const handleDeleteModalConfirm = () => {
    if (currentTaskId !== null) {
      deleteTask.mutate(currentTaskId);
    }
    handleDeleteModalClose();
  };

  const getUsername = (userId: string) => {
    const user = users.find((user) => user.id === userId);
    return user ? user.username : "Unknown";
  };

  const user = JSON.parse(sessionStorage.getItem("user") || "{}");
  if (!user.id) {
    return null;
  }

  const userTasks = user.superuser ? tasks : tasks?.filter(task => task.user === user.id) || [];
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = userTasks ? userTasks.slice(indexOfFirstTask, indexOfLastTask) : [];
  const totalPages = userTasks ? Math.ceil(userTasks.length / tasksPerPage) : 1;

  return (
    <main className={styles.tasks}>
      <div className={styles.header}>
        <h1 data-testid="tasks-header">Tasks</h1>
        <LogoutButton />
      </div>
      <div className={styles.messagePlaceholder}>
        {showSuccessMessage && <div className={styles.success} data-testid="alert-message">Task added</div>}
        {showEditMessage && <div className={styles.warning} data-testid="alert-message">Task edited</div>}
        {showDeleteMessage && <div className={styles.error} data-testid="alert-message">Task deleted</div>}
        {showErrorMessage && <div className={styles.error} data-testid="error-message">Task title cannot be empty</div>}
      </div>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input type="text" id="title" name="title" placeholder="Title" data-testid="title-input" />
        <button type="submit" id="add-task" data-testid="add-task-button">Add Task</button>
      </form>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>User</th>
            <th>Title</th>
            <th>Created</th>
            <th>Last Modified</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentTasks.length > 0 ? (
            currentTasks.map((task) => (
              <tr key={task.id}>
                <td>{task.id}</td>
                <td>{getUsername(task.user)}</td>
                <td>{task.title}</td>
                <td>{task.created}</td>
                <td>{task.last_modified}</td>
                <td className={`${styles["button-group"]} ${styles.actions}`}>
                  <button onClick={() => handleEdit(task.id, task.title)} data-testid={`edit-task-button-${task.id}`}>Edit</button>
                  <button onClick={() => handleDelete(task.id)} data-testid={`delete-task-button-${task.id}`}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className={styles["no-data"]}>
                No tasks created yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {userTasks && userTasks.length > tasksPerPage && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}

      {addTask.isPending && <Loader />}

      <Modal
        isOpen={isEditModalOpen}
        onClose={handleEditModalClose}
        onSubmit={handleEditModalSubmit}
        initialTitle={currentTaskTitle}
        errorMessage={modalErrorMessage}
      />

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={handleDeleteModalClose}
        onConfirm={handleDeleteModalConfirm}
      />
    </main>
  );
};

export default Tasks;

# React JSON Server Sample

This is a sample React application that uses JSON Server for a mock backend. The application allows users to manage tasks, including adding, editing, and deleting tasks. It also supports user authentication with superuser privileges.

## Installation

1. Clone the repository:

2. Install dependencies:
    ```sh
    npm install
    ```

## Running the Application

1. Build the React application:
    ```sh
    npm run build
    ```

2. Start the JSON Server and the React application:
    ```sh
    npm run dev
    ```

The application will be available at `http://localhost:5173`.

## Functional Description

### Login

1. Navigate to the login page at `http://localhost:5173/login`.
2. Enter your username and password.
3. Click the "Login" button.

### Superuser

A superuser has administrative privileges and can view and manage all tasks. Regular users can only view and manage their own tasks.

### Adding a Task

1. After logging in, navigate to the tasks page at `http://localhost:5173/tasks`.
2. Enter the task title in the input field.
3. Click the "Add Task" button.

### Editing a Task

1. On the tasks page, click the "Edit" button next to the task you want to edit.
2. Update the task title in the modal that appears.
3. Click the "Save" button to save your changes.

### Deleting a Task

1. On the tasks page, click the "Delete" button next to the task you want to delete.
2. Confirm the deletion in the modal that appears.

### Pagination

The application supports pagination for tasks. Users can navigate through pages of tasks using the "Previous" and "Next" buttons.

1. On the tasks page, use the "Previous" button to go to the previous page of tasks.
2. Use the "Next" button to go to the next page of tasks.
3. The current page number and total pages are displayed between the buttons.

### Logout

1. Click the "Logout" button in the header to log out of the application.

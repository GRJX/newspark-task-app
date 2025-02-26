import React from "react";
import styles from "./Modal.module.scss";

type DeleteModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

const DeleteModal: React.FC<DeleteModalProps> = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h2>Confirm Deletion</h2>
        <p>Are you sure you want to delete this task?</p>
        <div className={styles.buttons}>
          <button data-testid="cancel-button" type="submit" onClick={onClose}>
            Cancel
          </button>
          <button data-testid="delete-button" type="button" onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;

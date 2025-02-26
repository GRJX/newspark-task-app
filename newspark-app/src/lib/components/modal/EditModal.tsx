import React from "react";
import styles from "./Modal.module.scss";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (title: string) => void;
  initialTitle: string;
  errorMessage: string;
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onSubmit, initialTitle, errorMessage }) => {
  const [title, setTitle] = React.useState(initialTitle);

  React.useEffect(() => {
    setTitle(initialTitle);
  }, [initialTitle]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(title);
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h2>Edit Task</h2>
        <div className={styles.messagePlaceholder}>
          {errorMessage && <div className={styles.error} data-testid="error-message">{errorMessage}</div>}
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            data-testid="edit-title-input"
          />
          <div className={styles.buttons}>
            <button data-testid="cancel-button" type="button" onClick={onClose}>
              Cancel
            </button>
            <button data-testid="apply-button" type="submit">Apply</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;

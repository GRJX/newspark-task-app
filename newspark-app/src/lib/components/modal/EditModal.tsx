import React from "react";
import styles from "./Modal.module.scss";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (title: string) => void;
  initialTitle: string;
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onSubmit, initialTitle }) => {
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
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
          />
          <div className={styles.buttons}>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit">Apply</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;

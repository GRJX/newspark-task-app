import { useNavigate } from 'react-router-dom';
import styles from './logoutButton.module.scss';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <button onClick={handleLogout} className={styles.logoutButton} data-testid="logout-button">
      Logout
    </button>
  );
};

export default LogoutButton;

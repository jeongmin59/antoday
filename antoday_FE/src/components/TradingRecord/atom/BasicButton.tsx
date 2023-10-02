import styles from "./BasicButton.module.css";

interface BasicButtonProps {
  text?: string;
  onClick?: () => void;
}

const BasicButton: React.FC<BasicButtonProps> = ({ text }) => {
  
  return <button className={styles.button}>{text}</button>;
};

export default BasicButton;

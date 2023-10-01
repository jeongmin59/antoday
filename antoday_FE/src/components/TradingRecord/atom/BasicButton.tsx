import styles from './BasicButton.module.css'

interface BasicButtonProps {
  text?: string;
}

const BasicButton : React.FC<BasicButtonProps>= ({text}) => {
  return ( 
    <button className={styles.button} value={text}/>
   );
}
 
export default BasicButton;
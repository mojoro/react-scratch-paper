import styles from "./Button.module.css";

export default function Button({ type = "primary", label = "Button" }) {
  return <button className={styles[type]}>{label}</button>;
}

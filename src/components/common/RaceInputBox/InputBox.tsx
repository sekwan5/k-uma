import { Input } from "antd";
import styles from "./InputBox.module.css";

interface InputBoxProps {
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  label?: string;
  value?: string | number;
  width?: string | number;
}

export default function InputBox({
  placeholder,
  onChange,
  className,
  label,
  value,
  width = "100%",
}: InputBoxProps): JSX.Element {
  return (
    <div className={styles.inputContainer} style={{ width }}>
      {label && <div className={styles.inputLabel}>{label}</div>}
      <Input
        placeholder={placeholder}
        onChange={onChange}
        className={`${styles.input} ${className || ""}`}
        value={value}
      />
    </div>
  );
}

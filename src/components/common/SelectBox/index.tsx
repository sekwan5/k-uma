import { Select } from "antd";
import styles from "./SelectBox.module.css";

interface Option {
  value: string | number;
  label: string | number;
}

interface SelectBoxProps {
  options: Option[];
  onChange?: (value: string | number) => void;
  className?: string;
  label?: string;
  value?: string | number;
  width?: string | number;
  placeholder?: string;
}

export default function SelectBox({
  options,
  onChange,
  className,
  label,
  value,
  width = "100%",
  placeholder,
}: SelectBoxProps): JSX.Element {
  return (
    <div className={styles.selectContainer} style={{ width }}>
      {label && <div className={styles.selectLabel}>{label}</div>}
      <Select
        options={options}
        onChange={onChange}
        className={`${styles.select} ${className || ""}`}
        value={value}
        placeholder={placeholder}
        style={{ width: "100%" }}
      />
    </div>
  );
}

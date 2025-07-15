import { ChevronDown } from "lucide-react";
import styles from "./ToggleBox.module.css";

interface ToggleBoxTitleProps {
  title: string;
  isCollapsed: boolean;
  onToggle: () => void;
}

export default function ToggleBoxTitle({
  title,
  isCollapsed,
  onToggle,
}: ToggleBoxTitleProps): JSX.Element {
  return (
    <div
      className={styles.titleContainer}
      onClick={onToggle}
      style={{ backgroundColor: "var(--background-color, #e6f7ff)" }}
    >
      <div className={styles.titleContent}>
        <span className={styles.title}>{title}</span>
        <ChevronDown
          size={14}
          className={styles.icon}
          style={{
            transform: isCollapsed ? "rotate(-90deg)" : "rotate(0deg)",
          }}
        />
      </div>
    </div>
  );
}

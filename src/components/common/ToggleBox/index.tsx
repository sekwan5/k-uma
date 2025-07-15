import { useState } from "react";
import ToggleBoxTitle from "./ToggleBoxTitle";
import styles from "./ToggleBox.module.css";

export interface ToggleBoxProps {
  title: string;
  children: React.ReactNode;
  backgroundColor?: string; // 타이틀 배경색
  borderColor?: string; // 테두리 색상
  defaultCollapsed?: boolean; // 기본 접힘 상태
  className?: string; // 추가 클래스
}

export default function ToggleBox({
  title,
  children,
  backgroundColor = "#DFE1F9", // 더 어두운 파란색으로 변경
  borderColor = "#d9d9d9", // 기본 테두리 색상 (회색)
  defaultCollapsed = false,
  className = "",
}: ToggleBoxProps): JSX.Element {
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);

  const style = {
    "--border-color": borderColor,
    "--background-color": backgroundColor,
  } as React.CSSProperties;

  return (
    <div className={`${styles.toggleBox} ${className}`} style={style}>
      <ToggleBoxTitle
        title={title}
        isCollapsed={isCollapsed}
        onToggle={() => {
          setIsCollapsed(!isCollapsed);
        }}
      />
      <div className={isCollapsed ? styles.contentCollapsed : styles.content}>
        <div className={styles.contentInner}>{children}</div>
      </div>
    </div>
  );
}

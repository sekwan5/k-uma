import styles from "./NumberControl.module.css";

interface NumberControlProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
}

export default function NumberControl({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  className = "",
}: NumberControlProps): JSX.Element {
  const handleDecrease = () => {
    if (value > min) {
      onChange(Math.max(min, value - step));
    }
  };

  const handleIncrease = () => {
    if (value < max) {
      onChange(Math.min(max, value + step));
    }
  };

  return (
    <div className={`${styles.numberControl} ${className}`}>
      <button
        className={`${styles.button} ${styles.decreaseButton}`}
        onClick={handleDecrease}
        disabled={value <= min}
        type="button"
        aria-label="감소"
      >
        -
      </button>
      <span className={styles.value}>{value}</span>
      <button
        className={`${styles.button} ${styles.increaseButton}`}
        onClick={handleIncrease}
        disabled={value >= max}
        type="button"
        aria-label="증가"
      >
        +
      </button>
    </div>
  );
}

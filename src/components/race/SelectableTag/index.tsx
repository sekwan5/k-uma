import styles from "./SelectableTag.module.css";

interface TagItem {
  id: string;
  label: string;
}

interface SelectableTagProps {
  items: TagItem[];
  selectedIds: string[];
  onChange: (selectedIds: string[]) => void;
  className?: string;
}

export default function SelectableTag({
  items,
  selectedIds,
  onChange,
  className = "",
}: SelectableTagProps): JSX.Element {
  const handleTagClick = (id: string) => {
    if (selectedIds.includes(id)) {
      // 이미 선택된 태그라면 선택 해제
      onChange(selectedIds.filter((selectedId) => selectedId !== id));
    } else {
      // 선택되지 않은 태그라면 선택 추가
      onChange([...selectedIds, id]);
    }
  };

  return (
    <div className={`${styles.tagContainer} ${className}`}>
      {items.map((item) => (
        <button
          key={item.id}
          className={`${styles.tag} ${
            selectedIds.includes(item.id) ? styles.selected : ""
          }`}
          onClick={() => handleTagClick(item.id)}
          type="button"
        >
          {selectedIds.includes(item.id) && (
            <span className={styles.checkmark}>✓</span>
          )}
          {item.label}
        </button>
      ))}
    </div>
  );
}

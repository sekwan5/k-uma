import React from "react";
import AddButton from "@/components/common/AddButton";
import { SelectedCharacter } from "./types";
import CoImage from "@/components/common/CoImages";

interface SuccessionTreeProps {
  label?: string;
  borderColor?: string;
  selected?: {
    main: SelectedCharacter;
    child1: SelectedCharacter;
    child2: SelectedCharacter;
  };
  isActive?: boolean;
  currentPosition?: "main" | "child1" | "child2";
  onMainClick?: () => void;
  onChild1Click?: () => void;
  onChild2Click?: () => void;
  parentScore?: number;
  isBothParentsSelected: boolean;
}

const SuccessionTree: React.FC<SuccessionTreeProps> = ({
  label,
  borderColor = "#22b2fa",
  selected,
  isActive,
  currentPosition,
  onMainClick,
  onChild1Click,
  onChild2Click,
  parentScore = 0,
  isBothParentsSelected = false,
}) => {
  const isParent1 = label === "부모1";
  return (
    <div className={`tree-box ${isActive ? "active" : ""}`}>
      {label && (
        <div className="tree-label" style={{ background: borderColor }}>
          {label}
        </div>
      )}
      <div
        className="succession-parent"
        style={{ border: `1px solid ${borderColor}` }}
      >
        <div className="succession-border">
          <div className="succession-border-top"></div>
          <div className="succession-border-bottom"></div>
        </div>
        <div className={`succession-item main`}>
          <div
            className="character-button"
            style={{
              border: `${currentPosition === "main" ? `4px solid ${borderColor}` : ""}`,
            }}
          >
            <div className="ratio-container">
              {selected?.main ? (
                <div className="selected-character">
                  <CoImage
                    src={selected.main.imageUrl}
                    alt={selected.main.name}
                    lazy={false}
                  />
                  <div className="level-badge">
                    {selected.main.relationScore}
                  </div>
                </div>
              ) : (
                <button className="add-button" onClick={onMainClick}>
                  <AddButton />
                </button>
              )}
            </div>
          </div>
        </div>
        <div className={`succession-item child-1`}>
          <div
            className="character-button"
            style={{
              border: `${currentPosition === "child1" ? `4px solid ${borderColor}` : ""}`,
            }}
          >
            <div className="ratio-container">
              {selected?.child1 ? (
                <div className="selected-character">
                  <CoImage
                    src={selected.child1.imageUrl}
                    alt={selected.child1.name}
                    lazy={false}
                  />
                  <div className="level-badge">
                    {selected.child1.relationScore}
                  </div>
                </div>
              ) : (
                <button className="add-button" onClick={onChild1Click}>
                  <AddButton />
                </button>
              )}
            </div>
          </div>
        </div>
        <div className={`succession-item child-2`}>
          <div
            className="character-button"
            style={{
              border: `${currentPosition === "child2" ? `4px solid ${borderColor}` : ""}`,
            }}
          >
            <div className="ratio-container">
              {selected?.child2 ? (
                <div className="selected-character">
                  <CoImage
                    src={selected.child2.imageUrl}
                    alt={selected.child2.name}
                    lazy={false}
                  />
                  <div className="level-badge">
                    {selected.child2.relationScore}
                  </div>
                </div>
              ) : (
                <button className="add-button" onClick={onChild2Click}>
                  <AddButton />
                </button>
              )}
            </div>
          </div>
        </div>
        <div
          className={`connection-line ${isParent1 ? "parent1" : "parent2"} ${
            isBothParentsSelected ? "both-parents-selected" : ""
          }`}
        >
          {!isParent1 && <div className="level-badge">{parentScore}</div>}
        </div>
      </div>
    </div>
  );
};

export default SuccessionTree;

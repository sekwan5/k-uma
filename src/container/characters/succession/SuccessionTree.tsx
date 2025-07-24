import React from "react";
import AddButton from "@/components/common/AddButton";

interface SuccessionTreeProps {
  label?: string;
  borderColor?: string;
  onMainClick?: () => void;
  onChild1Click?: () => void;
  onChild2Click?: () => void;
}

const SuccessionTree: React.FC<SuccessionTreeProps> = ({
  label,
  borderColor = "#22b2fa",
  onMainClick,
  onChild1Click,
  onChild2Click,
}) => {
  return (
    <div className="tree-box">
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
        <div className="succession-item main">
          <div className="character-button">
            <div className="ratio-container">
              <button className="add-button" onClick={onMainClick}>
                <AddButton />
              </button>
            </div>
          </div>
        </div>
        <div className="succession-item child-1">
          <div className="character-button">
            <div className="ratio-container">
              <button className="add-button" onClick={onChild1Click}>
                <AddButton />
              </button>
            </div>
          </div>
        </div>
        <div className="succession-item child-2">
          <div className="character-button">
            <div className="ratio-container">
              <button className="add-button" onClick={onChild2Click}>
                <AddButton />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessionTree;

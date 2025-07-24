import React, { useState } from "react";
import SuccessionTree from "./SuccessionTree";
import "./Succession.scss";

interface SuccessionProps {
  // 추후 필요한 props 추가
}

const Succession: React.FC<SuccessionProps> = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleMainClick = () => {
    console.log("메인 캐릭터 선택");
  };

  const handleChild1Click = () => {
    console.log("첫 번째 자식 캐릭터 선택");
  };

  const handleChild2Click = () => {
    console.log("두 번째 자식 캐릭터 선택");
  };

  return (
    <div>
      <div className="succession-container">
        <div className="succession-parent-1">
          <SuccessionTree
            label="부모1"
            borderColor="#22b2fa"
            onMainClick={handleMainClick}
            onChild1Click={handleChild1Click}
            onChild2Click={handleChild2Click}
          />
        </div>
        <div className="succession-parent-2">
          <SuccessionTree
            label="부모2"
            borderColor="#fd6db2"
            onMainClick={handleMainClick}
            onChild1Click={handleChild1Click}
            onChild2Click={handleChild2Click}
          />
        </div>

        <div className="succession-result">{/* 결과 영역 */}</div>

        <div className="control-buttons">
          <button className="reset-button">초기화</button>
          <button className="submit-button">자동 선택</button>
        </div>

        <div className="character-selector">
          <div className="character-filter">
            <input
              type="text"
              placeholder="캐릭터 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          <div className="character-grid">
            {Array(32)
              .fill(null)
              .map((_, index) => (
                <div key={index} className="character-item">
                  <div className="character-icon">
                    <div className="level-badge">30</div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Succession;

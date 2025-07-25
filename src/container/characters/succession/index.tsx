import React, { useState, useMemo } from "react";
import SuccessionTree from "./SuccessionTree";
import "./Succession.scss";
import { Store } from "./Store";

interface SuccessionProps {
  characterId: string;
}

const Succession: React.FC<SuccessionProps> = ({ characterId }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const imgPath = import.meta.env.VITE_ASSETS_URL;

  console.log("받은 캐릭터 ID:", characterId);

  // characterData를 배열로 변환
  const characters = useMemo(() => {
    // 1. 기본 캐릭터 정보 출력
    console.log(`=== 📊 캐릭터 정보 ===`);
    console.log(`총 캐릭터 수: ${Store.charaNameList.length}`);
    console.log(
      `캐릭터 이름들: ${Store.charaNameList.slice(0, 5).join(", ")}... (처음 5개)`,
    );

    // 본인을 제외하고 관계 점수로 정렬된 캐릭터 리스트 반환
    return Store.charaListPublic
      .map((chara) => ({
        id: chara.id,
        name: chara.name,
        imageUrl: `${imgPath}/uma_profile/${chara.icon}`,
        relationScore: characterId
          ? Store.parentById(characterId, chara.id)
          : 0,
      }))
      .sort((a, b) => b.relationScore - a.relationScore); // 관계 점수 높은 순으로 정렬
  }, [imgPath]);

  // 검색 필터링
  const filteredCharacters = characters.filter((char) =>
    char.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

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
            {filteredCharacters.map((character) => (
              <div key={character.id} className="character-item">
                <div className="character-icon">
                  <img
                    src={character.imageUrl}
                    alt={character.name}
                    title={character.name}
                  />
                </div>
                <div className="level-badge">{character.relationScore}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Succession;

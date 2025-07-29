import React, { useState, useMemo } from "react";
import SuccessionTree from "./SuccessionTree";
import "./Succession.scss";
import { Store } from "./Store";
import CoImage from "@/components/common/CoImages";
import { SelectionOrder, TreePositions } from "./types";
import { matchesInitialConsonants } from "@/modules/utils";
import { Character } from "../succession";

interface SuccessionProps {
  characterId: string;
}

const Succession: React.FC<SuccessionProps> = ({ characterId }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const imgPath = import.meta.env.VITE_ASSETS_URL;

  // 선택된 캐릭터들
  const [selectedPositions, setSelectedPositions] = useState<TreePositions>({
    parent1: { main: null, child1: null, child2: null },
    parent2: { main: null, child1: null, child2: null },
  });

  // 현재 선택해야 할 위치
  const [currentSelection, setCurrentSelection] = useState<SelectionOrder>({
    parent: 1,
    position: "main",
  });

  // 빈 위치를 찾아 자동으로 다음 선택 위치를 설정하는 함수
  // const findNextEmptyPosition = () => {
  //   const order: SelectionOrder[] = [
  //     { parent: 1, position: "main" },
  //     { parent: 1, position: "child1" },
  //     { parent: 1, position: "child2" },
  //     { parent: 2, position: "main" },
  //     { parent: 2, position: "child1" },
  //     { parent: 2, position: "child2" },
  //   ];

  //   for (const pos of order) {
  //     const parentKey = `parent${pos.parent}` as keyof TreePositions;
  //     if (!selectedPositions[parentKey][pos.position]) {
  //       return pos;
  //     }
  //   }
  //   return null;
  // };

  // 캐릭터가 선택 가능한지 확인하는 함수
  const isCharacterSelectable = (characterId: string): boolean => {
    // 이미 선택된 캐릭터인지 확인
    const isAlreadySelected = Object.values(selectedPositions).some((parent) =>
      Object.values(parent).some((char) => char?.id === characterId),
    );
    return !isAlreadySelected;
  };

  // 캐릭터 선택 처리 함수
  const handleCharacterSelect = (value: Character) => {
    console.log("value", value);
    // if (!character || !isCharacterSelectable(character.id)) return;
    // setSelectedPositions((prev) => {
    //   const parentKey =
    //     `parent${currentSelection.parent}` as keyof TreePositions;
    //   return {
    //     ...prev,
    //     [parentKey]: {
    //       ...prev[parentKey],
    //       [currentSelection.position]: character,
    //     },
    //   };
    // });
    // // 항상 다음 빈 위치로 이동
    // const nextPos = findNextEmptyPosition();
    // if (nextPos) {
    //   setCurrentSelection(nextPos);
    // }
  };

  // 초기화 함수
  const handleReset = () => {
    setSelectedPositions({
      parent1: { main: null, child1: null, child2: null },
      parent2: { main: null, child1: null, child2: null },
    });
    setCurrentSelection({ parent: 1, position: "main" });
  };

  // characterData를 배열로 변환
  const characters: Character[] = useMemo(() => {
    return Store.charaListPublic
      .map((chara) => ({
        id: chara.id,
        name: chara.name,
        keyword: chara.keyword,
        imageUrl: `${imgPath}/uma_profile/${chara.icon}`,
        relationScore: characterId
          ? Store.parentById(characterId, chara.id)
          : 0,
      }))
      .sort((a, b) => b.relationScore - a.relationScore);
  }, [imgPath, characterId]);

  // 검색 필터링
  const filteredCharacters = characters.filter(
    (char) =>
      char.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      matchesInitialConsonants(char.name, searchTerm),
  );

  return (
    <div>
      <div className="succession-container">
        <div className="succession-parent-1">
          <SuccessionTree
            label="부모1"
            borderColor="#22b2fa"
            selected={selectedPositions.parent1}
            currentPosition={
              currentSelection.parent === 1
                ? currentSelection.position
                : undefined
            }
            // isActive={currentSelection.parent === 1}
            // onMainClick={() => handleCharacterSelect()}
            // onChild1Click={() => handleCharacterSelect()}
            // onChild2Click={() => handleCharacterSelect()}
          />
        </div>
        <div className="succession-parent-2">
          <SuccessionTree
            label="부모2"
            borderColor="#fd6db2"
            // selected={selectedPositions.parent2}
            // currentPosition={
            //   currentSelection.parent === 2
            //     ? currentSelection.position
            //     : undefined
            // }
            // isActive={currentSelection.parent === 2}
            // onMainClick={() => handleCharacterSelect()}
            // onChild1Click={() => handleCharacterSelect()}
            // onChild2Click={() => handleCharacterSelect()}
          />
        </div>

        <div className="succession-result">{/* 결과 영역 */}</div>

        <div className="control-buttons">
          <button className="reset-button" onClick={handleReset}>
            초기화
          </button>
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
            {filteredCharacters.map((character) => {
              return (
                <div
                  key={character.id}
                  className={`character-item ${isCharacterSelectable(character.id) ? "selectable" : ""}`}
                  onClick={() => handleCharacterSelect(character)}
                >
                  <div className="character-icon">
                    <CoImage
                      src={character.imageUrl}
                      alt={character.name}
                      lazy={false}
                    />
                  </div>
                  <div className="level-badge">{character.relationScore}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Succession;

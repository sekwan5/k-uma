/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useMemo, useCallback, useEffect } from "react";
import SuccessionTree from "./SuccessionTree";
import "./Succession.scss";
import { Store } from "./Store";
import { SelectionOrder, TreePositions } from "./types";
import { Character } from "../succession";
import CharacterItem from "./CharacterItem";
import useDebounce from "@/hooks/useDebounce";
import { filteredCharacters } from "../hooks";

interface SuccessionProps {
  characterId: string;
}

const Succession: React.FC<SuccessionProps> = ({ characterId }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
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
  const findNextEmptyPosition = () => {
    const order: SelectionOrder[] = [
      { parent: 1, position: "main" },
      { parent: 1, position: "child1" },
      { parent: 1, position: "child2" },
      { parent: 2, position: "main" },
      { parent: 2, position: "child1" },
      { parent: 2, position: "child2" },
    ];

    for (const pos of order) {
      const parentKey = `parent${pos.parent}` as keyof TreePositions;
      if (!selectedPositions[parentKey][pos.position]) {
        console.log("pos", pos);
        return pos;
      }
    }
    return null;
  };

  // 캐릭터가 선택 가능한지 확인하는 함수
  const isCharacterSelectable = useCallback(
    (characterId: string): boolean => {
      // 현재 선택하려는 부모와 위치
      const currentParentKey =
        `parent${currentSelection.parent}` as keyof TreePositions;
      const otherParentKey =
        `parent${currentSelection.parent === 1 ? 2 : 1}` as keyof TreePositions;
      const currentParent = selectedPositions[currentParentKey];
      const otherParent = selectedPositions[otherParentKey];

      // 현재 선택하려는 위치가 main인 경우
      if (currentSelection.position === "main") {
        // 다른 부모의 main에 선택된 캐릭터는 선택 불가
        if (otherParent.main?.id === characterId) return false;
      }
      // 현재 선택하려는 위치가 child1인 경우
      else if (currentSelection.position === "child1") {
        // 같은 부모의 main이나 child2에 선택된 캐릭터는 선택 불가
        if (
          currentParent.main?.id === characterId ||
          currentParent.child2?.id === characterId
        )
          return false;
      }
      // 현재 선택하려는 위치가 child2인 경우
      else if (currentSelection.position === "child2") {
        // 같은 부모의 main이나 child1에 선택된 캐릭터는 선택 불가
        if (
          currentParent.main?.id === characterId ||
          currentParent.child1?.id === characterId
        )
          return false;
      }

      return true;
    },
    [currentSelection, selectedPositions],
  );

  // 캐릭터 선택 처리 함수
  const handleCharacterSelect = (character: Character) => {
    if (!character || !isCharacterSelectable(character.id)) return;
    setSelectedPositions((prev) => {
      const parentKey =
        `parent${currentSelection.parent}` as keyof TreePositions;
      return {
        ...prev,
        [parentKey]: {
          ...prev[parentKey],
          [currentSelection.position]: character,
        },
      };
    });
  };

  useEffect(() => {
    const nextPos = findNextEmptyPosition();
    if (nextPos) {
      setCurrentSelection(nextPos);
    }
  }, [selectedPositions]);

  // 초기화 함수
  const handleReset = useCallback(() => {
    setSelectedPositions({
      parent1: { main: null, child1: null, child2: null },
      parent2: { main: null, child1: null, child2: null },
    });
    setCurrentSelection({ parent: 1, position: "main" });
  }, []);

  // characterData를 배열로 변환
  const characters = useMemo(() => {
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
  }, []);

  const filtered = useMemo(() => {
    // 먼저 선택 가능한 캐릭터만 필터링
    const selectableCharacters = characters.filter((char) =>
      isCharacterSelectable(char.id),
    );

    // 그 다음 검색어로 필터링
    return filteredCharacters(selectableCharacters, debouncedSearchTerm);
  }, [characters, debouncedSearchTerm, isCharacterSelectable]);

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
          />
        </div>
        <div className="succession-parent-2">
          <SuccessionTree
            label="부모2"
            borderColor="#fd6db2"
            selected={selectedPositions.parent2}
            currentPosition={
              currentSelection.parent === 2
                ? currentSelection.position
                : undefined
            }
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
            {filtered.map((character) => (
              <CharacterItem
                key={character.id}
                character={character}
                isSelectable={isCharacterSelectable(character.id)}
                onClick={handleCharacterSelect}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Succession;

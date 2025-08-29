/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useMemo, useCallback, useEffect } from "react";
import SuccessionTree from "./successionTree";
import SuccessionResult from "./SuccessionResult";
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

export default function Succession({ characterId }: SuccessionProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const imgPath = import.meta.env.VITE_ASSETS_URL;

  // 저장 리스트 관련 상태
  const [savedSuccessions, setSavedSuccessions] = useState<
    Array<{
      id: string;
      name: string;
      characterId: string;
      positions: TreePositions;
      totalScore: number;
      createdAt: Date;
    }>
  >([]);

  // 로컬스토리지에서 저장 리스트 불러오기
  const loadSavedList = () => {
    try {
      const stored = localStorage.getItem("succession_saved_list");
      if (stored) {
        const parsed = JSON.parse(stored);
        // Date 객체 복원
        return parsed.map((item: { createdAt: string | number | Date }) => ({
          ...item,
          createdAt: new Date(item.createdAt),
        }));
      }
    } catch (error) {
      console.error("저장 리스트를 불러오는데 실패했습니다:", error);
    }
    return [];
  };

  // 로컬스토리지에 저장 리스트 저장하기
  const saveSavedList = (list: typeof savedSuccessions) => {
    try {
      localStorage.setItem("succession_saved_list", JSON.stringify(list));
    } catch (error) {
      console.error("저장 리스트를 저장하는데 실패했습니다:", error);
    }
  };

  // 랜덤 ID 생성
  const generateRandomId = () => {
    return Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
  };

  // 현재 가계도를 저장 리스트에 추가
  const saveCurrentSuccession = () => {
    const newSuccession = {
      id: generateRandomId(),
      name: `가계도 ${savedSuccessions.length + 1}`,
      characterId,
      positions: selectedPositions,
      totalScore: totalCompatibilityScore,
      createdAt: new Date(),
    };

    const updatedList = [...savedSuccessions, newSuccession];
    setSavedSuccessions(updatedList);
    saveSavedList(updatedList);
  };

  // 저장된 가계도 불러오기
  // const loadSavedSuccession = (savedId: string) => {
  //   const saved = savedSuccessions.find((item) => item.id === savedId);
  //   if (saved) {
  //     setSelectedPositions(saved.positions);
  //     // 첫 번째 빈 위치로 선택 위치 설정
  //     const firstEmpty = findNextEmptyPosition(saved.positions);
  //     if (firstEmpty) {
  //       setCurrentSelection(firstEmpty);
  //     }
  //   }
  // };

  // 저장된 가계도 삭제
  // const deleteSavedSuccession = (savedId: string) => {
  //   const updatedList = savedSuccessions.filter((item) => item.id !== savedId);
  //   setSavedSuccessions(updatedList);
  //   saveSavedList(updatedList);
  // };

  // 저장 리스트 초기화
  useEffect(() => {
    setSavedSuccessions(loadSavedList());
  }, []);

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

  // 선택 위치를 클릭으로 변경하는 함수
  const handlePositionClick = (
    parent: 1 | 2,
    position: "main" | "child1" | "child2",
  ) => {
    setCurrentSelection({ parent, position });
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

  // 캐릭터 제거 함수
  const handleCharacterRemove = (
    parent: 1 | 2,
    position: "main" | "child1" | "child2",
  ) => {
    const parentKey = `parent${parent}` as keyof TreePositions;
    setSelectedPositions((prev) => ({
      ...prev,
      [parentKey]: {
        ...prev[parentKey],
        [position]: null,
      },
    }));
  };

  // 캐릭터 선택 처리 함수
  const handleCharacterSelect = (character: Character) => {
    if (!character) return;

    // 선택 가능한 캐릭터인 경우 선택
    if (!isCharacterSelectable(character.id)) return;

    const parentKey = `parent${currentSelection.parent}` as keyof TreePositions;
    setSelectedPositions((prev) => ({
      ...prev,
      [parentKey]: {
        ...prev[parentKey],
        [currentSelection.position]: character,
      },
    }));
  };

  // 빈 위치를 찾아 자동으로 다음 선택 위치를 설정하는 함수
  const findNextEmptyPosition = (positions?: TreePositions) => {
    const targetPositions = positions || selectedPositions;
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
      if (!targetPositions[parentKey][pos.position]) {
        return pos;
      }
    }
    return null;
  };

  // 자동으로 다음 선택 위치를 설정하는 useEffect
  useEffect(() => {
    const nextPos = findNextEmptyPosition();
    if (nextPos) {
      setCurrentSelection(nextPos);
    }
  }, [selectedPositions]);

  // 초기화 함수
  const handleReset = useCallback(() => {
    const resetPositions = {
      parent1: { main: null, child1: null, child2: null },
      parent2: { main: null, child1: null, child2: null },
    };
    const resetSelection: SelectionOrder = { parent: 1, position: "main" };

    setSelectedPositions(resetPositions);
    setCurrentSelection(resetSelection);
  }, []);

  // characterData를 배열로 변환
  const characters = useMemo(() => {
    return Store.charaListPublic
      .map((chara) => {
        let relationScore = 0;

        // 현재 선택해야 할 위치에 따라 관계 점수 계산
        if (currentSelection.position === "main") {
          // 부모 선택 차례 - 부모 관계 점수
          relationScore = characterId
            ? Store.parentById(characterId, chara.id)
            : 0;
        } else {
          // 자식 선택 차례 - 조부모 관계 점수
          const selectedParent =
            selectedPositions[
              `parent${currentSelection.parent}` as keyof TreePositions
            ].main;
          if (selectedParent) {
            relationScore = Store.grandParentById(
              characterId, // 자식 말
              selectedParent.id, // 선택된 부모
              chara.id, // 계산할 캐릭터
            );
          } else {
            relationScore = characterId
              ? Store.parentById(characterId, chara.id)
              : 0;
          }
        }

        return {
          id: chara.id,
          name: chara.name,
          keyword: chara.keyword,
          imageUrl: `${imgPath}/uma_profile/${chara.icon}`,
          relationScore,
        };
      })
      .sort((a, b) => b.relationScore - a.relationScore);
  }, [currentSelection, selectedPositions, characterId]);

  const filtered = useMemo(() => {
    // 먼저 선택 가능한 캐릭터만 필터링
    const selectableCharacters = characters.filter((char) =>
      isCharacterSelectable(char.id),
    );

    // 그 다음 검색어로 필터링
    return filteredCharacters(selectableCharacters, debouncedSearchTerm);
  }, [characters, debouncedSearchTerm, isCharacterSelectable]);

  const parentScore = useMemo(() => {
    return Store.parent(
      Store.getIndexById(selectedPositions.parent1.main?.id || ""),
      Store.getIndexById(selectedPositions.parent2.main?.id || ""),
    );
  }, [selectedPositions]);

  // 총 상성점수 계산
  const totalCompatibilityScore = useMemo(() => {
    return Store.calcTotalCompatibility(
      characterId,
      selectedPositions.parent1.main?.id || null,
      selectedPositions.parent2.main?.id || null,
      selectedPositions.parent1.child1?.id || null,
      selectedPositions.parent1.child2?.id || null,
      selectedPositions.parent2.child1?.id || null,
      selectedPositions.parent2.child2?.id || null,
    );
  }, [selectedPositions, characterId]);

  // 양쪽 부모가 모두 선택되었는지 확인
  const isBothParentsSelected = useMemo(() => {
    return !!(selectedPositions.parent1.main && selectedPositions.parent2.main);
  }, [selectedPositions.parent1.main, selectedPositions.parent2.main]);

  // GI 보너스 값 상태
  const [giBonus, setGiBonus] = useState(0);

  // GI 보너스 조절 함수들
  const handleGiBonusChange = (value: number) => {
    setGiBonus(value);
  };

  const handleGiBonusIncrement = (amount: number) => {
    setGiBonus((prev) => {
      const newGiBonus = prev + amount;
      if (newGiBonus < 0) return 0;
      return newGiBonus;
    });
  };

  return (
    <div>
      <div className="succession-container">
        <div className={`succession-parent-1 `}>
          <SuccessionTree
            label="부모1"
            borderColor="#22b2fa"
            selected={selectedPositions.parent1}
            currentPosition={
              currentSelection.parent === 1
                ? currentSelection.position
                : undefined
            }
            parentScore={parentScore}
            isBothParentsSelected={isBothParentsSelected}
            onMainClick={() => handlePositionClick(1, "main")}
            onChild1Click={() => handlePositionClick(1, "child1")}
            onChild2Click={() => handlePositionClick(1, "child2")}
            onMainRemove={() => handleCharacterRemove(1, "main")}
            onChild1Remove={() => handleCharacterRemove(1, "child1")}
            onChild2Remove={() => handleCharacterRemove(1, "child2")}
          />
        </div>
        <div className={`succession-parent-2 `}>
          <SuccessionTree
            label="부모2"
            borderColor="#fd6db2"
            selected={selectedPositions.parent2}
            currentPosition={
              currentSelection.parent === 2
                ? currentSelection.position
                : undefined
            }
            parentScore={parentScore}
            isBothParentsSelected={isBothParentsSelected}
            onMainClick={() => handlePositionClick(2, "main")}
            onChild1Click={() => handlePositionClick(2, "child1")}
            onChild2Click={() => handlePositionClick(2, "child2")}
            onMainRemove={() => handleCharacterRemove(2, "main")}
            onChild1Remove={() => handleCharacterRemove(2, "child1")}
            onChild2Remove={() => handleCharacterRemove(2, "child2")}
          />
        </div>

        <SuccessionResult
          totalCompatibilityScore={totalCompatibilityScore}
          giBonus={giBonus}
          onGiBonusChange={handleGiBonusChange}
          onGiBonusIncrement={handleGiBonusIncrement}
        />

        <div className="control-buttons">
          <button className="cancel-button" onClick={handleReset}>
            초기화
          </button>
          <button className="submit-button">자동 선택</button>
          <button className="cancel-button" onClick={saveCurrentSuccession}>
            저장
          </button>
          <button className="cancel-button" onClick={saveCurrentSuccession}>
            불러오기
          </button>
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
}

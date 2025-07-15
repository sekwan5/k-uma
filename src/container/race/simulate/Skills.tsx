/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import SelectBox from "@/components/common/SelectBox/index";
import ToggleBox from "@/components/common/ToggleBox/index";
// import NumberControl from "@/components/race/NumberControl";
import SelectableTag from "@/components/race/SelectableTag";
import { useState, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import skillsData from "@/modules/data/skills.json";
import skillsKoData from "@/modules/locales/skill-ko.json";
import { groupSkillsByRarity, useFilteredSkills } from "./hooks";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { updateSkills } from "@/store/umaStatusSlice";
import SkillCategory from "./SkillCategory";

export interface Skill {
  id: string;
  label: string;
  rarity: string;
  type: string;
}

export default function Skills() {
  const { i18n } = useTranslation();
  const [characters, setCharacters] = useState<any[]>([]);
  const [selectedCharacter, setSelectedCharacter] = useState<string>("");
  const [uniqueCharacterSkill, setUniqueCharacterSkill] = useState<
    { id: string; label: string }[]
  >([]);
  const [characterSkills, setCharacterSkills] = useState<
    { id: string; label: string }[]
  >([]);
  const [passiveSkills, setPassiveSkills] = useState<any[]>([]);
  const [healSkills, setHealSkills] = useState<any[]>([]);
  const [speedSkills, setSpeedSkills] = useState<any[]>([]);
  const [accelerationSkills, setAccelerationSkills] = useState<any[]>([]);
  const [multiSkills, setMultiSkills] = useState<any[]>([]);
  const [otherSkills, setOtherSkills] = useState<any[]>([]);
  const [selectedPassive, setSelectedPassive] = useState<string[]>([]);
  const [showCategoryView, setShowCategoryView] = useState<boolean>(true);
  const [showMinusSkills, setShowMinusSkills] = useState<boolean>(false);
  const [filterText, setFilterText] = useState<string>("");

  const dispatch = useDispatch();
  const { hasSkills } = useSelector((state: RootState) => state.umaStatus);

  const translationData = useMemo(() => {
    switch (i18n.language) {
      case "ko":
        return skillsKoData;
      // case "en":
      //   return skillsEnData;
      case "ja":
        return skillsData;
      default:
        return skillsKoData; // 기본값은 한국어
    }
  }, [i18n.language]);

  // 스킬 데이터 초기화 및 분류
  useEffect(() => {
    // 캐릭터가 있는 스킬만 필터링
    const tmp = skillsData.filter((skill: any) => skill.holder !== "");

    // 캐릭터 목록 생성
    const chrNames = tmp.map((skill: any) => {
      const translatedSkill = translationData.find(
        (s: any) => s.id === skill.id,
      );
      return {
        label: translatedSkill?.holder || skill.holder || "",
        value: skill.holder || "",
        skillName: translatedSkill?.name || skill.name || "",
        rate: skill.rarity,
        id: skill.id,
      };
    });

    // 캐릭터 중복 제거
    const uniqueChrNames = Array.from(
      new Map(chrNames.map((item) => [item.label, item])).values(),
    );

    setCharacters(uniqueChrNames as any);

    // 일반 스킬 (고유/진화가 아닌 스킬) 필터링
    const notUniqueSkills = skillsData.filter(
      (skill: any) => skill.rarity !== "unique" && skill.rarity !== "evo",
    );

    // 스킬을 타입별로 분류
    const groupedByType: Record<string, any[]> = {};

    notUniqueSkills.forEach((skill: any) => {
      const type = skill.type || "other";
      if (!groupedByType[type]) {
        groupedByType[type] = [];
      }

      const translatedSkill = translationData.find(
        (s: any) => s.id === skill.id,
      );
      groupedByType[type].push({
        label: translatedSkill?.name || skill.name || "",
        ...skill,
      });
    });

    // 타입별로 상태 업데이트
    setPassiveSkills(groupedByType["passive"] || []);
    setHealSkills(groupedByType["heal"] || []);
    setSpeedSkills(groupedByType["speed"] || []);
    setAccelerationSkills(groupedByType["acceleration"] || []);
    setMultiSkills(groupedByType["multi"] || []);
    setOtherSkills(groupedByType["other"] || []);
  }, [i18n.language, translationData]);

  // 캐릭터 선택 시 해당 캐릭터의 스킬 목록 업데이트
  useEffect(() => {
    if (selectedCharacter) {
      // 선택한 캐릭터의 스킬 목록 필터링
      const characterSkillsData = skillsData.filter(
        (skill: any) => skill.holder === selectedCharacter,
      );

      // 스킬 데이터 가공
      const processedSkills = characterSkillsData.map((skill: any) => {
        const translatedSkill = translationData.find(
          (s: any) => s.id === skill.id,
        );

        return {
          id: skill.id,
          label: translatedSkill?.name || skill.name || "",
          skillName: translatedSkill?.name || skill.name || "",
          rate: skill.rarity,
          value: skill.id,
        };
      });

      // rate별로 스킬 분류
      const uniqueSkills = processedSkills
        .filter((skill) => skill.rate === "unique" && skill.id.length === 6)
        .map((skill) => ({
          id: skill.id,
          label: skill.label,
        }));

      const evoSkills = processedSkills
        .filter((skill) => skill.rate === "evo")
        .map((skill) => ({
          id: skill.id,
          label: skill.label,
        }));

      // 상태 업데이트
      setUniqueCharacterSkill(uniqueSkills);
      setCharacterSkills(evoSkills);
    } else {
      setUniqueCharacterSkill([]);
      setCharacterSkills([]);
    }
  }, [selectedCharacter, i18n.language, translationData]);

  // 캐릭터 선택 핸들러
  const handleCharacterChange = (value: string | number) => {
    setSelectedCharacter(String(value));
  };

  // 스킬 필터링 함수
  const filterSkills = (skills: any[], filterText: string) => {
    if (!filterText) return skills;
    return skills.filter((skill) =>
      skill.label.toLowerCase().includes(filterText.toLowerCase()),
    );
  };

  // 스킬 선택 핸들러
  const handleSkillSelect = (type: string, selectedIds: string[]) => {
    dispatch(updateSkills({ type: type as any, skills: selectedIds }));
  };

  // 필터링된 스킬 목록 생성
  const filteredPassiveSkills = useFilteredSkills(passiveSkills);
  const filteredHealSkills = useFilteredSkills(healSkills);
  const filteredSpeedSkills = useFilteredSkills(speedSkills);
  const filteredAccelerationSkills = useFilteredSkills(accelerationSkills);
  const filteredMultiSkills = useFilteredSkills(multiSkills);
  const filteredOtherSkills = useFilteredSkills(otherSkills);

  return (
    <div className="skills-container">
      <ToggleBox title="스킬">
        <div className="mb-2">
          {/* 필터 및 카테고리 설정 */}
          <div className="d-flex gap-3 mb-3">
            <div className="form-group d-flex gap-2">
              <label className="form-label align-self-center">필터:</label>
              <input
                type="text"
                className="form-control"
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
                placeholder="스킬 이름으로 검색"
              />
            </div>
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="categoryView"
                checked={showCategoryView}
                onChange={(e) => setShowCategoryView(e.target.checked)}
              />
              <label className="form-check-label" htmlFor="categoryView">
                카테고리 표시
              </label>
            </div>
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="showMinus"
                checked={showMinusSkills}
                onChange={(e) => setShowMinusSkills(e.target.checked)}
                disabled={showCategoryView}
              />
              <label className="form-check-label" htmlFor="showMinus">
                디버프 스킬 표시
              </label>
            </div>
          </div>
          <div className="d-flex flex-column gap-2">
            {/* 고유/진화 스킬 */}
            <div className="d-flex gap-3">
              <SelectBox
                label="캐릭터"
                value={selectedCharacter}
                width="220px"
                options={characters}
                onChange={handleCharacterChange}
              />
            </div>
            {uniqueCharacterSkill.length > 0 && (
              <>
                <div className="">
                  <SelectableTag
                    items={uniqueCharacterSkill}
                    selectedIds={hasSkills.unique}
                    onChange={(ids) => handleSkillSelect("unique", ids)}
                  />
                </div>
              </>
            )}
            {characterSkills.length > 0 && (
              <div className="">
                <SelectableTag
                  items={characterSkills}
                  selectedIds={hasSkills.evo}
                  onChange={(ids) => handleSkillSelect("evo", ids)}
                />
              </div>
            )}

            {/* 필터 모드 */}
            {filterText && (
              <div className="mt-3">
                <h5>검색 결과</h5>
                <SelectableTag
                  items={[
                    ...filterSkills(passiveSkills, filterText),
                    ...filterSkills(healSkills, filterText),
                    ...filterSkills(speedSkills, filterText),
                    ...filterSkills(accelerationSkills, filterText),
                    ...filterSkills(multiSkills, filterText),
                    ...filterSkills(otherSkills, filterText),
                  ]}
                  selectedIds={selectedPassive}
                  onChange={setSelectedPassive}
                />
              </div>
            )}

            {/* 카테고리 표시 모드 */}
            {!filterText && showCategoryView && (
              <>
                <SkillCategory
                  title="패시브"
                  skills={filteredPassiveSkills}
                  selectedIds={hasSkills.passive}
                  onSkillSelect={(ids) => handleSkillSelect("passive", ids)}
                  groupSkillsByRarity={groupSkillsByRarity}
                />
                <SkillCategory
                  title="회복"
                  skills={filteredHealSkills}
                  selectedIds={hasSkills.heal}
                  onSkillSelect={(ids) => handleSkillSelect("heal", ids)}
                  groupSkillsByRarity={groupSkillsByRarity}
                />
                <SkillCategory
                  title="속도"
                  skills={filteredSpeedSkills}
                  selectedIds={hasSkills.speed}
                  onSkillSelect={(ids) => handleSkillSelect("speed", ids)}
                  groupSkillsByRarity={groupSkillsByRarity}
                />
                <SkillCategory
                  title="가속"
                  skills={filteredAccelerationSkills}
                  selectedIds={hasSkills.acceleration}
                  onSkillSelect={(ids) =>
                    handleSkillSelect("acceleration", ids)
                  }
                  groupSkillsByRarity={groupSkillsByRarity}
                />
                <SkillCategory
                  title="복합"
                  skills={filteredMultiSkills}
                  selectedIds={hasSkills.multi}
                  onSkillSelect={(ids) => handleSkillSelect("multi", ids)}
                  groupSkillsByRarity={groupSkillsByRarity}
                />
                <SkillCategory
                  title="기타"
                  skills={filteredOtherSkills}
                  selectedIds={hasSkills.other}
                  onSkillSelect={(ids) => handleSkillSelect("other", ids)}
                  groupSkillsByRarity={groupSkillsByRarity}
                />
              </>
            )}

            {/* 일반 표시 모드 */}
            {!filterText && !showCategoryView && (
              <ToggleBox title="일반 스킬">
                <div className="mt-2">
                  <SelectableTag
                    items={[
                      ...passiveSkills,
                      ...healSkills,
                      ...speedSkills,
                      ...accelerationSkills,
                      ...multiSkills,
                      ...otherSkills,
                    ].filter(
                      (skill) => showMinusSkills || skill.rarity !== "minus",
                    )}
                    selectedIds={selectedPassive}
                    onChange={setSelectedPassive}
                  />
                </div>
              </ToggleBox>
            )}
          </div>
        </div>
      </ToggleBox>
    </div>
  );
}

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import courseData from "@/modules/data/course.json";

// 코스 데이터 인터페이스
export interface CourseDataType {
  [key: string]: {
    name: string;
    courses: {
      [key: string]: {
        raceTrackId: number;
        name: string;
        distance: number;
        distanceType: number;
        surface: number;
        turn: number;
        courseSetStatus: number[];
        laneMax: number;
        finishTimeMin: number;
        finishTimeMax: number;
        corners: { start: number; length: number }[];
        straights: { start: number; end: number }[];
        slopes: { start: number; length: number; slope: number }[];
      };
    };
  };
}

// 스킬 데이터 인터페이스
export interface SkillData {
  id: string;
  name: string;
  rarity: string;
  type: string;
  invokes?: {
    conditions?: any[][];
    effects?: any[];
  }[];
  [key: string]: any;
}

// 희귀도별로 스킬 그룹화
export const groupSkillsByRarity = (skills: any[]) => {
  const result: Record<string, any[]> = {
    inherit: [],
    scenario: [],
    rare: [],
    normal: [],
    special: [],
    minus: [],
  };

  skills.forEach((skill) => {
    const rarity = skill.rarity || "normal";
    if (result[rarity]) {
      result[rarity].push(skill);
    } else {
      result.normal.push(skill);
    }
  });

  return result;
};

// 이름으로 스킬 필터링
export const filterSkillsByName = (skills: SkillData[], filterText: string) => {
  if (!filterText) return skills;
  return skills.filter((skill) =>
    skill.name.toLowerCase().includes(filterText.toLowerCase()),
  );
};

// 현재 코스 정보 가져오기
export const useCurrentCourse = () => {
  const { trackId, courseId } = useSelector(
    (state: RootState) => state.umaStatus,
  );

  return useMemo(() => {
    if (!trackId || !courseId) return null;
    return (courseData as CourseDataType)[trackId]?.courses[courseId] || null;
  }, [trackId, courseId]);
};

// 레이스 설정에 맞는 스킬 필터링
export const useFilteredSkills = (skills: SkillData[]) => {
  const umaStatus = useSelector((state: RootState) => state.umaStatus);
  const { style, trackId } = umaStatus;
  const currentCourse = useCurrentCourse();

  return useMemo(() => {
    if (!skills || skills.length === 0) return [];
    if (!currentCourse) return skills;

    console.log("skills", skills);

    return skills.filter((skill) => {
      // 스킬에 invokes가 없으면 필터링하지 않음
      if (!skill.invokes || skill.invokes.length === 0) return true;

      // 스킬의 발동 조건 확인
      return skill.invokes.some((invoke: any) => {
        // 조건이 없으면 항상 발동
        if (!invoke.conditions || invoke.conditions.length === 0) return true;

        // 조건 그룹 중 하나라도 만족하면 발동
        return invoke.conditions.some((conditionGroup: any[]) => {
          // 조건 그룹 내 모든 조건을 확인
          return conditionGroup.every((condition: any) => {
            switch (condition.type) {
              // 주행 스타일 조건
              case "running_style":
                if (
                  condition.operator === "==" &&
                  Number(style) === condition.value
                )
                  return true;
                break;

              // 트랙 ID 조건
              case "track_id":
                if (
                  condition.operator === "==" &&
                  Number(trackId) === condition.value
                )
                  return true;
                break;

              // 거리 타입 조건
              case "distance_type":
                if (
                  condition.operator === "==" &&
                  currentCourse.distanceType === condition.value
                )
                  return true;
                break;

              // 표면 조건 (잔디/더트)
              case "surface":
                if (
                  condition.operator === "==" &&
                  currentCourse.surface === condition.value
                )
                  return true;
                break;
              case "ground_type":
                if (
                  condition.operator === "==" &&
                  currentCourse.surface === condition.value
                )
                  return true;
                break;

              case "rotation":
                if (
                  condition.operator === "==" &&
                  currentCourse.turn === condition.value
                )
                  return true;
                break;
              case "is_basis_distance": {
                const tmp = currentCourse.distance % 400 === 0 ? 1 : 0;
                if (
                  condition.operator === "==" &&
                  Number(tmp) === Number(condition.value)
                )
                  return true;
                break;
              }
              // 항상 발동 조건
              case "always":
                return true;

              // 기타 조건은 일단 통과
              default:
                return true;
            }

            return false;
          });
        });
      });
    });
  }, [skills, currentCourse, style, trackId]);
};

// 타입별로 필터링된 스킬 훅
export const useFilteredSkillsByType = (skills: SkillData[], type: string) => {
  const typeSkills = useMemo(
    () =>
      skills.filter(
        (skill) =>
          skill.type === type && !["unique", "evo"].includes(skill.rarity),
      ),
    [skills, type],
  );

  return useFilteredSkills(typeSkills);
};

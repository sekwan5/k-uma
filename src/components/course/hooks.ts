interface RaceTrackData {
  raceTrackId: number;
  name: string;
  distance: number;
  distanceType: number;
  surface: number;
  turn: number;
  corners: { start: number; length: number }[];
  straights: { start: number; end: number }[];
  slopes: { start: number; length: number; slope: number }[];
}

export interface ICourseSection {
  type: "straight" | "corner";
  label: string;
  distance: number;
  width: number;
}
export interface IPhaseSection {
  type: "opening" | "middle" | "final";
  start: number;
  end: number;
  width: number;
}

export interface IPositionSection {
  type: "positionKeep" | "middle" | "spurt";
  start: number;
  end: number;
  width: number;
}

export const convertToChartData = (trackData: RaceTrackData) => {
  const sections: ICourseSection[] = [];
  const phaseSection: IPhaseSection[] = [];
  const positionSection: IPositionSection[] = [];
  const distance = trackData.distance;

  // 직선과 코너 섹션 생성
  createCourseSections(trackData, distance, sections);

  // 페이즈 섹션 생성 (오프닝, 미들, 파이널)
  createPhaseSections(distance, phaseSection);

  // 포지션 섹션 생성 (포지션 유지, 중간, 스퍼트)
  createPositionSections(distance, positionSection);

  return {
    courseSections: sections,
    slopeSections: [], // 현재 데이터에는 경사 정보가 없음
    totalDistance: distance,
    courseName: trackData.name,
    surface: trackData.surface === 1 ? "잔디" : "더트",
    direction: trackData.turn === 1 ? "우회전" : "좌회전",
    phaseSection: phaseSection,
    positionSection: positionSection,
  };
};

// 코스 섹션(직선, 코너) 생성 함수
function createCourseSections(
  trackData: RaceTrackData,
  distance: number,
  sections: ICourseSection[],
) {
  // 직선과 코너를 시작 위치 순서대로 정렬
  const allSections = [
    ...trackData.straights.map((s) => ({ type: "straight", ...s })),
    ...trackData.corners.map((c, i) => ({
      type: "corner",
      start: c.start,
      end: c.start + c.length,
      index: i + 1,
    })),
  ].sort((a, b) => a.start - b.start);

  // 각 섹션의 너비 계산 (전체 거리 대비 비율)
  allSections.forEach((section) => {
    const length = section.end - section.start;
    const width = (length / distance) * 100;

    sections.push({
      type: section.type as "straight" | "corner",
      label: section.type === "straight" ? "직선" : `코너`,
      distance: section.start,
      width: width,
    });
  });
}

// 페이즈 섹션(오프닝, 미들, 파이널) 생성 함수
function createPhaseSections(distance: number, phaseSection: IPhaseSection[]) {
  const middleStart = Math.round(distance / 6);
  const finalStart = Math.round((distance * 2) / 3);

  phaseSection.push({
    type: "opening",
    start: 0,
    end: middleStart,
    width: (middleStart / distance) * 100,
  });

  phaseSection.push({
    type: "middle",
    start: middleStart,
    end: finalStart,
    width: ((finalStart - middleStart) / distance) * 100,
  });

  phaseSection.push({
    type: "final",
    start: finalStart,
    end: distance,
    width: ((distance - finalStart) / distance) * 100,
  });
}

// 포지션 섹션(포지션 유지, 중간, 스퍼트) 생성 함수
function createPositionSections(
  distance: number,
  positionSection: IPositionSection[],
) {
  const positionKeep = Math.round(distance * (10 / 24));
  const spurt = Math.round(distance * (16 / 24));

  positionSection.push({
    type: "positionKeep",
    start: 0,
    end: positionKeep,
    width: (positionKeep / distance) * 100,
  });

  positionSection.push({
    type: "middle",
    start: positionKeep,
    end: spurt,
    width: ((spurt - positionKeep) / distance) * 100,
  });

  positionSection.push({
    type: "spurt",
    start: spurt,
    end: distance,
    width: ((distance - spurt) / distance) * 100,
  });
}

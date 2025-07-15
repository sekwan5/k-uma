export const RANK_LIST = ["S", "A", "B", "C", "D", "E", "F", "G"];
export const STYLE_LIST = [
  { label: "도주", value: "1" },
  { label: "선행", value: "2" },
  { label: "선입", value: "3" },
  { label: "추입", value: "4" },
];

export enum Distance {
  SHORT = "SHORT",
  MILE = "MILE",
  MIDDLE = "MIDDLE",
  LONG = "LONG",
}

export enum Style {
  NIGE = 1,
  SEN = 2,
  SASI = 3,
  OI = 4,
  OONIGE = 5,
}

export const StyleText = {
  [Style.NIGE]: "도주",
  [Style.SEN]: "선행",
  [Style.SASI]: "선입",
  [Style.OI]: "추입",
  [Style.OONIGE]: "대도주",
};

export enum Surface {
  TURF = "TURF",
  DIRT = "DIRT",
}

export enum Condition {
  BEST = 5,
  GOOD = 4,
  NORMAL = 3,
  BAD = 2,
  WORST = 1,
}

export const ConditionLabel = {
  [Condition.BEST]: "최상",
  [Condition.GOOD]: "양호",
  [Condition.NORMAL]: "보통",
  [Condition.BAD]: "저조",
  [Condition.WORST]: "최악",
};

export enum FitRank {
  S = "S",
  A = "A",
  B = "B",
  C = "C",
  D = "D",
  E = "E",
  F = "F",
  G = "G",
}

export enum CourseCondition {
  GOOD = 1,
  YAYAOMO = 2,
  OMO = 3,
  BAD = 4,
}

export const CourseConditionLabel = {
  [CourseCondition.GOOD]: "양호",
  [CourseCondition.YAYAOMO]: "약간 무거움",
  [CourseCondition.OMO]: "무거움",
  [CourseCondition.BAD]: "불량",
};

export enum SkillActivateAdjustment {
  NONE = 0,
  YES = 1,
  ALL = 2,
}

export const SkillActivateAdjustmentLabel = {
  [SkillActivateAdjustment.NONE]: "없음",
  [SkillActivateAdjustment.YES]: "확정 발동",
  [SkillActivateAdjustment.ALL]: "모든 난수 고정",
};

export enum RandomPosition {
  RANDOM = 0,
  FASTEST = 1,
  FAST = 2,
  MIDDLE = 3,
  SLOW = 4,
  SLOWEST = 5,
}

export const RandomPositionLabel = {
  [RandomPosition.RANDOM]: "랜덤",
  [RandomPosition.FASTEST]: "최속",
  [RandomPosition.FAST]: "1/4",
  [RandomPosition.MIDDLE]: "중간",
  [RandomPosition.SLOW]: "3/4",
  [RandomPosition.SLOWEST]: "최저",
};

export enum PositionKeepMode {
  APPROXIMATE = "APPROXIMATE",
  VIRTUAL = "VIRTUAL",
  SPEED_UP = "SPEED_UP",
  NONE = "NONE",
}

export const PositionKeepModeLabel = {
  [PositionKeepMode.APPROXIMATE]: "근사치",
  [PositionKeepMode.VIRTUAL]: "가상 페이스메이커",
  [PositionKeepMode.SPEED_UP]: "일정 확률로 스피드업(도주)",
  [PositionKeepMode.NONE]: "없음",
};

export enum PositionKeepState {
  NONE = "NONE",
  SPEED_UP = "SPEED_UP",
  OVERTAKE = "OVERTAKE",
  PACE_UP = "PACE_UP",
  PACE_DOWN = "PACE_DOWN",
  PACE_UP_EX = "PACE_UP_EX",
}

export const PositionKeepStateLabel = {
  [PositionKeepState.NONE]: "없음",
  [PositionKeepState.SPEED_UP]: "스피드업",
  [PositionKeepState.OVERTAKE]: "추월",
  [PositionKeepState.PACE_UP]: "페이스업",
  [PositionKeepState.PACE_DOWN]: "페이스다운",
  [PositionKeepState.PACE_UP_EX]: "페이스업Ex",
};

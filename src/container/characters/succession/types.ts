export enum Page {
  Table = "table",
  Calc = "calc",
  Factor = "factor",
}

export interface PageInfo {
  displayName: string;
  icon: string;
}

export const PageInfoMap: Record<Page, PageInfo> = {
  [Page.Table]: { displayName: "상성표", icon: "table_view" },
  [Page.Calc]: { displayName: "마개조 계산", icon: "calculate" },
  [Page.Factor]: { displayName: "인자 순회", icon: "autorenew" },
};

export enum Type {
  Ground = "경기장",
  Distance = "거리",
  RunningStyle = "각질",
}

export enum Rank {
  G,
  F,
  E,
  D,
  C,
  B,
  A,
  S,
}

export enum FilterMode {
  NONE,
  OWNED,
  NOT_OWNED,
  CUSTOM,
  RELATION,
  NAME,
}

export interface CharaSelection {
  child: number;
  parent1: number;
  parent2: number;
  parent11: number;
  parent12: number;
  parent21: number;
  parent22: number;
  orderByRelation: boolean;
}

export interface CalcSetting {
  baseRate: number[];
  parentBonus: number;
  initialProperValue: Rank[];
  goalProperValue: Rank[];
  properType: Type[];
  properLevel: number[];
  bonusCount: number[];
}

export interface CalcResult {
  rate1: number;
  rate2: number;
  rate11: number;
  rate12: number;
  rate21: number;
  rate22: number;
  initialProperValue: Rank[];
  groundRate: number[];
  distanceRate: number[];
  runningTypeRate: number[];
  goalRate: number;
}

export interface FilterSetting {
  mode: FilterMode;
  custom: Record<string, boolean>;
  relation: number[];
  names: string[];
}

export interface RelationTableEntry {
  index: number;
  name: string;
  parentRelation: number;
  relationList: number[];
  info: string;
  relationTotal: number;
}

export interface State {
  page: Page;
  charaSelection: CharaSelection;
  autoSetParentsTarget: number;
  tableState: TableState;
  calcState: CalcState;
  factorState: FactorState;
}

export interface TableState {
  ownedChara: Record<string, boolean>;
  rawRelationTable: RelationTableEntry[];
  sortKey: number;
  relationTable: RelationTableEntry[];
  displayChild: boolean;
  rowFilter: FilterSetting;
  rowHideIndices: number[];
  columnFilter: FilterSetting;
  columnHideIndices: number[];
  headerCharaNames: [number, string][];
}

export interface CalcState {
  setting: CalcSetting;
  result: CalcResult;
}

export interface FactorState {
  realSuccessRate: number;
  circlingSuccessRate: number;
  circlingRealSuccessRate: number;
  challengeCount: number;
  result: number[];
  maxRateIndex: number;
}

// 선택된 캐릭터 정보를 저장하는 타입
export type SelectedCharacter = {
  id: string;
  name: string;
  imageUrl: string;
  relationScore: number;
} | null;

// 선택 순서를 정의하는 타입
export type SelectionOrder = {
  parent: 1 | 2;
  position: "main" | "child1" | "child2";
};

// 트리의 모든 위치를 정의하는 타입
export type TreePositions = {
  parent1: {
    main: SelectedCharacter;
    child1: SelectedCharacter;
    child2: SelectedCharacter;
  };
  parent2: {
    main: SelectedCharacter;
    child1: SelectedCharacter;
    child2: SelectedCharacter;
  };
};

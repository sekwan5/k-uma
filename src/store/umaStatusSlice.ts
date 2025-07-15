import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Condition, FitRank, Style } from "@/container/race/simulate/constans";

interface UmaStatusState {
  speed: number;
  stamina: number;
  power: number;
  guts: number;
  intelligence: number;
  style: Style;
  distanceFit: FitRank;
  surfaceFit: FitRank;
  styleFit: FitRank;
  condition: Condition;
  trackId: string;
  courseId: string;
  trackCondition: string;
  hasSkills: {
    unique: string[];
    evo: string[];
    passive: string[];
    heal: string[];
    speed: string[];
    acceleration: string[];
    multi: string[];
    other: string[];
  };
}

const initialState: UmaStatusState = {
  speed: 1600,
  stamina: 1200,
  power: 1200,
  guts: 1200,
  intelligence: 1200,
  style: Style.NIGE,
  distanceFit: FitRank.S,
  surfaceFit: FitRank.A,
  styleFit: FitRank.A,
  condition: Condition.BEST,
  trackId: "10006",
  courseId: "10601",
  trackCondition: "1",
  hasSkills: {
    unique: [],
    evo: [],
    passive: [],
    heal: [],
    speed: [],
    acceleration: [],
    multi: [],
    other: [],
  },
};

export const umaStatusSlice = createSlice({
  name: "umaStatus",
  initialState,
  reducers: {
    updateUmaStatus: (
      state,
      action: PayloadAction<Partial<UmaStatusState>>,
    ) => {
      return { ...state, ...action.payload };
    },
    updateSkills: (
      state,
      action: PayloadAction<{
        type: keyof UmaStatusState["hasSkills"];
        skills: string[];
      }>,
    ) => {
      const { type, skills } = action.payload;
      state.hasSkills[type] = skills;
    },
    resetUmaStatus: () => initialState,
  },
});

export const { updateUmaStatus, updateSkills, resetUmaStatus } =
  umaStatusSlice.actions;

export default umaStatusSlice.reducer;

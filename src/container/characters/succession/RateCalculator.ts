import { CalcResult, CalcSetting, CharaSelection, Rank, Type } from "./types";
import { Store } from "./Store";

// 캐릭터의 관계를 기반으로 비율을 계산하는 RateCalculator 클래스
export class RateCalculator {
  // 기본 비율과 관계를 기반으로 최종 비율을 계산하는 정적 메서드
  private static doCalcRate(baseRate: number, relation: number): number {
    return (baseRate * (100 + relation)) / 100.0;
  }

  // 설정과 선택된 캐릭터를 기반으로 계산을 수행하는 정적 메서드
  static calc(setting: CalcSetting, selection: CharaSelection): CalcResult {
    const { child, parent1, parent2, parent11, parent12, parent21, parent22 } =
      selection;

    // 선택된 캐릭터가 유효하지 않으면 빈 결과를 반환
    if (
      child === -1 ||
      parent1 === -1 ||
      parent2 === -1 ||
      parent11 === -1 ||
      parent12 === -1 ||
      parent21 === -1 ||
      parent22 === -1
    ) {
      return this.getEmptyResult();
    }

    // 부모 관계를 계산
    const parentRelation =
      Store.parent(parent1, parent2) / 2 +
      (setting.bonusCount[0] * 3) / 2 +
      setting.parentBonus;

    // 각 관계에 대한 비율을 계산
    const rate1 = this.doCalcRate(
      setting.baseRate[setting.properLevel[0]],
      Store.parent(child, parent1) + parentRelation,
    );

    const rate2 = this.doCalcRate(
      setting.baseRate[setting.properLevel[1]],
      Store.parent(child, parent2) + parentRelation,
    );

    const rate11 = this.doCalcRate(
      setting.baseRate[setting.properLevel[2]],
      Store.grandParent(child, parent1, parent11) + setting.bonusCount[2] * 3,
    );

    const rate12 = this.doCalcRate(
      setting.baseRate[setting.properLevel[3]],
      Store.grandParent(child, parent1, parent12) + setting.bonusCount[3] * 3,
    );

    const rate21 = this.doCalcRate(
      setting.baseRate[setting.properLevel[4]],
      Store.grandParent(child, parent2, parent21) + setting.bonusCount[4] * 3,
    );

    const rate22 = this.doCalcRate(
      setting.baseRate[setting.properLevel[5]],
      Store.grandParent(child, parent2, parent22) + setting.bonusCount[5] * 3,
    );

    // 상승 비율과 목표를 설정
    const upRates = [
      rate1,
      rate1,
      rate2,
      rate2,
      rate11,
      rate11,
      rate12,
      rate12,
      rate21,
      rate21,
      rate22,
      rate22,
    ];

    const upTargets = Array(12)
      .fill(0)
      .map((_, i) => setting.properType[Math.floor(i / 2)]);

    // 초기 상승 레벨을 설정
    const initialUpLevels = [0, 0, 0];
    setting.properType.forEach((type, index) => {
      initialUpLevels[this.getTypeIndex(type)] += setting.properLevel[index];
    });

    // 초기 적합 값 설정
    const initialProperValues = setting.initialProperValue.map((rank, index) =>
      Math.min(
        Rank.A,
        rank + Math.min(4, Math.floor((initialUpLevels[index] + 2) / 3)),
      ),
    );

    // 결과를 계산
    const results = Array(4096)
      .fill(0)
      .map((_, value) =>
        Array(12)
          .fill(0)
          .map((_, i) => (value & (1 << i)) !== 0),
      )
      .map((upList) => {
        return upList.reduce(
          ([values, rate], up, index) => {
            if (up) {
              const newValues = values.map((value, valueIndex) =>
                valueIndex === this.getTypeIndex(upTargets[index])
                  ? Math.min(value + 1, 7)
                  : value,
              );
              return [newValues, rate * upRates[index]] as [number[], number];
            } else {
              return [values, rate * (1 - upRates[index])] as [
                number[],
                number,
              ];
            }
          },
          [initialProperValues, 1.0] as [number[], number],
        );
      });

    // 총 비율과 목표 비율을 계산
    const totalRates = Array(3)
      .fill(0)
      .map(() => Array(8).fill(0));
    let goalRate = 0.0;
    const goals = setting.goalProperValue.map((v) => v);

    results.forEach(([properValues, rate]) => {
      totalRates[0][properValues[0]] += rate;
      totalRates[1][properValues[1]] += rate;
      totalRates[2][properValues[2]] += rate;
      if (
        properValues[0] >= goals[0] &&
        properValues[1] >= goals[1] &&
        properValues[2] >= goals[2]
      ) {
        goalRate += rate;
      }
    });

    // 계산 결과를 반환
    return {
      rate1,
      rate2,
      rate11,
      rate12,
      rate21,
      rate22,
      initialProperValue: initialProperValues.map((v) => v as Rank),
      groundRate: totalRates[0],
      distanceRate: totalRates[1],
      runningTypeRate: totalRates[2],
      goalRate,
    };
  }

  // 타입에 따른 인덱스를 반환하는 정적 메서드
  private static getTypeIndex(type: Type): number {
    switch (type) {
      case Type.Ground:
        return 0;
      case Type.Distance:
        return 1;
      case Type.RunningStyle:
        return 2;
    }
  }

  // 빈 결과를 반환하는 정적 메서드
  private static getEmptyResult(): CalcResult {
    return {
      rate1: 0,
      rate2: 0,
      rate11: 0,
      rate12: 0,
      rate21: 0,
      rate22: 0,
      initialProperValue: Array(3).fill(Rank.G),
      groundRate: Array(8).fill(0),
      distanceRate: Array(8).fill(0),
      runningTypeRate: Array(8).fill(0),
      goalRate: 0,
    };
  }
}

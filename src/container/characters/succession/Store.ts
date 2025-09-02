import { characterData } from "../../../modules/data/characters";
import { relation } from "../../../modules/data/succession";

// 캐릭터 데이터를 나타내는 인터페이스
export interface CharaData {
  id: string; // 캐릭터 ID (1001, 1002 등)
  name: string; // 캐릭터 이름
  icon: string; // 캐릭터 이름
  keyword?: string; // 캐릭터 키워드
  relationSet: Set<number>; // 관계를 나타내는 숫자 집합
  color?:
    | {
        primary: string;
        secondary: string;
        background: string;
      }
    | string;
  aptitude?: {
    surface: { [string: string]: number };
    distance: { [string: string]: number };
    style: { [string: string]: number };
  }[];
  profile?: number[];
}

// 캐릭터 관계 데이터를 관리하는 Store 클래스
export class Store {
  // 캐릭터 리스트를 초기화하는 정적 변수
  private static charaList: CharaData[] = Object.entries(characterData)
    .filter(([, data]) => {
      // succession 속성이 있는지 확인
      return "succession" in data || "successionData" in data;
    })
    .map(([id, data]) => {
      return {
        id,
        name: data.name,
        icon: data.icon,
        keyword: "keyword" in data ? data.keyword : undefined,
        relationSet: new Set(data.succession as number[]),
        color: data.color,
        aptitude: data.aptitude ?? [],
        profile: data.profile ?? [],
      };
    });

  // 관계 맵을 초기화하는 정적 변수
  private static relationMap: Record<number, number> = relation;

  // ID to Index 매핑 (빠른 검색을 위한 캐시)
  private static idToIndexMap: Record<string, number> = this.charaList.reduce(
    (map, chara, index) => {
      map[chara.id] = index;
      return map;
    },
    {} as Record<string, number>,
  );

  // Name to Index 매핑 (빠른 검색을 위한 캐시)
  private static nameToIndexMap: Record<string, number> = this.charaList.reduce(
    (map, chara, index) => {
      map[chara.name] = index;
      return map;
    },
    {} as Record<string, number>,
  );

  // 캐릭터 인덱스 범위를 나타내는 정적 변수
  private static charaRange = Array.from(
    { length: this.charaList.length },
    (_, i) => i,
  );

  // 부모 관계를 나타내는 2차원 Set 배열을 초기화하는 정적 변수
  private static parentRelation: Set<number>[][] = this.charaList.map(
    (child, childIndex) =>
      this.charaList.map((parent, parentIndex) =>
        childIndex === parentIndex
          ? new Set() // 자기 자신과의 관계는 빈 Set
          : new Set(
              [...child.relationSet].filter((x) => parent.relationSet.has(x)), // 공통 관계를 필터링
            ),
      ),
  );

  // 부모 관계의 합을 나타내는 2차원 배열을 초기화하는 정적 변수
  private static parentMap: number[][] = this.parentRelation.map((sets) =>
    sets.map((set) =>
      Array.from(set).reduce(
        (sum, rel) => sum + (this.relationMap[rel] || 1), // 관계의 가중치를 합산
        0,
      ),
    ),
  );

  // 조부모 관계의 합을 나타내는 3차원 배열을 초기화하는 정적 변수
  private static grandParentMap: number[][][] = this.parentRelation.map(
    (sets, child) =>
      sets.map((set, parent) =>
        this.charaList.map(
          (grand, grandIndex) =>
            child === grandIndex || parent === grandIndex
              ? 0 // 자기 자신과의 관계는 0
              : Array.from(set)
                  .filter((x) => grand.relationSet.has(x)) // 공통 관계를 필터링
                  .reduce((sum, rel) => sum + (this.relationMap[rel] || 1), 0), // 관계의 가중치를 합산
        ),
      ),
  );

  // ===== 기본 Getter 메서드들 =====

  static get charaListPublic(): CharaData[] {
    return this.charaList;
  }

  // 캐릭터 이름 리스트를 반환하는 정적 getter
  static get charaNameList(): string[] {
    return this.charaList.map((chara) => chara.name);
  }

  // 캐릭터 ID 리스트를 반환하는 정적 getter
  static get charaIdList(): string[] {
    return this.charaList.map((chara) => chara.id);
  }

  // 캐릭터 관계 리스트를 반환하는 정적 getter
  static get charaRelation(): Set<number>[] {
    return this.charaList.map((chara) => chara.relationSet);
  }

  // 전체 캐릭터 데이터를 반환하는 정적 getter
  static get charaDataList(): CharaData[] {
    return [...this.charaList]; // 복사본 반환으로 원본 보호
  }

  // ===== 인덱스 변환 메서드들 =====

  // ID로 인덱스 찾기 (O(1) 시간복잡도)
  static getIndexById(id: string): number {
    return this.idToIndexMap[id] ?? -1;
  }

  // 이름으로 인덱스 찾기 (O(1) 시간복잡도)
  static getIndexByName(name: string): number {
    return this.nameToIndexMap[name] ?? -1;
  }

  // 인덱스로 캐릭터 정보 가져오기
  static getCharaByIndex(index: number): CharaData | null {
    return this.charaList[index] || null;
  }

  // ID로 캐릭터 정보 가져오기
  static getCharaById(id: string): CharaData {
    const index = this.getIndexById(id);
    return index !== -1 ? this.charaList[index] : ({} as CharaData);
  }

  // 이름으로 캐릭터 정보 가져오기
  static getCharaByName(name: string): CharaData | null {
    const index = this.getIndexByName(name);
    return index !== -1 ? this.charaList[index] : null;
  }

  // ===== 관계 계산 메서드들 =====

  // 특정 인덱스의 부모 리스트를 반환하는 정적 메서드
  static parentList(index: number): number[] {
    return this.parentMap[index] || [];
  }

  // 두 인덱스 간의 부모 관계를 반환하는 정적 메서드
  static parent(index1: number, index2: number): number {
    if (this.charaRange.includes(index1) && this.charaRange.includes(index2)) {
      return this.parentMap[index1][index2];
    }
    return 0;
  }

  // ID를 사용한 부모 관계 계산
  static parentById(id1: string, id2: string): number {
    const index1 = this.getIndexById(id1);
    const index2 = this.getIndexById(id2);
    return this.parent(index1, index2);
  }

  // 이름을 사용한 부모 관계 계산
  static parentByName(name1: string, name2: string): number {
    const index1 = this.getIndexByName(name1);
    const index2 = this.getIndexByName(name2);
    return this.parent(index1, index2);
  }

  // 두 인덱스 간의 조부모 리스트를 반환하는 정적 메서드
  static grandParentList(index1: number, index2: number): number[] {
    return this.grandParentMap[index1]?.[index2] || [];
  }

  // 세 인덱스 간의 조부모 관계를 반환하는 정적 메서드
  static grandParent(index1: number, index2: number, index3: number): number {
    if (
      this.charaRange.includes(index1) &&
      this.charaRange.includes(index2) &&
      this.charaRange.includes(index3)
    ) {
      return this.grandParentMap[index1][index2][index3];
    }
    return 0;
  }

  // ID를 사용한 조부모 관계 계산
  static grandParentById(id1: string, id2: string, id3: string): number {
    const index1 = this.getIndexById(id1);
    const index2 = this.getIndexById(id2);
    const index3 = this.getIndexById(id3);
    return this.grandParent(index1, index2, index3);
  }

  // 이름을 사용한 조부모 관계 계산
  static grandParentByName(
    name1: string,
    name2: string,
    name3: string,
  ): number {
    const index1 = this.getIndexByName(name1);
    const index2 = this.getIndexByName(name2);
    const index3 = this.getIndexByName(name3);
    return this.grandParent(index1, index2, index3);
  }

  // ===== 유틸리티 메서드들 =====

  // 특정 캐릭터와 관계가 좋은 상위 N개 캐릭터 반환
  static getTopRelatedCharacters(
    targetIndex: number,
    count: number = 10,
  ): Array<{ index: number; name: string; score: number }> {
    if (!this.charaRange.includes(targetIndex)) return [];

    return this.charaList
      .map((chara, index) => ({
        index,
        name: chara.name,
        score: this.parent(targetIndex, index),
      }))
      .filter((item) => item.index !== targetIndex && item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, count);
  }

  // 특정 캐릭터의 관계 점수 통계
  static getRelationStats(targetIndex: number): {
    total: number;
    average: number;
    max: number;
    min: number;
    nonZeroCount: number;
  } {
    if (!this.charaRange.includes(targetIndex)) {
      return { total: 0, average: 0, max: 0, min: 0, nonZeroCount: 0 };
    }

    const scores = this.parentList(targetIndex).filter(
      (_, index) => index !== targetIndex,
    );
    const nonZeroScores = scores.filter((score) => score > 0);

    return {
      total: scores.reduce((sum, score) => sum + score, 0),
      average:
        scores.length > 0
          ? scores.reduce((sum, score) => sum + score, 0) / scores.length
          : 0,
      max: Math.max(...scores),
      min: Math.min(...scores),
      nonZeroCount: nonZeroScores.length,
    };
  }

  // 디버깅용 정보 출력
  static debugInfo(): void {
    console.log("=== Store Debug Info ===");
    console.log(`총 캐릭터 수: ${this.charaList.length}`);
    console.log(
      `첫 번째 캐릭터: ${this.charaList[0]?.name} (ID: ${this.charaList[0]?.id})`,
    );
    console.log(`관계 맵 크기: ${Object.keys(this.relationMap).length}`);
    console.log(
      "부모 관계 매트릭스 크기:",
      this.parentMap.length,
      "x",
      this.parentMap[0]?.length,
    );
  }

  // 총 상성점수 계산 (원본 Kotlin 코드의 calcTotalRelation 함수 기반)
  static calcTotalCompatibility(
    childId: string,
    parent1Id: string | null,
    parent2Id: string | null,
    parent11Id: string | null,
    parent12Id: string | null,
    parent21Id: string | null,
    parent22Id: string | null,
  ): number {
    let totalScore = 0;

    // 자식 말 인덱스
    const childIndex = childId ? this.getIndexById(childId) : -1;

    // 부모1 인덱스
    const parent1Index = parent1Id ? this.getIndexById(parent1Id) : -1;

    // 부모2 인덱스
    const parent2Index = parent2Id ? this.getIndexById(parent2Id) : -1;

    // 부모1의 자식들 인덱스
    const parent11Index = parent11Id ? this.getIndexById(parent11Id) : -1;
    const parent12Index = parent12Id ? this.getIndexById(parent12Id) : -1;

    // 부모2의 자식들 인덱스
    const parent21Index = parent21Id ? this.getIndexById(parent21Id) : -1;
    const parent22Index = parent22Id ? this.getIndexById(parent22Id) : -1;

    // 원본 공식 적용
    if (childIndex !== -1 && parent1Index !== -1) {
      totalScore += this.parent(childIndex, parent1Index);
    }
    if (childIndex !== -1 && parent2Index !== -1) {
      totalScore += this.parent(childIndex, parent2Index);
    }
    if (parent1Index !== -1 && parent2Index !== -1) {
      totalScore += this.parent(parent1Index, parent2Index);
    }
    if (childIndex !== -1 && parent1Index !== -1 && parent11Index !== -1) {
      totalScore += this.grandParent(childIndex, parent1Index, parent11Index);
    }
    if (childIndex !== -1 && parent1Index !== -1 && parent12Index !== -1) {
      totalScore += this.grandParent(childIndex, parent1Index, parent12Index);
    }
    if (childIndex !== -1 && parent2Index !== -1 && parent21Index !== -1) {
      totalScore += this.grandParent(childIndex, parent2Index, parent21Index);
    }
    if (childIndex !== -1 && parent2Index !== -1 && parent22Index !== -1) {
      totalScore += this.grandParent(childIndex, parent2Index, parent22Index);
    }

    return totalScore;
  }

  // 부모들 간의 관계 점수만 계산
  static calcParentRelation(
    parent1Id: string | null,
    parent2Id: string | null,
  ): number {
    if (!parent1Id || !parent2Id) return 0;

    const parent1Index = this.getIndexById(parent1Id);
    const parent2Index = this.getIndexById(parent2Id);

    if (parent1Index === -1 || parent2Index === -1) return 0;

    return this.parent(parent1Index, parent2Index);
  }
}

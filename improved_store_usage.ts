// 개선된 Store.ts 사용 예시 - characters.ts 데이터 기반

import { Store } from "./src/container/characters/succession/Store";

console.log("=== 🎯 개선된 Store 클래스 사용 가이드 ===\n");

// Store 클래스 디버그 정보 확인
Store.debugInfo();

console.log("\n=== 📋 1. 기본 데이터 조회 ===");

// 🔍 전체 캐릭터 정보
console.log(`총 캐릭터 수: ${Store.charaNameList.length}`);
console.log(
  `캐릭터 ID들: ${Store.charaIdList.slice(0, 5).join(", ")}... (처음 5개)`,
);
console.log(
  `캐릭터 이름들: ${Store.charaNameList.slice(0, 5).join(", ")}... (처음 5개)`,
);

console.log("\n=== 🚀 2. 효율적인 검색 방법 ===");

// ⚡ O(1) 시간복잡도로 빠른 검색
const spCharId = "1001"; // 스페셜 위크 ID
const spCharName = "스페셜 위크";

console.log("🔍 ID로 검색 (O(1)):");
const spIndex1 = Store.getIndexById(spCharId);
const spChara1 = Store.getCharaById(spCharId);
console.log(`  ID ${spCharId} → 인덱스: ${spIndex1}, 이름: ${spChara1?.name}`);

console.log("🔍 이름으로 검색 (O(1)):");
const spIndex2 = Store.getIndexByName(spCharName);
const spChara2 = Store.getCharaByName(spCharName);
console.log(
  `  이름 "${spCharName}" → 인덱스: ${spIndex2}, ID: ${spChara2?.id}`,
);

console.log("\n=== 💕 3. 관계 계산 (다양한 방법) ===");

// 방법 1: 인덱스 사용 (가장 빠름)
const silenceIndex = Store.getIndexByName("사일런스 스즈카");
const relationByIndex = Store.parent(spIndex1, silenceIndex);
console.log(
  `방법 1 (인덱스): 스페셜 위크 ↔ 사일런스 스즈카 = ${relationByIndex}점`,
);

// 방법 2: ID 사용 (편리함)
const silenceId = "1002";
const relationById = Store.parentById(spCharId, silenceId);
console.log(`방법 2 (ID): ${spCharId} ↔ ${silenceId} = ${relationById}점`);

// 방법 3: 이름 사용 (직관적)
const relationByName = Store.parentByName("스페셜 위크", "사일런스 스즈카");
console.log(
  `방법 3 (이름): 스페셜 위크 ↔ 사일런스 스즈카 = ${relationByName}점`,
);

console.log("\n=== 👴 4. 조부모 관계 계산 ===");

const tokaiteioId = "1003";
const grandParentScore = Store.grandParentById(
  spCharId,
  silenceId,
  tokaiteioId,
);
console.log(
  `3세대 관계 (스페셜위크-사일런스스즈카-토카이테이오): ${grandParentScore}점`,
);

console.log("\n=== 🏆 5. 상위 관계 캐릭터 찾기 ===");

// 스페셜 위크와 관계 좋은 상위 5명
const topRelated = Store.getTopRelatedCharacters(spIndex1, 5);
console.log("스페셜 위크와 관계 좋은 상위 5명:");
topRelated.forEach((item, idx) => {
  console.log(`  ${idx + 1}. ${item.name} (${item.score}점)`);
});

console.log("\n=== 📊 6. 관계 통계 분석 ===");

const stats = Store.getRelationStats(spIndex1);
console.log("스페셜 위크의 관계 통계:");
console.log(`  - 총 관계 점수: ${stats.total}`);
console.log(`  - 평균 점수: ${stats.average.toFixed(2)}`);
console.log(`  - 최고 점수: ${stats.max}`);
console.log(`  - 최저 점수: ${stats.min}`);
console.log(`  - 관계 있는 캐릭터 수: ${stats.nonZeroCount}`);

console.log("\n=== ⚡ 7. 성능 비교 ===");

// 기존 방식 (O(n) 검색)
console.time("기존 방식 (O(n))");
const oldWayIndex = Store.charaNameList.indexOf("스페셜 위크");
console.timeEnd("기존 방식 (O(n))");

// 새로운 방식 (O(1) 검색)
console.time("새로운 방식 (O(1))");
const newWayIndex = Store.getIndexByName("스페셜 위크");
console.timeEnd("새로운 방식 (O(1))");

console.log(`결과: ${oldWayIndex === newWayIndex ? "동일" : "오류"}`);

console.log("\n=== 🎯 8. 실전 사용 시나리오 ===");

// 시나리오: 최적의 계승 조합 찾기
function findBestSuccessionCombo(childId: string, candidateIds: string[]) {
  const childIndex = Store.getIndexById(childId);
  if (childIndex === -1) return null;

  const results = candidateIds
    .map((id) => {
      const parentIndex = Store.getIndexById(id);
      const score =
        parentIndex !== -1 ? Store.parent(childIndex, parentIndex) : 0;
      return {
        id,
        name: Store.getCharaById(id)?.name || "Unknown",
        score,
      };
    })
    .sort((a, b) => b.score - a.score);

  return results;
}

const candidates = ["1002", "1003", "1004", "1005", "1006"];
const bestCombos = findBestSuccessionCombo("1001", candidates);

console.log("스페셜 위크의 최적 계승 후보:");
bestCombos?.forEach((combo, idx) => {
  console.log(
    `  ${idx + 1}. ${combo.name} (ID: ${combo.id}) - ${combo.score}점`,
  );
});

console.log("\n=== 💡 9. 사용 팁 ===");
console.log("✅ ID 사용: 데이터베이스와 연동시 안정적");
console.log("✅ 이름 사용: UI에서 직관적");
console.log("✅ 인덱스 사용: 대량 계산시 최고 성능");
console.log("✅ 통계 메서드: 분석 및 리포트 생성");
console.log("✅ Top N 메서드: 추천 시스템 구현");

console.log("\n=== 🎪 Store 클래스의 장점 ===");
console.log("🚀 성능: O(1) 검색으로 초고속");
console.log("🔒 안전성: 타입 안전한 접근");
console.log("🎯 편의성: ID/이름/인덱스 모두 지원");
console.log("📊 분석: 통계 및 랭킹 기능 내장");
console.log("🔧 확장성: 새로운 기능 쉽게 추가 가능");

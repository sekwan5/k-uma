import { Character } from "./succession";

// 초성 추출 함수
const getInitialConsonants = (str: string) => {
  const initialConsonants = [
    "ㄱ",
    "ㄲ",
    "ㄴ",
    "ㄷ",
    "ㄸ",
    "ㄹ",
    "ㅁ",
    "ㅂ",
    "ㅃ",
    "ㅅ",
    "ㅆ",
    "ㅇ",
    "ㅈ",
    "ㅉ",
    "ㅊ",
    "ㅋ",
    "ㅌ",
    "ㅍ",
    "ㅎ",
  ];

  return str
    .split("")
    .map((char) => {
      const code = char.charCodeAt(0) - 0xac00;
      if (code > -1 && code < 11172) {
        return initialConsonants[Math.floor(code / 588)];
      }
      return char;
    })
    .join("");
};

export const filteredCharacters = (
  characters: Character[],
  txt: string,
): Character[] => {
  if (!txt) return characters;

  const searchTerm = txt.toLowerCase();
  const isInitialConsonant = /^[ㄱ-ㅎ]+$/.test(txt);

  return characters.filter((character) => {
    const name = character.name.toLowerCase();
    const keyword = character.keyword?.toLowerCase();

    // 초성 검색
    if (isInitialConsonant) {
      return getInitialConsonants(character.name).includes(txt);
    }

    // 일반 검색
    return name.includes(searchTerm) || keyword?.includes(searchTerm);
  });
};

export const getGradeColor = (grade: number) => {
  switch (grade) {
    case 0: // S
      return "#FF0000"; // 빨간색
    case 1: // A
      return "#FF6B35"; // 주황색
    case 2: // B
      return "#FFD93D"; // 노란색
    case 3: // C
      return "#6BCF7F"; // 초록색
    case 4: // D
      return "#4D96FF"; // 파란색
    case 5: // E
      return "#9B59B6"; // 보라색
    case 6: // F
      return "#E74C3C"; // 빨간색
    case 7: // G
      return "#7F8C8D"; // 회색
    default:
      return "#000000";
  }
};

export const getGradeText = (grade: number) => {
  switch (grade) {
    case 0:
      return "S";
    case 1:
      return "A";
    case 2:
      return "B";
    case 3:
      return "C";
    case 4:
      return "D";
    case 5:
      return "E";
    case 6:
      return "F";
    case 7:
      return "G";
    default:
      return "?";
  }
};

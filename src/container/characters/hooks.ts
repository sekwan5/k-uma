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
  console.log("characters", characters[0]);
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

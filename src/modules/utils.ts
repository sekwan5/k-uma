type CategoryType = "type" | "job" | "grade";

export const getIconPosition = (category: CategoryType, value: string) => {
  const positions = {
    type: {
      t04: "0",
      t01: "25%",
      t03: "50%",
      t02: "75%",
      t05: "100%",
    },
    job: {
      j06: "calc(0% + 2px)",
      j05: "20%",
      j01: "40%",
      j03: "60%",
      j02: "80%",
      j04: "100%",
    },
    grade: {
      g01: "0",
      g02: "25%",
      g03: "50%",
      g04: "75%",
      g05: "100%",
    },
  } as const;

  return (
    positions[category][value as keyof (typeof positions)[CategoryType]] || "0%"
  );
};

export const typeIcon =
  "https://static.smilegatemegaport.com/live/epic7stats/assets/images/common/icon_attr.png";
export const jobIcon =
  "https://static.smilegatemegaport.com/live/epic7stats/assets/images/common/icon_job.png";
export const starIcon =
  "https://static.smilegatemegaport.com/live/epic7stats/assets/images/common/icon_grade.png";

// 초성 추출 함수
export const getInitialConsonants = (str: string) => {
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

// 초성 검색 함수
export const matchesInitialConsonants = (text: string, search: string) => {
  const textInitials = getInitialConsonants(text);
  const searchInitials = getInitialConsonants(search);
  return textInitials.includes(searchInitials);
};

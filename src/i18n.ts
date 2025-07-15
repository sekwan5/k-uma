import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// 번역 파일 가져오기
import ko from "./modules/locales/ko.json";
import en from "./modules/locales/en.json";
import ja from "./modules/locales/ja.json";
import skillKo from "./modules/locales/skill-ko.json";

// 한국어 스킬 데이터 병합
const koWithSkills = {
  ...ko,
  skills: {
    ...ko.skills,
    ...skillKo,
  },
};

// 리소스 설정
const resources = {
  ko: { translation: koWithSkills },
  en: { translation: en },
  ja: { translation: ja },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "ko",
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },
  });

export default i18n;

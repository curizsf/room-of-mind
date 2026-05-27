import { type Language } from "./i18n";

export const quotes = {
  tired: {
    en: "You are not afraid of resting.\nYou are afraid no one will wait when you stop.",
    zh: "\u4f60\u4e0d\u662f\u5bb3\u6015\u4f11\u606f\u3002\n\u4f60\u53ea\u662f\u5bb3\u6015\u4e00\u505c\u4e0b\u6765\uff0c\u5c31\u518d\u4e5f\u6ca1\u4eba\u7b49\u4f60\u3002",
  },
  lonely: {
    en: "Sometimes loneliness is just love with nowhere to land.",
    zh: "\u6709\u65f6\u5019\uff0c\u5b64\u72ec\u53ea\u662f\u7231\u610f\u65e0\u5904\u5b89\u653e\u3002",
  },
  nostalgic: {
    en: "Some memories stay because they never got to finish speaking.",
    zh: "\u6709\u4e9b\u56de\u5fc6\u7559\u4e0b\u6765\uff0c\u662f\u56e0\u4e3a\u5b83\u4eec\u8fd8\u6ca1\u6765\u5f97\u53ca\u628a\u8bdd\u8bf4\u5b8c\u3002",
  },
  healing: {
    en: "Healing is not becoming new.\nIt is becoming gentle again.",
    zh: "\u6cbb\u6108\u4e0d\u662f\u53d8\u6210\u4e00\u4e2a\u65b0\u7684\u4eba\u3002\n\u800c\u662f\u91cd\u65b0\u53d8\u5f97\u6e29\u67d4\u3002",
  },
  escape: {
    en: "You do not want to vanish.\nYou want the noise to stop.",
    zh: "\u4f60\u4e0d\u662f\u60f3\u6d88\u5931\u3002\n\u4f60\u53ea\u662f\u60f3\u8ba9\u90a3\u4e9b\u566a\u97f3\u505c\u4e0b\u6765\u3002",
  },
  hope: {
    en: "Morning does not ask who you were yesterday.",
    zh: "\u6e05\u6668\u4e0d\u4f1a\u8ffd\u95ee\uff0c\u4f60\u6628\u5929\u662f\u8c01\u3002",
  },
  ambition: {
    en: "Growth often feels like loneliness before it feels like becoming.",
    zh: "\u6210\u957f\u5e38\u5e38\u5148\u50cf\u5b64\u72ec\uff0c\u540e\u6765\u624d\u50cf\u6210\u4e3a\u81ea\u5df1\u3002",
  },
  winter: {
    en: "Silence is where forgotten parts of you come home.",
    zh: "\u6c89\u9ed8\uff0c\u662f\u90a3\u4e9b\u88ab\u9057\u5fd8\u7684\u81ea\u5df1\u56de\u6765\u7684\u5730\u65b9\u3002",
  },
} as const;

export type QuoteKey = keyof typeof quotes;

export function getQuote(key: QuoteKey, language: Language): string {
  return quotes[key][language];
}

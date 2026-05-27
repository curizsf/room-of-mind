export const languages = ["en", "zh"] as const;

export type Language = (typeof languages)[number];

export function isLanguage(value: string | undefined): value is Language {
  return value === "en" || value === "zh";
}

export function normalizeLanguage(value: string | undefined): Language {
  return isLanguage(value) ? value : "en";
}

export const uiCopy = {
  en: {
    title: "Room of Mind",
    subtitle: "What does your soul feel like tonight?",
    inputLabel: "Write what you are carrying right now...",
    inputHint: "Write one sentence about how you feel right now.",
    rotatingHints: [
      "I am already tired, but I still cannot stop.",
      "I miss home, and I feel a little lonely.",
      "I keep thinking about the past.",
      "I want to slow down and breathe.",
      "I want to disappear for a while.",
      "I want to begin again.",
      "I feel anxious about the future.",
      "I just want some silence tonight.",
    ],
    inputExamples: [
      "I am already tired, but I still cannot stop.",
      "I miss home, and I feel a little lonely.",
      "I want some quiet and I want to get away for a while.",
      "I feel anxious about the future.",
    ],
    placeholder: "Already tired, but still can't stop.",
    submit: "Generate My Room",
    generateAgain: "Generate Again",
    soundOn: "Sound On",
    soundOff: "Mute",
    soundUnavailable: "No Audio",
    loading: [
      "Analyzing emotion...",
      "Mapping memory...",
      "Building your room...",
      "Lighting the window...",
    ],
  },
  zh: {
    title: "Room of Mind",
    subtitle: "\u4eca\u665a\uff0c\u4f60\u7684\u7075\u9b42\u50cf\u4ec0\u4e48\u6837\u5b50\uff1f",
    inputLabel: "\u5199\u4e0b\u6b64\u523b\u7684\u4f60...",
    inputHint: "\u5199\u4e00\u53e5\u4f60\u6b64\u523b\u7684\u611f\u53d7\u3002",
    rotatingHints: [
      "\u6211\u5df2\u7ecf\u5f88\u7d2f\u4e86\uff0c\u5374\u8fd8\u662f\u505c\u4e0d\u4e0b\u6765",
      "\u6709\u70b9\u60f3\u5bb6\uff0c\u4e5f\u6709\u70b9\u5b64\u72ec",
      "\u6211\u603b\u5728\u60f3\u8d77\u4ee5\u524d\u7684\u4e8b",
      "\u6211\u60f3\u6162\u4e00\u70b9\uff0c\u597d\u597d\u900f\u53e3\u6c14",
      "\u6211\u60f3\u5148\u4ece\u8fd9\u4e00\u5207\u91cc\u79bb\u5f00\u4e00\u4f1a\u513f",
      "\u6211\u60f3\u91cd\u65b0\u5f00\u59cb",
      "\u6211\u5bf9\u672a\u6765\u6709\u70b9\u7126\u8651",
      "\u4eca\u665a\u6211\u53ea\u60f3\u5b89\u9759\u4e00\u70b9",
    ],
    inputExamples: [
      "\u6211\u5df2\u7ecf\u5f88\u7d2f\u4e86\uff0c\u5374\u8fd8\u662f\u505c\u4e0d\u4e0b\u6765",
      "\u6709\u70b9\u60f3\u5bb6\uff0c\u4e5f\u6709\u70b9\u5b64\u72ec",
      "\u6211\u60f3\u5b89\u9759\u4e00\u4e0b\uff0c\u79bb\u5f00\u73b0\u5728\u7684\u4e00\u5207",
      "\u6211\u5bf9\u672a\u6765\u6709\u70b9\u7126\u8651",
    ],
    placeholder: "\u5df2\u7ecf\u5f88\u7d2f\u4e86\uff0c\u5374\u8fd8\u662f\u505c\u4e0d\u4e0b\u6765\u3002",
    submit: "\u751f\u6210\u6211\u7684\u623f\u95f4",
    generateAgain: "\u91cd\u65b0\u751f\u6210",
    soundOn: "\u5f00\u542f\u58f0\u97f3",
    soundOff: "\u5173\u95ed\u58f0\u97f3",
    soundUnavailable: "\u65e0\u97f3\u9891",
    loading: [
      "\u6b63\u5728\u5206\u6790\u60c5\u7eea...",
      "\u6b63\u5728\u63cf\u6479\u8bb0\u5fc6...",
      "\u6b63\u5728\u751f\u6210\u623f\u95f4...",
      "\u6b63\u5728\u70b9\u4eae\u7a97\u8fb9...",
    ],
  },
} as const;

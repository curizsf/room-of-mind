export const quotes = {
  tired:
    "You are not afraid of resting.\nYou are afraid no one will wait when you stop.",
  lonely: "Sometimes loneliness is just love with nowhere to land.",
  nostalgic: "Some memories stay because they never got to finish speaking.",
  healing: "Healing is not becoming new.\nIt is becoming gentle again.",
  escape: "You do not want to vanish.\nYou want the noise to stop.",
  hope: "Morning does not ask who you were yesterday.",
  ambition: "Growth often feels like loneliness before it feels like becoming.",
  winter: "Silence is where forgotten parts of you come home.",
} as const;

export type QuoteKey = keyof typeof quotes;

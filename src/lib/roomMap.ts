import { getQuote, type QuoteKey } from "./quotes";

export type RoomResult = {
  roomType: QuoteKey;
  image: string;
  quote: string;
};

type AnalyzeOptions = {
  previousInput?: string;
  previousRoomType?: QuoteKey;
};

type WeightedKeyword = {
  term: string;
  weight: number;
  fuzzy?: boolean;
};

type RoomDefinition = {
  key: QuoteKey;
  image: string;
  keywords: WeightedKeyword[];
};

const roomMap: RoomDefinition[] = [
  {
    key: "tired",
    image: "/rooms/rainy-office.png",
    keywords: [
      { term: "tired", weight: 2 },
      { term: "exhausted", weight: 3 },
      { term: "burnout", weight: 3 },
      { term: "burned out", weight: 3 },
      { term: "drained", weight: 3 },
      { term: "overwhelmed", weight: 2 },
      { term: "worn out", weight: 3 },
      { term: "can't keep going", weight: 3 },
      { term: "too tired", weight: 3 },
      { term: "累", weight: 2 },
      { term: "很累", weight: 3 },
      { term: "太累了", weight: 3 },
      { term: "累死", weight: 3, fuzzy: true },
      { term: "累坏", weight: 3, fuzzy: true },
      { term: "疲惫", weight: 3 },
      { term: "疲倦", weight: 3 },
      { term: "筋疲力尽", weight: 4 },
      { term: "撑不住", weight: 4 },
      { term: "扛不住", weight: 4 },
      { term: "受不了了", weight: 3 },
      { term: "没力气", weight: 3 },
      { term: "被掏空", weight: 4 },
      { term: "好想休息", weight: 3 },
      { term: "喘不过气", weight: 2 },
      { term: "精力被耗尽", weight: 4 },
      { term: "每天都很累", weight: 4 },
      { term: "不想再撑了", weight: 4 },
    ],
  },
  {
    key: "lonely",
    image: "/rooms/convenience.png",
    keywords: [
      { term: "lonely", weight: 3 },
      { term: "alone", weight: 2 },
      { term: "miss", weight: 2 },
      { term: "empty", weight: 3 },
      { term: "homesick", weight: 3 },
      { term: "left out", weight: 3 },
      { term: "nobody understands me", weight: 4 },
      { term: "i miss someone", weight: 4 },
      { term: "miss home", weight: 4 },
      { term: "孤独", weight: 4 },
      { term: "寂寞", weight: 3 },
      { term: "想念", weight: 3 },
      { term: "想你", weight: 4 },
      { term: "想家", weight: 5 },
      { term: "有点想家", weight: 5 },
      { term: "很想家", weight: 5 },
      { term: "我想家了", weight: 5 },
      { term: "思念", weight: 3, fuzzy: true },
      { term: "挂念", weight: 3, fuzzy: true },
      { term: "空", weight: 1 },
      { term: "空空的", weight: 3 },
      { term: "心里空空的", weight: 4 },
      { term: "没人懂我", weight: 4 },
      { term: "一个人", weight: 2 },
      { term: "没有人陪", weight: 3 },
      { term: "没人陪", weight: 3, fuzzy: true },
      { term: "很想谁", weight: 3 },
      { term: "难过", weight: 2 },
      { term: "伤心", weight: 2 },
      { term: "失落", weight: 3 },
      { term: "好孤单", weight: 4 },
      { term: "心里很空", weight: 4 },
      { term: "被落下", weight: 3 },
      { term: "落单", weight: 3, fuzzy: true },
    ],
  },
  {
    key: "nostalgic",
    image: "/rooms/classroom-sunset.png",
    keywords: [
      { term: "nostalgic", weight: 4 },
      { term: "memory", weight: 2 },
      { term: "memories", weight: 2 },
      { term: "school", weight: 3 },
      { term: "regret", weight: 3 },
      { term: "past", weight: 2 },
      { term: "nostalgia", weight: 4 },
      { term: "i miss the old days", weight: 4 },
      { term: "怀念", weight: 4 },
      { term: "回忆", weight: 4 },
      { term: "回想", weight: 3, fuzzy: true },
      { term: "学校", weight: 3 },
      { term: "遗憾", weight: 3 },
      { term: "从前", weight: 3 },
      { term: "过去", weight: 2 },
      { term: "青春", weight: 3 },
      { term: "以前", weight: 2 },
      { term: "那时候", weight: 2 },
      { term: "回不去了", weight: 4 },
      { term: "没来得及", weight: 3 },
      { term: "还没说完", weight: 3 },
      { term: "总会想起", weight: 3 },
      { term: "学生时代", weight: 4 },
      { term: "以前的日子", weight: 4 },
    ],
  },
  {
    key: "healing",
    image: "/rooms/seaside-room.png",
    keywords: [
      { term: "healing", weight: 4 },
      { term: "calm", weight: 3 },
      { term: "peace", weight: 3 },
      { term: "rest", weight: 2 },
      { term: "breathe", weight: 2 },
      { term: "gentle", weight: 2 },
      { term: "safe", weight: 2 },
      { term: "治愈", weight: 4 },
      { term: "平静", weight: 4 },
      { term: "安宁", weight: 4 },
      { term: "放松", weight: 3 },
      { term: "慢下来", weight: 3 },
      { term: "缓一缓", weight: 3 },
      { term: "缓缓", weight: 2, fuzzy: true },
      { term: "想休息", weight: 2 },
      { term: "想安静一下", weight: 4 },
      { term: "想平静一点", weight: 4 },
      { term: "需要一点平静", weight: 4 },
      { term: "被治愈", weight: 4 },
      { term: "想透口气", weight: 3 },
      { term: "想呼吸一下", weight: 3 },
      { term: "让自己慢下来", weight: 4 },
    ],
  },
  {
    key: "escape",
    image: "/rooms/forest-cabin.png",
    keywords: [
      { term: "disappear", weight: 4 },
      { term: "escape", weight: 4 },
      { term: "run away", weight: 4 },
      { term: "get away", weight: 3 },
      { term: "hide", weight: 3 },
      { term: "leave everything", weight: 4 },
      { term: "i want out", weight: 4 },
      { term: "消失", weight: 4 },
      { term: "逃跑", weight: 4 },
      { term: "逃离", weight: 4 },
      { term: "逃开", weight: 4, fuzzy: true },
      { term: "远离", weight: 3 },
      { term: "躲起来", weight: 4 },
      { term: "离开这里", weight: 4 },
      { term: "不想面对", weight: 4 },
      { term: "想离开", weight: 3 },
      { term: "想逃开", weight: 4 },
      { term: "我想消失", weight: 5 },
      { term: "想从这一切里逃走", weight: 5 },
      { term: "不想管了", weight: 2 },
      { term: "离这个世界远一点", weight: 4 },
    ],
  },
  {
    key: "hope",
    image: "/rooms/reading-dawn.png",
    keywords: [
      { term: "restart", weight: 4 },
      { term: "begin", weight: 3 },
      { term: "hope", weight: 3 },
      { term: "new start", weight: 4 },
      { term: "start over", weight: 4 },
      { term: "fresh start", weight: 4 },
      { term: "tomorrow will be better", weight: 4 },
      { term: "重新开始", weight: 5 },
      { term: "希望", weight: 3 },
      { term: "重新来过", weight: 4 },
      { term: "从头开始", weight: 4 },
      { term: "明天会更好", weight: 4 },
      { term: "想重新开始", weight: 5 },
      { term: "重来", weight: 3, fuzzy: true },
      { term: "还有希望", weight: 4 },
      { term: "再试一次", weight: 3 },
      { term: "新的开始", weight: 4 },
      { term: "想振作起来", weight: 4 },
      { term: "我想好起来", weight: 4 },
    ],
  },
  {
    key: "ambition",
    image: "/rooms/city-loft.png",
    keywords: [
      { term: "ambition", weight: 4 },
      { term: "pressure", weight: 3 },
      { term: "future", weight: 3 },
      { term: "career", weight: 3 },
      { term: "success", weight: 3 },
      { term: "anxious about the future", weight: 4 },
      { term: "i need to prove myself", weight: 4 },
      { term: "压力", weight: 4 },
      { term: "未来", weight: 3 },
      { term: "野心", weight: 4 },
      { term: "焦虑", weight: 3 },
      { term: "工作压力", weight: 4 },
      { term: "成长", weight: 2 },
      { term: "前路", weight: 3, fuzzy: true },
      { term: "成功", weight: 3 },
      { term: "前途", weight: 3 },
      { term: "出人头地", weight: 4 },
      { term: "不想被落下", weight: 4 },
      { term: "我要变得更好", weight: 3 },
      { term: "好怕以后", weight: 4 },
      { term: "对未来很焦虑", weight: 5 },
      { term: "被现实推着走", weight: 4 },
      { term: "想证明自己", weight: 4 },
    ],
  },
  {
    key: "winter",
    image: "/rooms/attic-snow.png",
    keywords: [
      { term: "winter", weight: 4 },
      { term: "reflection", weight: 3 },
      { term: "quiet", weight: 2 },
      { term: "silence", weight: 3 },
      { term: "stillness", weight: 3 },
      { term: "pause", weight: 2 },
      { term: "i need silence", weight: 4 },
      { term: "bored", weight: 3 },
      { term: "boring", weight: 3 },
      { term: "冬天", weight: 4 },
      { term: "沉思", weight: 4 },
      { term: "沉默", weight: 3 },
      { term: "迷茫", weight: 3 },
      { term: "情绪低落", weight: 4 },
      { term: "想静静", weight: 4 },
      { term: "发呆", weight: 3, fuzzy: true },
      { term: "安静", weight: 1 },
      { term: "一个人待着", weight: 3 },
      { term: "停一下", weight: 2 },
      { term: "脑子很乱", weight: 4 },
      { term: "说不上来", weight: 3 },
      { term: "有点压抑", weight: 4 },
      { term: "需要一点沉默", weight: 4 },
      { term: "无聊", weight: 4 },
      { term: "好无聊", weight: 4 },
      { term: "很无聊", weight: 4 },
      { term: "有点无聊", weight: 4 },
      { term: "百无聊赖", weight: 5 },
      { term: "空虚", weight: 4 },
    ],
  },
];

function fuzzyMatch(input: string, term: string): boolean {
  if (!term || term.length < 2) {
    return false;
  }

  if (input.includes(term)) {
    return true;
  }

  if (/[\u4e00-\u9fff]/.test(term)) {
    const chars = [...new Set(term.split(""))];
    const hitCount = chars.filter((char) => input.includes(char)).length;
    return hitCount >= Math.max(2, term.length - 1);
  }

  const normalizedInput = input.replace(/\s+/g, " ");
  const normalizedTerm = term.replace(/\s+/g, " ");
  return normalizedInput.includes(normalizedTerm);
}

function scoreInput(input: string, room: RoomDefinition): number {
  return room.keywords.reduce((sum, keyword) => {
    const matched = keyword.fuzzy
      ? fuzzyMatch(input, keyword.term)
      : input.includes(keyword.term);
    return sum + (matched ? keyword.weight : 0);
  }, 0);
}

function buildResult(room: RoomDefinition): RoomResult {
  return {
    roomType: room.key,
    image: room.image,
    quote: getQuote(room.key, "en"),
  };
}

export function analyzeRoom(
  input: string,
  options: AnalyzeOptions = {},
): RoomResult {
  const normalized = input.toLowerCase().trim();

  const scored = roomMap
    .map((room) => ({
      room,
      score: scoreInput(normalized, room),
    }))
    .sort((a, b) => b.score - a.score);

  const best = scored[0]?.score > 0 ? scored[0]?.room : roomMap[0];
  const previousInput = options.previousInput?.toLowerCase().trim();
  const sameInput = Boolean(previousInput && previousInput === normalized);
  const previousRoomType = options.previousRoomType;

  if (!sameInput && previousRoomType && best.key === previousRoomType) {
    const alternative = scored.find(
      ({ room, score }) => room.key !== previousRoomType && score > 0,
    );

    if (alternative) {
      return buildResult(alternative.room);
    }

    const fallbackAlternative = roomMap.find((room) => room.key !== previousRoomType);

    if (fallbackAlternative) {
      return buildResult(fallbackAlternative);
    }
  }

  return buildResult(best);
}

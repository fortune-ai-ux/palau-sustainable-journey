import type { Place } from "../types";
export const places: Place[] = [
  {
    id: "rock",
    name: "洛克群島",
    english: "Rock Islands Southern Lagoon",
    category: "海洋生態",
    description:
      "以石灰岩島嶼、海洋湖泊與珊瑚礁構成的海洋景觀，也是本次海域體察的核心場域。從島嶼與海洋的關係，觀察保育與旅遊如何共存。實際出海路線依主辦單位安排。",
    query: "Rock Islands Southern Lagoon Palau",
    days: [2, 3, 9],
    sdgs: [14],
    confirmed: true,
    image: "/images/rock-islands-lagoon.jpg",
    source: "https://whc.unesco.org/en/list/1386/",
  },
  {
    id: "clam",
    name: "硨磲貝復育中心",
    category: "海洋生態",
    description:
      "依計畫觀察硨磲貝復育與水產養殖工作，了解繁殖、照護與海域復育的關聯。參訪機構及集合位置待主辦單位確認。",
    query: "giant clam hatchery Palau",
    days: [4],
    sdgs: [2, 14],
    confirmed: false,
  },
  {
    id: "market",
    name: "當地早市與魚市場",
    category: "市場經濟",
    description:
      "由早市與漁獲交易認識島嶼的生產、流通與日常飲食。記錄市場角色與在地經濟；拍攝攤商或訪談前，先取得同意。市場名稱與地址待確認。",
    query: "local fish market Palau",
    days: [4, 8],
    sdgs: [2, 12, 14],
    confirmed: false,
  },
  {
    id: "farm",
    name: "國合會農技團－畜牧中心",
    category: "永續產業",
    description:
      "以計畫安排的農技合作交流，認識農畜生產與在地糧食供應。實際參訪單位、名稱及入場安排需由主辦單位確認。",
    query: "Taiwan Technical Mission Palau agriculture",
    days: [4],
    sdgs: [2],
    confirmed: false,
  },
  {
    id: "bai",
    name: "百年男人會館",
    english: "Bai ra RengaraIrrai",
    category: "文化歷史",
    description:
      "艾萊州傳統會館呈現帛琉的建築工藝與社群文化。由在地導覽理解空間意義，尊重進入、拍照與文化解說規範。",
    query: "Bai ra RengaraIrrai Airai Palau",
    days: [5],
    sdgs: [11],
    confirmed: true,
    source: "https://pristineparadisepalau.com/states/airai/",
  },
  {
    id: "museum",
    name: "帛琉私人博物館",
    category: "文化歷史",
    description:
      "原始行程未指定博物館名稱。以文物與地方敘事理解帛琉歷史，觀察展覽如何傳遞文化記憶；正式館名待確認。",
    query: "private museum Palau",
    days: [5, 7],
    sdgs: [11, 15],
    confirmed: false,
  },
  {
    id: "airai",
    name: "艾萊州文化地點",
    english: "Airai",
    category: "文化歷史",
    description:
      "以戰船與古老部落巡禮，認識帛琉傳統生活與社群連結。這是區域搜尋，戰船與各部落的實際停靠點仍待確認。",
    query: "Airai Palau cultural tour",
    days: [5],
    sdgs: [11],
    confirmed: false,
  },
  {
    id: "hotel",
    name: "PALAU HOTEL",
    english: "Palau Hotel",
    category: "永續產業",
    description:
      "依計畫從旅宿營運角度，觀察資源使用、在地採購與旅客溝通。本頁不代表旅館已取得任何永續認證；參訪內容待安排。",
    query: "Palau Hotel Koror Palau",
    days: [6],
    sdgs: [12],
    confirmed: true,
    source: "https://pristineparadisepalau.com/stay/palau-hotel/",
  },
  {
    id: "waterfall",
    name: "巴貝大島天使大瀑布",
    category: "自然環境",
    description:
      "走入巴貝大島自然環境，觀察水文、森林與觀光活動的互動。原始計畫使用中文俗名，實際瀑布名稱、步道路線與集合點待確認。",
    query: "Babeldaob waterfall Palau",
    days: [7],
    sdgs: [15],
    confirmed: false,
  },
  {
    id: "surangel",
    name: "Surangel's Supercenter - Airai",
    english: "Surangel’s Supercenter",
    category: "市場經濟",
    description:
      "觀察大型零售通路如何連結進口供應、物流與居民消費。可記錄商品來源、包裝與在地產品能見度，作為責任消費的田野素材。",
    query: "Surangel's Supercenter Airai Palau",
    days: [8],
    sdgs: [12],
    confirmed: true,
    source: "https://surangel.com/",
  },
  {
    id: "wctc",
    name: "WCTC 超級市場",
    english: "WCTC Shopping Center",
    category: "市場經濟",
    description:
      "透過超市訪察比較不同通路的商品與消費型態，理解島嶼市場的供應條件。正式參訪樓層、入口與時段待確認。",
    query: "WCTC Shopping Center Palau",
    days: [8],
    sdgs: [12],
    confirmed: false,
  },
  {
    id: "stone",
    name: "石錢島",
    category: "文化歷史",
    description:
      "原始行程安排海域探勘、登島探索與戰爭遺跡考察。中文地名尚未對應到確切登島地點，不以其他石錢採石場替代；航線待確認。",
    query: "stone money island Palau",
    days: [10],
    sdgs: [14, 15],
    confirmed: false,
  },
  {
    id: "mangrove",
    name: "帛琉紅樹林生態區",
    category: "自然環境",
    description:
      "藍炭紅樹林之旅聚焦沿岸濕地、碳儲存與生物棲地的關係。以低干擾方式觀察環境；此處為區域搜尋，尚未確認特定生態區。",
    query: "mangrove Palau",
    days: [10],
    sdgs: [14, 15],
    confirmed: false,
  },
  {
    id: "glass",
    name: "ECO GLASS FACTORY",
    category: "永續產業",
    description:
      "以計畫安排的琉璃工廠參訪，觀察玻璃材料、工藝創作與資源再利用的連結。帛琉觀光局列為 Belau Eco Glass，位於 Koror State Solid Waste Management building；本計畫的參訪安排仍需主辦單位確認。",
    query: "Belau Eco Glass Koror Palau",
    days: [11],
    sdgs: [12],
    confirmed: true,
    english: "Belau Eco Glass",
    source: "https://pristineparadisepalau.com/beyond-the-dive/",
  },
  {
    id: "resort",
    name: "泛太平洋度假村",
    category: "永續產業",
    description:
      "依計畫探討度假村永續生態園區的建立與管理。原始資料尚未提供英文名稱，不能直接推定為同名或近似名稱的飯店。",
    query: "泛太平洋度假村 帛琉",
    days: [12],
    sdgs: [11],
    confirmed: false,
  },
  {
    id: "embassy",
    name: "臺灣駐帛琉大使館",
    category: "文化歷史",
    description:
      "由交流活動理解臺灣與帛琉合作、跨文化互動與公共事務。參訪須由主辦單位安排，出發前確認最新地址及進入規範。",
    query: "Embassy Republic of China Taiwan Palau WCTC",
    days: [12],
    sdgs: [11],
    confirmed: true,
    source: "https://www.roc-taiwan.org/pal/sitemap.html",
  },
];
export const categories = [
  "全部",
  "海洋生態",
  "自然環境",
  "文化歷史",
  "永續產業",
  "市場經濟",
] as const;
export const sdgNames: Record<number, string> = {
  2: "零飢餓",
  4: "優質教育",
  11: "永續城市與社區",
  12: "責任消費與生產",
  14: "海洋生態",
  15: "陸域生態",
};
export const sdgDescriptions: Record<number, string> = {
  2: "從農技合作與食物供應，認識糧食與地方產業。",
  4: "整理田野紀錄與訪談，讓觀察轉化為共同學習。",
  11: "走入部落與城市，理解文化保存和環境治理。",
  12: "從材料、零售到旅宿，追問資源如何被使用。",
  14: "觀察海洋生態、硨磲復育與在地海洋文化。",
  15: "探索森林、紅樹林與鳥類棲地，理解生物多樣性。",
};
export const mapsUrl = (query: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

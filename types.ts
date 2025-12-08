export enum Occasion {
  BIRTHDAY = 'BIRTHDAY',
  WEDDING_ANNIVERSARY = 'WEDDING_ANNIVERSARY',
  LOVE_ANNIVERSARY = 'LOVE_ANNIVERSARY',
  RETIREMENT = 'RETIREMENT',
  CHRISTMAS = 'CHRISTMAS',
  NEW_YEAR = 'NEW_YEAR',
  DIWALI = 'DIWALI',
  PONGAL = 'PONGAL',
  OTHER = 'OTHER'
}

export interface WishData {
  sender: string;
  recipient: string;
  occasion: Occasion;
  years?: number;
}

export type AnimationType = 'confetti' | 'hearts' | 'snow' | 'sparkles' | 'bubbles';

export interface ThemeConfig {
  color: string;
  emojis: string[];
  bg: string;
  buttonBg: string;
  animation: AnimationType;
  particleColors: string[];
  accent: string;
}

export const OccasionLabels: Record<Occasion, string> = {
  [Occasion.BIRTHDAY]: 'Birthday 🎂',
  [Occasion.WEDDING_ANNIVERSARY]: 'Wedding Anniversary 💍',
  [Occasion.LOVE_ANNIVERSARY]: 'Love Anniversary ❤️',
  [Occasion.RETIREMENT]: 'Retirement 🏖️',
  [Occasion.CHRISTMAS]: 'Christmas 🎄',
  [Occasion.NEW_YEAR]: 'New Year 🎆',
  [Occasion.DIWALI]: 'Diwali 🪔',
  [Occasion.PONGAL]: 'Pongal 🌾',
  [Occasion.OTHER]: 'Just Because ✨'
};

export const OccasionTheme: Record<Occasion, ThemeConfig> = {
  [Occasion.BIRTHDAY]: { 
    color: 'text-pink-600', 
    emojis: ['🎂', '🎁', '🎈', '🎉', '🍰'], 
    bg: 'from-pink-100 via-purple-100 to-indigo-100',
    buttonBg: 'bg-gradient-to-r from-pink-500 to-rose-500',
    animation: 'confetti',
    particleColors: ['#FF69B4', '#FFD700', '#00BFFF', '#32CD32', '#FF4500'],
    accent: 'border-pink-200'
  },
  [Occasion.WEDDING_ANNIVERSARY]: { 
    color: 'text-red-600', 
    emojis: ['💍', '💒', '🍾', '❤️', '🕊️'], 
    bg: 'from-rose-50 via-red-50 to-pink-50',
    buttonBg: 'bg-gradient-to-r from-red-500 to-pink-600',
    animation: 'hearts',
    particleColors: ['#FF0000', '#FF1493', '#FF69B4', '#DC143C'],
    accent: 'border-red-200'
  },
  [Occasion.LOVE_ANNIVERSARY]: { 
    color: 'text-rose-600', 
    emojis: ['❤️', '😘', '🌹', '🧸', '💘'], 
    bg: 'from-pink-100 via-red-100 to-rose-200',
    buttonBg: 'bg-gradient-to-r from-rose-500 to-red-500',
    animation: 'hearts',
    particleColors: ['#E91E63', '#F44336', '#FF4081'],
    accent: 'border-rose-200'
  },
  [Occasion.RETIREMENT]: { 
    color: 'text-blue-600', 
    emojis: ['🏖️', '😴', '✈️', '🍹', '⛳'], 
    bg: 'from-blue-100 via-cyan-100 to-sky-200',
    buttonBg: 'bg-gradient-to-r from-blue-500 to-cyan-500',
    animation: 'bubbles',
    particleColors: ['#4FC3F7', '#B3E5FC', '#0288D1', '#FFFFFF'],
    accent: 'border-blue-200'
  },
  [Occasion.CHRISTMAS]: { 
    color: 'text-green-700', 
    emojis: ['🎄', '🎅', '❄️', '🦌', '🍪'], 
    bg: 'from-green-100 via-red-50 to-emerald-100',
    buttonBg: 'bg-gradient-to-r from-green-600 to-emerald-600',
    animation: 'snow',
    particleColors: ['#FFFFFF', '#D1F2EB', '#A3E4D7'],
    accent: 'border-green-200'
  },
  [Occasion.NEW_YEAR]: { 
    color: 'text-purple-700', 
    emojis: ['🎆', '🥂', '✨', '🕛', '🎉'], 
    bg: 'from-indigo-100 via-purple-100 to-fuchsia-100',
    buttonBg: 'bg-gradient-to-r from-purple-600 to-indigo-600',
    animation: 'sparkles',
    particleColors: ['#FFD700', '#C0C0C0', '#9370DB', '#FF00FF'],
    accent: 'border-purple-200'
  },
  [Occasion.DIWALI]: { 
    color: 'text-amber-700', 
    emojis: ['🪔', '✨', '🎆', '🍬', '🕉️'], 
    bg: 'from-orange-100 via-amber-100 to-yellow-100',
    buttonBg: 'bg-gradient-to-r from-orange-500 to-amber-500',
    animation: 'sparkles',
    particleColors: ['#FF8C00', '#FFD700', '#FF4500', '#FFA500'],
    accent: 'border-orange-200'
  },
  [Occasion.PONGAL]: { 
    color: 'text-yellow-700', 
    emojis: ['🌾', '🍯', '☀️', '🐄', '🥘'], 
    bg: 'from-yellow-100 via-orange-50 to-amber-100',
    buttonBg: 'bg-gradient-to-r from-yellow-500 to-orange-500',
    animation: 'confetti',
    particleColors: ['#FFD700', '#FFA500', '#8B4513', '#228B22'],
    accent: 'border-yellow-200'
  },
  [Occasion.OTHER]: { 
    color: 'text-violet-600', 
    emojis: ['✨', '🔥', '💃', '🚀', '🦄'], 
    bg: 'from-violet-100 via-fuchsia-100 to-pink-100',
    buttonBg: 'bg-gradient-to-r from-violet-500 to-fuchsia-500',
    animation: 'confetti',
    particleColors: ['#9400D3', '#FF00FF', '#00CED1', '#FF1493'],
    accent: 'border-violet-200'
  }
};
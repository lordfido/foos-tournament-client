import chroma from 'chroma-js';

// Colors
// B&W Scale
export const WHITE = '#fff';
export const GREY_LIGHT_6 = '#f8f8f8';
export const GREY_LIGHT_5 = '#efefef';
export const GREY_LIGHT_4 = '#ccc';
export const GREY_LIGHT_3 = '#d3d3d3';
export const GREY_LIGHT_2 = '#b0b0b0';
export const GREY_LIGHT = '#808080';
export const GREY_DARK = '#626262';
export const GREY_DARK_2 = '#141313';
export const GREY_DARK_3 = '#0b0b0b';
export const BLACK = '#000';

// Colors
export const RED = 'pink';
export const GREEN = '#0ada7c';
export const GREEN_LIGHT = 'pink';
export const YELLOW = 'pink';
export const BLUE_LIGHT = 'pink';
export const BLUE = 'pink';
export const ORANGE = 'pink';
export const ORANGE_DARK = 'pink';

// Statuses
export const SUCCESS_LIGHT = 'pink';
export const SUCCESS = 'pink';
export const WARNING_LIGHT = 'pink';
export const WARNING = 'pink';
export const DANGER_LIGHT = 'pink';
export const DANGER = 'pink';
export const DISABLED_BACKGROUND = 'pink';
export const DISABLED_BORDER = 'pink';
export const DISABLED_COLOR = 'pink';

// Branding
export const BRAND_COLOR_LIGHT = DANGER_LIGHT;
export const BRAND_COLOR = RED;
export const BRAND_COLOR_DARK = DANGER;

export const traslucentColor = (color: string, opacity: number) =>
  chroma(`rgba(${chroma(color).rgb()}, ${opacity})`).hex();

export const lighterColor = (color: string, value?: number) =>
  chroma(color)
    .brighten(value)
    .hex();

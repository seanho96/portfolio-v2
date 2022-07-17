export const hex2rgba = (hex, alpha = 1) => {
  const [r, g, b] = hex.match(/\w\w/g).map(x => parseInt(x, 16));
  return `rgba(${r},${g},${b},${alpha})`;
};

export const navDelay = 1000;
export const loaderDelay = 0;

export const KEY_CODES = {
  ARROW_LEFT: 'ArrowLeft',
  ARROW_LEFT_IE11: 'Left',
  ARROW_RIGHT: 'ArrowRight',
  ARROW_RIGHT_IE11: 'Right',
  ESCAPE: 'Escape',
  ESCAPE_IE11: 'Esc',
  TAB: 'Tab',
  SPACE: ' ',
  SPACE_IE11: 'Spacebar',
  ENTER: 'Enter',
};

export const OS_PLATFORM = {
  MACOS: 'macOS',
  WINDOWS: 'Windows',
  LINUX: 'Linux',
  ANDROID: 'Android',
  IOS: 'iOS',
}

export const getOS = () => {
  const userAgent = window.navigator.userAgent
  const platform = window.navigator?.userAgentData?.platform || window.navigator.platform
  const macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K', 'MacOS']
  const windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE']
  const iosPlatforms = ['iPhone', 'iPad', 'iPod']
  let os = null;

  if (macosPlatforms.filter((str) => str.toLowerCase().includes(platform.toLowerCase()))) {
    os = OS_PLATFORM.MACOS;
  } else if (iosPlatforms.filter((str) => str.toLowerCase().includes(platform.toLowerCase()))) {
    os = OS_PLATFORM.IOS;
  } else if (windowsPlatforms.filter((str) => str.toLowerCase().includes(platform.toLowerCase()))) {
    os = OS_PLATFORM.WINDOWS;
  } else if (/Android/i.test(userAgent)) {
    os = OS_PLATFORM.ANDROID;
  } else if (/Linux/i.test(platform)) {
    os = OS_PLATFORM.LINUX;
  }

  return os;
}
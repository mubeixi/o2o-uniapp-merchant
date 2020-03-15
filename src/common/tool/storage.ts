export const ls = {
  set(key: string, val: any) {
    // Null undefined '' 这些不让传进来了
    if (!val && (val !== 0 || val !== false)) return false;
    return window.localStorage.setItem(key, JSON.stringify(val));
  },

  get(key: string) {
    const val = window.localStorage.getItem(key);
    if (!val) return false;
    try {
      return JSON.parse(val);
    } catch (e) {
      return false;
    }
  },
  remove(key:string) {
    return window.localStorage.removeItem(key);
  },
  clear() {
    return window.localStorage.clear();
  },
};

export const ss = {
  set(key:string, val:any, req:boolean = false) {
    // Null undefined '' 这些不让传进来了
    if (!req && !val && (val != 0 || val != false)) return false;
    return window.sessionStorage.setItem(key, JSON.stringify(val));
  },

  get(key:string) {
    const val = window.sessionStorage.getItem(key);
    if (!val) return false;
    try {
      return JSON.parse(val);
    } catch (e) {
      return false;
    }
  },
  remove(key:string) {
    return window.sessionStorage.removeItem(key);
  },
  clear() {
    return window.sessionStorage.clear();
  },
};


export default { ls, ss };

export type Theme = "light" | "dark";

export const THEME_KEY = "theme";

// Inlined in <head> so a saved choice is applied before first paint and the
// page never flashes the wrong theme.
export const themeScript = `try{var t=localStorage.getItem("${THEME_KEY}");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}`;

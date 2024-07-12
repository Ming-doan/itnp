const useSystemTheme = (theme: string) => {
  if (theme === "system") {
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      return "dark";
    } else {
      return "light";
    }
  } else {
    return theme;
  }
};

export default useSystemTheme;

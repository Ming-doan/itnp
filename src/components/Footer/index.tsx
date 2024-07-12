import useStore from "../../context/appState";
import useSystemTheme from "../../hooks/useSystemTheme";

const Footer = () => {
  const theme = useStore((state) => state.theme);
  return (
    <div
      style={{
        color: useSystemTheme(theme) === "dark" ? "white" : "black",
      }}
    >
      Made with ❤️ by{" "}
      <a href="https://github.com/Ming-doan" target="_blank">
        <code>Ming-doan</code>
      </a>
    </div>
  );
};

export default Footer;

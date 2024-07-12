import React from "react";
import { ConfigProvider, theme } from "antd";
import Header from "./components/Header";
import Footer from "./components/Footer";
import EditorTabs from "./components/Editor";
import useStore from "./context/appState";
import useSystemTheme from "./hooks/useSystemTheme";

const App: React.FC = () => {
  const appTheme = useStore((state) => state.theme);

  return (
    <ConfigProvider
      theme={{
        algorithm:
          useSystemTheme(appTheme) == "dark"
            ? theme.darkAlgorithm
            : theme.defaultAlgorithm,
      }}
    >
      <main className={useSystemTheme(appTheme)}>
        <div className="wrapper">
          <Header />
          <section className={useSystemTheme(appTheme)}>
            <EditorTabs />
          </section>
          <Footer />
        </div>
      </main>
    </ConfigProvider>
  );
};

export default App;

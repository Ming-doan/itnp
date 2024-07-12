import React from "react";
import styles from "./style.module.css";
import { SettingFilled } from "@ant-design/icons";
import { Button, Popover } from "antd";
import MenuContent from "./MenuContent.tsx";
import useStore from "../../context/appState.ts";
import clsx from "clsx";
import useSystemTheme from "../../hooks/useSystemTheme.ts";

const Header: React.FC = () => {
  const theme = useStore((state) => state.theme);
  return (
    <div className={styles.header}>
      <h1 className={clsx(styles.appTitle, styles[useSystemTheme(theme)])}>
        Instance Notepad
      </h1>
      <Popover
        placement="bottomRight"
        arrow={false}
        trigger="click"
        content={<MenuContent />}
      >
        <Button type="text" icon={<SettingFilled />} />
      </Popover>
    </div>
  );
};

export default Header;

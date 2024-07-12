import { useState } from "react";
import styles from "./style.module.css";
import {
  Segmented,
  Space,
  Button,
  Modal,
  Select,
  Flex,
  Alert,
  Switch,
} from "antd";
import {
  SunOutlined,
  MoonFilled,
  LaptopOutlined,
  GlobalOutlined,
} from "@ant-design/icons";
import useStore from "../../context/appState";
import storage from "../../providers/localStorage";
import { Fragment } from "react/jsx-runtime";

const MenuContent = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const theme = useStore((state) => state.theme);
  const setTheme = useStore((state) => state.setTheme);

  function handleChangeTheme(theme: string) {
    setTheme(theme);
    storage.createOrUpdate("theme", theme);
  }

  return (
    <Fragment>
      <Space direction="vertical" className={styles.menuContent}>
        <h5>Public</h5>
        <Button
          icon={<GlobalOutlined />}
          block
          type="primary"
          onClick={() => setModalOpen(true)}
        >
          Public
        </Button>
        <h5>Theme</h5>
        <Segmented
          options={[
            { label: "Light", value: "light", icon: <SunOutlined /> },
            { label: "Dark", value: "dark", icon: <MoonFilled /> },
            { label: "System", value: "system", icon: <LaptopOutlined /> },
          ]}
          block
          value={theme}
          onChange={handleChangeTheme}
        />
      </Space>
      <Modal
        title="Select Note to Public"
        footer={[]}
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
      >
        <Flex vertical align="stretch" gap={15}>
          <Alert
            message="Sorry!, we haven't support this feature yet."
            type="warning"
            showIcon
          />
          <Select />
          <Flex align="center" gap="small">
            Allow Editting
            <Switch size="small" />
          </Flex>
          <Button type="primary">Public</Button>
        </Flex>
      </Modal>
    </Fragment>
  );
};

export default MenuContent;

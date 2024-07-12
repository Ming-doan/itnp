import React, { useCallback, useEffect, useMemo } from "react";
import { v4 as uuidv4 } from "uuid";
import type { MenuProps } from "antd";
import { Button, Dropdown, Tabs } from "antd";
import {
  CodeOutlined,
  FileMarkdownOutlined,
  FileTextOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import type { DragEndEvent } from "@dnd-kit/core";
import {
  closestCenter,
  DndContext,
  PointerSensor,
  useSensor,
} from "@dnd-kit/core";
import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import useStore from "../../context/appState";
import ConvertFromNotesToItems from "./converter";
import { NoteType } from "../../interfaces/noteInterface";
import localStorage from "../../providers/localStorage";

interface DraggableTabPaneProps extends React.HTMLAttributes<HTMLDivElement> {
  "data-node-key": string;
}

const DraggableTabNode = (props: DraggableTabPaneProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: props["data-node-key"],
    });

  const style: React.CSSProperties = {
    ...props.style,
    transform: CSS.Translate.toString(transform),
    transition,
    cursor: "move",
  };

  return React.cloneElement(props.children as React.ReactElement, {
    ref: setNodeRef,
    style,
    ...attributes,
    ...listeners,
  });
};

const EditorTabs: React.FC = () => {
  const currentNoteId = useStore((state) => state.currentNoteId);
  const setCurrentNoteId = useStore((state) => state.setCurrentNoteId);
  const notes = useStore((state) => state.notes);
  const setNotes = useStore((state) => state.setNotes);
  const addNote = useStore((state) => state.addNote);
  const sensor = useSensor(PointerSensor, {
    activationConstraint: { distance: 10 },
  });

  useEffect(() => {
    // Set title when currentNoteId change
    const currentNote = notes.find((note) => note.id === currentNoteId);
    document.title =
      ((currentNote?.title as string) || "Note") + " - Instance Notepad";
  }, [currentNoteId, notes]);

  // Update Storage when notes is changed
  useEffect(() => {
    console.log(notes);
    localStorage.createOrUpdate("data", notes);
  }, [notes]);

  const onCreatePress = useCallback(
    (type: NoteType) => {
      const _noteContent = {
        id: uuidv4(),
        content: "",
      };
      if (type === NoteType.Text) {
        addNote({
          ..._noteContent,
          title: "Untitled Text",
          type: NoteType.Text,
        });
      } else if (type === NoteType.RichText) {
        addNote({
          ..._noteContent,
          title: "Untitled Rich Text",
          type: NoteType.RichText,
        });
      } else if (type === NoteType.Code) {
        addNote({
          ..._noteContent,
          title: "Untitled Code",
          type: NoteType.Code,
          content: "[js]",
        });
      }
      setCurrentNoteId(_noteContent.id);
      localStorage.createOrUpdate("index", _noteContent.id);
    },
    [addNote, setCurrentNoteId]
  );

  const menuItems = useMemo<MenuProps["items"]>(
    () => [
      {
        key: "0",
        label: "Text",
        icon: <FileTextOutlined />,
        onClick: () => onCreatePress(NoteType.Text),
      },
      {
        key: "1",
        label: "Rich Text",
        icon: <FileMarkdownOutlined />,
        onClick: () => onCreatePress(NoteType.RichText),
      },
      {
        key: "2",
        label: "Code",
        icon: <CodeOutlined />,
        onClick: () => onCreatePress(NoteType.Code),
      },
    ],
    [onCreatePress]
  );

  const items = ConvertFromNotesToItems(notes);

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (active.id !== over?.id) {
      const activeIndex = notes.findIndex((note) => note.id === active.id);
      const overIndex = notes.findIndex((note) => note.id === over?.id);
      setNotes(arrayMove(notes, activeIndex, overIndex));
    }
  };

  return (
    <Tabs
      items={items}
      activeKey={currentNoteId}
      onChange={(id) => {
        setCurrentNoteId(id);
        localStorage.createOrUpdate("index", id);
      }}
      defaultActiveKey={currentNoteId}
      tabBarExtraContent={
        <Dropdown
          menu={{ items: menuItems }}
          trigger={["click"]}
          placement="bottomRight"
        >
          <Button
            type="text"
            icon={<PlusOutlined />}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            New Note
          </Button>
        </Dropdown>
      }
      renderTabBar={(tabBarProps, DefaultTabBar) => (
        <DndContext
          sensors={[sensor]}
          onDragEnd={onDragEnd}
          collisionDetection={closestCenter}
        >
          <SortableContext
            items={items.map((i) => i.key)}
            strategy={horizontalListSortingStrategy}
          >
            <DefaultTabBar {...tabBarProps}>
              {(node) => (
                <DraggableTabNode {...node.props} key={node.key}>
                  {node}
                </DraggableTabNode>
              )}
            </DefaultTabBar>
          </SortableContext>
        </DndContext>
      )}
    />
  );
};

export default EditorTabs;

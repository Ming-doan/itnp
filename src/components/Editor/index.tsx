import React, { useCallback, useEffect, useMemo } from "react";
import { useSearchParams, URLSearchParamsInit } from "react-router-dom";
import type { MenuProps } from "antd";
import { Button, Dropdown, Tabs } from "antd";
import { PlusOutlined } from "@ant-design/icons";
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
import ConvertFromNotesToItems from "./EditorItem.tsx";
import { NoteType } from "../../interfaces/NoteInterface.ts";
import storage from "../../providers";
import { getInitializeNoteData, getNoteTypeOptions } from "./mapper.tsx";

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
  const currentNoteIdInit = useStore((state) => state.currentNoteId);
  const setCurrentNoteId = useStore((state) => state.setCurrentNoteId);
  const notes = useStore((state) => state.notes);
  const setNotes = useStore((state) => state.setNotes);
  const addNote = useStore((state) => state.addNote);
  const sensor = useSensor(PointerSensor, {
    activationConstraint: { distance: 10 },
  });
  const [params, setSearchParams] = useSearchParams({
    id: currentNoteIdInit,
  } as URLSearchParamsInit);
  const currentNoteId = params.getAll("id")[0] || currentNoteIdInit;

  useEffect(() => {
    // Set title when currentNoteId change
    const currentNote = notes.find((note) => note.id === currentNoteId);
    document.title =
      ((currentNote?.title as string) || "Note") + " - Instance Notepad";
  }, [currentNoteId]);

  // Update Storage when notes is changed
  useEffect(() => {
    storage.createOrUpdate("data", notes);
  }, [notes]);

  const onCreatePress = useCallback(
    (type: NoteType) => {
      const note = getInitializeNoteData(type);
      addNote(note);
      setCurrentNoteId(note.id);
      storage.createOrUpdate("index", note.id);
      setSearchParams({ id: note.id });
    },
    [addNote, setCurrentNoteId]
  );

  const menuItems = useMemo<MenuProps["items"]>(
    () => getNoteTypeOptions(onCreatePress),
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
        storage.createOrUpdate("index", id);
        setSearchParams({ id });
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

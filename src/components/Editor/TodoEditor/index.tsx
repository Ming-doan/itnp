import useDebounceState from "../../../hooks/useDebounceState";
import useStore from "../../../context/appState";
import TodoEditorInterface from "../../../interfaces/TodoEditorInterface";
import { Button, Checkbox, Space } from "antd";
import { useCallback } from "react";

type TodoEditorProps = {
  id: string;
  data: TodoEditorInterface;
};
const TodoEditor: React.FC<TodoEditorProps> = ({ id, data }) => {
  // Theme value.
  // Use `useSystemTheme(theme)` to get theme string.
  const theme = useStore((state) => state.theme);

  // Update changes when edit.
  // localValue is value of field, setLocalValue used for update value.
  const updateData = useStore((state) => state.updateData);
  const [localTodo, setLocalTodo] = useDebounceState(data.todo, 500, (v) =>
    updateData(id, {
      todo: [...v],
    })
  );

  const convertTodoToOptions = useCallback(() => {
    return localTodo.map((item) => ({
      label: item.name,
      value: item.id,
    }));
  }, []);

  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <Checkbox.Group options={convertTodoToOptions()} />
      <Button
        type="primary"
        onClick={() =>
          setLocalTodo([
            ...localTodo,
            { id: localTodo.length, name: "", completed: false },
          ])
        }
      >
        Add Todo
      </Button>
    </Space>
  );
};

export default TodoEditor;

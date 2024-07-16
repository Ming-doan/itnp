interface TodoItemInterface {
  id: number;
  name: string;
  completed: boolean;
}

export default interface TodoEditorInterface {
  todo: TodoItemInterface[];
}

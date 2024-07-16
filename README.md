# Instance Notepad

Instance Notepad. Simple, no authentication required. Quick take note and save locally.

You can also public into internet for other user, 100% free (Update in future).

🚀 Deployed at Vercel. Visit [Product](https://itnp.vercel.app).

🍀 **Thanks for using my product.**

### What we offer

1. Plain Text Notepad
2. Code Notepad
3. Rich Text Notepad

### Maintainer

- Doan Quang Minh (Ming-doan)

### Maintaining document

#### Add New Editor

- Install Libraries

```bash
npm i [plugins]
```

- Add Interface for Note Data. In `src/interfaces` create new file `MyEditorInterface.ts`.

```ts
export default interface MyEditorInterface {
  // Field of data in note
}
```

- Add Component. In `src/components/Editor`, create `MyEditor` folder, create `index.tsx` inside.

```ts
import useDebounceState from "../../../hooks/useDebounceState";
import useStore from "../../../context/appState";
import useSystemTheme from "../../../hooks/useSystemTheme";
import MyEditorInterface from "../../../interfaces/MyEditorInterface";

type MyEditorProps = {
  id: string;
  data: MyEditorInterface;
};
const MyEditor: React.FC<MyEditorProps> = ({ id, data }) => {
  // Theme value.
  // Use `useSystemTheme(theme)` to get theme string.
  const theme = useStore((state) => state.theme);

  // Update changes when edit.
  // localValue is value of field, setLocalValue used for update value.
  const updateData = useStore((state) => state.updateData);
  const [localValue setLocalValue] = useDebounceState(
    data.yourFieldInInterface,
    500,
    (v) =>
      updateData(id, {
        yourFieldInInterface: v,
      })
  );

  return; // You editor component here
};

export default MyEditor;
```

- Add Enum and General Type. In `src/interfaces/NoteInterface.ts`

```ts
// Add Enum
enum NoteType {
    ...
    MyEditor
}
```

- Add editor to editor options. In `src/components/Editor/plugins.ts`.

```ts
// Import Editor
import MyEditor from "./MyEditor";

const editorOptions = [
  ...,
  {
    type: NoteType.MyEditor,
    name: "My Custom Editor",
    editor: MyEditor,
    icon: MyCustomIcon,
    initData: {
      yourFieldInInterface: ""
    }
  }
]
```

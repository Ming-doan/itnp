import React, {memo} from 'react';
import {Input, Space} from 'antd';
import useDebounceState from "../../hooks/useDebounceState.ts";
import useStore from "../../context/appState";

type TextEditorProps = {
    id: string,
    title: string,
    content: string
}
const TextEditor: React.FC<TextEditorProps> = ({ id, title, content }) => {
    const modifyTitle = useStore(state => state.modifyTitle)
    const modifyContent = useStore(state => state.modifyContent)
    const [localTitle, setLocalTitle] = useDebounceState(title, 500, (v) => modifyTitle(id, v))
    const [localContent, setLocalContent] = useDebounceState(content, 500, (v) => modifyContent(id, v))
    
    return (
        <Space direction="vertical" style={{ width: "100%" }}>
            <Input
                placeholder="Title"
                variant="filled"
                value={localTitle}
                onChange={(e) => setLocalTitle(e.target.value)}
            />
            <Input.TextArea
                showCount
                placeholder="Your note here"
                style={{
                    height: "20rem"
                }}
                value={localContent}
                onChange={(e) => setLocalContent(e.target.value)}
            />
        </Space>
    );
};

export default memo(TextEditor);
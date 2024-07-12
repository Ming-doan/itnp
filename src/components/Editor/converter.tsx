import styles from "./style.module.css"
import {useCallback} from "react";
import {Button} from "antd"
import {CloseOutlined, FileTextOutlined, FileMarkdownOutlined, CodeOutlined} from "@ant-design/icons"
import {Note, NoteType} from "../../interfaces/noteInterface";
import useStore from "../../context/appState";
import TextEditor from "./TextEditor.tsx";
import CodeEditor from "./CodeEditor.tsx";
import RichTextEditor from "./RichTextEditor.tsx";


const GetEditorByType = (type: NoteType, id: string, title: string, content: string) => {
    if (type === NoteType.Text) {
        return <TextEditor id={id} title={title} content={content}/>
    } else if (type === NoteType.RichText) {
        return <RichTextEditor id={id} title={title} content={content}/>
    } else if (type === NoteType.Code) {
        return <CodeEditor id={id} title={title} content={content}/>
    } else {
        return <div></div>
    }
}

const ConvertFromNotesToItems = (notes: Note[]) => {
    const removeNote = useStore(state => state.removeNote)
    const currentNoteId = useStore(state => state.currentNoteId);
    const setCurrentNoteId = useStore(state => state.setCurrentNoteId);

    const handleRemoveNote = useCallback((noteId: string) => {
        const noteIndex = notes.findIndex(note => note.id === noteId);
        let newCurrentNoteId = null;

        if (noteId === currentNoteId) {
            if (notes.length === 1) {
                newCurrentNoteId = null; // No tabs left
            } else if (noteIndex === notes.length - 1) {
                newCurrentNoteId = notes[noteIndex - 1].id; // Move to previous tab
            } else {
                newCurrentNoteId = notes[noteIndex + 1].id; // Move to next tab
            }
        }

        removeNote(noteId);

        if (newCurrentNoteId !== null) {
            setCurrentNoteId(newCurrentNoteId);
        }
    }, [notes, currentNoteId, removeNote, setCurrentNoteId]);

    return notes.map((note) => {
        let noteIcon = null
        if (note.type === NoteType.Text) {
            noteIcon = <FileTextOutlined/>
        } else if (note.type === NoteType.RichText) {
            noteIcon = <FileMarkdownOutlined/>
        } else if (note.type === NoteType.Code) {
            noteIcon = <CodeOutlined/>
        }
        return {
            key: note.id,
            label: (
                <span className={styles.tabLabel}>
                    {noteIcon}
                    {note.title}
                    <Button
                        size="small"
                        type="text"
                        icon={<CloseOutlined/>}
                        onClick={(e) => {
                            e.stopPropagation()
                            handleRemoveNote(note.id)
                        }}
                    />
                </span>
            ),
            children: GetEditorByType(note.type, note.id, note.title, note.content)
        }
    })
}

export default ConvertFromNotesToItems
import { useState, useMemo } from "react";
import { Container } from "react-bootstrap";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import EditNote from "./views/EditNote";
import NewNote from "./views/NewNote";
import ViewNote from "./views/ViewNote";
import NoteList from "./views/NoteList";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { v4 as uuidv4 } from "uuid";

import "./App.css";

export type Note = {
  id: string;
} & NoteData;

export type RawNote = {
  id: string;
} & RawNoteData;

export type RawNoteData = {
  title: string;
  markdown: string;
  tagIds: string[];
};

export type NoteData = {
  title: string;
  markdown: string;
  tags: Tag[];
};

export type Tag = {
  id: string;
  label: string;
};

function App() {
  const [notes, setNotes] = useLocalStorage<RawNote[]>("USER_NOTES", []);
  const [tags, setTags] = useLocalStorage<Tag[]>("USER_TAGS", []);
  const navigate = useNavigate();

  const notesWithTags = useMemo(() => {
    //    console.log(notes, "notes");

    return (
      notes &&
      notes.length > 0 &&
      notes.map((note) => {
        console.log(note);
        return {
          ...note,
          tags: tags.filter((tag) => note.tags.includes(tag.id)),
        };
      })
    );
  }, [notes, tags]);

  /** note creation */

  function createNote({ tags, ...data }: NoteData) {
    setNotes((prevNotes) => {
      return [
        ...prevNotes,
        { ...data, id: uuidv4(), tags: tags.map((tag) => tag.id) },
      ];
    });
    navigate("..");
  }

  /*** add tags */
  function onAddTag(tag: Tag) {
    setTags((prevTag) => [...prevTag, tag]);
  }

  return (
    <Container className="my-4">
      <Routes>
        <Route path="/" element={<NoteList availbleTags={tags} />} />
        <Route
          path="/new"
          element={
            <NewNote
              onSubmit={createNote}
              onAddTag={onAddTag}
              avaiableTags={tags}
            />
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/:id">
          <Route index element={<ViewNote />} />
          <Route path="edit" element={<EditNote />} />
        </Route>
      </Routes>
    </Container>
  );
}

export default App;

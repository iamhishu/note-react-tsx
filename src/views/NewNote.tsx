import React from "react";
import { NoteData, Tag } from "../App";
import NoteForm from "../components/NoteForm/NoteForm";

type NewNoteProps = {
  onSubmit: (data: NoteData) => void;
  onAddTag: (data: Tag) => void;
  avaiableTags: Tag[];
};
export default function NewNote({
  onSubmit,
  onAddTag,
  avaiableTags,
}: NewNoteProps) {
  return (
    <>
      <h1 className="mb-4">NewNote</h1>
      <div className="d-flex justify-content-center">
        {" "}
        <br />
        <NoteForm
          onSubmit={onSubmit}
          onAddTag={onAddTag}
          avaiableTags={avaiableTags}
        />
      </div>
    </>
  );
}

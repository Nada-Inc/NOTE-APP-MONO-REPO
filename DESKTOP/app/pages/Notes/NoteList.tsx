"use client";
import React from "react";
import { Caption1Strong, Divider, Body1 } from "@fluentui/react-components";

// Note List
export const NoteList = ({ notes, noteView }: any) => {
  return (
    <>
      <div className="mt-2 ml-1">
        <Caption1Strong>Your Notes</Caption1Strong>
        <Divider />
      </div>
      <div className="mt-2 ml-1 flex-col">
        {notes.length > 0 ? (
          notes.map((note: any, index: number) => (
            <div className="drawer-item p-1 rounded-md" key={note.id}>
              <Body1 onClick={() => noteView(note.id)}>
                {index + 1}. {note.title}
              </Body1>
            </div>
          ))
        ) : (
          <div className="text-gray-400 text-xs">No Notes Found...</div>
        )}
      </div>
    </>
  );
};

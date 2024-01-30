"use client";
import React, { useState } from "react";
import { Button, Body1, Body1Strong } from "@fluentui/react-components";
import Icon from "@mdi/react";
import { mdiEarth } from "@mdi/js";
import { mdiPencil } from "@mdi/js";
import { DeleteDialog } from "./DeleteDialog";
import { useDispatch } from "react-redux";
import { setIsEditValue } from "@/app/redux/slice";

interface NoteViewProps {
  notes: any[];
  id: string;
  setNoteAdded: any;
}

// Note View
export const NoteView = ({ notes, id, setNoteAdded }: NoteViewProps) => {
  const noteData = notes.filter((item: any) => item.id === id);

  let lines = noteData[0].content.split("\n");

  const dispatch = useDispatch();

  return (
    <div className="w-full ml-4">
      <div className="flex flex-row justify-between w-full">
        <div>
          <Body1Strong>{noteData[0].title}</Body1Strong>
        </div>
        <div className="flex gap-2">
          {/* <Body1>26/01/2026 Friday</Body1> */}
          <div className="flex">
            <Icon path={mdiEarth} size={0.8} />
            <Body1>English</Body1>
          </div>
        </div>
      </div>
      <div className="bg-white mt-2 p-4 rounded-md">
        <div className="flex justify-between">
          <div>
            <Body1Strong>{noteData[0].title}</Body1Strong>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={() => {
                dispatch(setIsEditValue(noteData[0]));
              }}
            >
              <Icon path={mdiPencil} size={0.8} />
              Edit
            </Button>
            <DeleteDialog
              id={id}
              setNoteAdded={(value: any) => setNoteAdded(value)}
            />
          </div>
        </div>
        <div className="text-justify mt-4">
          <div id="content">
            {lines.map((line: any, index: any) => (
              <p key={index}>{line}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

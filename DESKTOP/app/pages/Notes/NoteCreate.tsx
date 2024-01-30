"use client";
import { Body1, Body1Strong, Button } from "@fluentui/react-components";
import { mdiEarth } from "@mdi/js";
import Icon from "@mdi/react";
import React, { useState, useEffect, useRef } from "react";
import {
  useId,
  Toaster,
  useToastController,
  Toast,
  ToastTitle,
  ToastBody,
} from "@fluentui/react-components";
import Database from "tauri-plugin-sql-api";

export const NoteCreate = ({ setNoteAdded, isEditValue }: any) => {
  const [date, setDate] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  console.log(isEditValue);

  useEffect(() => {
    if (isEditValue) {
      setTitle(isEditValue.title);
      setBody(isEditValue.content);
    } else {
      setTitle("");
      setBody("");
    }
  }, [isEditValue]);

  const toasterId = useId("toaster");
  const { dispatchToast } = useToastController(toasterId);

  const _userSetNotes = async () => {
    setNoteAdded(false);
    if (title === "" || body === "") {
      notify("error");
      return;
    }
    const db = await Database.load("sqlite:test.db");

    if (isEditValue) {
      await db.execute("UPDATE notes SET title = ?, content = ? WHERE id = ?", [
        title,
        body,
        isEditValue.id,
      ]);

      notify();
      setNoteAdded(true);
      setTitle("");
      setBody("");
    } else {
      const fileName: string = Math.random()
        .toString()
        .substring(2, 10)
        .toString();
      await db.execute(`
        CREATE TABLE IF NOT EXISTS notes (
          id TEXT PRIMARY KEY,
          title TEXT,
          content TEXT
          );
        `);

      const result = await db.execute(
        "INSERT into notes (id, title, content) VALUES ($1, $2, $3)",
        [fileName, title, body]
      );

      if (result) {
        notify();
        setNoteAdded(true);
        setTitle("");
        setBody("");
      }
    }
  };

  useEffect(() => {
    const today: Date = new Date();
    setDate(today.toString().split(" GMT")[0]);
  }, []);

  const notify = (type?: any) =>
    dispatchToast(
      <Toast>
        <ToastTitle>
          {type === "error" ? "User Error" : "Note Added"}
        </ToastTitle>
        <ToastBody>
          {type === "error"
            ? "Either Title or Body is Missing"
            : "Note Added Successfully"}
        </ToastBody>
      </Toast>,
      { intent: type === "error" ? "warning" : "success" }
    );

  return (
    <div className="w-full ml-4">
      <Toaster toasterId={toasterId} />
      <div className="flex flex-row justify-between w-full">
        <div>
          <Body1Strong>{title}</Body1Strong>
        </div>
        <div className="flex gap-2">
          <Body1>{date}</Body1>
          <div className="flex">
            <Icon path={mdiEarth} size={0.8} />
            <Body1>English</Body1>
          </div>
        </div>
      </div>
      <div className="bg-white mt-2 p-4 rounded-md">
        <div className="flex justify-between">
          <div className="flex-grow">
            <input
              placeholder="Add Your Title"
              className="border-none outline-none w-full"
              onInput={(event: any) => {
                setTitle(event.target.value);
              }}
              defaultValue={isEditValue ? isEditValue.title : title}
            />
          </div>
          <div className="flex gap-2">
            <Button onClick={_userSetNotes}>
              {isEditValue ? "Update" : "Save"}
            </Button>
          </div>
        </div>
        <div className="text-justify mt-4 ">
          <textarea
            className="border-none outline-none w-full"
            placeholder="Enter Note Body"
            rows={20}
            onInput={(event: any) => {
              setBody(event.target.value);
            }}
            defaultValue={isEditValue ? isEditValue.content : body}
          />
        </div>
      </div>
    </div>
  );
};

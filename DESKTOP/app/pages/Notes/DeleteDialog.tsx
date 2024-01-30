"use client";
import React from "react";
import { Button } from "@fluentui/react-components";
import Icon from "@mdi/react";
import { mdiDelete } from "@mdi/js";
import {
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogTitle,
  DialogBody,
  DialogActions,
  DialogContent,
} from "@fluentui/react-components";
import Database from "tauri-plugin-sql-api";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { toggleState } from "@/app/redux/slice";

export const DeleteDialog = ({ id }: any) => {
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state.state.state);

  const handleDelete = async () => {
    const db = await Database.load("sqlite:test.db");
    await db.execute(`DELETE FROM notes WHERE id = ?`, [id]);
    dispatch(toggleState(!state));
  };

  return (
    <Dialog>
      <DialogTrigger disableButtonEnhancement>
        <Button>
          <Icon path={mdiDelete} size={0.8} />
          Delete
        </Button>
      </DialogTrigger>
      <DialogSurface>
        <DialogBody>
          <DialogTitle>Delete Note</DialogTitle>
          <DialogContent>
            Do You Really Want to Delete this Note? This is an unrecoverable
            action.
          </DialogContent>
          <DialogActions>
            <DialogTrigger disableButtonEnhancement>
              <Button appearance="secondary">Close</Button>
            </DialogTrigger>
            <DialogTrigger disableButtonEnhancement>
              <Button appearance="primary" onClick={handleDelete}>
                Yes, I'm sure
              </Button>
            </DialogTrigger>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};

"use client";
import React from "react";
import { Button } from "@fluentui/react-components";
import { useStyles } from "./styles";

export const ButtonComponent = ({ children, onClick, btnAppearance }: any) => {
  const styles = useStyles();
  return (
    <Button
      className={styles.button}
      onClick={onClick}
      appearance={btnAppearance}
    >
      {children}
    </Button>
  );
};

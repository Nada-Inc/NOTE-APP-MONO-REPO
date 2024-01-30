"use client";
import React from "react";
import { Input } from "@fluentui/react-components";
import { useStyles } from "./styles";

export const SearchComponent = () => {
  const styles = useStyles();
  return (
    <Input
      appearance="filled-lighter"
      className={styles.searchField}
      placeholder="Search..."
    />
  );
};

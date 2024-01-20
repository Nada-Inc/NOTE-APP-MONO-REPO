"use client";
import React from "react";
import {
  Card,
  makeStyles,
  Button,
  Input,
  Caption1Strong,
  Divider,
  Body1,
  Body1Strong,
} from "@fluentui/react-components";
import Icon from "@mdi/react";
import { mdiEarth } from "@mdi/js";
import Link from "next/link";
import { mdiPencil } from "@mdi/js";
import { mdiDelete } from "@mdi/js";

const useStyles = makeStyles({
  card: {
    height: "fit-content",
    backgroundColor: "#fdfdfd",
    color: "#000",
    marginLeft: "20px",
    marginBottom: "1rem",
  },
  fab: {
    position: "absolute",
    bottom: "1rem",
    right: "1rem",
  },
  button: {
    backgroundColor: "#fff",
    color: "#000",
    width: "50%",
  },
  searchField: {
    width: "100%",
    marginTop: "10px",
  },
  title: {},
});

export default function Notes() {
  const styles = useStyles();

  return (
    <div className="flex flex-row overflow-hidden">
      <div className="flex-col w-1/3">
        <div className="flex gap-2 justify-between">
          <Button className={styles.button}>Add New Note</Button>
          <Button className={styles.button}>Add New Todo</Button>
        </div>
        <Input
          appearance="filled-lighter"
          className={styles.searchField}
          placeholder="Search..."
        />
        <div className="mt-2 ml-1">
          <Caption1Strong>Your Notes</Caption1Strong>
          <Divider />
        </div>
        <div className="mt-2 ml-1 flex-col">
          <div className="drawer-item p-1 rounded-md">
            <Body1>1. A Note On Human Behaviour</Body1>
          </div>
          <div className="drawer-item p-1 rounded-md">
            <Body1>2. ThermoDynamics Lecture Note</Body1>
          </div>
        </div>
      </div>
      <div className="w-full ml-4">
        <div className="flex flex-row justify-between w-full">
          <div>
            <Body1Strong>A Note On Human Behaviour</Body1Strong>
          </div>
          <div className="flex gap-2">
            <Body1>26/01/2026 Friday</Body1>
            <div className="flex">
              <Icon path={mdiEarth} size={0.8} />
              <Body1>English</Body1>
            </div>
          </div>
        </div>
        <div className="bg-white mt-2 p-4 rounded-md">
          <div className="flex justify-between">
            <div>
              <Body1Strong>A Note On Human Behaviour</Body1Strong>
            </div>
            <div className="flex gap-2">
              <Button>
                <Icon path={mdiPencil} size={0.8} />
                Edit
              </Button>
              <Button>
                <Icon path={mdiDelete} size={0.8} />
                Delete
              </Button>
            </div>
          </div>
          <div className="text-justify mt-4">
            <Body1>
              Introduction: Human behavior is a complex and fascinating subject
              that encompasses a wide range of actions, thoughts, and emotions.
              Understanding human behavior is crucial in various fields,
              including psychology, sociology, anthropology, and even in
              everyday interactions. It helps us comprehend ourselves and
              others, navigate social situations, and make informed decisions.
              Factors Influencing Human Behavior: Several factors influence
              human behavior, including genetics, environment, culture, and
              individual experiences. Genetic predispositions can influence
              traits and tendencies, while the environment, including upbringing
              and social interactions, shapes behavior. Cultural norms and
              values also play a significant role in determining acceptable
              behavior within a society. Patterns and Variability: While there
              are patterns in human behavior that can be generalized, it's
              essential to acknowledge the variability among individuals. Each
              person is unique, with their own set of experiences, beliefs, and
              motivations that shape their behavior. Therefore, while
              generalizations can be useful, they should be approached with
              caution to avoid oversimplification or stereotypes. Motivations
              and Needs: Human behavior is often driven by underlying
              motivations and needs. These can include basic physiological needs
              such as food and shelter, as well as higher-level needs like
              belongingness, esteem, and self-actualization, as proposed by
              Abraham Maslow's hierarchy of needs. Understanding these
              motivations can provide insights into why people behave in certain
              ways and what drives their actions. Cognitive and Emotional
              Factors: Cognition and emotions also play significant roles in
              shaping human behavior. Cognitive processes such as perception,
              memory, and decision-making influence how individuals interpret
              and respond to the world around them. Emotions can affect behavior
              by influencing mood, motivation, and social interactions. Social
              Influences: Human behavior is deeply influenced by social factors,
              including social norms, peer pressure, and cultural expectations.
              People often conform to group norms and seek social approval,
              which can impact their behavior. Additionally, social interactions
              and relationships can significantly shape individual behavior and
              identity. Conclusion: Understanding human behavior is a
              multifaceted endeavor that requires consideration of various
              factors, including genetics, environment, culture, cognition,
              emotions, and social influences. By studying human behavior, we
              gain insights into ourselves and others, which can be applied in
              diverse fields such as psychology, sociology, education, and
              business to improve our understanding of human nature and enhance
              our interactions with others.
            </Body1>
          </div>
        </div>
      </div>
    </div>
  );
}

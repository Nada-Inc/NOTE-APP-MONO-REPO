import React from "react";
import { View, Linking, Image } from "react-native";
import { Divider, Text } from "react-native-paper";
import { styles } from "./style";
import { ScrollView } from "react-native-gesture-handler";

export default function Credits() {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <Text style={styles.heading}>Credits and Thanks</Text>
        <Divider />
        <Text style={styles.normalText}>
          We Would Like To Express Our Gratitude to Some Awesome People around
          the Globe
        </Text>
        <Text style={{ ...styles.heading, marginTop: 10 }}>Icons</Text>
        <Divider />
        <Text style={styles.normalText}>
          All the Icons Image used in this App is provided by Flaticon
        </Text>
        <Text style={{ marginTop: 10 }}>Contributors</Text>
        <Text style={{ marginTop: 10 }}>
          kerismaker:{" "}
          <Text
            onPress={() =>
              Linking.openURL("https://www.flaticon.com/authors/kerismaker")
            }
            style={styles.links}
          >
            https://www.flaticon.com/authors/kerismaker
          </Text>
        </Text>
        <Text style={{ marginTop: 6 }}>
          Darius Dan:{" "}
          <Text
            onPress={() =>
              Linking.openURL("https://www.flaticon.com/authors/darius-dan")
            }
            style={styles.links}
          >
            https://www.flaticon.com/authors/darius-dan
          </Text>
        </Text>
        <Text style={{ marginTop: 6 }}>
          Sukma Aditia :{" "}
          <Text
            onPress={() =>
              Linking.openURL("https://www.flaticon.com/authors/sukma-aditia")
            }
            style={styles.links}
          >
            https://www.flaticon.com/authors/sukma-aditia
          </Text>
        </Text>
        <Text style={{ marginTop: 6 }}>
          Famo :{" "}
          <Text
            onPress={() =>
              Linking.openURL("https://www.flaticon.com/authors/famo")
            }
            style={styles.links}
          >
            https://www.flaticon.com/authors/famo
          </Text>
        </Text>
        <Text style={{ ...styles.heading, marginTop: 10 }}>Special Thanks</Text>
        <Divider />
        <Text style={{ marginTop: 10 }}>
          Dawid Urbaniak (Native Paper Team) :{" "}
          <Text
            onPress={() => Linking.openURL("https://twitter.com/trensik")}
            style={styles.links}
          >
            https://twitter.com/trensik
          </Text>
        </Text>
        <Text style={{ marginTop: 10 }}>
          Lukewalczak (Native Paper Team) :{" "}
          <Text
            onPress={() => Linking.openURL("https://github.com/lukewalczak")}
            style={styles.links}
          >
            https://github.com/lukewalczak
          </Text>
        </Text>
        <Text style={{ marginTop: 10 }}>
          Picktogrammers :{" "}
          <Text
            onPress={() =>
              Linking.openURL("https://pictogrammers.com/library/mdi/")
            }
            style={styles.links}
          >
            https://pictogrammers.com/library/mdi/
          </Text>
        </Text>
        <Text style={{ marginTop: 10 }}>
          Vishnu A B (Nada Labs Core Team) :{" "}
          <Text
            onPress={() => Linking.openURL("https://github.com/vishnu-a-b")}
            style={styles.links}
          >
            https://github.com/vishnu-a-b
          </Text>
        </Text>
        <Text style={{ marginTop: 10, marginBottom: 10 }}>
          Fateh Farooqui (react-native-paper-dropdown ) :{" "}
          <Text
            onPress={() => Linking.openURL("https://github.com/fateh999")}
            style={styles.links}
          >
            https://github.com/fateh999
          </Text>
        </Text>

        <Text style={styles.heading}>We Love Open Source</Text>
        <Divider />

        <Text>
          This App is made Possible By various Open Source Codes and Packages.
          In the realm of ones and zeros, Guiding us through the digital, an
          enlightening spark. To the open-source community, we owe our deepest
          gratitude, For a world connected, you are the latitude.
        </Text>
      </View>
    </ScrollView>
  );
}

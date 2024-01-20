import React from "react";
import { View } from "react-native";
import { styles } from "../../credits/style";
import { Divider, Text } from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";
import { styles as style } from "../style";

export default function Privacy() {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={style.container}>
        <Text style={{ marginTop: -10, fontWeight: "bold" }}>
          Privacy Policy
        </Text>
        <Text style={styles.normalText}>Last updated: January 04, 2024</Text>
        <Text style={styles.normalText}>
          This Privacy Policy describes Our policies and procedures on the
          collection, use and disclosure of Your information when You use the
          Service and tells You about Your privacy rights and how the law
          protects You.
        </Text>
        <Text style={styles.normalText}>
          We use Your Personal data to provide and improve the Service. By using
          the Service, You agree to the collection and use of information in
          accordance with this Privacy Policy. .
        </Text>
        <Text style={{ ...styles.normalText, fontWeight: "bold" }}>
          Interpretation and Definitions
        </Text>
        <Text style={styles.normalText}>
          The words of which the initial letter is capitalized have meanings
          defined under the following conditions. The following definitions
          shall have the same meaning regardless of whether they appear in
          singular or in plural.
          {"\n"}
          {"\n"}
          Account: means a unique account created for You to access our Service
          or parts of our Service.
          {"\n"}
          {"\n"}
          Affiliate: means an entity that controls, is controlled by or is under
          common control with a party, where &quot;control&quot; means ownership
          of 50% or more of the shares, equity interest or other securities
          entitled to vote for election of directors or other managing
          authority.
          {"\n"}
          {"\n"}
          Application: refers to Note App, the software program provided by the
          Company.
          {"\n"}
          {"\n"}
          Company: (referred to as either "the Company", "We", "Us" or "Our" in
          this Agreement) refers to Note App.
          {"\n"}
          {"\n"}
          Country: refers to Kerala, India
          {"\n"}
          {"\n"}
          Device: means any device that can access the Service such as a
          computer, a cellphone or a digital tablet.
          {"\n"}
          {"\n"}
          Personal Data: is any information that relates to an identified or
          identifiable individual.
          {"\n"}
          {"\n"}
          Service: refers to the Application.
          {"\n"}
          {"\n"}
          Service Provider: means any natural or legal person who processes the
          data on behalf of the Company. It refers to third-party companies or
          individuals employed by the Company to facilitate the Service, to
          provide the Service on behalf of the Company, to perform services
          related to the Service or to assist the Company in analyzing how the
          Service is used.
          {"\n"}
          {"\n"}
          Usage Data: refers to data collected automatically, either generated
          by the use of the Service or from the Service infrastructure itself
          (for example, the duration of a page visit).
          {"\n"}
          {"\n"}
          You: means the individual accessing or using the Service, or the
          company, or other legal entity on behalf of which such individual is
          accessing or using the Service, as applicable.
          {"\n"}
          {"\n"}
          <Text style={{ ...styles.normalText, fontWeight: "bold" }}>
            Collecting and Using Your Personal Data
          </Text>
          {"\n"}
          {"\n"}
          <Text style={styles.normalText}>
            While using Our Service, We may ask You to provide Us with certain
            personally identifiable information that can be used to contact or
            identify You. Personally identifiable information may include, but
            is not limited to the first name
          </Text>
          {"\n"}
          {"\n"}
          <Text style={styles.normalText}>
            All Rights Reserved Nada Labs © 2024
          </Text>
        </Text>
      </View>
    </ScrollView>
  );
}

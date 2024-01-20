import React from "react";
import { Pressable, View, ToastAndroid, ScrollView } from "react-native";
import { Text, Avatar, Surface, Divider } from "react-native-paper";
import { styles } from "./style";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { setUserData } from "../../redux/slice";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { ImageSrc } from "../../data/imageSrc";

const AccountSettings = ({ icon, settingName }: any) => {
  const navigation: any = useNavigation();
  const dispatch = useDispatch();

  return (
    <View style={styles.settings}>
      <View style={styles.cardProfileSettingsContent}>
        <Icon
          name={icon}
          size={25}
          color={icon === "delete" ? "#ff0202bd" : "#6b6b6b"}
        />
        <Pressable
          onPress={async () => {
            if (icon === "logout") {
              await AsyncStorage.removeItem("user");
              await AsyncStorage.removeItem("last_synced");
              dispatch(setUserData(null));
              navigation.navigate("Home");
              ToastAndroid.show("Logged Out Successfully", ToastAndroid.SHORT);
            } else {
              navigation.navigate("Edit Account");
            }
          }}
        >
          <Text style={styles.settingsText}>{settingName}</Text>
        </Pressable>
      </View>
      <View style={{ alignSelf: "flex-end" }}>
        {icon != "logout" && (
          <Icon
            name={"arrow-right"}
            size={20}
            color={"#6b6b6b"}
            onPress={() => {
              navigation.navigate("Edit Account");
            }}
          />
        )}
      </View>
    </View>
  );
};

export default function Account({ navigation }: any) {
  const user: any = useSelector((state: RootState) => state.theme.userData);

  const [userName, setUserName] = React.useState("");
  const [userId, setUserId] = React.useState("");
  const [lastSynced, setLastSynced] = React.useState<any>();
  const [avatar, setAvatar] = React.useState<any>();

  const getUserAvatar = async () => {
    const user = await AsyncStorage.getItem("user");
    if (user) {
      const userString = await JSON.parse(user);
      ImageSrc.forEach((img: any) => {
        if (userString.avatarImage === img.name) {
          setAvatar(img.url);
        }
      });
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      getUserAvatar();
    }, [])
  );

  const lastSyncCheck = async () => {
    try {
      const lastSync = await AsyncStorage.getItem("last_synced");
      if (lastSync) {
        const parsedLastSync = await JSON.parse(lastSync);
        setLastSynced(parsedLastSync);
      }
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    lastSyncCheck();
  }, []);

  React.useEffect(() => {
    const getUser = async () => {
      if (user && user.userName) {
        setUserName(user.userName);
        setUserId(user.userId);
      }
    };
    getUser();
  }, [user]);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Surface style={{ ...styles.cardProfile }} elevation={0}>
          <Avatar.Image size={150} source={avatar && avatar} />
          <Text variant="titleLarge" style={styles.profileName}>
            {userName}
          </Text>
          <Text variant="bodyMedium">@{userId}</Text>
          <View style={styles.sync}>
            <Icon name={"sync"} size={25} color={"#6b6b6b"} />
            <Text style={styles.syncText}>
              Last Synced: {lastSynced && lastSynced}
            </Text>
          </View>
        </Surface>

        <Surface style={styles.cardProfileSettings} elevation={0}>
          <AccountSettings icon={"account"} settingName={userName} />
          <Divider />
          <AccountSettings icon={"ticket-account"} settingName={`@${userId}`} />
          <Divider />
          <AccountSettings
            icon={"email"}
            settingName={"youremail@whatevermail.com"}
          />
          <Divider />
          <AccountSettings icon={"eye"} settingName={"Change Password"} />
          <Divider />
          <AccountSettings icon={"logout"} settingName={"Log out"} />
        </Surface>
      </ScrollView>
    </View>
  );
}

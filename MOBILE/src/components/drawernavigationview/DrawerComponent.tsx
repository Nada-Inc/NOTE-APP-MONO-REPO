import React from "react";
import { Pressable, ToastAndroid, View } from "react-native";
import { styles } from "./style";
import Menu from "./Menu";
import {
  Text,
  Divider,
  Switch,
  Avatar,
  Icon,
  ActivityIndicator,
} from "react-native-paper";
import {
  useFocusEffect,
  useNavigation,
  useTheme,
} from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "../../../src/redux/slice";
import { RootState } from "../../redux/store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ImageSrc } from "../../data/imageSrc";

export default function DrawerComponent({ drawer }: any) {
  const dispatch = useDispatch();
  const navigation: any = useNavigation();

  const globalTheme = useSelector((state: RootState) => state.theme.value);
  const user: any = useSelector((state: RootState) => state.theme.userData);
  const isAvatarUpdate = useSelector(
    (state: RootState) => state.theme.isAvatarUpdate
  );

  const [userName, setUserName] = React.useState("");
  const [userId, setUserId] = React.useState("");
  const [isSyncing, setIsSyncing] = React.useState(false);
  const [lastSynced, setLastSynced] = React.useState<any>();
  const [avatar, setAvatar] = React.useState<any>();

  const defaultAvatar = require("../../../assets/man-avatar.png");

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

  React.useEffect(() => {
    getUserAvatar();
  }, [isAvatarUpdate]);

  React.useEffect(() => {
    const getUser = async () => {
      if (user && user.userName) {
        setUserName(user.userName);
        setUserId(user.userId);
      }
    };
    getUser();
  }, [user]);

  React.useEffect(() => {
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
    lastSyncCheck();
  }, [isSyncing]);

  const onToggleTheme = () => {
    dispatch(setTheme(globalTheme === "light" ? "dark" : "light"));
  };

  const syncNow = async () => {
    setIsSyncing(true);
    try {
      const userData = await AsyncStorage.getItem("user");
      const noteData = await AsyncStorage.getItem("notes");

      if (userData && noteData) {
        const { userId } = JSON.parse(userData);
        const notes = JSON.parse(noteData);

        const syncData = {
          userId: userId,
          notes: JSON.stringify(notes),
        };

        try {
          const response = await fetch(
            `${process.env.EXPO_PUBLIC_API_URL}/noteuser/syncnotes`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(syncData),
            }
          );

          const data = await response.json();
          const lastSynced = JSON.stringify(data.createdAt);

          if (response.ok) {
            await AsyncStorage.setItem(
              "last_synced",
              JSON.stringify(lastSynced.slice(1, 11))
            );
          } else {
            ToastAndroid.show("Sync Failed:", ToastAndroid.SHORT);
          }
        } catch (error: any) {
          ToastAndroid.show("Fetch Error:", ToastAndroid.SHORT);
        }
      }
    } catch (error: any) {
      ToastAndroid.show("Failed To Sync", ToastAndroid.SHORT);
    } finally {
      setIsSyncing(false);
      ToastAndroid.show("Synced Successfully:", ToastAndroid.SHORT);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headSection}>
        {user != null ? (
          <View style={styles.headSectionProfile}>
            <Avatar.Image size={70} source={avatar ? avatar : defaultAvatar} />
            <View>
              <Text style={styles.profileName}>{userName && userName}</Text>
              <Text style={styles.profileUserName}>@{userId}</Text>
              <Pressable onPress={() => syncNow()}>
                {isSyncing ? (
                  <View style={styles.syncnowButton}>
                    <ActivityIndicator animating={true} size={10} />
                    <Text style={{ color: "#6b6b6b" }}>Syncing</Text>
                  </View>
                ) : (
                  <View style={styles.syncnowButton}>
                    <Icon source={"cloud"} size={18} color={"#6b6b6b"} />
                    <Text variant="bodySmall" style={{ color: "#6b6b6b" }}>
                      Synced:
                      {lastSynced ? lastSynced && lastSynced : "Sync Now"}
                    </Text>
                  </View>
                )}
              </Pressable>
            </View>
          </View>
        ) : (
          <Pressable
            style={styles.headSection}
            onPress={() => {
              navigation.navigate("Login");
              drawer.current?.closeDrawer();
            }}
          >
            <Icon source={"cloud"} size={24} color={"#6b6b6b"} />
            <Text style={{ ...styles.headLineText, marginLeft: 4 }}>
              Sync With Cloud
            </Text>
          </Pressable>
        )}
      </View>
      <Divider />
      <View style={styles.menus}>
        <Menu
          iconName={"account"}
          menuTitle={"Account"}
          drawer={drawer}
          route={user != null ? "Account" : "Login"}
        />
        <Menu
          iconName={"tune-variant"}
          menuTitle={"Preferences"}
          drawer={drawer}
          route={"Preference"}
        />
        <Menu
          iconName={"account-heart"}
          menuTitle={"Credits"}
          drawer={drawer}
          route={"Credits"}
        />
      </View>
      <Divider />
      <View style={styles.quickMenus}>
        <View style={styles.quickMenu}>
          <Text style={styles.menuTitle}>Dark Theme</Text>
          <Switch
            value={globalTheme === "dark"}
            onValueChange={onToggleTheme}
          />
        </View>
        <View style={styles.quickMenu}>
          <Text style={styles.menuTitle}>RTL</Text>
          <Switch />
        </View>
      </View>
      <Divider />
      <Text style={styles.aboutText}>Version 1.0.0</Text>
    </View>
  );
}

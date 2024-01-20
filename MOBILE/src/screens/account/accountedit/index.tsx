import React from "react";
import { Pressable, ToastAndroid, View } from "react-native";
import {
  Button,
  Text,
  TextInput,
  Avatar,
  Portal,
  Dialog,
} from "react-native-paper";
import { styles } from "../style";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ImageSrc } from "../../../data/imageSrc";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { setUserAvatar } from "../../../redux/slice";

export default function AccountEdit() {
  const [avatarEdit, setIsAvatarEdit] = React.useState(false);
  const [avatarImage, setAvatarImage] = React.useState<any>();
  const [avatarImageName, setAvatarImageName] = React.useState<any>();
  const [isUpdate, setIsUpdate] = React.useState(false);

  const navigation: any = useNavigation();
  const dispatch = useDispatch();

  const getUserAvatar = async () => {
    const user = await AsyncStorage.getItem("user");
    if (user) {
      const userString = JSON.parse(user);
      ImageSrc.forEach((img: any) => {
        if (userString.avatarImage === img.name) {
          setAvatarImage(img.url);
        }
      });
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      getUserAvatar();
    }, [])
  );

  // Avatar Update
  const handlePress = (name: any) => {
    ImageSrc.map((img: any) => {
      if (name === img.name) {
        setAvatarImage(img.url);
      }
    });
    setAvatarImageName(name);
    setIsAvatarEdit(false);
    setIsUpdate(true);
  };

  // Avatar Update Handle
  const handleUpdate = async () => {
    dispatch(setUserAvatar(false));
    try {
      const user = await AsyncStorage.getItem("user");
      if (user && isUpdate) {
        const userString = await JSON.parse(user);
        const avatarImageUpdate: any = {
          ...userString,
          avatarImage: avatarImageName,
        };
        await AsyncStorage.setItem("user", JSON.stringify(avatarImageUpdate));
        dispatch(setUserAvatar(true));
      } else {
        ToastAndroid.show("Nothing to Update", ToastAndroid.SHORT);
        return;
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsUpdate(false);
      navigation.navigate("Account");
    }
  };

  const avatarDefault = require("../../../../assets/man-avatar.png");

  return (
    <View style={styles.accountEditContainer}>
      {avatarEdit && (
        <Portal>
          <Dialog
            visible={avatarEdit}
            onDismiss={() => setIsAvatarEdit(false)}
            dismissable={false}
          >
            <Dialog.Content>
              <Text variant="bodyMedium">Select An Avatar</Text>
              <View style={styles.avatarView}>
                {ImageSrc.map((image: any, index) => {
                  return (
                    <Pressable
                      key={index}
                      onPress={() => {
                        handlePress(image.name);
                      }}
                      style={{ borderRadius: 100 }}
                    >
                      <Avatar.Image size={80} source={image.url} />
                    </Pressable>
                  );
                })}
              </View>
            </Dialog.Content>
            <Dialog.Actions>
              <Button
                onPress={() => {
                  setIsAvatarEdit(false);
                }}
              >
                Cancel
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      )}
      <Pressable
        onPress={() => setIsAvatarEdit(true)}
        style={styles.avatarContainer}
      >
        <Avatar.Image
          size={150}
          source={avatarImage != undefined ? avatarImage : avatarDefault}
        />
        <View style={styles.avatarEditBadge}>
          <Text style={{ color: "#fff" }}>Edit Avatar</Text>
        </View>
      </Pressable>
      <View style={{ width: "100%", marginTop: 10 }}>
        <TextInput label="Name" mode="outlined" disabled />
        <TextInput label="Email" mode="outlined" disabled />
        <Button
          mode="contained"
          style={{ marginTop: 10, borderRadius: 10 }}
          onPress={() => handleUpdate()}
        >
          Update
        </Button>
      </View>
    </View>
  );
}

import { MaterialIcons } from "@expo/vector-icons";
import React, { useRef } from "react";
import {
  Alert,
  Animated,
  Modal,
  PanResponder,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import ThemedButton from "./ThemedButton";
import { useThemeColor } from "@/hooks/useThemeColor";

type Props = {
  openModal: boolean;
  onModalClose: () => any;
  title?: string;
  children?: React.ReactNode;
};

export default function CustomModal({
  openModal,
  onModalClose,
  title,
  children,
}: Props) {
  const pan = useRef(new Animated.ValueXY()).current;

  const backgroundColor = useThemeColor({}, "modalBackground");

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (e, gestureState) => {
      if (gestureState.dy > 0) {
        Animated.event([null, { dy: pan.y }], { useNativeDriver: false })(
          e,
          gestureState,
        );
      }
    },
    onPanResponderRelease: (e, gestureState) => {
      if (gestureState.dy > 50) {
        onModalClose();
      } else {
        Animated.spring(pan.y, {
          toValue: 0,
          tension: 1,
          friction: 20,
          useNativeDriver: true,
        }).start();
      }
    },
  });

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={openModal}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        onModalClose();
      }}
    >
      <Animated.View
        {...panResponder.panHandlers}
        style={styles(pan, backgroundColor).modalContent}
      >
        <ThemedView style={styles(pan).titleContainer}>
          <ThemedText type="subtitle">{title}</ThemedText>
          <ThemedButton
            lightColor="transparent"
            darkColor="transparent"
            onPress={onModalClose}
          >
            <MaterialIcons name="close" size={25} />
          </ThemedButton>
        </ThemedView>
        {children}
      </Animated.View>
    </Modal>
  );
}

const styles = (pan: any, backgroundColor?: string) =>
  StyleSheet.create({
    modalContent: {
      height: "80%",
      width: "100%",
      borderTopRightRadius: 18,
      borderTopLeftRadius: 18,
      position: "absolute",
      backgroundColor: backgroundColor,
      bottom: 0,
      transform: [{ translateY: pan.y }, { perspective: 1000 }],
    },
    titleContainer: {
      height: "auto",
      padding: 10,
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "transparent",
      justifyContent: "space-between",
    },
  });

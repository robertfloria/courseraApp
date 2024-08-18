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

type Props = {
  openModal: boolean;
  setOpenModal: (arg: any) => any;
  title?: string;
  children?: React.ReactNode;
};

export default function CustomModal({
  openModal,
  setOpenModal,
  title,
  children,
}: Props) {
  const pan = useRef(new Animated.ValueXY()).current;
  const onClose = () => setOpenModal(false);

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
        onClose();
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
        setOpenModal(!openModal);
      }}
    >
      <Animated.View
        {...panResponder.panHandlers}
        style={styles(pan).modalContent}
      >
        <View style={styles(pan).titleContainer}>
          <Text style={styles(pan).title}>{title}</Text>
          <Pressable onPress={onClose}>
            <MaterialIcons name="close" color="#fff" size={22} />
          </Pressable>
        </View>
        {children}
      </Animated.View>
    </Modal>
  );
}

const styles = (pan: any) =>
  StyleSheet.create({
    modalContent: {
      height: "70%",
      width: "100%",
      backgroundColor: "#25292e",
      borderTopRightRadius: 18,
      borderTopLeftRadius: 18,
      position: "absolute",
      bottom: 0,
      transform: [{ translateY: pan.y }, { perspective: 1000 }],
    },
    titleContainer: {
      height: "auto",
      padding: 10,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    title: {
      color: "#fff",
      fontSize: 16,
    },
  });

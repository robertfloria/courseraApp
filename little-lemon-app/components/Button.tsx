import * as React from "react";
import { Pressable, Text, StyleSheet } from "react-native";

type Props = React.PropsWithChildren & {
  onPress?: (arg: any) => any;
  disabled?: boolean;
};

const Button: React.FC<Props> = ({ children, onPress, disabled }) => {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.buttonWrapper, disabled && styles.disabled]}
      disabled={disabled}
    >
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  buttonWrapper: {
    borderRadius: 8,
    backgroundColor: '#495E57',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 8,
  },
  disabled: {
    backgroundColor: 'grey',
    opacity: 0.5,
  },
  text: {
    fontSize: 16,
    color: 'white',
  }
});

export default Button;

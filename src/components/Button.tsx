import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";

const Button: React.FC<
  TouchableOpacityProps & {
    isLoading?: boolean;
    title: string;
  }
> = ({ isLoading, onPress, title, style, ...otherProps }) => {
  return (
    <TouchableOpacity
      style={[style, styles.button]}
      onPress={onPress}
      disabled={isLoading}
      {...otherProps}
    >
      {!isLoading ? (
        <Text style={styles.buttonText}>{title}</Text>
      ) : (
        <ActivityIndicator color={"white"} />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#272727",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "500",
  },
});

export default Button;

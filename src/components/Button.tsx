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
    variant?: "primary" | "secondary";
    isLoading?: boolean;
    title: string;
  }
> = ({
  variant = "primary",
  isLoading,
  onPress,
  title,
  style,
  ...otherProps
}) => {
  const textColor = variant === "primary" ? "#ffffff" : "#272727";

  return (
    <TouchableOpacity
      style={[
        style,
        styles.button,
        {
          backgroundColor: variant === "primary" ? "#272727" : "#f0f0f0",
        },
      ]}
      onPress={onPress}
      disabled={isLoading}
      {...otherProps}
    >
      {!isLoading ? (
        <Text
          style={[
            styles.buttonText,
            {
              color: textColor,
            },
          ]}
        >
          {title}
        </Text>
      ) : (
        <ActivityIndicator color={textColor} />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
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

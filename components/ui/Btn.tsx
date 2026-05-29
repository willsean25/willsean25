import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { Colors, Radius, Typography } from './theme';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline';
type Size = 'sm' | 'md' | 'lg';

interface BtnProps {
  onPress?: () => void;
  title: string;
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  fullWidth?: boolean;
}

export function Btn({
  onPress,
  title,
  variant = 'primary',
  size = 'md',
  loading,
  disabled,
  style,
  textStyle,
  fullWidth,
}: BtnProps) {
  const variantStyle = styles[variant];
  const textColor = textColors[variant];
  const sizeStyle = sizeStyles[size];
  const sizeText = sizeTextStyles[size];

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.75}
      style={[
        styles.base,
        variantStyle,
        sizeStyle,
        fullWidth && styles.fullWidth,
        (disabled || loading) && styles.disabled,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'primary' ? Colors.white : Colors.primary} size="small" />
      ) : (
        <Text style={[styles.baseText, textColor, sizeText, textStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: Radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  fullWidth: { width: '100%' },
  disabled: { opacity: 0.5 },
  primary: { backgroundColor: Colors.primary },
  secondary: { backgroundColor: Colors.primaryLight },
  ghost: { backgroundColor: 'transparent' },
  danger: { backgroundColor: Colors.error },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: Colors.border,
  },
  baseText: { fontWeight: '600' },
});

const textColors: Record<Variant, TextStyle> = {
  primary: { color: Colors.white },
  secondary: { color: Colors.primaryDark },
  ghost: { color: Colors.primary },
  danger: { color: Colors.white },
  outline: { color: Colors.text },
};

const sizeStyles: Record<Size, ViewStyle> = {
  sm: { paddingHorizontal: 12, paddingVertical: 8 },
  md: { paddingHorizontal: 20, paddingVertical: 13 },
  lg: { paddingHorizontal: 28, paddingVertical: 16 },
};

const sizeTextStyles: Record<Size, TextStyle> = {
  sm: { fontSize: Typography.sm },
  md: { fontSize: Typography.base },
  lg: { fontSize: Typography.lg },
};

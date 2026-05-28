import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { Colors, Radius, Typography } from './theme';

type Color = 'green' | 'blue' | 'amber' | 'red' | 'slate' | 'purple';

const bg: Record<Color, string> = {
  green: Colors.primaryLight,
  blue: Colors.blueLight,
  amber: Colors.amberLight,
  red: Colors.roseLight,
  slate: '#f1f5f9',
  purple: Colors.purpleLight,
};

const fg: Record<Color, string> = {
  green: Colors.primaryDark,
  blue: '#1d4ed8',
  amber: '#b45309',
  red: '#be123c',
  slate: Colors.textSecondary,
  purple: '#6d28d9',
};

interface BadgeProps {
  label: string;
  color?: Color;
  style?: ViewStyle;
}

export function Badge({ label, color = 'slate', style }: BadgeProps) {
  return (
    <View style={[styles.badge, { backgroundColor: bg[color] }, style]}>
      <Text style={[styles.text, { color: fg[color] }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    borderRadius: Radius.full,
    paddingHorizontal: 10,
    paddingVertical: 3,
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: Typography.xs,
    fontWeight: '600',
  },
});

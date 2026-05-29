import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Radius, Typography } from './theme';
import { pct } from '@/lib/utils';

interface ProgressBarProps {
  value: number;
  max?: number;
  color?: string;
  height?: number;
}

export function ProgressBar({ value, max = 100, color = Colors.primary, height = 6 }: ProgressBarProps) {
  const p = pct(value, max);
  return (
    <View style={[styles.track, { height }]}>
      <View style={[styles.fill, { width: `${p}%`, backgroundColor: color, height }]} />
    </View>
  );
}

interface MacroBarProps {
  label: string;
  value: number;
  goal: number;
  color: string;
  unit?: string;
}

export function MacroBar({ label, value, goal, color, unit = 'g' }: MacroBarProps) {
  const p = pct(value, goal);
  return (
    <View style={styles.macroContainer}>
      <View style={styles.macroHeader}>
        <Text style={styles.macroLabel}>{label}</Text>
        <Text style={styles.macroValue}>
          {value}{unit} / {goal}{unit}
        </Text>
      </View>
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${p}%`, backgroundColor: color }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    backgroundColor: '#f1f5f9',
    borderRadius: Radius.full,
    overflow: 'hidden',
    height: 6,
  },
  fill: {
    height: 6,
    borderRadius: Radius.full,
  },
  macroContainer: { gap: 4 },
  macroHeader: { flexDirection: 'row', justifyContent: 'space-between' },
  macroLabel: { fontSize: Typography.xs, fontWeight: '600', color: Colors.text },
  macroValue: { fontSize: Typography.xs, color: Colors.textSecondary },
});

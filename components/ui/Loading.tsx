import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { Colors, Typography, Radius } from './theme';

export function Spinner({ size = 'small', color = Colors.primary }: { size?: 'small' | 'large'; color?: string }) {
  return <ActivityIndicator size={size} color={color} />;
}

export function AIThinking({ message = 'AI is thinking...' }: { message?: string }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.icon}>
          <Text style={styles.iconText}>🤖</Text>
        </View>
        <View>
          <Text style={styles.title}>GroceryAI</Text>
          <Text style={styles.subtitle}>{message}</Text>
        </View>
      </View>
      <ActivityIndicator color={Colors.primary} style={styles.spinner} />
      {['', '', ''].map((_, i) => (
        <View key={i} style={[styles.skeletonLine, { width: `${85 - i * 15}%` }]} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.card,
    borderRadius: Radius.xl,
    padding: 20,
    borderWidth: 1,
    borderColor: Colors.primaryLight,
    gap: 8,
  },
  header: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 8 },
  icon: {
    width: 44,
    height: 44,
    backgroundColor: Colors.primaryBg,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: { fontSize: 22 },
  title: { fontSize: Typography.base, fontWeight: '600', color: Colors.text },
  subtitle: { fontSize: Typography.sm, color: Colors.textSecondary },
  spinner: { alignSelf: 'flex-start', marginBottom: 4 },
  skeletonLine: { height: 12, backgroundColor: '#e2e8f0', borderRadius: Radius.full },
});

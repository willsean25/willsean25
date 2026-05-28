import { Tabs } from 'expo-router';
import { Text, Platform } from 'react-native';
import { Colors } from '@/components/ui/theme';

function TabIcon({ emoji, focused }: { emoji: string; focused: boolean }) {
  return <Text style={{ fontSize: focused ? 24 : 22, opacity: focused ? 1 : 0.6 }}>{emoji}</Text>;
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textMuted,
        tabBarStyle: {
          backgroundColor: Colors.card,
          borderTopColor: Colors.border,
          borderTopWidth: 1,
          paddingBottom: Platform.OS === 'ios' ? 20 : 8,
          paddingTop: 8,
          height: Platform.OS === 'ios' ? 82 : 60,
        },
        tabBarLabelStyle: { fontSize: 11, fontWeight: '600', marginTop: 2 },
      }}
    >
      <Tabs.Screen name="index" options={{ title: 'Dashboard', tabBarIcon: ({ focused }) => <TabIcon emoji="📊" focused={focused} /> }} />
      <Tabs.Screen name="meal-plan" options={{ title: 'Meal Plan', tabBarIcon: ({ focused }) => <TabIcon emoji="🗓️" focused={focused} /> }} />
      <Tabs.Screen name="grocery" options={{ title: 'Grocery', tabBarIcon: ({ focused }) => <TabIcon emoji="🛍️" focused={focused} /> }} />
      <Tabs.Screen name="navigation" options={{ title: 'Navigate', tabBarIcon: ({ focused }) => <TabIcon emoji="🗺️" focused={focused} /> }} />
      <Tabs.Screen name="recipes" options={{ title: 'Recipes', tabBarIcon: ({ focused }) => <TabIcon emoji="📥" focused={focused} /> }} />
    </Tabs>
  );
}

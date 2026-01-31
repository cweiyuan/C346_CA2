import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Button,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useState, useCallback } from 'react';
import { useEffect } from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import React from 'react';

export default function HomeScreen() {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [completionCounts, setCompletionCounts] = useState({});
  const navigation = useNavigation();

  const fetchHabits = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        'https://c346-ca2-server.onrender.com/habits'
      );
      const data = await response.json();
      setHabits(data);
      // Fetch completion counts for all habits
      const counts = {};
      await Promise.all(
        data.map(async (habit) => {
          try {
            const res = await fetch(`https://c346-ca2-server.onrender.com/habit/${habit.habit_id}/completions`);
            const d = await res.json();
            counts[habit.habit_id] = d.completion_count;
          } catch (e) {
            counts[habit.habit_id] = 0;
          }
        })
      );
      setCompletionCounts(counts);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Correct useFocusEffect (prevents glitching)
  useFocusEffect(
    useCallback(() => {
      fetchHabits();
    }, [])
  );

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.habitCard}
        activeOpacity={0.85}
        onPress={() =>
          navigation.navigate('EditHabit', { habit: item })
        }
      >
        <View style={styles.habitContent}>
          <Text style={styles.habitTitle}>{item.title}</Text>
          <Text style={styles.habitDesc}>{item.description}</Text>

          <View style={styles.habitFooter}>
            <Text style={styles.category}>📁 {item.category}</Text>
            <Text style={styles.points}>
              ⭐ {item.points_per_completion} pts
            </Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 6 }}>
            <Text style={{ fontSize: 13, color: '#4caf50', fontWeight: 'bold' }}>
              ✅ Completed: {completionCounts[item.habit_id] ?? '-'}
            </Text>
            <TouchableOpacity
              style={{ marginLeft: 10, backgroundColor: '#eee', borderRadius: 6, paddingHorizontal: 8, paddingVertical: 2 }}
              onPress={() => navigation.navigate('EditCompletion', { habit: item, currentCount: completionCounts[item.habit_id] ?? 0 })}
            >
              <Text style={{ color: '#2196F3', fontSize: 12 }}>Edit Count</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Complete button */}
        <TouchableOpacity
          style={styles.completeBtn}
          onPress={(e) => {
            e.stopPropagation(); // prevent opening Edit
            navigation.navigate('CompleteHabit', { habit: item });
          }}
        >
          <Text style={styles.completeBtnText}>Complete</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#4caf50" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={habits}
        keyExtractor={(item) => item.habit_id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
      />

      {/* ➕ Add Habit Button */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddHabit')}
      >
        <Text style={styles.addButtonText}>＋</Text>
      </TouchableOpacity>

      {/* Summary Button */}
      <View style={styles.footerButton}>
        <Button
          title="📊 Summary"
          onPress={() => navigation.navigate('Points')}
          color="#2196F3"
        />
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: 8,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingBottom: 140,
  },
  habitCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    alignItems: 'center',
    elevation: 2,
  },
  habitContent: {
    flex: 1,
    marginRight: 12,
  },
  habitTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  habitDesc: {
    fontSize: 14,
    color: '#666',
    marginVertical: 6,
  },
  habitFooter: {
    flexDirection: 'row',
    gap: 12,
  },
  category: {
    fontSize: 12,
    color: '#2196F3',
    fontWeight: '600',
  },
  points: {
    fontSize: 12,
    color: '#ff9800',
    fontWeight: '600',
  },
  completeBtn: {
    backgroundColor: '#4caf50',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  completeBtnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 13,
  },
  footerButton: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    padding: 12,
  },

  /* Floating Add Button */
  addButton: {
    position: 'absolute',
    bottom: 80,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#2196F3',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
  },
});

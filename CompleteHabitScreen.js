import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Alert, ActivityIndicator, TouchableOpacity } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

const CompleteHabitScreen = ({ route, navigation }) => {
  const [loading, setLoading] = useState(true);
  const [completed, setCompleted] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      navigation.setOptions({
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={{ color: "#2196F3", fontSize: 24, marginLeft: 10, fontWeight: "bold" }}>&lt;</Text>
          </TouchableOpacity>
        ),
      });
    }, [navigation])
  );

  if (!route.params || !route.params.habit) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No habit data received.</Text>
      </View>
    );
  }

  const { habit } = route.params;

  useEffect(() => {
    const completeHabit = async () => {
      try {
        const response = await fetch(
          "https://c346-ca2-server.onrender.com/completions",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              habit_id: habit.habit_id,
              points_earned: habit.points_per_completion,
            }),
          }
        );

        if (response.ok) {
          setCompleted(true);
          setLoading(false);
          Alert.alert(
            "✅ Success",
            `Great! You earned ${habit.points_per_completion} points!`
          );
        } else {
          setLoading(false);
          Alert.alert("❌ Error", "Failed to complete habit");
        }
      } catch (error) {
        console.error(error);
        setLoading(false);
        Alert.alert("❌ Error", "Unable to connect to server");
      }
    };

    completeHabit();
  }, []);

  if (loading && !completed) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#4caf50" />
        <Text style={styles.loadingText}>Processing...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>🎯</Text>
        </View>

        <Text style={styles.title}>Habit Completion</Text>

        <View style={styles.detailRow}>
          <Text style={styles.label}>Habit</Text>
          <Text style={styles.value}>{habit.title}</Text>
        </View>

        <View style={[styles.detailRow, { borderBottomWidth: 1, borderBottomColor: "#f0f0f0", paddingBottom: 16 }]}>
          <Text style={styles.label}>Points Earned</Text>
          <Text style={styles.pointsValue}>⭐ {habit.points_per_completion}</Text>
        </View>

        <Text style={styles.description}>{habit.description}</Text>

        <TouchableOpacity
          style={styles.continueBtn}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={styles.continueBtnText}>Back to Home</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 24,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    width: "100%",
  },
  iconContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
  icon: {
    fontSize: 48,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1a1a1a",
    textAlign: "center",
    marginBottom: 20,
  },
  detailRow: {
    marginBottom: 16,
  },
  label: {
    fontSize: 12,
    fontWeight: "600",
    color: "#999",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  value: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1a1a1a",
  },
  pointsValue: {
    fontSize: 20,
    fontWeight: "700",
    color: "#ff9800",
  },
  description: {
    fontSize: 13,
    color: "#666",
    fontStyle: "italic",
    marginTop: 12,
    marginBottom: 20,
  },
  continueBtn: {
    backgroundColor: "#4caf50",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
  },
  continueBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: "#666",
  },
  errorText: {
    fontSize: 16,
    color: "#f44336",
    fontWeight: "600",
  },
});

export default CompleteHabitScreen;

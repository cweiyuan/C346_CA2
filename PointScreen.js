import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';

const PointScreen = () => {
	const [totalPoints, setTotalPoints] = useState(0);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetchTotalPoints();
	}, []);

	const fetchTotalPoints = async () => {
		try {
			const response = await fetch(
				'https://c346-ca2-server.onrender.com/totalpoints'
			);
			const data = await response.json();
			setTotalPoints(data.total_points || 0);
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	if (loading) {
		return (
			<View style={styles.container}>
				<ActivityIndicator size="large" color="#0000ff" />
			</View>
		);
	}

	return (
		<ScrollView style={styles.container} contentContainerStyle={styles.content}>
			<View style={styles.header}>
				<Text style={styles.headerEmoji}>🏆</Text>
				<Text style={styles.headerTitle}>Your Progress</Text>
			</View>

			<View style={styles.pointsCard}>
				<Text style={styles.label}>Total Points</Text>
				<Text style={styles.points}>{totalPoints}</Text>
				<View style={styles.divider} />
				<Text style={styles.motivationText}>
					{totalPoints >= 100 ? '🌟 Amazing job!' : totalPoints >= 50 ? '💪 Keep it up!' : '🌱 Great start!'}
				</Text>
			</View>

			<View style={styles.statsContainer}>
				<View style={styles.statCard}>
					<Text style={styles.statEmoji}>⭐</Text>
					<Text style={styles.statValue}>{Math.floor(totalPoints / 10)}</Text>
					<Text style={styles.statLabel}>Habits Completed</Text>
				</View>
				<View style={styles.statCard}>
					<Text style={styles.statEmoji}>🎯</Text>
					<Text style={styles.statValue}>{totalPoints % 100}</Text>
					<Text style={styles.statLabel}>Progress to Next 100</Text>
				</View>
			</View>

			<View style={styles.infoCard}>
				<Text style={styles.infoTitle}>💡 Did you know?</Text>
				<Text style={styles.infoText}>
					Every habit you complete earns you points. Keep building sustainable habits to reach new milestones!
				</Text>
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#f5f5f5',
	},
	content: {
		padding: 20,
	},
	header: {
		alignItems: 'center',
		marginTop: 20,
		marginBottom: 30,
	},
	headerEmoji: {
		fontSize: 64,
		marginBottom: 10,
	},
	headerTitle: {
		fontSize: 28,
		fontWeight: 'bold',
		color: '#333',
	},
	pointsCard: {
		backgroundColor: '#fff',
		borderRadius: 20,
		padding: 30,
		alignItems: 'center',
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.15,
		shadowRadius: 8,
		elevation: 6,
		marginBottom: 20,
		backgroundColor: '#4CAF50',
	},
	label: {
		fontSize: 16,
		color: '#e8f5e9',
		marginBottom: 10,
		fontWeight: '600',
	},
	points: {
		fontSize: 72,
		fontWeight: 'bold',
		color: '#fff',
		marginBottom: 15,
	},
	divider: {
		width: '100%',
		height: 1,
		backgroundColor: '#81C784',
		marginVertical: 15,
	},
	motivationText: {
		fontSize: 18,
		color: '#fff',
		fontWeight: '600',
	},
	statsContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 20,
	},
	statCard: {
		backgroundColor: '#fff',
		borderRadius: 15,
		padding: 20,
		flex: 1,
		marginHorizontal: 5,
		alignItems: 'center',
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 3,
	},
	statEmoji: {
		fontSize: 32,
		marginBottom: 8,
	},
	statValue: {
		fontSize: 28,
		fontWeight: 'bold',
		color: '#333',
		marginBottom: 5,
	},
	statLabel: {
		fontSize: 11,
		color: '#666',
		textAlign: 'center',
	},
	infoCard: {
		backgroundColor: '#E3F2FD',
		borderRadius: 15,
		padding: 20,
		marginTop: 10,
	},
	infoTitle: {
		fontSize: 16,
		fontWeight: 'bold',
		color: '#1976D2',
		marginBottom: 8,
	},
	infoText: {
		fontSize: 14,
		color: '#424242',
		lineHeight: 20,
	},
});

export default PointScreen;

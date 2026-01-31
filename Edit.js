import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const Edit = () => {
	const navigation = useNavigation();
	const route = useRoute();
	const habit = route.params?.habit;
	const editCount = route.params?.editCount;
	const initialCount = route.params?.currentCount ?? 0;

	const [title, setTitle] = useState(habit?.title || '');
	const [description, setDescription] = useState(habit?.description || '');
	const [category, setCategory] = useState(habit?.category || '');
	const [points, setPoints] = useState(habit?.points_per_completion?.toString() || '10');
	const [completionCount, setCompletionCount] = useState(initialCount.toString());

	const updateHabit = async () => {
		if (!title.trim()) {
			Alert.alert('Error', 'Title is required');
			return;
		}

		const updateData = {
			title: title.trim(),
			description: description.trim() || null,
			category: category.trim() || null,
			points_per_completion: parseInt(points) || 10,
			is_active: 1,
		};

		console.log('Updating habit:', habit.habit_id);
		console.log('Update data:', updateData);

		try {
			const response = await fetch(
				`https://c346-ca2-server.onrender.com/updatehabits/${habit.habit_id}`,
				{
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(updateData),
				}
			);

			const data = await response.json();
			console.log('Response:', response.status, data);
			
			if (response.ok) {
				Alert.alert('Success', 'Habit updated successfully', [
					{ text: 'OK', onPress: () => navigation.navigate('Home') }
				]);
			} else {
				Alert.alert('Error', data.message || 'Failed to update habit');
			}
		} catch (error) {
			console.error('Error updating habit:', error);
			Alert.alert('Error', 'Unable to connect to server: ' + error.message);
		}
	};

	const deleteHabit = async () => {
  Alert.alert(
    'Delete Habit',
    'Are you sure you want to delete this habit?',
    [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            const response = await fetch(
              `https://c346-ca2-server.onrender.com/deletehabits/${habit.habit_id}`,
              { method: 'DELETE' }
            );

            if (response.ok) {
              Alert.alert('Success', 'Habit deleted successfully', [
                { text: 'OK', onPress: () => navigation.navigate('Home') }
              ]);
            } else {
              Alert.alert('Error', 'Failed to delete habit');
            }
          } catch (error) {
            console.error('Error deleting habit:', error);
            Alert.alert('Error', 'Unable to connect to server');
          }
        }
      }
    ]
  );
};


	if (!habit) {
		return (
			<View style={styles.container}>
				<Text style={styles.errorText}>No habit data found</Text>
			</View>
		);
	}

	return (
		<ScrollView style={styles.container} contentContainerStyle={styles.content}>
			<View style={styles.header}>
				<Text style={styles.headerTitle}>Edit Habit</Text>
			</View>

			<View style={styles.form}>
				{!editCount && <>
				<View style={styles.inputGroup}>
					<Text style={styles.label}>Title</Text>
					<TextInput
						style={styles.input}
						value={title}
						onChangeText={setTitle}
						placeholder="Enter habit title"
					/>
				</View>

				<View style={styles.inputGroup}>
					<Text style={styles.label}>Description</Text>
					<TextInput
						style={[styles.input, styles.textArea]}
						value={description}
						onChangeText={setDescription}
						placeholder="Enter description"
						multiline
						numberOfLines={3}
					/>
				</View>

				<View style={styles.inputGroup}>
					<Text style={styles.label}>Category</Text>
					<TextInput
						style={styles.input}
						value={category}
						onChangeText={setCategory}
						placeholder="Enter category"
					/>
				</View>

				<View style={styles.inputGroup}>
					<Text style={styles.label}>Points per Completion</Text>
					<TextInput
						style={styles.input}
						value={points}
						onChangeText={setPoints}
						placeholder="Enter points"
						keyboardType="numeric"
					/>
				</View>

				<TouchableOpacity style={styles.updateBtn} onPress={updateHabit}>
					<Text style={styles.updateBtnText}>Save Changes</Text>
				</TouchableOpacity>

				<TouchableOpacity style={styles.deleteBtn} onPress={deleteHabit}>
					<Text style={styles.deleteBtnText}>Delete Habit</Text>
				</TouchableOpacity>
				</>}
				{editCount && <>
				<View style={styles.inputGroup}>
					<Text style={styles.label}>Completion Count</Text>
					<TextInput
						style={styles.input}
						value={completionCount}
						onChangeText={setCompletionCount}
						placeholder="Enter completion count"
						keyboardType="numeric"
					/>
				</View>
				<TouchableOpacity
					style={styles.updateBtn}
					onPress={async () => {
						const newCount = parseInt(completionCount) || 0;
						try {
							const response = await fetch(`https://c346-ca2-server.onrender.com/habit/${habit.habit_id}/completions`, {
								method: 'PUT',
								headers: { 'Content-Type': 'application/json' },
								body: JSON.stringify({ new_count: newCount })
							});
							if (response.ok) {
								Alert.alert('Success', 'Completion count updated', [
									{ text: 'OK', onPress: () => navigation.navigate('Home') }
								]);
							} else {
								const data = await response.json();
								Alert.alert('Error', data.message || 'Failed to update count');
							}
						} catch (error) {
							Alert.alert('Error', 'Unable to connect to server');
						}
					}}
				>
					<Text style={styles.updateBtnText}>Save Completion Count</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.deleteBtn} onPress={() => navigation.goBack()}>
					<Text style={styles.deleteBtnText}>Cancel</Text>
				</TouchableOpacity>
				</>}
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#f8fafb',
	},
	content: {
		paddingBottom: 30,
	},
	header: {
		backgroundColor: '#fff',
		paddingTop: 40,
		paddingBottom: 16,
		paddingHorizontal: 16,
		borderBottomWidth: 1,
		borderBottomColor: '#e8e8e8',
		marginBottom: 16,
	},
	headerTitle: {
		fontSize: 24,
		fontWeight: '800',
		color: '#333',
	},
	form: {
		paddingHorizontal: 16,
	},
	inputGroup: {
		marginBottom: 20,
	},
	label: {
		fontSize: 14,
		fontWeight: '600',
		color: '#333',
		marginBottom: 8,
	},
	input: {
		backgroundColor: '#fff',
		borderWidth: 1,
		borderColor: '#ddd',
		borderRadius: 10,
		paddingHorizontal: 14,
		paddingVertical: 12,
		fontSize: 14,
		color: '#333',
	},
	textArea: {
		height: 80,
		textAlignVertical: 'top',
	},
	updateBtn: {
		backgroundColor: '#4caf50',
		paddingVertical: 14,
		borderRadius: 12,
		alignItems: 'center',
		marginTop: 10,
	},
	updateBtnText: {
		color: '#fff',
		fontSize: 16,
		fontWeight: '700',
	},
	deleteBtn: {
		backgroundColor: '#fff',
		borderWidth: 2,
		borderColor: '#f44336',
		paddingVertical: 14,
		borderRadius: 12,
		alignItems: 'center',
		marginTop: 12,
	},
	deleteBtnText: {
		color: '#f44336',
		fontSize: 16,
		fontWeight: '700',
	},
	errorText: {
		fontSize: 16,
		color: '#999',
		textAlign: 'center',
	},
});

export default Edit;

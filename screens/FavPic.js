import React, { useState, useEffect } from "react";
import {
	Text,
	StyleSheet,
	View,
	Button,
	TouchableOpacity,
	ScrollView,
	SafeAreaView,
	TextInput,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";

import nasa from "../api/nasa";
import DailyImagePlusText from "./DailyImagePlusText";

const FavPic = ({ navigation, dates }) => {
	const date = navigation.getParam("dates");

	const [results, setResults] = useState([]);

	const nasaAPODAPI = async (word) => {
		try {
			const response = await nasa.get(
				"https://api.nasa.gov/planetary/apod?api_key=hMsIEa1XtUHhbRqGrlHIXAUgQXu0LraM4SxX59az",
				{
					params: {
						date: word,
					},
				}
			);
			setResults(response.data);
		} catch (err) {
			console.log("FavPic.js problem");
		}
	};

	useEffect(() => {
		nasaAPODAPI(date);
	}, []);

	const getExplanation = () => {
		return results.explanation;
	};

	const getURL = () => {
		return results.url;
	};

	return (
		<View style={styles.container}>
			<ScrollView style={styles.scrollingBackground}>
				<DailyImagePlusText
					explanation={getExplanation()}
					dailyPicURL={getURL()}
				></DailyImagePlusText>
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 10,
		backgroundColor: "white",
	},
	scrollingBackground: {
		backgroundColor: "white",
		marginHorizontal: 10,
		marginBottom: 20,
	},
});

export default FavPic;

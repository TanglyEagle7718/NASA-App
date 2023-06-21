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
	SafeAreaView,
} from "react-native";
import { Feather } from "@expo/vector-icons";

import nasa from "../api/nasa";
import DailyImagePlusText from "./DailyImagePlusText";

const homePage = ({ navigation }) => {
	const [results, setResults] = useState([]);
	const [aDate, setADate] = useState(new Date());
	const [allStars, updateAllStars] = useState([]);
	const [input, setInput] = useState("");

	const getDate = (word) => {
		if (word == "back") {
			var yesterday = new Date(aDate - 1000 * 60 * 60 * 24 * 1);
			setADate(aDate - 1000 * 60 * 60 * 24 * 1);
			return (
				yesterday.getFullYear() +
				"-" +
				(yesterday.getMonth() + 1) +
				"-" +
				yesterday.getDate()
			);
		} else if (word == "forward") {
			var tomorrow = new Date(aDate + 1000 * 60 * 60 * 24 * 1);
			var date = new Date();
			if (tomorrow.getTime() > date.getTime()) {
				setADate(aDate);
				return "";
			}
			setADate(aDate + 1000 * 60 * 60 * 24 * 1);
			return (
				tomorrow.getFullYear() +
				"-" +
				(tomorrow.getMonth() + 1) +
				"-" +
				tomorrow.getDate()
			);
		} else if (word == "") {
			setADate(new Date());
			return (
				new Date().getFullYear() +
				"-" +
				(new Date().getMonth() + 1) +
				"-" +
				new Date().getDate()
			);
		} else {
			return word;
		}
	};

	const nasaAPODAPI = async (word) => {
		try {
			const response = await nasa.get(
				"https://api.nasa.gov/planetary/apod?api_key=hMsIEa1XtUHhbRqGrlHIXAUgQXu0LraM4SxX59az",
				{
					params: {
						date: getDate(word),
					},
				}
			);
			console.log(word);
			setResults(response.data);
		} catch (err) {
			console.log("nasaHomePage.js problem");
		}
	};

	useEffect(() => {
		nasaAPODAPI();
	}, []);

	const getExplanation = () => {
		return results.explanation;
	};

	const getURL = () => {
		return results.url;
	};

	const getTitle = () => {
		return results.title;
	};

	const getResultDate = () => {
		return results.date;
	};

	const onStar = () => {
		updateAllStars((arr) => [...allStars, getDate(aDate)]);
	};

	return (
		<View style={styles.container}>
			<View style={styles.bigButtons}>
				<TouchableOpacity
					style={{ flex: 1 }}
					onPress={() => {
						navigation.navigate("StarPage", { dates: allStars });
					}}
				>
					<Text
						style={{ textAlign: "center", fontSize: 25, fontWeight: "bold" }}
					>
						All Star
					</Text>
				</TouchableOpacity>

				<TouchableOpacity style={{ flex: 1 }} onPress={() => onStar()}>
					<Text
						style={{ textAlign: "center", fontSize: 25, fontWeight: "bold" }}
					>
						Star
					</Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={{ flex: 1 }}
					onPress={() => {
						nasaAPODAPI();
						setADate(new Date());
					}}
				>
					<Text
						style={{ textAlign: "center", fontSize: 25, fontWeight: "bold" }}
					>
						To Today
					</Text>
				</TouchableOpacity>
			</View>
			<ScrollView style={styles.scrollingBackground}>
				<View style={{ backgroundColor: "pink", flexDirection: "row" }}>
					<TouchableOpacity
						styles={{ flex: 1 }}
						onPress={() => nasaAPODAPI("back")}
					>
						<Text style={styles.arrowText}>&#8592; previous</Text>
					</TouchableOpacity>
					<View style={{ flex: 1 }}></View>
					<TouchableOpacity styles={{ flex: 1 }}>
						<Text
							style={styles.arrowText}
							onPress={() => nasaAPODAPI("forward")}
						>
							next{"  "}&#8594;
						</Text>
					</TouchableOpacity>
				</View>

				<View style={styles.searchStyle}>
					<Feather name="search" style={styles.iconStyle}></Feather>

					<TextInput
						autoCapitalize="none"
						autoCorrect={false}
						style={styles.inputStyle}
						placeholder="Date as YYYY-MM-DD"
						keyboardAppearance="dark"
						onEndEditing={(term) => {
							nasaAPODAPI(term.nativeEvent.text);

							let str = term.nativeEvent.text;
							let arr = str.split("-");
							if (arr[1].length == 1) {
								arr[1] = "0" + arr[1];
							}
							if (arr[2].length == 1) {
								arr[2] = "0" + arr[2];
							}
							str = arr[0] + "-" + arr[1] + "-" + arr[2];

							setADate(Date.parse(str));
						}}
					></TextInput>
				</View>
				<View>
					<Text style={{ textAlign: "center", fontSize: 20 }}>
						{getResultDate()}
					</Text>
				</View>
				<DailyImagePlusText
					explanation={getExplanation()}
					dailyPicURL={getURL()}
					// date={getDate(aDate)}
				></DailyImagePlusText>
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	text: {
		fontSize: 30,
	},
	bigButtons: {
		backgroundColor: "white",
		flexDirection: "row",
		backgroundColor: "pink",
	},
	container: {
		flex: 1,
		paddingTop: 10,
		backgroundColor: "white",
		backgroundColor: "pink",
	},
	searchStyle: {
		marginTop: 10, //moves the search bar down from the title
		backgroundColor: "white", //grey color
		height: 50,
		borderRadius: 5,
		marginHorizontal: 1, //moves the text over
		flexDirection: "row",
	},
	arrowText: {
		fontSize: 25,
		fontWeight: "bold",
	},
	scrollingBackground: {
		backgroundColor: "pink",
		marginHorizontal: 10,
		marginBottom: 20,
	},
	buttonBackground: {
		backgroundColor: "red",
		flex: 1,
	},
	inputStyle: {
		fontSize: 20,
		flex: 1, //takes up the whole input
	},
	iconStyle: {
		//at the bottom in the stylesheet
		fontSize: 25,
		alignSelf: "center",
		marginHorizontal: 5,
	},
});

export default homePage;

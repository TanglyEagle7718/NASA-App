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
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

import nasa from "../api/nasa";

const StarPage = ({ navigation, dates }) => {
	const date = navigation.getParam("dates");
	const [clicked, setClicked] = useState(0);
	const [results, setResults] = useState([]);

	const uniquete = () => {
		let asdf = date.sort();
		asdf = asdf.reverse();
		return asdf.reduce(function (a, b) {
			if (a.indexOf(b) < 0) a.push(b);
			return a;
		}, []);
	};

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
			setResults(response.data);
		} catch (err) {
			console.log("StarPage.js problem");
		}
	};

	useEffect(() => {
		nasaAPODAPI();
	}, []);

	const turnIntoDate = (word) => {
		let date = new Date(word);
		return (
			date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
		);
	};

	const remove = (theDate) => {
		var i = 0;
		while (i < date.length) {
			if (date[i] === theDate) {
				date.splice(i, 1);
			} else {
				++i;
			}
		}
		return date;
	};

	return (
		<View style={styles.container}>
			{uniquete().length == 0 && (
				<View
					style={{
						justifyContent: "center",
					}}
				>
					<Text style={{ textAlign: "center" }}>None Starred Yet</Text>
				</View>
			)}

			<FlatList
				keyExtractor={(item) => turnIntoDate(item)}
				data={uniquete()}
				vertical
				renderItem={({ item }) => {
					return (
						<View style={(styles.container, { flexDirection: "row" })}>
							<TouchableOpacity
								style={styles.button}
								onPress={() => {
									navigation.navigate("FavPic", { dates: turnIntoDate(item) });
								}}
							>
								<Text style={styles.text}>
									{turnIntoDate(item)}
									<AntDesign
										style={{ paddingLeft: 10 }}
										name="arrowright"
										size={24}
										color="black"
									/>
								</Text>
							</TouchableOpacity>
							<View style={{ flex: 1 }}></View>
							<TouchableOpacity
								style={styles.button}
								onPress={() => {
									if (clicked > 4) {
										setClicked(0);
									} else {
										setClicked(clicked + 1);
									}
									remove(item);
								}}
							>
								<Feather
									style={{ paddingRight: 10 }}
									name="x-circle"
									size={24}
									color="black"
								/>
							</TouchableOpacity>
						</View>
					);
				}}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 10,
		backgroundColor: "white",
		flexDirection: "column",
	},
	button: {
		backgroundColor: "white",
		overlayColor: "blue",
	},
	text: {
		fontSize: 30,
		paddingLeft: 10,
	},
});

export default StarPage;

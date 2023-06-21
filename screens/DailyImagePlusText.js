import React from "react";
import {
	View,
	Text,
	StyleSheet,
	FlatList,
	ScrollView,
	Image,
	ListItem,
	TouchableOpacity,
} from "react-native";
import { withNavigation } from "react-navigation";
import nasa from "../api/nasa";

const DailyImagePlusText = ({ explanation, dailyPicURL, date }) => {
	return (
		<View style={styles.container}>
			<Image style={styles.image} source={{ uri: dailyPicURL }} />
			<View style={styles.textBox}>
				<Text style={styles.titleStyle}>{date}</Text>
				<Text style={styles.textStyle}>{explanation}</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: "grey",
		justifyContent: "space-between",
	},
	textBox: {
		backgroundColor: "#ADD8E6",
		justifyContent: "space-between",
		borderWidth: 5,
		borderColor: "grey",
	},
	textStyle: {
		fontSize: 20,
		textAlign: "justify",
	},
	titleStyle: {
		fontSize: 20,
		textAlign: "center",
	},
	image: {
		height: null,
		width: null,
		aspectRatio: 1,
		resizeMode: "contain",
	},
});

export default withNavigation(DailyImagePlusText);

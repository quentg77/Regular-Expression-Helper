import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Dimensions, StatusBar } from "react-native";
import { Text, TextInput, Button } from 'react-native-paper';
import styled from 'styled-components';

const MatchListComponent = ({ matchList }) => {
	return (
		<MatchListContainer>
			{matchList.map(item => {
				return <MatchBlock key={item.index}>
					<Text style={styles.matchedText}>{item.text}</Text>
					<Text style={styles.matchedIndex}>Find at index {item.index} to {item.lastIndex}</Text>
				</MatchBlock>
			})}
		</MatchListContainer>
	)
}

export default function Screen() {
	StatusBar.setHidden(true);

	const [RegExpEntrie, setRegExpEntrie] = useState(null);
	const [ExempleTextEntrie, setExempleTextEntrie] = useState(null);
	const [matchList, setMatchList] = useState([]);

	useEffect(() => {
		console.log('text change : ' + RegExpEntrie);
	}, [RegExpEntrie])

	const runRegexp = () => {
		const reg = new RegExp(RegExpEntrie, "g");

		let resList = [];

		while ((match = reg.exec(ExempleTextEntrie)) !== null) {
			console.log(match.index + ' ' + reg.lastIndex);
			resList.push({
				text: match[0],
				index: match.index,
				lastIndex: reg.lastIndex
			});
		}

		setMatchList(resList);
	}

	return (
		<Container>
			<RegEntContainer>
				<RegEntBlock>
					<Text style={styles.bigGreyText}>/</Text>
					<TextInput
						label='RegExp'
						mode='outlined'
						value={RegExpEntrie}
						onChangeText={text => setRegExpEntrie(text)}
						style={styles.inputReg}
					/>
					<Text style={styles.bigGreyText}>/g</Text>
				</RegEntBlock>
			</RegEntContainer>

			<ExempleTextContainer>
				<TextInput
					label='ExempleText'
					mode='outlined'
					multiline={true}
					value={ExempleTextEntrie}
					onChangeText={text => setExempleTextEntrie(text)}
					style={styles.inputExText}
				/>
			</ExempleTextContainer>
			<Button
				mode="contained"
				style={styles.buttonRun}
				onPress={() => runRegexp()}
			>
				RUN
			</Button>

			<MatchListComponent matchList={matchList} />
		</Container>
	);
}

const getPercentHeight = (nb) => {
	return (Math.floor(Dimensions.get('window').height * nb) / 100);
}

const getPercentWidth = (nb) => {
	return (Math.floor(Dimensions.get('window').width * nb) / 100);
}

const Container = styled.View`
	flex: 1;
	align-items: center;
`

const RegEntContainer = styled.View`
	height: ${getPercentHeight(20)};
	width: ${getPercentWidth(80)};
`

const ExempleTextContainer = styled.View`
	height: ${getPercentHeight(20)};
	width: ${getPercentWidth(80)};
`

const MatchListContainer = styled.View`
	width: ${getPercentWidth(100)};
`

const RegEntBlock = styled.View`
	flex: 1;
	flex-direction: row;
	justify-content: center;
	align-items: center;
`

const MatchBlock = styled.View`
	padding: 5px;
	border-top-width: 1px;
	border-top-color: lightgrey;
	background-color: #F8F8FF;
`

const styles = StyleSheet.create({
	inputReg: {
		margin: 5,
		height: 60,
		width: 200
	},
	inputExText: {
		height: getPercentHeight(20),
		width: getPercentWidth(80)
	},
	buttonRun: {
		margin: 10,
		height: 40,
		width: 90
	},
	bigGreyText: {
		margin: 5,
		fontSize: 30,
		color: "grey"
	},
	matchedText: {
		marginLeft: 10,
		fontSize: 26,
		color: "#202020"
	},
	matchedIndex: {
		marginLeft: 10,
		fontSize: 18,
		color: "darkgrey"
	}
})

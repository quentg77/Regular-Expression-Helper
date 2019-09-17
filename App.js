import * as React from 'react';
import { AppRegistry, ScrollView } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import App from './src';

export default function Main() {
	return (
		<PaperProvider>
			<ScrollView>
				<App />
			</ScrollView>
		</PaperProvider>
	);
}

AppRegistry.registerComponent('main', () => Main);
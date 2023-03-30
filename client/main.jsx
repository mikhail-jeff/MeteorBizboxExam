import React from 'react';
import { createRoot } from 'react-dom/client';
import { Meteor } from 'meteor/meteor';
import App from '/imports/ui/App';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

Meteor.startup(() => {
	const container = document.getElementById('react-target');
	const root = createRoot(container);
	root.render(
		<MuiThemeProvider>
			<App />
		</MuiThemeProvider>
	);
});

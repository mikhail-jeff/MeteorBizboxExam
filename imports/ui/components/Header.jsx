import React, { Component } from 'react';

const styles = {
	headerStyle: {
		color: '#000',
	},
};

export default class Header extends Component {
	render() {
		const { todos } = this.props;

		return (
			<header>
				<h1 style={styles.headerStyle}>Todo ({todos.length})</h1>
			</header>
		);
	}
}

import React, { useState } from "react";

const LIST_SIZE = 10000;

function App() {
	const [ input, setInput ] = useState('');
	const [ list, setList ] = useState([]);

	const handleInputChange = (e) => {
		const newInput = e.target.value;

		setInput(newInput);

		const newList = [];
		for (let i = 0; i < LIST_SIZE; i++) {
			newList.push(newInput);
		}

		setList(newList);
	}

	return (
		<div>
			<input type="text" onChange={ handleInputChange } value={ input }/>

			<ul>
				{ list.map((item, index) => (
					<li key={index}>{ item }</li>
				)) }
			</ul>
		</div>
	);
}

export default App;

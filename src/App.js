import React, { useEffect, useState, useTransition } from "react";

const LIST_SIZE = 10000;

function DeferredList({ input }) {
	const list = [];

	for (let i = 0; i < LIST_SIZE; i++) {
		list.push(<li key={ i }>{ input }</li>);
	}

	return (
		<ul>
			{list}
		</ul>
	)
}

function App() {
	const [ input, setInput ] = useState('');
	const [ list, setList ] = useState([]);
	const [ isTransitionPending, startTransition ] = useTransition();

	const handleInputChange = (e) => {
		console.log('handler fired');

		const newInput = e.target.value;
		// high priority update - will be done immediately
		setInput(newInput);

		// low priority update - will be postponed if new high priority update is pending
		startTransition(() => {
			console.log('transition fired');

			const newList = [];
			for (let i = 0; i < LIST_SIZE; i++) {
				newList.push(newInput);
			}
			setList(newList);
		})
	}

	useEffect(() => {
		console.log(`transition is pending: ${ isTransitionPending }`);
	}, [ isTransitionPending ]);

	useEffect(() => {
		console.log('transition is finished');
	}, [ list ]);

	return (
		<div>
			<input type="text" onChange={ handleInputChange } value={ input }/>

			{/*<ul>*/}
			{/*	{ isTransitionPending ? (*/}
			{/*		<p>Transition is pending...</p>*/}
			{/*	) : ( list.map((item, index) => (*/}
			{/*		<li key={ index }>{ item }</li>*/}
			{/*	)) ) }*/}
			{/*</ul>*/}

			<DeferredList input={input} />
		</div>
	);
}

export default App;

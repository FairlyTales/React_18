import React, { useDeferredValue, useEffect, useMemo, useState, useTransition } from "react";

const LIST_SIZE = 10000;

function DeferredList({ input }) {
	// marks this value updates as low priority and defers the updates if there are high priority updates pending
	const deferredInput = useDeferredValue(input);

	useEffect(() => {
		console.log(`input: ${ input }`);
		console.log(`deferredInput: ${ deferredInput }`);
	}, [ input, deferredInput ]);


	return useMemo(() => {
		const newList = [];

		for (let i = 0; i < LIST_SIZE; i++) {
			newList.push(<li key={ i }>{ deferredInput }</li>);
		}

		return (
			<ul>
				{ newList }
			</ul>
		)
	}, [ deferredInput ]);
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

			{/*<ul>*/ }
			{/*	{ isTransitionPending ? (*/ }
			{/*		<p>Transition is pending...</p>*/ }
			{/*	) : ( list.map((item, index) => (*/ }
			{/*		<li key={ index }>{ item }</li>*/ }
			{/*	)) ) }*/ }
			{/*</ul>*/ }

			<DeferredList input={ input }/>
		</div>
	);
}

export default App;

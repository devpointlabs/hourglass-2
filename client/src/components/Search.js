import React, { useState, useEffect } from 'react';
import { List, Item, ItemHeader, ItemDescription, Divider, Input } from 'semantic-ui-react';
import axios from 'axios';

const Search = (props) => {
	const [searchObj, setSearchObj] = useState({isLoading: false, results: [], value: ""});

	useEffect(() => {
		console.log("value: ", searchObj.value);
		const search = searchObj.value;
		axios.get('/api/users', {params: {search}})
			.then(res => {
				setSearchObj({...searchObj, results: res.data});
			})
			.catch(err => {
				console.log(err);
			})
	},[searchObj.isLoading]);

	const handleValueChange = (e) => {
		setSearchObj({...searchObj, isLoading: !searchObj.isLoading, value: e.target.value})
	}

	return(
		<>
			<Input
				placeholder="search"
				name="search"
				value={searchObj.value}
				onChange={handleValueChange}
			></Input>
			<Divider hidden />
			<List>
				{searchObj.results.map(res => {
					return <Item key={res.id}>
						<ItemHeader>{res.first_name + " " + res.last_name}</ItemHeader>
						<ItemDescription>{res.nickname}</ItemDescription>
					</Item>
				})}
			</List>
		</>
	)
}

export default Search;
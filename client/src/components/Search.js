import React, { useState, useEffect } from 'react';
import { List, Item, ItemHeader, ItemDescription, Divider, Input, Dropdown } from 'semantic-ui-react';
import axios from 'axios';

const Search = (props) => {
	const defaultState = {isLoading: false, results: [], value: ""};
	const [searchObj, setSearchObj] = useState(defaultState);
	useEffect(() => {
		const search = searchObj.value;
		const current = props.current ? props.current.map(u => u.id) : null;
		// console.log("value: ", search, current);
		axios.get(`/api/${props.type}`, {params: {search, current}})
			.then(res => {
				var results = res.data ? res.data : [];
				setSearchObj({...searchObj, results: results});
			})
			.catch(err => {
				console.log(err);
			})
	},[searchObj.isLoading]);

	const handleValueChange = (e) => {
		setSearchObj({...searchObj, isLoading: !searchObj.isLoading, value: e.target.value})
	}
	const handleChange = (e) => {
		console.log("Toggled!");
		var choice = {};
		const options = getOptions();
		for(var i =0; i < options.length; i++) {
			if(options[i].id  === parseInt(e.currentTarget.id)) {
				choice = options[i].object;
			}
		}
		console.log("adding...", choice);
		props.add(choice);
		setSearchObj(defaultState);
	}

	const getOptions = () => {
		let i =0;
		const o = searchObj.results.map(res => {
			i++;
			return {id: res.id, key: res.id, value: i, text: res.first_name + " " + res.last_name, object: res};
		});
		return o;
		// const options = [
		// 	{key: 1, value: 1, text: "Griffite"},
		// 	{key: 2, value: 2, text: "Griffite Begoban"},
		// 	{key: 3, value: 3, text: "Griffite Begoban Chidori"},
		// ];
		// return options;
	}

	return(
		<>
			{
				searchObj.results !== null ?
					<Dropdown
						placeholder='Assign User'
						fluid
						search
						searchQuery={searchObj.value}
						onSearchChange={handleValueChange}
						onChange={handleChange}
						selection
						options={getOptions()}
					/>
				:
					null
			}
		</>
	)
}

export default Search;
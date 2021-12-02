import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { NativeSelect, FormControl } from '@material-ui/core'

import styles from './Country.module.css'

const Country = ({ setCountry }) => {

	const { isLoading, data } = useQuery('countries', () => fetch('https://covid19.mathdro.id/api/countries').then(res => res.json()), {
		refetchOnWindowFocus: false
	})
	
	if (isLoading) return <div>Loading...</div>

	const { countries } = data

	return (
		<FormControl className={styles.formControl}>
			<NativeSelect onChange={e => setCountry(e.target.value)}>
				<option value=''>Global</option>
				{countries.map(({ name }, i) => <option key={i} value={name}>{name}</option>)}
			</NativeSelect>
		</FormControl>
	)
}

export default Country
import React, { useState } from 'react'
import { useQuery } from 'react-query'

import { Cards, Charts, Country } from './components'

import styles from './App.module.css'

import covid from './images/image.png'

const App = () => {

	const [country, setCountry] = useState()

	const { isLoading, data: globalData } = useQuery('globalData', () => fetch('https://covid19.mathdro.id/api').then(res => res.json()))

	const { isLoading: countryLoading, data: countryData } = useQuery(
		['countryData', country],
		() => fetch(`https://covid19.mathdro.id/api/countries/${country}`).then(res => res.json()),
		{ enabled: !!country, refetchOnWindowFocus: false }
	)

	if (isLoading) return <div>Loading...</div>

	if (countryLoading) return <div>Loading...</div>

	return (
		<div className={styles.container}>
			<img src={covid} alt="" className={styles.image}/>
			{country ? <Cards data={countryData}/> : <Cards data={globalData}/>}
			<Country setCountry={setCountry} />
			{country ? <Charts countryData={countryData} country={country}/> : <Charts />}
		</div>
	)
}

export default App

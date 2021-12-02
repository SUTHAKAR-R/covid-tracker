import React from 'react'
import { useQuery } from 'react-query'
import { Line, Bar } from 'react-chartjs-2'
import styles from './Charts.module.css'

const Charts = ({ countryData, country }) => {

	console.log(country)

	const { isLoading, data } = useQuery('charts', () => fetch('https://covid19.mathdro.id/api/daily').then(res => res.json()), {
		refetchOnWindowFocus: false
	})
	
	if (isLoading) return <div>Loading...</div>

	let dailyData = []
	dailyData = data.map(day => ({
		confirmed: day.confirmed.total,
		deaths: day.deaths.total,
		date: day.reportDate
	}))
	
	return (
		<div className={styles.container}>
			{country ? (
				<Bar 
					data={{
						labels: ['Infected', 'Recovered', 'Deaths'],
						datasets: [{
							label: 'People',
							backgroundColor: ['rgba(0, 0, 255, 0.5)', 'rgba(0, 255, 0, 0.5)', 'rgba(255, 0, 0, 0.5)'],
							data: [countryData.confirmed.value, countryData.recovered.value, countryData.deaths.value]
						}]
					}}
					options={{
						legend: { display: false },
						title: { display: true , text: `Current state in ${country}`}
					}}
				/>
			) : (
				<Line
					data={{
						labels: dailyData.map(({ date }) => date),
						datasets: [{
							data: dailyData.map(({ confirmed }) => confirmed),
							label: 'Infected',
							borderColor: '#3333ff',
							fill: true
						}, {
							data: dailyData.map(({ deaths }) => deaths),
							label: 'Deaths',
							borderColor: 'red',
							fill: true,
							backgroundColor: 'rgba(255, 0, 0, 0.5)'
						}]
					}}
				/>
			)}
		</div>
	)
}

export default Charts
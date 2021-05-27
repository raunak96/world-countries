import axios from "axios";
import { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import styles from "./Country.module.css";

const getCountry = async id => {
	const { data: country } = await axios.get(
		`https://restcountries.eu/rest/v2/alpha/${id}`
	);

	return country;
};

const Country = ({ country }) => {
	const [neighbors, setNeighbors] = useState([]);

	useEffect(() => {
		const getBorders = async () => {
			const borders = await Promise.all(
				country.borders.map(border => getCountry(border))
			);
			setNeighbors(borders);
		};

		getBorders();
	}, []);

	return (
		<Layout title={country.name}>
			<div className={styles.container}>
				<div className={styles.overviewPanel}>
					<img src={country.flag} alt={`Flag of ${country.name}`} />

					<h1 className={styles.name}>{country.name}</h1>
					<div className={styles.region}>{country.region}</div>

					<div className={styles.stats}>
						<div className={styles.population}>
							<div className={styles.value}>
								{country.population}
							</div>
							<div className={styles.label}>Population</div>
						</div>
						<div className={styles.area}>
							<div className={styles.value}>{country.area}</div>
							<div className={styles.label}>Area</div>
						</div>
					</div>
				</div>

				<div className={styles.detailsPanel}>
					<h4 className={styles.header}>Details</h4>
					<div className={styles.row}>
						<div className={styles.col_label}>Capital</div>
						<div className={styles.col_value}>
							{country.capital}
						</div>
					</div>
					<div className={styles.row}>
						<div className={styles.col_label}>Languages</div>
						<div className={styles.col_value}>
							{country.languages
								.map(({ name }) => name)
								.join(", ")}
						</div>
					</div>
					<div className={styles.row}>
						<div className={styles.col_label}>Currencies</div>
						<div className={styles.col_value}>
							{country.currencies
								.map(
									({ name, symbol }) => `${name} (${symbol})`
								)
								.join(", ")}
						</div>
					</div>
					<div className={styles.row}>
						<div className={styles.col_label}>Native Name</div>
						<div className={styles.col_value}>
							{country.nativeName}
						</div>
					</div>
					<div className={styles.row}>
						<div className={styles.col_label}>Gini</div>
						<div className={styles.col_value}>{country.gini} %</div>
					</div>
					<div className={styles.neighborsSection}>
						<div className={styles.neighbors_label}>
							Neighbouring Countries
						</div>
						<div className={styles.neighborsContainer}>
							{neighbors.map(({ flag, name, alpha3Code }) => (
								<div
									className={styles.neighbor}
									key={alpha3Code}>
									<img src={flag} alt={name} />
									<div className={styles.neighborName}>
										{name}
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default Country;

export const getStaticPaths = async () => {
	const { data: countries } = await axios.get(
		"https://restcountries.eu/rest/v2/all"
	);
	const paths = countries.map(({ alpha3Code }) => ({
		params: { id: alpha3Code },
	}));
	return {
		paths,
		fallback: false,
	};
};

export const getStaticProps = async ({ params }) => {
	const country = await getCountry(params.id);
	return { props: { country } };
};

import axios from "axios";
import { useMemo, useState } from "react";
import CountriesTable from "../components/CountriesTable/CountriesTable";
import Layout from "../components/Layout/Layout";
import SearchInput from "../components/SearchInput/SearchInput";
import styles from "../styles/Home.module.css";

export default function Home({ countries }) {
	const [input, setInput] = useState("");

	const handleChange = e => {
		setInput(e.target.value);
	};

	const filteredCountries = useMemo(
		() =>
			countries.filter(
				country =>
					country.name.toLowerCase().includes(input.toLowerCase()) ||
					country.region
						.toLowerCase()
						.includes(input.toLowerCase()) ||
					country.subregion
						.toLowerCase()
						.includes(input.toLowerCase())
			),
		[input, countries]
	);
	return (
		<Layout>
			<div className={styles.stats}>
				<span>Total {countries.length} countries</span>
				{countries.length !== filteredCountries.length && (
					<span>{filteredCountries.length} Countries Found</span>
				)}
			</div>
			<SearchInput
				placeholder="Filter by Name, Region or SubRegion"
				onChange={handleChange}
			/>
			<CountriesTable countries={filteredCountries} />
		</Layout>
	);
}

export const getStaticProps = async () => {
	const { data: countries } = await axios.get(
		"https://restcountries.eu/rest/v2/all"
	);

	return {
		props: { countries },
	};
};

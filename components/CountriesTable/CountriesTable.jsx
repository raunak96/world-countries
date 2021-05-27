import Link from "next/link";
import Image from "next/image";
import styles from "./CountriesTable.module.css";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import { useCallback, useEffect, useReducer } from "react";

const init = initialState => ({
	sortOrder: null,
	sortBy: null,
	sortedCountries: initialState,
});

const sortCountries = (countries, sortOrder, sortBy) => {
	if (!sortOrder || !sortBy) return countries;
	const sortModifier = sortOrder === "desc" ? -1 : 1;

	return [...countries].sort((a, b) =>
		a[sortBy] > b[sortBy] ? 1 * sortModifier : -1 * sortModifier
	);
};

const reducer = (state, action) => {
	switch (action.type) {
		case "desc":
		case "asc":
			return {
				...state,
				sortOrder: action.type,
				sortBy: action.payload,
				sortedCountries: sortCountries(
					state.sortedCountries,
					action.type,
					action.payload
				),
			};
		case "countryFilter":
			return {
				...state,
				sortedCountries: sortCountries(
					action.payload,
					state.sortOrder,
					state.sortBy
				),
			};
		case "reset":
			return init(action.payload);
		default:
			return state;
	}
};

const CountriesTable = ({ countries }) => {
	const [state, dispatch] = useReducer(reducer, countries, init);

	const { sortOrder, sortBy, sortedCountries } = state;

	const changeSortOrder = value => {
		!sortOrder || sortOrder === "desc"
			? dispatch({ type: "asc", payload: value })
			: dispatch({ type: "desc", payload: value });
	};

	useEffect(
		() => dispatch({ type: "countryFilter", payload: countries }),
		[countries]
	);

	const sortArrowClasses = useCallback(
		direction =>
			`${direction === "asc" && styles.upArrow} ${
				direction === "desc" && styles.downArrow
			}`,
		[]
	);

	return (
		<>
			<div className={styles.header}>
				<div className={styles.header_flag} />
				<button
					className={styles.header_name}
					onClick={() => changeSortOrder("name")}>
					<div>Name</div>
					{sortBy === "name" && (
						<ArrowDownwardIcon
							className={sortArrowClasses(sortOrder)}
						/>
					)}
				</button>
				<button
					className={styles.header_population}
					onClick={() => changeSortOrder("population")}>
					<div>Population</div>
					{sortBy === "population" && (
						<ArrowDownwardIcon
							className={sortArrowClasses(sortOrder)}
						/>
					)}
				</button>
				<button
					className={styles.header_area}
					onClick={() => changeSortOrder("area")}>
					<div>
						Area (km<sup style={{ fontSize: "0.5rem" }}>2</sup>)
					</div>
					{sortBy === "area" && (
						<ArrowDownwardIcon
							className={sortArrowClasses(sortOrder)}
						/>
					)}
				</button>
				<button
					className={styles.header_gini}
					onClick={() => changeSortOrder("gini")}>
					<div>Gini</div>
					{sortBy === "gini" && (
						<ArrowDownwardIcon
							className={sortArrowClasses(sortOrder)}
						/>
					)}
				</button>
			</div>

			{sortedCountries.map(country => (
				<Link
					href={`/country/${country.alpha3Code}`}
					key={country.alpha3Code}>
					<div className={styles.row}>
						<div className={styles.flag}>
							<Image
								src={country.flag}
								alt={country.name}
								width="100"
								height="70"
								layout="responsive"
							/>
						</div>
						<div className={styles.name}>{country.name}</div>
						<div className={styles.population}>
							{country.population}
						</div>
						<div className={styles.area}>{country.area ?? 0}</div>
						<div className={styles.gini}>{country.gini ?? 0} %</div>
					</div>
				</Link>
			))}
		</>
	);
};

export default CountriesTable;

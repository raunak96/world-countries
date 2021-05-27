import SearchRounded from "@material-ui/icons/SearchRounded";
import styles from "./SearchInput.module.css";

const SearchInput = ({ placeholder = "Search", onChange }) => {
	return (
		<div className={styles.container}>
			<SearchRounded />
			<input
				className={styles.input}
				placeholder={placeholder}
				onChange={onChange}
			/>
		</div>
	);
};

export default SearchInput;

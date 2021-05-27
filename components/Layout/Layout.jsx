import styles from "./Layout.module.css";
import Meta from "../Meta";
import Logo from "../Logo";
import Brightness6Rounded from "@material-ui/icons/Brightness6Rounded";
import { useEffect, useState } from "react";

const Layout = ({ children, title }) => {
	const [theme, setTheme] = useState("light");

	useEffect(() => {
		document.documentElement.setAttribute(
			"data-theme",
			localStorage.getItem("theme")
		);
		setTheme(localStorage.getItem("theme"));
	}, []);

	const toggleTheme = () => {
		if (theme === "dark") {
			saveTheme("light");
		} else {
			saveTheme("dark");
		}
	};

	const saveTheme = theme => {
		setTheme(theme);
		localStorage.setItem("theme", theme);
		document.documentElement.setAttribute("data-theme", theme);
	};
	return (
		<>
			<Meta title={title} />
			<div className={styles.container}>
				<header className={styles.header}>
					<Logo />
					<button
						className={styles.themeSwitch}
						onClick={toggleTheme}>
						<Brightness6Rounded />
					</button>
				</header>
				<main className={styles.main}>{children}</main>

				<footer className={styles.footer}>
					&copy; 2021 NextJS.docs
				</footer>
			</div>
		</>
	);
};

export default Layout;

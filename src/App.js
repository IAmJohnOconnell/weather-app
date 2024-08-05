import axios from "axios";
import { useState, useEffect } from "react";
import SearchForm from "./components/SearchForm";
import Card from "./components/Card";
import { ThemeProvider } from "styled-components";
import GlobalStyles from "./components/styles/Global";
import Container from "./components/Container";
import ForecastContainer from "./components/ForecastContainer";
import styled from "styled-components";
import WeatherSide from "./components/WeatherSide";
import InfoSide from "./components/InfoSide";

const theme = {
	colors: {
		lightBG: "#343d4b",
		darkBG: "#222831",
		color: "white",
	},

	type: {
		fontPrimary: `"Montserrat", sans-serif;`,
		fontSecondary: `"Happy Monkey", cursive`,
	},
};

const Blurb = styled.p`
	font-family: ${(props) => props.theme.type.fontSecondary};
	color: ${(props) => props.theme.colors.color};
	font-size: 1.3em;
`;

function App() {
	const [input, setInput] = useState("");
	const [searchedInput, setSearchedInput] = useState("");
	const [locationData, setLocationData] = useState("");
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		let formattedLocation = {};

		const fetchAndFormatData = async () => {
			let appid = process.env.REACT_APP_API_KEY;
			let config = {
				params: {
					q: searchedInput,
					appid: appid,
					units: "imperial",
				},
			};

			axios
				.get("https://api.openweathermap.org/data/2.5/weather?", config)
				.then((res) => {
					let data = res.data;

					formattedLocation = {
						lat: data.coord.lat,
						lon: data.coord.lon,
						name: data.name + ",",
						country: data.sys.country,
						dt: data.dt,
						wind: data.wind,
						temp: data.main.temp,
						pressure: data.main.pressure,
						humidity: data.main.humidity,
						skycondition: data.weather[0].description,
						skyconditionIcon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
					};

					let forecastConfig = {
						params: {
							lat: formattedLocation.lat,
							lon: formattedLocation.lon,
							excludes: "minutely,hourly,alerts",
							appid: config.params.appid,
							units: config.params.units,
						},
					};

					return axios
						.get(
							"https://api.openweathermap.org/data/2.5/forecast?",
							forecastConfig
						)
						.then((res) => {
							let data = res.data;

							formattedLocation = {
								...formattedLocation,
								dailyForcasts: data.list,
							};
							parseDays(formattedLocation.dt, formattedLocation);
							setLocationData(formattedLocation);
							setIsLoading(false);
						});
				});
		};

		if (searchedInput !== "") {
			fetchAndFormatData();
		}
	}, [searchedInput]);

	const handleClick = () => {
		setSearchedInput(input);
	};

	const handleChange = (e) => {
		setInput(e.target.value);
	};

	const parseDays = (currentdt, formattedLocation) => {
		const dayNames = {
			0: "Sunday",
			1: "Monday",
			2: "Tueday",
			3: "Wednesday",
			4: "Thursday",
			5: "Friday",
			6: "Saturday",
		};

		const monthNames = {
			0: "January",
			1: "February",
			2: "March",
			3: "April",
			4: "May",
			5: "June",
			6: "July",
			7: "August",
			8: "September",
			9: "October",
			10: "November",
			11: "December",
		};

		const createDateString = (dt, isLong) => {
			let date = new Date(dt * 1000);
			let dayOfWeek = "";
			if (isLong) {
				dayOfWeek = dayNames[date.getDay()];
			} else {
				dayOfWeek = dayNames[date.getDay()].substring(0, 3);
				return dayOfWeek;
			}
			let monthOfYear = monthNames[date.getMonth()];

			let dateString = `${date.getDate()}, ${monthOfYear.substring(
				0,
				3
			)}  ${date.getFullYear()}`;

			return {
				dateString: dateString,
				day: date.getDay(),
				month: date.getMonth(),
				year: date.getFullYear(),
				dayOfWeek,
				monthOfYear,
			};
		};

		formattedLocation.date = createDateString(formattedLocation.dt, true);

		for (const day of formattedLocation.dailyForcasts) {
			day.date = createDateString(day.dt, false);
			day.skyconditionIcon = `http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`;
			console.log(day.skyconditionIcon);
		}

		formattedLocation.dailyForcasts[0].date = "Today";

		setLocationData(formattedLocation);
		setInput("");
	};

	return (
		<ThemeProvider theme={theme.colors}>
			<GlobalStyles />
			<Container>
				{!isLoading && (
					<WeatherSide>
						<Card locationData={locationData} parseDays={parseDays} />
					</WeatherSide>
				)}
				<InfoSide>
					<>
						<ForecastContainer locationData={locationData} />
						<SearchForm
							input={input}
							handleChange={handleChange}
							setInput={setInput}
							handleClick={handleClick}
							isLoading={isLoading}
						/>
						{isLoading && (
							<Blurb theme={theme}>Sunny day, chasing the clouds away</Blurb>
						)}
					</>
				</InfoSide>
			</Container>
		</ThemeProvider>
	);
}

export default App;

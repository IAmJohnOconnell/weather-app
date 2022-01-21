import React from "react";
import styled from "styled-components";
import SmallCard from "./SmallCard";
import arrow from "../assets/arrow.png";

const CurrentDataSection = styled.section``;

const ForecastDataSection = styled.section`
	display: flex;
	margin-top: 2em;
	gap: 0.2em;
	border-radius: 1rem;
	box-shadow: 0 0 25px -5px rgba(0, 0, 0, 0.85);
	@media (max-width: 700px) {
		display: flex;
		flex-direction: column;
	}
`;

const DirectionArrow = styled.span`
	transform: rotate(${(props) => props.direction}deg);
	display: inline-block;
	filter: invert(100%) sepia(100%) saturate(0%) hue-rotate(301deg)
		brightness(106%) contrast(101%);
	img {
		width: 24px;
	}
`;

const WindDirection = styled.div`
	display: flex;
	place-items: center;
	gap: 1em;
`;

const WindSpeed = styled.div`
	display: flex;
	place-content: flex-end;
`;

const WindSection = styled.div`
	display: flex;
	flex-direction: column;
	place-items: flex-end;
`;

const DataRow = styled.div`
	display: flex;
	place-items: center;
	justify-content: space-between;
`;

const Heading = styled.h4`
	text-transform: uppercase;
`;

const ForecastContainer = ({ locationData }) => {
	const calculateDirection = () => {
		let direction = locationData.wind.deg;
		let iconFirstDirection;
		let iconSecondDirection;

		if (direction >= 0 && direction < 90) {
			iconSecondDirection = "Northeast";
		} else if (direction >= 90 && direction < 180) {
			iconSecondDirection = "Southeast";
		} else if (direction >= 180 && direction < 270) {
			iconSecondDirection = "Southwest";
		} else if (direction >= 270 && direction <= 360) {
			iconSecondDirection = "Northwest";
		}

		if (direction >= 270 && direction <= 90) {
			iconFirstDirection = "North";
		} else if (direction >= 0 && direction <= 180) {
			iconFirstDirection = "East";
		} else if (direction >= 90 && direction <= 270) {
			iconFirstDirection = "South";
		} else if (direction >= 180 && direction <= 360) {
			iconFirstDirection = "West";
		}

		let windDirectionString = `${iconFirstDirection}-${iconSecondDirection}`;

		return windDirectionString;
	};

	return (
		<>
			{locationData && (
				<>
					<CurrentDataSection>
						<DataRow>
							<Heading>Precipitation</Heading>
							<p>{Math.round(locationData.dailyForcasts[0].pop) * 100} %</p>
						</DataRow>
						<DataRow>
							<Heading>Humidity</Heading>
							<p>{locationData.humidity} %</p>
						</DataRow>
						<DataRow>
							<Heading>Wind</Heading>
							<WindSection>
								<WindSpeed>{locationData.wind.speed} m/h</WindSpeed>
								<WindDirection>
									<p>{locationData.wind.deg} &deg;</p>
									<DirectionArrow direction={locationData.wind.deg}>
										<img src={arrow} alt='forecast' />
									</DirectionArrow>
								</WindDirection>
								<span>{calculateDirection()}</span>
							</WindSection>
						</DataRow>
					</CurrentDataSection>
					<ForecastDataSection>
						{locationData.dailyForcasts &&
							locationData.dailyForcasts.map((day) => {
								return (
									<SmallCard
										image={day.skyconditionIcon}
										day={day.date}
										temp={Math.round(day.temp.day)}
										key={day.dt}
									/>
								);
							})}
					</ForecastDataSection>
				</>
			)}
		</>
	);
};

export default ForecastContainer;

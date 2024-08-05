import React from "react";
import styled from "styled-components";

const StyledCard = styled.div`
	display: flex;
	flex-direction: column;
	place-items: center;
	text-align: center;
	@media (max-width: 599px) {
		flex-direction: column;
		justify-content: space-around;
	}
`;

const CurrentTemperature = styled.p`
	font-size: 3rem;
	font-weight: 700;
`;

const CurrentSkyCondition = styled.p`
	text-transform: capitalize;
`;

const CurrentForcastSummary = styled.div`
	display: flex;
	flex-direction: column;
`;

const today = new Date().getDay();

const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

const Card = ({ locationData }) => {
	return (
		<StyledCard>
			<div>
				<h2>{dayNames[today]}</h2>
				<p>Today</p>
				<h4>
					{locationData.name} {locationData.country}
				</h4>
			</div>
			<CurrentForcastSummary>
				<img src={locationData.skyconditionIcon} alt='forecast' />

				<CurrentTemperature>
					{Math.round(locationData.temp)}
					{<span>&deg;</span>}
				</CurrentTemperature>
				<CurrentSkyCondition>{locationData.skycondition}</CurrentSkyCondition>
			</CurrentForcastSummary>
		</StyledCard>
	);
};

export default Card;

import React from "react";
import styled from "styled-components";

const StyledCard = styled.div`
	display: flex;
	flex-direction: column;
	place-items: center;
	text-align: center;
	@media (max-width: 700px) {
		flex-direction: row;
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
const Card = ({ locationData }) => {
	return (
		<StyledCard>
			<div>
				<h2>{locationData.date.dayOfWeek}</h2>
				<p>{locationData.date.dateString}</p>
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

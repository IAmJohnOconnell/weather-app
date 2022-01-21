import React from "react";
import styled from "styled-components";

const Card = styled.div`
	display: grid;
	grid-template-areas: "day" "image" "temp";
	place-items: center;
	padding: 0.5em;
	transition: all ease 0.2s;
	border-radius: 1em;
	gap: 0.5em;
	cursor: pointer;

	:hover {
		background: #fff;
		color: #222831;
		transform: scale(1.1);
		box-shadow: 0 0 40px -5px rgba(0, 0, 0, 0.2);
	}

	@media (max-width: 700px) {
		align-items: center;
		grid-template-areas: "day image temp";
		grid-template-columns: repeat(3, 1fr);
	}
`;

const Icon = styled.img`
	grid-area: image;
	width: 5rem;
`;

const Day = styled.p`
	grid-area: day;
	width: min-content;
	margin: 0;
	text-align: center;
`;

const Temp = styled.p`
	grid-area: temp;
	font-weight: 700;
	margin: 0;
`;

const SmallCard = ({ image, day, temp }) => {
	return (
		<Card>
			<Icon src={image} alt='' />
			<Day>{day}</Day>
			<Temp>{temp}&deg;</Temp>
		</Card>
	);
};

export default SmallCard;

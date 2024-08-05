import React from "react";
import styled from "styled-components";

const WeatherContainer = styled.div`
	padding: 1.5em;
	border-radius: 1.5em;
	background-color: #5e6777;
	box-shadow: 0 0 20px -10px rgba(0, 0, 0, 0.4);
	transition: all 300ms ease;
	max-width: 600px;
	:hover {
		transform: scale(1.05) perspective(1500px) rotateY(10deg);
	}
	@media (max-width: 599px) {
		:hover {
			transform: scale(1.05) perspective(1500px) rotateX(-10deg);
		}
	}
`;

const WeatherSide = (props) => {
	return <WeatherContainer>{props.children}</WeatherContainer>;
};

export default WeatherSide;

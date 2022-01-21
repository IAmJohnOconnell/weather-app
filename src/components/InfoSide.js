import React from "react";
import styled from "styled-components";

const InfoContainer = styled.div`
	padding: 1em;
	border-radius: 1.5em;
	background-color: #0e1723;
	max-width: max-content;
`;
const InfoSide = (props) => {
	return <InfoContainer>{props.children}</InfoContainer>;
};

export default InfoSide;

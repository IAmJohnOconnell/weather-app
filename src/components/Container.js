import React from "react";
import styled from "styled-components";

const StyledContainer = styled.main`
	display: flex;
	background: #0e1723;
	border-radius: 2.5rem;
	margin: 10vh auto;
	max-width: 600px;
	justify-content: center;
	@media (max-width: 599px) {
		display: flex;
		flex-direction: column;
		margin: 0 auto;
	}
`;

const Container = (props) => {
	return <StyledContainer>{props.children}</StyledContainer>;
};

export default Container;

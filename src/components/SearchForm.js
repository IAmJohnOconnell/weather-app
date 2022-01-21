import React from "react";
import styled from "styled-components";

const Input = styled.input`
	border-radius: 0.5em;
	outline: none;
	line-height: 1.2;
	padding: 0.6em;
	/* color: black; */
	font-size: 1em;
	border: none;
	box-shadow: 0rem 0.8rem 1.2rem rgba(0, 0, 0, 0.3);

	:focus,
	:hover {
		outline: none;
		box-shadow: 0rem 0.8rem 1.6rem rgba(0, 0, 0, 0.8);
	}
`;
const SearchButton = styled.button`
	outline: none;
	width: 100%;
	border: none;
	border-radius: 2.5rem;
	padding: 1rem;
	font-family: "Montserrat", sans-serif;
	background-color: #222831;
	color: #ffffff;
	font-weight: 700;
	cursor: pointer;
	transition: color 200ms ease;
	transition: transform 150ms ease-in-out;
	transition: box-shadow 150ms ease-in-out;
	box-shadow: 0rem 0.6rem 1rem rgba(0, 0, 0, 0.6);

	&:hover {
		color: #ed6e4d;
	}

	:active {
		box-shadow: 0rem 0.6rem 1rem rgba(255, 255, 255, 0.2);
		transform: scale(0.95);
	}
`;
const Form = styled.form`
	display: flex;
	align-items: center;
	justify-content: center;
	font-family: "Montserrat", sans-serif;
	margin: 1.5em 0;
	border-radius: 1.5em;
	gap: 1em;
`;

const SearchForm = ({ input, handleClick, handleChange, isLoading }) => {
	return (
		<Form
			onSubmit={(e) => {
				e.preventDefault();
			}}
			onChange={handleChange}>
			<Input
				type='text'
				onChange={handleChange}
				value={input}
				placeholder='Enter a City...'
			/>
			<SearchButton onClick={handleClick}>
				{!isLoading ? "Change Location" : "Get Weather!"}
			</SearchButton>
		</Form>
	);
};

export default SearchForm;

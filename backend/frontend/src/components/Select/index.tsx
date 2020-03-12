import styled, { css } from 'styled-components';

export const Icon = styled.span`
    color: #dbdbdb;
    height: 100%;
    pointer-events: none;
    position: absolute;
    top: 0;
    width: 2.25em;
	z-index: 4;
	right: 0;
	svg {
		width: 1em;
		transition: .2s all ease-in-out;
	}
`

export const Select = styled.div<{ isOpen: boolean }>`
	background-color: #DCEEFF;
	border: 1px solid transparent;
	color: #363636;
	box-shadow: none;
	max-width: 100%;
	width: 100%;
	display: inline-flex;
	font-size: 1rem;
	height: 3em;
	justify-content: flex-start;
	line-height: 1.5;
	padding-bottom: calc(0.375em - 1px);
	padding-left: calc(0.625em - 1px);
	padding-right: calc(0.625em - 1px);
	padding-top: calc(0.375em - 1px);
	position: relative;
	vertical-align: top;
	border-radius: 4px;
	transition: .1s all ease-in-out;
	outline: none;
	appearance: none;
	cursor: pointer;

	${props => props.isOpen && css`

		background-color: white;
		border-color: #0284FE;
		~ ${Icon} {
			svg {
				transform: rotate(180deg);
			}
		}
	`}
`

export const Input = styled.input<{ isOpen: boolean }>`
	background-color: #DCEEFF;
	border: 1px solid transparent;
	color: #363636;
	box-shadow: none;
	max-width: 100%;
	width: 100%;
	display: inline-flex;
	font-size: 1rem;
	height: 3em;
	justify-content: flex-start;
	line-height: 1.5;
	padding-bottom: calc(0.375em - 1px);
	padding-left: calc(0.625em - 1px);
	padding-right: calc(0.625em - 1px);
	padding-top: calc(0.375em - 1px);
	position: relative;
	vertical-align: top;
	border-radius: 4px;
	transition: .1s all ease-in-out;
	&:empty {
		border-color: #DCEEFF;
	}
	&:focus {
		background-color: white;
		border-color: #0284FE;
		outline: none;
		~ ${Icon} {
			svg {
				transform: rotate(180deg);
			}
		}
	}
`
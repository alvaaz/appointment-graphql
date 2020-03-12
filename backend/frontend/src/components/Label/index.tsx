import styled from 'styled-components';

export const Label = styled.label`
	font-weight: 500;
	color: #8A94A6;
	padding-bottom: 8px;
	text-transform: uppercase;
	font-size: 0.75rem;
`

export const Wrapper = styled.div<{ select: boolean }>`
	position: relative;
	input {
		cursor: ${props => props.select ? 'pointer' : 'text'};
	}
	span {
		display: ${props => props.select ? 'inline-flex' : 'none'};
	}
`
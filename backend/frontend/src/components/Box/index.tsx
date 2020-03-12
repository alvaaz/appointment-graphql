import styled from 'styled-components';

export const Box = styled.div`
    ul {
        display: block;
        position: absolute;
        top: 3.2em;
        width: 100%;
        background-color: white;
        padding: .5rem;
        box-shadow: 0 0 1px 0 rgba(10, 22, 70, 0.06), 0 6px 6px -1px rgba(10, 22, 70, 0.1);
        position: absolute;
        transition: .2s all ease-in-out;
        z-index: 4;
        width: 100%;
        top: 56px;
        max-height: 320px;
        overflow-y: scroll;
        border-radius: 8px;
    }
`
export const Item = styled.li`
	padding: .5rem 1rem;
	cursor: pointer;
	text-transform: capitalize;
	color: #4E5D78;
	margin-top: 8px;
	&:hover {
		background: #F3F1FA;
		border-radius: 8px;
	}
`
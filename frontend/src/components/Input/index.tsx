import React, { SyntheticEvent, useState, useEffect, useRef } from 'react';
import { Box, Item } from '../Box'
import { Select, Icon, Input } from '../Select'
import { Label, Wrapper } from '../Label'
import useComponentVisible from '../useComponentVisible'

interface Props {
	label: string,
	select: boolean,
	data: [],
	parentCallback: Function,
	value?: string | null,
	selectedOption: string | null
}

interface Item {
	Nom_Especialidad?: string,
	Id_Especialidad?: string,
	Id_Profesional?: string,
	Profesional: string,
}

export const TextField = (props: Props) => {
	const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false);
	const [suggestion, setSuggestion] = useState<Item[]>(props.data)
	const inputEl = useRef<HTMLInputElement>(null);

	const handleData = (e: SyntheticEvent) => {
		if(props.data.length) {
			setIsComponentVisible(!isComponentVisible)
		}
	}
	const handleClick = (e: SyntheticEvent) => {
		let content = e.currentTarget.textContent
		let id = e.currentTarget.id
		props.parentCallback(content, id)
		setIsComponentVisible(false)
		if (inputEl && inputEl.current) {
			inputEl.current.value = content || 'jaja'
		}
	}
	useEffect(()=> {
		if (inputEl && inputEl.current) {
			inputEl.current.value = ''
		}
	}, [props.data])

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const userValue = (e.target as HTMLInputElement).value
		if (inputEl && inputEl.current) {
			inputEl.current.value = userValue
		}
		const filteredData = props.data.filter(
			(item: Item) => item.Profesional.toLowerCase().indexOf(userValue.toLowerCase()) > -1
		)
		setSuggestion(filteredData)
	}
	useEffect(() => {
		setSuggestion(props.data)
	}, [props.data]);

	return (
		<React.Fragment>
			<Label htmlFor={props.label} >{props.label}</Label>
			<Wrapper select={props.select} ref={ref}>
				{
					props.select ?
					<Select
						id={props.label}
						isOpen={isComponentVisible}
						onClick={handleData}
						>
							<span
								style={{ alignSelf: 'center' }}>
								{props.value ? props.value : 'Selecciona una especialidad'}</span>
					</Select>
					:
					<Input
						onFocus={e => handleData(e)}
						onChange={(e) => handleChange(e)}
						id={props.label}
						isOpen={isComponentVisible}
						ref={inputEl}
					/>
				}
				<Icon >
					<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chevron-down" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z"></path></svg>
				</Icon>
				<Box>
					{isComponentVisible && (
						props.select ?
							<ul>
								<Item id="0" onClick={e => handleClick(e)} key='0'>Todas</Item>
								{
									props.data.map((item: Item, i) => (
										<Item id={item.Id_Especialidad} onClick={e => handleClick(e)} key={i}>{item.Nom_Especialidad}</Item>
									))
								}
							</ul>
						:
							<ul>
								{
									suggestion.map((item: Item, i) => (
										<Item id={item.Id_Profesional} onClick={e => handleClick(e)} key={i}>{item.Profesional}</Item>
									))
								}
							</ul>

					)}

				</Box>
			</Wrapper>
		</React.Fragment>
	)
}
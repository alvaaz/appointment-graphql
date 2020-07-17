import React, { useState, useEffect, useRef, MouseEvent } from 'react';
import { Label, Wrapper, Select, Icon, Input, Box, Item } from './style';
import { useComponentVisible } from '../../hooks';
import { Doctor, Specialty } from '../../helpers/interfaces';
import { InputApp } from '../App/style';

interface Props {
  label: string;
  select: boolean;
  data: Array<Doctor | Specialty> | null;
  parentCallback: Function;
  value?: string | null;
  placeholder?: string;
  disabled?: boolean;
}

interface Item {
  _id: string;
  name: string;
  fullName: string;
}

function isDoctor(entry: Specialty | Doctor): entry is Doctor {
  return (entry as Doctor).firstName !== undefined;
}

export const TextField = ({
  data,
  value,
  label,
  select,
  placeholder,
  parentCallback,
  disabled,
}: Props) => {
  const {
    ref,
    isComponentVisible,
    setIsComponentVisible,
  } = useComponentVisible(false);
  const [suggestion, setSuggestion] = useState<Array<
    Doctor | Specialty
  > | null>(data);
  const inputEl = useRef<HTMLInputElement>(null);

  const handleData = () => {
    if (data?.length) {
      setIsComponentVisible(!isComponentVisible);
    }
  };
  const handleClick = (e: MouseEvent) => {
    let specialty = {
      _id: e.currentTarget.id,
      name: e.currentTarget.textContent,
    };
    parentCallback(specialty);
    setIsComponentVisible(false);

    if (inputEl && inputEl.current) {
      inputEl.current.value = specialty.name || 'jaja';
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const userValue = (e.target as HTMLInputElement).value;
    if (inputEl && inputEl.current) {
      inputEl.current.value = userValue;
    }
    const filteredData = data
      ? data.filter(item =>
          isDoctor(item)
            ? item.firstName!.toLowerCase().indexOf(userValue.toLowerCase()) >
              -1
            : null
        )
      : null;
    setSuggestion(filteredData);
  };
  useEffect(() => {
    setSuggestion(data);
  }, [data]);

  return (
    <InputApp>
      <Label htmlFor={label}>{label}</Label>
      <Wrapper select={select} ref={ref}>
        {select ? (
          <Select id={label} isOpen={isComponentVisible} onClick={handleData}>
            <span style={{ alignSelf: 'center' }}>
              {value ? value : 'Selecciona una especialidad'}
            </span>
          </Select>
        ) : (
          <Input
            onFocus={handleData}
            onChange={e => handleChange(e)}
            id={label}
            isOpen={isComponentVisible}
            ref={inputEl}
            placeholder={placeholder}
            disabled={disabled}
          />
        )}
        <Icon>
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="chevron-down"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
          >
            <path
              fill="currentColor"
              d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z"
            />
          </svg>
        </Icon>
        <Box>
          {isComponentVisible &&
            (select ? (
              <ul>
                <Item id="" onClick={e => handleClick(e)} key="0">
                  Todas
                </Item>
                {data!.map((item: Doctor | Specialty, i: number) => (
                  <Item id={item._id} onClick={e => handleClick(e)} key={i}>
                    {isDoctor(item) ? item.firstName : item.name}
                  </Item>
                ))}
              </ul>
            ) : (
              <ul>
                {suggestion?.map((item: Doctor | Specialty, i: number) => (
                  <Item id={item._id} onClick={e => handleClick(e)} key={i}>
                    {isDoctor(item) ? item.firstName : item.name}
                  </Item>
                ))}
              </ul>
            ))}
        </Box>
      </Wrapper>
    </InputApp>
  );
};

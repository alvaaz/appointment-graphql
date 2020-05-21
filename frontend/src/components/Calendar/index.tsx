import React, { useReducer, useEffect } from 'react';
import { Props, State2, IActions, ActionInput } from '../../helpers/interfaces';

import {
  Wrapper,
  Day,
  Button,
  Nav,
  Body,
  DayName,
  SVG_PREV,
  SVG_NEXT,
} from './style';

const actionTypes: IActions = {
  NEXT_MONTH: 'NEXT_MONTH',
  PREV_MONTH: 'PREV_MONTH',
  SET_MONTH: 'SET_MONTH',
  SET_YEAR: 'SET_YEAR',
  SET_DAY: 'SET_DAY',
  SET_DATE: 'SET_DATE',
};

const getStartDayOfMonth = (day: number | Date) => {
  const date = new Date(day);
  if (new Date(date.getFullYear(), date.getMonth(), 1).getDay() === 0) {
    return 7;
  }
  return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
};

const initialState: State2 = {
  today: new Date(),
  selectedDay: new Date().getDate(),
  date: new Date(),
  month: new Date().getMonth(),
  year: new Date().getFullYear(),
  startDay: getStartDayOfMonth(new Date()),
  closestDay: 0,
};

function reducer(state: State2, action: ActionInput): State2 {
  switch (action.type) {
    // case actionTypes.PREV_MONTH:
    //   return {
    //     ...state,
    //     [action.field]: new Date(state.year, state.month - 1).getMonth(),
    //     startDay: getStartDayOfMonth(new Date(state.year, state.month - 1)),
    //     date: new Date(state.year, state.month - 1),
    //     year: new Date(state.year, state.month - 1).getFullYear(),
    //     selectedDay: 0,
    //   };

    // case actionTypes.NEXT_MONTH:
    //   return {
    //     ...state,
    //     [action.field]: new Date(state.year, state.month + 1).getMonth(),
    //     startDay: getStartDayOfMonth(new Date(state.year, state.month + 1)),
    //     date: new Date(state.year, state.month + 1),
    //     year: new Date(state.year, state.month + 1).getFullYear(),
    //     selectedDay: 0,
    //   };

    case actionTypes.SET_DATE:
      return {
        ...state,
        [action.field]: new Date(action.payload).getMonth(),
        selectedDay: new Date(action.payload).getDate(),
      };

    default:
      return state;
  }
}

export const CalendarComp = (props: Props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const DAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const DAYS_LEAP = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const DAYS_OF_THE_WEEK = ['LUN', 'MAR', 'MIE', 'JUE', 'VIE', 'SÁB', 'DOM'];
  const MONTHS = [
    'ENE',
    'FEB',
    'MAR',
    'ABR',
    'MAY',
    'JUN',
    'JUL',
    'AGO',
    'SEP',
    'OCT',
    'NOV',
    'DIC',
  ];

  function isLeapYear(year: number) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  }

  // const handleClick = (type: string) => {
  //   dispatch({
  //     type: actionTypes.PREV_MONTH,
  //     field: 'month',
  //   });
  // };

  useEffect(() => {
    dispatch({
      type: actionTypes.SET_DATE,
      field: 'month',
      payload: props.closestDay,
    });
  }, [props.closestDay]);

  const handleClickDay = (type: string, field: string, payload: number) => {
    dispatch({
      type,
      field,
      payload,
    });
  };

  const days = isLeapYear ? DAYS_LEAP : DAYS;

  return (
    <Wrapper>
      <Nav>
        <Button>
          <SVG_PREV />
        </Button>
        <div>
          {MONTHS[state.month]} {state.year}
        </div>
        <Button>
          <SVG_NEXT />
        </Button>
      </Nav>
      <Body>
        {DAYS_OF_THE_WEEK.map(d => (
          <DayName key={d}>{d}</DayName>
        ))}
        {Array(days[state.month] + (state.startDay - 1))
          .fill(null)
          .map((_, index) => {
            const d = index - (state.startDay - 2);
            return (
              <Day
                key={index}
                isToday={d === state.today.getDate()}
                isSelected={d === state.selectedDay}
                isDisabled={d < state.selectedDay}
                onClick={() =>
                  handleClickDay(
                    actionTypes.SET_DATE,
                    'day',
                    new Date(state.year, state.month, d).getDate()
                  )
                }
              >
                <span>{d > 0 ? d : ''}</span>
              </Day>
            );
          })}
      </Body>
    </Wrapper>
  );
};

export const Calendar = React.memo(CalendarComp);

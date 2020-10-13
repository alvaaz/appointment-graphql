import React, { useReducer, useEffect } from 'react';
import {
  DAYS,
  DAYS_LEAP,
  DAYS_OF_THE_WEEK,
  MONTHS,
  isLeapYear,
} from './utilities';

import {
  CalendarProps,
  CalendarState,
  CalendarActions,
  ActionInput,
} from '../../interfaces/';

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

const actionTypes: CalendarActions = {
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

const initialState: CalendarState = {
  today: new Date(),
  selectedDay: new Date().getDate(),
  date: new Date(),
  month: new Date().getMonth(),
  year: new Date().getFullYear(),
  startDay: getStartDayOfMonth(new Date()),
};

function reducer(state: CalendarState, action: ActionInput): CalendarState {
  switch (action.type) {
    case actionTypes.PREV_MONTH:
      return {
        ...state,
        [action.field]: new Date(state.year, state.month - 1).getMonth(),
        startDay: getStartDayOfMonth(new Date(state.year, state.month - 1)),
        date: new Date(state.year, state.month - 1),
        year: new Date(state.year, state.month - 1).getFullYear(),
        selectedDay: 0,
      };

    case actionTypes.NEXT_MONTH:
      return {
        ...state,
        [action.field]: new Date(state.year, state.month + 1).getMonth(),
        startDay: getStartDayOfMonth(new Date(state.year, state.month + 1)),
        date: new Date(state.year, state.month + 1),
        year: new Date(state.year, state.month + 1).getFullYear(),
        selectedDay: 0,
      };

    case actionTypes.SET_DATE:
      return {
        ...state,
        [action.field]: new Date(action.payload).getMonth(),
        selectedDay: new Date(
          state.year,
          state.month,
          action.payload
        ).getDate(),
      };

    default:
      return state;
  }
}

export const CalendarComp = (props: CalendarProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleMonth = (type: string) => {
    dispatch({
      type,
      field: 'month',
      payload: 8,
    });
  };

  const handleClickDay = (type: string, field: string, payload: number) => {
    dispatch({
      type,
      field,
      payload,
    });
  };

  useEffect(() => {
    props.parentCallback(new Date(state.year, state.month, state.selectedDay));
  }, [state.selectedDay]);

  useEffect(() => {
    props.month(state.month);
    props.year(state.year);
  }, [state.month]);

  useEffect(() => {
    const firstDate = props.availableDays ? props.availableDays[1] : '';
    handleClickDay(actionTypes.SET_DATE, 'day', new Date(firstDate).getDate());
  }, [props.availableDays]);

  const days = isLeapYear(state.year) ? DAYS_LEAP : DAYS;

  const daysOfTheWeek = DAYS_OF_THE_WEEK.map((d) => (
    <DayName key={d}>{d}</DayName>
  ));

  const daysOfTheMonth = Array(days[state.month] + (state.startDay - 1))
    .fill(null)
    .map((_, index) => {
      const d = index - (state.startDay - 2);
      const isEnabled = props.availableDays?.some(
        (date) =>
          new Date(date).getTime() ===
          new Date(state.year, state.month, d).getTime()
      );

      return (
        <Day
          key={index}
          isToday={d === state.today.getDate()}
          isSelected={d === state.selectedDay}
          isEnabled={isEnabled}
          onClick={() =>
            isEnabled
              ? handleClickDay(
                  actionTypes.SET_DATE,
                  'day',
                  new Date(state.year, state.month, d).getDate()
                )
              : null
          }
        >
          <span>{d > 0 ? d : ''}</span>
        </Day>
      );
    });

  return (
    <Wrapper>
      <Nav>
        <Button onClick={() => handleMonth(actionTypes.PREV_MONTH)}>
          <SVG_PREV />
        </Button>
        <div>
          {MONTHS[state.month]} {state.year}
        </div>
        <Button onClick={() => handleMonth(actionTypes.NEXT_MONTH)}>
          <SVG_NEXT />
        </Button>
      </Nav>
      <Body>
        {daysOfTheWeek}
        {daysOfTheMonth}
      </Body>
    </Wrapper>
  );
};

export const Calendar = React.memo(CalendarComp);

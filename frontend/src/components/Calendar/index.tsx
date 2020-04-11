import React, { useReducer, useEffect } from "react";
import { getDays } from "../../helpers/";

import {
  Wrapper,
  Day,
  Button,
  Nav,
  Body,
  DayName,
  SVG_PREV,
  SVG_NEXT,
} from "./style";

interface Props {
  availableDays?: [{ date: Date; hours: [] }];
}

interface State {
  today: Date;
  firstDay: number;
  date: number | Date;
  month: number;
  year: number;
  startDay: number;
}

interface IActions {
  NEXT_MONTH: string;
  PREV_MONTH: string;
  SET_MONTH: string;
  SET_YEAR: string;
  SET_DAY: string;
  SET_DATE: string;
}

interface ActionInput {
  type: string;
  field: string;
  payload?: number | Date;
}

const actionTypes: IActions = {
  NEXT_MONTH: "NEXT_MONTH",
  PREV_MONTH: "PREV_MONTH",
  SET_MONTH: "SET_MONTH",
  SET_YEAR: "SET_YEAR",
  SET_DAY: "SET_DAY",
  SET_DATE: "SET_DATE",
};

const getStartDayOfMonth = (day: number | Date) => {
  const date = new Date(day);
  if (new Date(date.getFullYear(), date.getMonth(), 1).getDay() === 0) {
    return 7;
  } else {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  }
};

const initialState: State = {
  today: new Date(),
  firstDay: new Date().getDate(),
  date: new Date(),
  month: new Date().getMonth(),
  year: new Date().getFullYear(),
  startDay: getStartDayOfMonth(new Date()),
};

function reducer(state: State, action: ActionInput) {
  switch (action.type) {
    case actionTypes.PREV_MONTH:
      return {
        ...state,
        [action.field]: new Date(state.year, state.month - 1).getMonth(),
        startDay: getStartDayOfMonth(new Date(state.year, state.month - 1)),
        date: new Date(state.year, state.month - 1),
        year: new Date(state.year, state.month - 1).getFullYear(),
        firstDay: null,
      };

    case actionTypes.NEXT_MONTH:
      return {
        ...state,
        [action.field]: new Date(state.year, state.month + 1).getMonth(),
        startDay: getStartDayOfMonth(new Date(state.year, state.month + 1)),
        date: new Date(state.year, state.month + 1),
        year: new Date(state.year, state.month + 1).getFullYear(),
        firstDay: null,
      };
    case actionTypes.SET_DATE:
      return {
        ...state,
        [action.field]: action.payload,
      };

    default:
      return state;
  }
}

export const CalendarComp = (props: Props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const DAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const DAYS_LEAP = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const DAYS_OF_THE_WEEK = ["LUN", "MAR", "MIE", "JUE", "VIE", "SÁB", "DOM"];
  const MONTHS = [
    "ENE",
    "FEB",
    "MAR",
    "ABR",
    "MAY",
    "JUN",
    "JUL",
    "AGO",
    "SEP",
    "OCT",
    "NOV",
    "DIC",
  ];

  function isLeapYear(year: number) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  }

  const handleClick = (type: string) => {
    dispatch({
      type: type,
      field: "month",
    });
  };

  useEffect(() => {
    console.log("entro");
    const closestDay = props.availableDays.reduce((a, b) => {
      const today = new Date().setHours(0, 0, 0);
      const adiff = new Date(a.date).setHours(0, 0, 0) - today;
      return adiff > 0 && adiff < new Date(b.date).setHours(0, 0, 0) - today
        ? a
        : b;
    });
    return () =>
      dispatch({
        type: actionTypes.SET_DATE,
        field: "date",
        payload: closestDay.date,
      });
  }, [props.availableDays]);

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
        <Button onClick={() => handleClick(actionTypes.PREV_MONTH)}>
          <SVG_PREV />
        </Button>
        <div>
          {MONTHS[state.month]} {state.year}
        </div>
        <Button onClick={() => handleClick(actionTypes.NEXT_MONTH)}>
          <SVG_NEXT />
        </Button>
      </Nav>
      <Body>
        {DAYS_OF_THE_WEEK.map((d) => (
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
                isSelected={d === state.firstDay}
                isDisabled={d < state.firstDay}
                onClick={() =>
                  handleClickDay(
                    actionTypes.SET_DATE,
                    "day",
                    new Date(state.year, state.month, d).getDate()
                  )
                }
              >
                <span>{d > 0 ? d : ""}</span>
              </Day>
            );
          })}
      </Body>
    </Wrapper>
  );
};

export const Calendar = React.memo(CalendarComp);

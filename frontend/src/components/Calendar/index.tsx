import React from "react";
import { useState, useEffect } from "react";
import { getDays } from "../../helpers/";
import { AvailableDays } from "../../helpers/interfaces";

import {
  Wrapper,
  Day,
  Button,
  Nav,
  Body,
  DayName,
  SVG_PREV,
  SVG_NEXT
} from "./style";

interface Props {
  availableDays?: AvailableDays[];
  disabledDays?: string[];
}

export const CalendarComp = (props: Props) => {
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
    "DIC"
  ];
  const today = new Date();
  const [date, setDate] = useState(today);
  const [day, setDay] = useState(date.getDate());
  const [month, setMonth] = useState(date.getMonth());
  const [year, setYear] = useState(date.getFullYear());
  const [startDay, setStartDay] = useState(getStartDayOfMonth(date));

  useEffect(() => {
    setDay(date.getDate());
    setMonth(date.getMonth());
    setYear(date.getFullYear());
    setStartDay(getStartDayOfMonth(date));
  }, [date]);

  function getStartDayOfMonth(date: Date) {
    if (new Date(date.getFullYear(), date.getMonth(), 1).getDay() === 0) {
      return 7;
    } else {
      return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    }
  }

  function isLeapYear(year: number) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  }

  const days = isLeapYear ? DAYS_LEAP : DAYS;

  let availableDates = props.availableDays.map((f: { Fec_Reserva: string }) =>
    f.Fec_Reserva.replace(/-/g, "/").slice(0, -9)
  );

  let disabledDates = props.disabledDays.map((date: string) =>
    date.replace(/-/g, "/").slice(0, -9)
  );

  let availableDays = getDays(availableDates, month);
  let disabledDays = getDays(disabledDates, month);

  let firstDay = availableDays[0];
  console.log(availableDays, disabledDays);
  return (
    <Wrapper>
      <Nav>
        <Button onClick={() => setDate(new Date(year, month - 1, day))}>
          <SVG_PREV />
        </Button>
        <div>
          {MONTHS[month]} {year}
        </div>
        <Button onClick={() => setDate(new Date(year, month + 1, day))}>
          <SVG_NEXT />
        </Button>
      </Nav>
      <Body>
        {DAYS_OF_THE_WEEK.map(d => (
          <DayName key={d}>{d}</DayName>
        ))}
        {Array(days[month] + (startDay - 1))
          .fill(null)
          .map((_, index) => {
            const d = index - (startDay - 2);
            return (
              <Day
                key={index}
                isToday={d === today.getDate()}
                isSelected={d === firstDay}
                isDisabled={disabledDays.includes(d)}
                onClick={() => setDate(new Date(year, month, d))}
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

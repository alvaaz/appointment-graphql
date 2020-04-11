const capitalize = (word: string) => {
  if (!word) return word;
  return word[0].toUpperCase() + word.substr(1).toLowerCase();
};

export { capitalize };

export function getDays(
  availableDates: [{ date: Date; hours: [] }],
  month: number
) {
  const dates = availableDates.map(hour => hour.date);
  return dates
    .filter(
      h =>
        new Date(h).getMonth() >= month &&
        new Date(h).getDate() >= new Date().getDate()
    )
    .map(h => new Date(h).getDate());
}

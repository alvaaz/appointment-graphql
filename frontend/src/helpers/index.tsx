const capitalize = (word: string) => {
  if (!word) return word;
  return word[0].toUpperCase() + word.substr(1).toLowerCase();
};

export { capitalize };

export function getDays(availableDates: string[], month: number) {
  return [...new Set(availableDates)]
    .filter(h => new Date(h).getMonth() === month)
    .map(h => new Date(h).getDate());
}

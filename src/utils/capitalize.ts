export const capitalizeString = async (word: any): Promise<string> => {
  if (typeof word !== 'string') return 'not a string';

  const arrWords = word.split(' ').map((w) => {
    const firstLetter = w.slice(0, 1).toUpperCase();
    const lastLetter = w.slice(1);
    return firstLetter + lastLetter;
  });

  return arrWords.join(' ');
};



export const formatDate = (date) => {
  const newDate = new Date(date);
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  const formattedDate = newDate.toLocaleDateString('en-US', options);
  let day = newDate.getDate();
  let suffix = 'th';
  if (day === 1 || day === 21 || day === 31) {
    suffix = 'st';
  } else if (day === 2 || day === 22) {
    suffix = 'nd';
  } else if (day === 3 || day === 23) {
    suffix = 'rd';
  }
  return formattedDate.replace(/\b\d+\b/, `${day}${suffix}`);
};
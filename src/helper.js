

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

export const calcAvarageRating = (restaurant, ratings) => {
  if (!restaurant || ratings?.length === 0) {
    // setAverageRatingDisplayed(null);
    return null
  } else {
    const totalRating = ratings?.reduce((acc, rating) => {
      if (typeof rating === 'number') {
        return acc + rating;
      } else {
        return acc + rating.rating;
      }
    }, 0);
    const averageRating = totalRating / ratings?.length;
    // setAverageRatingDisplayed(Math.round(averageRating * 100) / 100);
    return Math.round(averageRating * 100) / 100
  }
}


export const customStyles = {
  control: (provided, state) => ({
    ...provided,
    border: state.isFocused ? '1px solid grey' : '1px solid grey', 
    height: '3rem',
    boxShadow: 'none', 
    '&:hover': {
      borderColor: 'grey',
    }
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? '#ffccb3;' : state.isFocused ? '#ffefe7' : 'transparent', 
    color: state.isSelected ? '#000000' : '#000000',
    '&:active': {
      backgroundColor: '#ffccb3;',
    }
  }),
};

export const areaOptions = [
  { value: 'Hammarby Sjöstad', label: 'Hammarby Sjöstad' },
  { value: 'Skanstull', label: 'Skanstull' },
  { value: 'Medborgarplatsen', label: 'Medborgarplatsen' },
  { value: 'Other', label: 'Other' }
];

export const sortingOptions = [
  { value: 'rating', label: 'Highest rated restaurant' },
  { value: 'created', label: 'Latest rated restaurant' },
];

//lägg till egen för profile?
  // const customStyles = {
  //   control: (provided, state) => ({
  //     ...provided,
  //     border: state.isFocused ? '1px solid grey' : '1px solid grey', 
  //     height: '2rem',
  //     boxShadow: 'none', 
  //     '&:hover': {
  //       borderColor: 'grey',
  //     }
  //   }),
  //   option: (provided, state) => ({
  //     ...provided,
  //     backgroundColor: state.isSelected ? '#ffccb3;' : state.isFocused ? '#ffefe7' : 'transparent', 
  //     color: '#000000',
  //   }),
  // };


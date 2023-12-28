function createDateString() {
  const monthsArr = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let currDate = new Date();
  let day = currDate.getDate();
  let month = monthsArr[currDate.getMonth()];
  let year = currDate.getFullYear();

  return `${month} ${day} ${year}`;
}
export default createDateString;

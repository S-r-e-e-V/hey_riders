function CalculateTime(decimalTime) {
  // Extract hours and minutes
  var hours = Math.floor(decimalTime);
  var minutes = Math.round((decimalTime - hours) * 60);

  // Format the output
  var timeString = hours;
  if (minutes > 9) {
    timeString += ":" + minutes + " hr";
  } else if (minutes > 0) {
    timeString += ":0" + minutes + " hr";
  } else {
    timeString += ":00 hr";
  }

  return timeString;
}
function addTimeToDate(currentDate, hoursToAdd) {
  let date = new Date(currentDate);
  let hours = Math.floor(hoursToAdd);
  let minutes = (hoursToAdd - hours) * 60;

  date.setHours(date.getHours() + hours);
  date.setMinutes(date.getMinutes() + minutes);

  return date;
}
export { CalculateTime, addTimeToDate };

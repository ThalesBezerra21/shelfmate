const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const readableDate = date => months[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear();

const dateStringToObject = str => new Date(str.slice(0, 10));

export { readableDate, dateStringToObject }
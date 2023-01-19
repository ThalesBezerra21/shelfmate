const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                'July', 'August', 'September', 'October', 'November', 'December'];

const readableDate = date => months[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear()

export { readableDate }
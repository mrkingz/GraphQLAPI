export const dateFormatter = (date, time) => {
  const date1 = new Date(date)
  let month = date1.getMonth() + 1 // index of month starts from 0
  month = month.toString().length === 1 ? `0${month}` : month
  date = `${date1.getFullYear()}-${month}-${date1.getDate()}`

  let date2 = new Date(time)
  time = `${date2.getHours()}:${date2.getMinutes()}:${date2.getSeconds()}.${date2.getMilliseconds()}`

  return `${date}T${time}`
}

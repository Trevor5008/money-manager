export const getDate = (day) => {
    return day.hasOwnProperty("$d") ? day.$d : day
}

export const getDailyTransactions = (day, userTransactions) => {
    const date = getDate(day)

    return userTransactions ? userTransactions.flatMap((item) => {
        return item.transactionOccurrences.filter(
           (occur) => {
              const currentDate = new Date(
                 occur.date
              )
              const sameMonth =
                 currentDate.getMonth() ===
                 date.getMonth()
              const sameDay =
                 currentDate.getUTCDate() ===
                 date.getDate()
              const sameYear =
                 currentDate.getFullYear() ===
                 date.getFullYear()

              return (
                 sameMonth &&
                 sameDay &&
                 sameYear
              )
           }
        )
     }) : null
}

export const findIncomeAndExpenseItems = (items) => {
    const expenseItems = items?.filter(
       (item) => {
          return item.amount[0] === "-"
       }
    )
    const incomeItems = items?.filter((item) => {
       return item.amount[0] !== "-"
    })

    return [expenseItems, incomeItems]
 }
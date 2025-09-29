export const getMonthName = (month: number): string => {
  const months = [
    "JANEIRO",
    "FEVEREIRO",
    "MARÇO",
    "ABRIL",
    "MAIO",
    "JUNHO",
    "JULHO",
    "AGOSTO",
    "SETEMBRO",
    "OUTUBRO",
    "NOVEMBRO",
    "DEZEMBRO",
  ]
  return months[month - 1]
}

export const formatMonthYear = (month: number, year: number): string => {
  return `${getMonthName(month)} ${year}`
}

export const getCurrentMonth = (): { month: number; year: number } => {
  const now = new Date()
  return {
    month: now.getMonth() + 1,
    year: now.getFullYear(),
  }
}

export const getAdjacentMonths = (month: number, year: number) => {
  const prevMonth = month === 1 ? 12 : month - 1
  const prevYear = month === 1 ? year - 1 : year
  const nextMonth = month === 12 ? 1 : month + 1
  const nextYear = month === 12 ? year + 1 : year

  return {
    prev: { month: prevMonth, year: prevYear },
    next: { month: nextMonth, year: nextYear },
  }
}

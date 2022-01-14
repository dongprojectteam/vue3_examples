export const useDate = () => {
    const makeDateString = (date: Date): string => {
        return (
            date.getFullYear() +
            '-' +
            String((date.getMonth() + 1)).padStart(2, '0') +
            '-' +
            String(date.getDate()).padStart(2, '0')
        )
    }

    const addDay = (cur_date: Date, cnt: number): Date => {
        let date = new Date(cur_date)
        date.setDate(date.getDate() + cnt)
        return date
    }

    const addWeek = (cur_date: Date, cnt: number): Date => {
        let date = new Date(cur_date)
        date.setDate(date.getDate() + cnt * 7)
        return date
    }

    const addMonth = (cur_date: Date, cnt: number): Date => {
        let date = new Date(cur_date)
        date.setMonth(date.getMonth() + cnt)
        return date
    }

    return {
        makeDateString,
        addDay,
        addWeek,
        addMonth
    }
}

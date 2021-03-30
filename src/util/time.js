export const isBeforeNow = (t) => {
    if (!t) {
        return false;
    }

    const [tHour, tMinute] = t.split(':').map((x) => Number(x));

    // get Venezuela hour and minute
    const [currentVEHour, currentVEMinute] = new Date()
        .toLocaleString(['en'], {
            timeZone: 'America/Caracas',
            hour: '2-digit',
            hourCycle: 'h23',
            minute: '2-digit',
        })
        .split(':')
        .map((x) => Number(x));

    return (
        tHour > currentVEHour ||
        (tHour === currentVEHour && tMinute >= currentVEMinute)
    );
};

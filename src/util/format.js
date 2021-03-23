export const formatTime = (t) => {
    const d = new Date(`1995-12-17T${t}:00`);
    return Intl.DateTimeFormat('en', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    }).format(d);
};

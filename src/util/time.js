export const isBeforeNow = (t) => {
    if (!t) {
        return false;
    }

    const d = new Date(`1995-12-17T${t}:00`);
    const now = new Date();
    return (
        d.getHours() > now.getHours() ||
        (d.getHours() === now.getHours() && d.getMinutes() >= now.getMinutes())
    );
};

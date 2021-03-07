export const formatMoney = (number) => {
    return `Bs. ${formatNumber(number)}`;
};

export const formatNumber = (number) => {
    return new Intl.NumberFormat('es-VE').format(number);
}

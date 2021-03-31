import { get } from '../util/request';

export const listTickets = async (date) => {
    const res = await get(`/v1/reports/tickets`, { params: { date } });

    return res.data;
};

export const listAwards = async (date, type) => {
    const res = await get(`/v1/reports/awards`, {
        params: { date, tipo: Number(type) },
    });

    return res.data;
};

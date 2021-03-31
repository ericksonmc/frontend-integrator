import { get } from '../util/request';

export const listTickets = async (date) => {
    const res = await get(`/v1/reports/tickets`, { params: { date } });

    return res.data;
};

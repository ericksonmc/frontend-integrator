import { get } from '../util/request';

export const listTickets = async (date) => {
    const res = await get('/v1/reports/consult_tickets', {
        params: { date_from: date },
    });

    return res.data;
};

export const listAwards = async (date) => {
    const res = await get('/v1/reports/lotery_results', {
        params: { date_from: date },
    });

    return res.data;
};

export const listRegulations = async () => {
    const res = await get('/v1/reports/regulations');

    return res.data;
};

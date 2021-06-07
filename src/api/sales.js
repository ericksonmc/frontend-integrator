import { post } from '../util/request';

export const sales = async (sale) => {
    const res = await post(`/v1/ventas/ventas_externos`, sale);

    return res.data;
};

const Sales = { sales };

export default Sales;

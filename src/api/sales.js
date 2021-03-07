import { post } from '../util/request';

export const sales = async ({ amount, bets, ced, email, date }) => {
    const sale = {
        monto_total: amount,
        jug: bets,
        fec: date,
        ced: ced,
        correo: email,

        // hardcoded
        nom: 'pv_cda Mis tres hijos',
        ts: 1,
        compress: false,
        ncanje: 0,
        mcanje: 0,
        cupon: '',
        usa_cupon: false,
        app: 1,
        jp: 'H',
        ani: true,
        tip: 'N',
        uti: 0,
        cod: 360,
        ven: 1,
        ani_tipo: 0,
        producto_id: 2,
        beneficiencia: 'LOTERIA DEL ZULIA',
        cda: true,
        cajero_id: 68,
        online: true,
    };
    const res = await post(`/v1/sales`, sale);

    return res.data;
};

const Sales = { sales };

export default Sales;

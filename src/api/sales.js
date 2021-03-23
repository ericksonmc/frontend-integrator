import { post } from '../util/request';

export const sales = async ({ bets, date, tip, aniTipo, ani }) => {
    const sale = {
        ani,
        tip,
        jug: bets,
        fec: date,
        ani_tipo: aniTipo,

        // hardcoded
        ced: '',
        correo: '',
        nom: '',
        ts: 1,
        compress: false,
        cupon: '',
        usa_cupon: false,
        app: 5,
        jp: 'H',
        uti: 0,
        cod: 250,
        ven: 1,
        producto_id: 5,
        beneficiencia: '',
    };
    const res = await post(`/v1/ventas/ventas_externos`, sale);

    return res.data;
};

const Sales = { sales };

export default Sales;

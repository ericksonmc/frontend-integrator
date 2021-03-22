import { post } from '../util/request';

export const sales = async ({ amount, bets, ced, email, date }) => {
    // return {
    //     cmd: 'C10',
    //     nt: 258,
    //     ticket:
    //         'DATAWEB C.A\nR.I.F...: J-297537775\nTicket: 258 (ORIGINAL)\nSerial/S: 848858998\nFecha/Hora: 21/03/2021 18:54\n--------------------------------\nZulia 7AZulia 7BCalient7B\nCalient7A\n142 133 X 10000.0\n--------------------------------\nImpuesto: 0.0\nJugadas: 8 Total: 80000.0\n',
    //     ticket_string:
    //         'DATAWEB C.A\nR.I.F...: J-297537775\nTicket: 258 (ORIGINAL)\nSerial/S: 848858998\nFecha/Hora: 21/03/2021 18:54\n--------------------------------\nZulia 7AZulia 7BCalient7B\nCalient7A\n142 133 X 10000.0\n--------------------------------\nImpuesto: 0.0\nJugadas: 8 Total: 80000.0\n',
    //     cajero_web: {
    //         saldo_actual: '-451914.0',
    //         id: 68,
    //         saldo_anterior: '-371914.0',
    //         monto_ultima_operacion: '80000.0',
    //         estructura_id: 249,
    //         created_at: '2020-09-10T13:49:49.432-04:00',
    //         updated_at: '2021-03-21T18:55:04.294-04:00',
    //         monto_vip: 0,
    //         credito: 370000,
    //         es_credito: true,
    //         referencia_credito: 20000000,
    //         efectivo: true,
    //     },
    //     cupon: null,
    // };
    const sale = {
        jug: bets,
        fec: date,

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
        ani: false,
        tip: 'T',
        uti: 0,
        cod: 250,
        ven: 1,
        ani_tipo: 5,
        producto_id: 5,
        beneficiencia: '',
        cda: true,
    };
    const res = await post(`/v1/ventas/ventas_externos`, sale);

    return res.data;
};

const Sales = { sales };

export default Sales;

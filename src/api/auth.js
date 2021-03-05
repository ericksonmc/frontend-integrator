import { post, destroy } from '../util/request';

export const tokenLogin = async (token) => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(testData);
        }, 5000);
    });
    // const res = await post(`/auth/auto_login?token=${token}`);

    // return res.data;
};

export const logout = async () => {
    const res = await destroy('/aut/logout');

    return res.data;
};

const Auth = { tokenLogin, logout };

export default Auth;

const testData = {
    player: {
        id: 1,
        email: 'erick2109@gmail.com',
        cedula: '20236734',
        player_id: '346',
        company: 'dataweb ca',
        site: 'www.centrodeapuestas.com',
        integrator_id: 1,
        created_at: '2021-03-02T23:47:53.967-04:00',
        updated_at: '2021-03-02T23:47:53.967-04:00',
    },
    producst: [
        {
            id: 5,
            nombre: 'Zulia',
            sorteos: [
                {
                    id: 26,
                    nombre: 'Zulia12A',
                    nombre_largo: 'Triple Zulia A 12:45PM',
                    horac_ls: '12:40',
                    horac_d: '',
                },
                {
                    id: 27,
                    nombre: 'Zulia12B',
                    nombre_largo: 'Triple Zulia B 12:12PM',
                    horac_ls: '12:40',
                    horac_d: '',
                },
                {
                    id: 68,
                    nombre: 'Zulia12C',
                    nombre_largo: 'Triple Zulia C 12:45PM',
                    horac_ls: '12:40',
                    horac_d: '',
                },
                {
                    id: 28,
                    nombre: 'Triptz-12',
                    nombre_largo: 'Zulia Tripletazo 12:45M',
                    horac_ls: '12:40',
                    horac_d: '',
                },
                {
                    id: 29,
                    nombre: 'Zulia 4A',
                    nombre_largo: 'Triple Zulia A 4:00PM',
                    horac_ls: '16:40',
                    horac_d: '',
                },
                {
                    id: 30,
                    nombre: 'Zulia 4B',
                    nombre_largo: 'Triple Zulia B 4:00PM',
                    horac_ls: '16:40',
                    horac_d: '',
                },
                {
                    id: 69,
                    nombre: 'Zulia 4C',
                    nombre_largo: 'Triple Zulia C 4:00PM',
                    horac_ls: '16:40',
                    horac_d: '',
                },
                {
                    id: 31,
                    nombre: 'Triptz-4',
                    nombre_largo: 'Zulia Tripletazo 4:00PM',
                    horac_ls: '16:40',
                    horac_d: '',
                },
                {
                    id: 23,
                    nombre: 'Zulia 7A',
                    nombre_largo: 'Triple Zulia A 7:00PM',
                    horac_ls: '18:50',
                    horac_d: '18:50',
                },
                {
                    id: 25,
                    nombre: 'Zulia 7B',
                    nombre_largo: 'Triple Zulia A 7:00PM',
                    horac_ls: '18:50',
                    horac_d: '18:50',
                },
                {
                    id: 70,
                    nombre: 'Zulia 7C',
                    nombre_largo: 'Triple Zulia C 7:00PM',
                    horac_ls: '18:50',
                    horac_d: '18:50',
                },
                {
                    id: 24,
                    nombre: 'Triptz-7',
                    nombre_largo: 'Zulia tripletazo 7:00PM',
                    horac_ls: '18:50',
                    horac_d: '18:50',
                },
            ],
        },
    ],
    lottery_setup: {
        id: null,
        mmt: 10000.0,
        mpj: 10000.0,
        jpt: 500.0,
        mt: 1000.0,
    },
};

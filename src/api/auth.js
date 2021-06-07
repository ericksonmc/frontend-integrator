import { post, destroy } from '../util/request';
import sorteos from './sorteos.json';

export const tokenLogin = async () => {
    const res = await post(`/v1/auth/auto_login`);
    return {
        ...res.data,
        ...transformProducts(res.data.products || sorteos[0]),
    };
};

export const logout = async () => {
    const res = await destroy('/aut/logout');

    return res.data;
};

const Auth = { tokenLogin, logout };

const productNameRegexp =
    /^((?:\w{2,}\s?)+)(?:\s\w)?\s(?:\d+:\d*\s?(?:A|P)\.?M)$/;

function transformProducts(products) {
    const data = {
        triples: {},
        animalitos: {},
    };
    let date;
    let lotteryType;

    for (const product of products) {
        if (product.type === 'TERMINALES') {
            continue;
        }

        lotteryType = product.type === 'ANIMALES' ? 'animalitos' : 'triples';

        if (!data[lotteryType][product.product_id]) {
            data[lotteryType][product.product_id] = {
                id: product.product_id,
                nombre: product.name.match(productNameRegexp)[1],
                sorteos: [],
            };
        }

        date = new Date(product.lotery_hour);

        data[lotteryType][product.product_id]['sorteos'].push({
            id: product.id,
            nombre: product.name,
            nombre_largo: product.name,
            horac: `${date.getHours()}:${date.getMinutes()}`,
            comodin: false,
        });
    }

    return {
        animalitos: Object.values(data.animalitos),
        triples: Object.values(data.triples),
    };
}

export default Auth;

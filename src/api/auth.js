import { post, destroy } from '../util/request';

export const tokenLogin = async () => {
    const res = await post(`/v1/auth/auto_login`);
    return {
        ...res.data,
        ...transformProducts(res.data.producst),
    };
};

export const logout = async () => {
    const res = await destroy('/aut/logout');

    return res.data;
};

const Auth = { tokenLogin, logout };

function transformProducts(products) {
    const data = {
        triples: {},
        animalitos: {},
    };
    let date;
    let lotteryType;
    let productId;

    for (const product of products) {
        productId = product.product_new_id || product.product_id;
        lotteryType = product.type === 'ANIMALES' ? 'animalitos' : 'triples';

        if (!data[lotteryType][productId]) {
            data[lotteryType][productId] = {
                id: productId,
                nombre: product.product_new_name,
                sorteos: [],
                type: product.type,
            };
        }

        date = new Date(product.lotery_hour);

        data[lotteryType][productId]['sorteos'].push({
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

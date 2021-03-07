import { post, destroy } from '../util/request';

export const tokenLogin = async () => {
    const res = await post(`/v1/auth/auto_login`);

    return res.data;
};

export const logout = async () => {
    const res = await destroy('/aut/logout');

    return res.data;
};

const Auth = { tokenLogin, logout };

export default Auth;

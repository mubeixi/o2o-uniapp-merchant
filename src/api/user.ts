import { fetch } from '../common/fetch';

export const getUsersInfo = (data:object = {}, options:any = false) => fetch('get_users_info', data, options);

export const login = (data:object = {}, options:any = false) => fetch('users_login', data, options);

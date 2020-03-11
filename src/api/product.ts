
// 秒杀列表
import { fetch } from '../common/fetch';

export const getFlashSaleList = (data:object = {}, options:any = false) => fetch('get_flashsale', data, options);

// 获取限时抢购
export const getSpikeList = (data:object = {}, options:any = false) => fetch('get_spike_list', data, options);

export const getSpikeProd = (data:object = {}, options:any = false) => fetch('get_spike_prod', data, options);

export const getProductCategory = (data:object = {}, options:any = false) => fetch('pro_cate', data, options);

export const getProductCountInfo = (data:object = {}, options:any = false) => fetch('get_users_info', data, options);


export const getProductDetail = (data:object = {}, options:any = false) => fetch('prod_detail', data, options);

export const getProductList = (data:object = {}, options:any = false) => fetch('get_prod', data, options);

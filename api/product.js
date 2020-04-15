import {
	fetch
} from '@/common/request';

export const getProductList = (param, options) => fetch({act: 'get_prod', param, options})

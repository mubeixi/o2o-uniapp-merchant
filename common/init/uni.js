
import {GetQueryByString, ls} from "../helper";

/**
 * 重写uni.navigateTo
 * @type {uni.navigateTo|*}
 */
let navigateTOCopy = uni.navigateTo;
uni.navigateTo = (opt) => {

    let {url} = opt;
    if (url.indexOf('users_id') === -1) {

        console.log('链接中没有users_id，需要改造');
        let users_id = null, owner_id = null;

        // #ifdef H5
        users_id = GetQueryByString(url, 'users_id');
        // #endif

        //如果连接里面已经有了，就不需要搞事
        if (!users_id) {

            users_id = ls.get('users_id');

            if (users_id) {
                console.log(users_id)

                if (url.indexOf('?') === -1) {
                    url += '?users_id=' + users_id
                } else {
                    url = url.replace(/\?/, '?users_id=' + users_id + '&')
                }


            }
        }


        if (!owner_id) {

            owner_id = ls.get('owner_id');

            if (owner_id) {

                if (url.indexOf('?') === -1) {
                    url += '?owner_id=' + owner_id
                } else {
                    url = url.replace(/\?/, '?owner_id=' + owner_id + '&')
                }


            }
        }

        console.log('owner_id is 2222222222222222222222222 ' + owner_id)


    }


    let endOpt = {...opt, url}
    console.log('endOpt is ', endOpt)
    navigateTOCopy(endOpt)

}

/**
 * 重写uni.redirectTo
 * @type {uni.redirectTo|*}
 */
let redirectToCopy = uni.redirectTo;
uni.redirectTo = (opt) => {

    let {url} = opt;
    if (url.indexOf('users_id') === -1) {


        let users_id = null, owner_id = null;


        // #ifdef H5
        users_id = GetQueryByString(url, 'users_id')
        // #endif

        //如果连接里面已经有了，就不需要搞事
        if (!users_id) {

            users_id = ls.get('users_id');

            if (users_id) {

                if (url.indexOf('?') === -1) {
                    url += '?users_id=' + users_id
                } else {
                    url = url.replace(/\?/, '?users_id=' + users_id + '&')
                }

                console.log('users_id is ' + users_id)

            }
        }

        if (!owner_id) {

            owner_id = ls.get('owner_id');

            if (owner_id) {

                if (url.indexOf('?') === -1) {
                    url += '?owner_id=' + owner_id
                } else {
                    url = url.replace(/\?/, '?owner_id=' + owner_id + '&')
                }


            }
        }

        console.log('owner_id is 2222222222222222222222222 ' + owner_id)

    }

    console.log('url is ' + url);
    let endOpt = {...opt, url}
    console.log('endOpt is ', endOpt)
    redirectToCopy(endOpt)

}

/**
 * 重写uni.switchTab
 * @type {uni.switchTab|*}
 */
let switchTabCopy = uni.switchTab;
uni.switchTab = (opt) => {

    let {url} = opt;
    if (url.indexOf('users_id') === -1) {

        let users_id = null, owner_id = null;


        // #ifdef H5
        users_id = GetQueryByString(url, 'users_id')
        owner_id = GetQueryByString(url, 'owner_id')
        // #endif

        //如果连接里面已经有了，就不需要搞事
        if (!users_id) {

            users_id = ls.get('users_id');

            if (users_id) {

                if (url.indexOf('?') === -1) {
                    url += '?users_id=' + users_id
                } else {
                    url = url.replace(/\?/, '?users_id=' + users_id + '&')
                }

                console.log('users_id is ' + users_id)

            }
        }


        if (!owner_id) {

            owner_id = ls.get('owner_id');

            if (owner_id) {

                if (url.indexOf('?') === -1) {
                    url += '?owner_id=' + owner_id
                } else {
                    url = url.replace(/\?/, '?owner_id=' + owner_id + '&')
                }

            }
        }


    }

    console.log('url is ' + url);
    let endOpt = {...opt, url}
    console.log('endOpt is ', endOpt)
    switchTabCopy(endOpt)

}

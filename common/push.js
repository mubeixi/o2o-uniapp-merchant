// #ifdef APP-PLUS
import {fun} from "./index";
import {isDev} from "./env";

class Push {

    static pushListener = function () {
        var _this = this;
        plus.push.addEventListener("click", function (msg) {
            console.log('click event ', msg)
            switch (msg.payload) {
                case "LocalMSG":
                    //toast('点击本地创建消息启动：')
                    break;
                default:
                    //toast('点击离线推送消息启动：')
                    break;
            }
            if (msg.payload) {
                _this.handle(msg);
            }
        }, false);
        plus.push.addEventListener("receive", function (msg) {
            console.log('receive event ', msg)
            if (msg.aps) {
                // Apple APNS message
                console.log('接收到在线APNS消息')
                return;
            } else {
                console.log('接收到在线透传消息')
            }

            if (isDev) {
                // uni.showModal({
                //     title:'收到推送',
                //     content:'receive event '+JSON.stringify(msg)
                // })
            }


            if (plus.os.name == 'iOS') {
                //如果是自己模拟的消息，没有这个,因为local是自己加的参数
                if (msg.payload && typeof msg.payload != 'string') {
                    _this.notificationMessage(msg);
                }
            } else {
                _this.notificationMessage(msg);
            }
        }, false);
    }


    static cancelPushClear = function () {
        plus.push.clear();
    }

    static handle = function (msg) {
        var _this = this;

        console.log('click handle:', msg)
        //清除ios推送小红点
        _this.cancelPushClear();

        let payloadStr = msg.payload, payload = null;
        if (!payloadStr) {
            return;
        }
        payload = JSON.parse(payloadStr);
        console.log("handle arugment is:", payload)
        // {
        //     "action": "redirect",
        //     "channel": "moneychange",
        //     "content": "转出余额1",
        //     "ext": {
        //     "path": "pages/person/balanceCenter?users_id=wkbq6nc2kc"
        // },
        //     "time": 1573111452,
        //     "title": "余额变动",
        //     "user_id": 48,
        //     "local": 1
        // }

        switch (payload.action) {
            case 'redirect':
                let path = payload.ext.path;
                if (path[0] != '/') {
                    path = '/' + path
                }
                //用这个就不怕是switchTab了
                fun.linkTo({link: path, linkType: 'pushAction'});
                break


        }


    }

    static notificationMessage = function (msg) {

        var content = msg.payload.content ? msg.payload.content : '收到消息';//你要展示的提示

        var _this = this;
        var jsonData = '';
        switch (plus.os.name) {
            case "Android":
                jsonData = eval("(" + msg.payload + ")");
                break;
            case "iOS":
                jsonData = msg.payload;
                break;
        }
        _this.createLocalPushMsg(content, jsonData);
    }

    /**
     *  处理透传消息
     * @param {Object} msg
     * @param {Object} content
     */
    static createLocalPushMsg = function (content, jsonData) {
        //创建一个符合你自己要显示推送通知
        this.createMessage(content, jsonData);
    }


    /**
     *  创建本地推送消息
     * @param {Object} str
     * @param {Object} jsonData
     * @param {Object} options
     */
    static createMessage = function (str, jsonData) {

        var options = {cover: false};


        switch (plus.os.name) {
            case "Android":
                jsonData = jsonData;
                break;
            case "iOS":
                // 、、.eid
                jsonData = jsonData;
                break;
        }

        jsonData.local = 1;//本地模拟的


        console.log('手动添加到通知中心的数据是', jsonData)
        plus.push.createMessage(str, JSON.stringify(jsonData), options);
    }


}

export default Push;
/**
 * 透传消息handle
 * @param type
 * @param info
 */
export const pushHandle = ({type = 'receive', info = {__UUID__: '', title: '', content: '', payload: ''}}) => {

    let {title, content, payload} = info, data = null;

    console.log(info)
    if (!payload) return;
    //data = JSON.parse(payload);
    uni.showModal({
        title: title,
        content: JSON.stringify(payload)
    })

    //data = {action:"navigateTo",confirmText:"跳转到页面",data:"/pages/classify/result"};

}
// #endif

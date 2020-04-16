import { sleep } from '@/common/helper'

const data = {
  liveNav: [
    {
      title: '全部',
      cid: 0
    }, {
      title: '小吃',
      cid: 0
    }, {
      title: '美食',
      cid: 0
    }, {
      title: '住宿',
      cid: 0
    }, {
      title: '日常',
      cid: 0
    }, {
      title: '旅游',
      cid: 0
    }
  ],
  liveList: [
    {
      id: 1,
      title: '王师傅单人份早餐美味营养回头客多单人份早餐美味营养...',
      selling_price: 158.00,
      market_price: 666.00,
      sale_count: 4343,
      tags: ['营养', '卫生干净'],
      thumb: 'https://new401t.bafangka.com/uploadfiles/wkbq6nc2kc/image/202003231121596330.png'
    },
    {
      id: 1,
      title: '王师傅单人份早餐美味营养回头客多单人份早餐美味营养...',
      selling_price: 158.00,
      market_price: 666.00,
      sale_count: 4343,
      tags: ['营养', '卫生干净'],
      thumb: 'https://new401t.bafangka.com/uploadfiles/wkbq6nc2kc/image/202003231121596330.png'
    },
    {
      id: 1,
      title: '王师傅单人份早餐美味营养回头客多单人份早餐美味营养...',
      selling_price: 158.00,
      market_price: 666.00,
      sale_count: 4343,
      tags: ['营养', '卫生干净'],
      thumb: 'https://new401t.bafangka.com/uploadfiles/wkbq6nc2kc/image/202003231121596330.png'
    },
    {
      id: 1,
      title: '王师傅单人份早餐美味营养回头客多单人份早餐美味营养...',
      selling_price: 158.00,
      market_price: 666.00,
      sale_count: 4343,
      tags: ['营养', '卫生干净'],
      thumb: 'https://new401t.bafangka.com/uploadfiles/wkbq6nc2kc/image/202003231121596330.png'
    },
    {
      id: 1,
      title: '王师傅单人份早餐美味营养回头客多单人份早餐美味营养...',
      selling_price: 158.00,
      market_price: 666.00,
      sale_count: 4343,
      tags: ['营养', '卫生干净'],
      thumb: 'https://new401t.bafangka.com/uploadfiles/wkbq6nc2kc/image/202003231121596330.png'
    },
    {
      id: 1,
      title: '王师傅单人份早餐美味营养回头客多单人份早餐美味营养...',
      selling_price: 158.00,
      market_price: 666.00,
      sale_count: 4343,
      tags: ['营养', '卫生干净'],
      thumb: 'https://new401t.bafangka.com/uploadfiles/wkbq6nc2kc/image/202003231121596330.png'
    }
  ],
  goodsList: [
    {
      id: 1,
      title: '北欧四件套全棉纯棉床上用品宿舍...',
      selling_price: 158.00,
      thumb: 'https://newo2o.bafangka.com/uploadfiles/wkbq6nc2kc/image/202004161751572025.png',
      discount: 2.5
    },
    {
      id: 2,
      title: '北欧四件套全棉纯棉床上用品宿舍...',
      selling_price: 158.00,
      thumb: 'https://newo2o.bafangka.com/uploadfiles/wkbq6nc2kc/image/202004161751572025.png',
      discount: 0
    },
    {
      id: 3,
      title: '北欧四件套全棉纯棉床上用品宿舍...',
      selling_price: 158.00,
      thumb: 'https://newo2o.bafangka.com/uploadfiles/wkbq6nc2kc/image/202004161751572025.png',
      discount: 0
    },
    {
      id: 4,
      title: '北欧四件套全棉纯棉床上用品宿舍...',
      selling_price: 158.00,
      thumb: 'https://newo2o.bafangka.com/uploadfiles/wkbq6nc2kc/image/202004161751572025.png',
      discount: 0
    },
    {
      id: 5,
      title: '北欧四件套全棉纯棉床上用品宿舍...',
      selling_price: 158.00,
      thumb: 'https://newo2o.bafangka.com/uploadfiles/wkbq6nc2kc/image/202004161751572025.png',
      discount: 5.6
    },
    {
      id: 6,
      title: '北欧四件套全棉纯棉床上用品宿舍...',
      selling_price: 158.00,
      thumb: 'https://newo2o.bafangka.com/uploadfiles/wkbq6nc2kc/image/202004161751572025.png',
      discount: 0
    }
  ],
  slide: {
    imgs: [
      'https://new401t.bafangka.com/uploadfiles/wkbq6nc2kc/image/202003221654033886.png',
      'https://qingclouds-server.oss-cn-shanghai.aliyuncs.com/695d1d409a77d695/ffd56752966467a7.jpg',
      'https://qingclouds-server.oss-cn-shanghai.aliyuncs.com/db51fa901ed2c3b9/5514f2e17bbaf475.jpg']
  },
  navs: [
    {
      title: '限时抢',
      name: 'iconxianshi',
      src: '/static/home/xianshi.png',
      size: 44,
      color: '#26C78D'
    },
    {
      title: '1小时达',
      name: 'iconqiandao',
      src: '/static/home/quickly.png',
      size: 44,
      color: '#ae48c7'
    },
    {
      title: '享免单',
      name: 'iconsong',
      src: '/static/home/nopay.png',
      size: 44,
      color: '#3345c7'
    },
    {
      title: '分享赚',
      name: 'iconmiandan',
      src: '/static/home/share.png',
      size: 44,
      color: '#3bc734'
    },
    {
      title: '签到',
      name: 'iconfenxiang1',
      src: '/static/home/signin.png',
      size: 44,
      color: '#c7596c'
    }
  ]
}

export default class Mock {
  static getData (name) {
    return data[name]
  }

  static getDataByRequest (name, time = 1000) {
    return sleep(this.getData, name, time)
  }
}

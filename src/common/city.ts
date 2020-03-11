// import Area from './tool/area.js'
// export class City {
//
//   static getProvinceList = ()=>{
//     let rt = Area.map(item=>{
//       return item.name
//     })
//     return rt
//   }
//
//   static getCityList = (pName)=>{
//     let citys = []
//     for(var province of Area){
//       if(province.name === pName){
//         citys = province.city
//       }
//     }
//
//     let rt = citys.map(city=>{
//       return city.name
//     })
//     return rt
//   }
//
//   static getAreaList = (pName,cName)=>{
//
//     let citys = []
//     for(var province of Area){
//       if(province.name === pName){
//         citys = province.city
//       }
//     }
//
//     let cityInfo = null
//     for(var city of citys){
//       if(city.name === cName){
//         cityInfo = city
//       }
//     }
//     console.log(cityInfo)
//
//     let rt = []
//     if(cityInfo && cityInfo.hasOwnProperty('districtAndCounty')){
//       rt = cityInfo.districtAndCounty
//     }
//
//
//     return rt
//   }
//
// }


// @ts-ignore
import { area } from 'tool/areaData';
import { array_change } from './utils';

const areaData = area[0];

export class City {
  // 直接返回
  static getProvinceList = () => {
    const rt = areaData['0'];
    return array_change(rt);
  }

  static getCityList = (pIdx: any) => {
    const citys = [];
    console.log(`0,${pIdx}`);
    const rt = areaData[(`0,${pIdx}`)];
    return array_change(rt);
    // for(var province of Area){
    //     if(province.name === pName){
    //         citys = province.city
    //     }
    // }
    //
    // let rt = citys.map(city=>{
    //     return city.name
    // })
    // return rt
  }

  static getAreaList = (pIdx: any, cIdx: any) => {
    // let citys = []
    // for(var province of Area){
    //     if(province.name === pName){
    //         citys = province.city
    //     }
    // }
    //
    // let cityInfo = null
    // for(var city of citys){
    //     if(city.name === cName){
    //         cityInfo = city
    //     }
    // }
    // console.log(cityInfo)

    const rt = areaData[`0,${pIdx},${cIdx}`];
    console.log(rt);

    return array_change(rt);
  }
}

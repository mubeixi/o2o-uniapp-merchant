import Vue from 'vue'
import {staticUrl} from "./env";

export const domainFn = (url) => {
  if (!url) return '';
  if (url.indexOf('http') == -1) return staticUrl + url;
  return url;
}
export const formatRichTextByUparseFn = (html)=>{

  if(!html) return;
  let newContent= html.replace(/<embed[^>]*>/gi,function(match,capture){
    match = match.replace(/type="[^"]+"/gi, '')//.replace(/width='[^']+'/gi, '');
    // x5-video-player-type="h5-page" 同层播放
    match = match.replace(/embed/gi, 'video x5-video-player-type="h5-page"')
    match = match.replace(/width="[^"]+"/gi, '')//.replace(/width='[^']+'/gi, '');
    match = match.replace(/height="[^"]+"/gi, '')//.replace(/width='[^']+'/gi, '');

    match = match.replace(/autostart="[^"]+"/gi, '')
    match = match.replace(/loop="[^"]+"/gi, '')

    match = match.replace(/\/>/gi, '></video>')

    //相对地址
    match = match.replace(/src="\/uploadfiles/gi, `src="${staticUrl}/uploadfiles`)
    return match;
  });


  newContent= newContent.replace(/<oembed[^>]*>/gi,function(match,capture){
    match = match.replace(/type="[^"]+"/gi, '')//.replace(/width='[^']+'/gi, '');
    match = match.replace(/oembed/gi, 'video x5-video-player-type="h5-page"')
    match = match.replace(/width="[^"]+"/gi, '')//.replace(/width='[^']+'/gi, '');
    match = match.replace(/height="[^"]+"/gi, '')//.replace(/width='[^']+'/gi, '');
    match = match.replace(/url/gi, 'src')

    match = match.replace(/\/>/gi, '></video>')
    // //相对地址
    match = match.replace(/="\/uploadfiles/gi, `="${staticUrl}/uploadfiles`)
    return match;
  });
  newContent = newContent.replace(/oembed/gi, 'video');

  return newContent
}
const cutstrFn = (str, len, tip) => {
  if (!str) return '';
  console.log(str, len, tip)
  if (str.length < len) return str;
  return str.substring(0, len) + tip
}

/**
 * 这样申明对编辑器友好一些
 */
Vue.filter('domain', domainFn)
Vue.filter('cutstr', cutstrFn)
Vue.filter('formatRichTextByUparse', formatRichTextByUparseFn)

Vue.filter('zero', (val) => {
  return val ? val : 0
})

Vue.filter('num2px', (val) => {
  if (val.indexOf('px') == -1) return `${val}px`;
  return val;
})

Vue.filter('formStampTime', (start_timeStamp, end_timeStamp, type) => {
  let data = getCountdownFunc({start_timeStamp, end_timeStamp}), rt = null;
  console.log(data)
  switch (type) {
    case 'd':
      rt = data.d;
      break;
    case 'h':
      rt = data.h;
      break;
    case 'm':
      rt = data.m;
      break;
    case 's':
      rt = data.s;
      break;
    case 'is_start':
      rt = data.is_start ? '结束' : '开始';
      break;
  }
  return rt;
})


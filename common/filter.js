import Vue from 'vue'
import { staticUrl } from './env'
import moment from 'moment'

Vue.filter('domain', (url) => {
  if (!url) return ''
  if (url.indexOf('http') === -1) return staticUrl + url
  return url
})

Vue.filter('formatTime', (str, fromatStr = 'YYYY.MM.DD') => {
  return moment(str).format(fromatStr)
})


Vue.filter('formatTimeFromNow', (str) => {
  return moment(str).startOf('day').fromNow()
})

export const formatRichTextByUparseFn = (html) => {
  if (!html) return
  let newContent = html.replace(/<embed[^>]*>/gi, function (match, capture) {
    match = match.replace(/type="[^"]+"/gi, '')// .replace(/width='[^']+'/gi, '');
    // x5-video-player-type="h5-page" 同层播放
    match = match.replace(/embed/gi, 'video x5-video-player-type="h5-page"')
    match = match.replace(/width="[^"]+"/gi, '')// .replace(/width='[^']+'/gi, '');
    match = match.replace(/height="[^"]+"/gi, '')// .replace(/width='[^']+'/gi, '');

    match = match.replace(/autostart="[^"]+"/gi, '')
    match = match.replace(/loop="[^"]+"/gi, '')

    match = match.replace(/\/>/gi, '></video>')

    return match
  })

  newContent = newContent.replace(/<oembed[^>]*>/gi, function (match, capture) {
    match = match.replace(/type="[^"]+"/gi, '')// .replace(/width='[^']+'/gi, '');
    match = match.replace(/oembed/gi, 'video x5-video-player-type="h5-page"')
    match = match.replace(/width="[^"]+"/gi, '')// .replace(/width='[^']+'/gi, '');
    match = match.replace(/height="[^"]+"/gi, '')// .replace(/width='[^']+'/gi, '');
    match = match.replace(/url/gi, 'src')

    match = match.replace(/\/>/gi, '></video>')

    return match
  })

  // 替换地址
  newContent = newContent.replace(/="\/uploadfiles/gi, `="${staticUrl}/uploadfiles`)

  // newContent= newContent.replace(/<img[^>]*>/gi,function(match,capture){
  //   match = match.replace(/style="[^"]+"/gi, '')//.replace(/style='[^']+'/gi, '');
  //   match = match.replace(/width="[^"]+"/gi, '')//.replace(/width='[^']+'/gi, '');
  //   match = match.replace(/height="[^"]+"/gi, '')//.replace(/height='[^']+'/gi, '');
  //
  //   //图片app不支持
  //   // #ifdef APP-PLUS
  //   match = match.replace(/!*.webp/gi, '')
  //   // #endif
  //
  //   return match;
  // });

  // newContent = newContent.replace(/\<img/gi, '<img style="width:100%;vertical-align:middle"');

  newContent = newContent.replace(/oembed/gi, 'video')

  return newContent
}

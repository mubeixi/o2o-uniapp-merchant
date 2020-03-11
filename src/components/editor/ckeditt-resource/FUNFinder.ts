import store from '../../../store';

const { finderDialogInstance } = store.state;
const noop = () => {};
export class FUNFinder {
  constructor(opt) {

  }

  /**
   *
   * @param options 控制选择的多少
   * @param editor
   * @param callFn
   */
  static open({ options = {}, editor = null, callFn = noop }) {
    finderDialogInstance.callFn = callFn;

    const { limit = false, allow = ['image', 'media'] } = options;

    if (limit) {
      finderDialogInstance.limit = limit;
    }
    // 默认允许图片和视频
    finderDialogInstance.allow = allow;

    finderDialogInstance.visible = true;
  }

  // static select_fn(urls){
  //   finderDialogInstance.callFn.choose(urls)
  // }
}

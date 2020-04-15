import {
  toast, linkTo, error, modal
} from '@/common/fun'

export default {
  methods: {
    $toast: toast,
    $error: error,
    $modal: modal,
    $linkTo: linkTo
  }
}

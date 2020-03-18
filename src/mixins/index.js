export default {
  data: {
    mixin: 'PageMin'
  },
  methods: {
    mixintap () {
      this.mixin = 'MixinText' + (Math.random() + '').substring(3, 7);
      console.log('mixin method tap');
    },
    tap () {
      console.log('tap in mixin');
    }
  },
  created () {
    console.log('created in mixin');
  }
}

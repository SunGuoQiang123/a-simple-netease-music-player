<template>
  <div id="sliderBtn"
    :style="btnStyle"
  >
  </div>
</template>
<script>
export default {
  name: "sliderBtn",
  data: function data() {
    return {

    }
  },
  computed: {
    btnStyle () {
      return {
        left:this.value,
        position: 'absolute',
        top:0,
        width:'30px',
        height:'30px',
        border-radius:'15px'
      }
    }
  }
  props: {
    value: {
      type: String,
      default: '0%'
    }
  },
  // methods: {
  //   setPosition (value) {
  //     this.value = value
  //   }
  // }
}
</script>
<style>
</style>

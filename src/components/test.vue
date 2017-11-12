<template>
  <div id="test">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: "tes",
  data: function data() {
    return {

    }
  },
  created () {
    console.log('child component renders')
  },
  destroyed: function destroyed() {
    //do something after destroying vue instance
    console.log('child component destroyed')
  }
}
</script>
<style>
</style>

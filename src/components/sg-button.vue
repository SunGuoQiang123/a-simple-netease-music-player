<template>
  <button id="sg-button" :autofocus='autoFocus' :disabled='disabled'>
    <slot></slot>
  </button>
</template>
<script>
export default {
  name: "sg-button",
  data: function data() {
    return {

    }
  },
  props: {
    autoFocus: Boolean,
    disabled: Boolean
  }
}
</script>
<style>
</style>

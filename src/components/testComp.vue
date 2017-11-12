<template>
  <div id="testComp">
    <span>this is a test component</span>
    <p ref='price'>{{price}}</p>
    <a href="javascript:void 0" @click='addPrice'>add price</a>
    <a href="javascript:void 0" @click='visible = !visible'>toggle visible</a>
    <ul>
      <li v-for='(item, index) in list' :key='index' ref='numbers'>{{item}}</li>
    </ul>
  </div>
</template>
<script>
let list = Array.from({length:10},(value,key) => key)
import test from './test'
export default {
  name: "testComp",
  props:['items'],
  // render (h) {
  //   console.log('start render')
  //   this.status = new Date()
  //   let self = this
  //   return h ('input', {
  //     attrs: {
  //       id: 'testComp',
  //       value: self.price
  //     },
  //     on: {
  //       input: function (e) {
  //         self.price = e.target.value
  //         self.$emit('input', e.target.value)
  //       }
  //     }
  //   })
  // },
  data: function data() {
    return {
      price: 0,
      status: 'a',
      visible:true,
      list:list
    }
  },
  methods:{
    log (event) {
      console.log(event)
      this.$forceUpdate()
    },
    addPrice () {
      this.$destroy()
    }
  },
  created () {
    console.log('this component has been created')
    console.log()
  },
  destroyed: function destroyed() {
    //do something after destroying vue instance
    console.log('this.component has been destroyed')
  },
  mounted: function mounted() {
    //do something after mounting vue instance
    console.log(this.$refs)
  },
  updated: function updated() {
    //do something after updating vue instance
    console.log('cmponent updated')
  },
  components:{test}
}
</script>
<style>
  [v-cloak]{
    display:none;
  }
</style>

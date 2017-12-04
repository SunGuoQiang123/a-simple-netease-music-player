<template>
  <div id="slider">
    <div class="slider__runway"
      @click='handleSliderClick'
      ref='slider'
    >
      <div class="slider__curBar" :style='curStyle'>

      </div>
      <div class="slider__rdyBar" :style="rdyStyle">

      </div>
      <div class="slider__button" ref='sliderBtn' :style='btnStyle' @mousedown='handleMouseDown'>

      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "slider",
  data: function data() {
    return {
      dragging: false
    }
  },
  props: {
    min:{
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 100
    },
    step: {
      type: Number,
      defalt: 1
    },
    value:{
      type: Number,
      default:0
    },
    rdyTime:{
      type:Number,
      default:0
    }
  },
  methods: {
    handleSliderClick (e) {
      if (this.dragging) return
      const offsetLeft = this.$refs.slider.getBoundingClientRect().left
      const sliderSize = this.$refs.slider.clientWidth
      let targetPercent = (e.clientX - offsetLeft)/sliderSize*100
      let targetValue = this.min + targetPercent * (this.max - this.min)/100
      this.setValue(targetValue)
    },
    handleMouseDown () {
      // console.log(111)
      this.dragging = true
      window.addEventListener("mousemove", this.handleMouseMove)
      window.addEventListener('mouseup', this.handleMouseUp)
    },
    handleMouseMove (e) {
      // console.log('mosuemove happened','   ',e.clientX)
      const sliderSize = this.$refs.slider.clientWidth
      let percent = (e.clientX - this.$refs.slider.getBoundingClientRect().left)/sliderSize*100
      let value = this.min + percent * (this.max-this.min)/100
      this.setValue(value)
    },
    handleMouseUp (e) {
      // console.log('mouseup happened','    ',e.clientX)
      setTimeout(() => {
        this.dragging = false
      },0)
      window.removeEventListener("mousemove",this.handleMouseMove)
      window.removeEventListener('mouseup', this.handleMouseUp)
    },
    setValue (value) {
      if (value < this.min) {
        value = this.min
      } else if (value > this.max) {
        value = this.max
      }
      if (value !== this.value) {
        this.$emit('change',value)
      }
    }
  },
  computed: {
    curStyle () {
      return {
        width: (this.value-this.min)/(this.max-this.min)*100 + '%'
      }
    },
    rdyStyle () {
      return {
        width: (this.rdyTime-this.min)/(this.max-this.min)*100+'%'
      }
    },
    btnStyle () {
      return {
        left: (this.value-this.min)/(this.max-this.min)*100 + '%'
      }
    }
  }
}
</script>
<style scoped>
  #slider{
    position:relative;
    width:493px;
    height:9px;
    background:url('../assets/statbar.png');
    background-position:right 0;
  }
  .slider__runway{
    height:9px;
  }
  .slider__curBar{
    position:absolute;
    left:0;
    top:0;
    background:url('../assets/statbar.png');
    background-position:left -66px;
    height:9px;
  }
  .slider__rdyBar{
    position:absolute;
    left:0;
    top:0;
    height:9px;
    background:url('../assets/statbar.png');
    background-position: right -30px;
  }
  .slider__button{
    position:absolute;
    top:-7px;
    width:22px;
    height:24px;
    background:url('../assets/iconall.png');
    background-position:-3px -250px;
    transform:translate3d(-8px,0,0);
  }
  .slider__button:hover{
    background-position:-3px -280px;
  }
</style>

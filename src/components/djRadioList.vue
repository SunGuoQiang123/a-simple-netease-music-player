<template>
  <div id="djRadioList">
    <h2 class="radioListTitle">
      主播电台
    </h2>
    <ul>
      <li v-for='(djRadio, index) of djRadios' class="djRadio" :key='index'>
        <a class="radio-cover" href='javascript:void(0)'>
          <img :src="djRadio.picUrl" alt="radioCover">
        </a>
        <a href='javascript:void(0)' class='deco djRadio-name' v-html='djRadio.name'></a>
        <span>
          <a class='djRadio-creater deco' href='javascript:void 0'>{{djRadio.dj.nickname}}</a>
          <i class='icon-gender':class='[djRadio.dj.gender === 2 ? "icon-gender-female" : "icon-gender-male"]' v-if='djRadio.dj.gender'></i>
        </span>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "djRadioList",
  computed: {
    djRadios () {
      return this.$store.state.searchResult.djRadioList
    }
  },
  data: function data() {
    return {

    }
  }
}
</script>
<style lang='scss' scoped>
  $color:'#333';
  .radioListTitle{
    color:#333;
    border-bottom:1px solid #dadada;
    padding-bottom:8px;
    font-size:12px;
    margin-top:40px;
  }
  #djRadioList ul{
    display:flex;
    flex-wrap: wrap;
    margin:16px 0 0 -37px;
  }
  .djRadio{
    display:flex;
    flex-direction: column;
    margin:0 0 40px 37px;
    img{
      width:150px;
      height:150px;
    }
    .djRadio-name{
      line-height:16px;
      margin:13px 0 6px;
      font-size:14px;
    }
    span{
      color:#999;
      font-size:12px;
      .icon-gender-female{
        background: url('../assets/icon.png') no-repeat -70px 0;
      }
      .icon-gender-male{
        background: url('../assets/icon.png') no-repeat -70px -20px;
      }
      .icon-gender{
        width:14px;
        height:15px;
        display:inline-block;
        overflow:hidden;
        vertical-align: middle;
        margin-left:6px;
      }
    }
    .djRadio-creater{
      color:$color;
    }
  }
</style>

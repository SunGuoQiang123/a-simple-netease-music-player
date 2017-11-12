<template>
  <div id="playList">
    <ul class='playList'>
      <li v-for='(list, index) of playlists' :key='index'>
        <div class="list-items">
          <span class="w-1 list-play" @click='playList(list)'></span>
          <div class='list-cover'>
            <img :src="list.coverImgUrl">
          </div>
          <div class="list-name w-8">
            <a href="#" class='deco' v-html='list.name'>{{list.name}}</a>
            <span class='list-operations'></span>
          </div>
          <span class="c-9 w-2 songCount">{{list.trackCount}}首</span>
          <span class="w-6 list-creator">by &nbsp;<a href="#" class="deco">{{list.creator.nickname}}</a></span>
          <span class="w-4 c-9 list-item">收藏 : {{list.bookCount | numFormat}}</span>
          <span class="w-4 c-9 list-item">收听 : {{list.playCount | numFormat}}</span>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "playList",
  computed: {
    playlists () {
      return this.$store.state.searchResult.playList
    }
  },
  created: function created() {
    //do something after creating vue instance
    console.log('playlist renders')
  },
  methods: {
    playList (list) {
      this.$store.dispatch({
        type:'playList',
        list:list
      })
    }
  },
  data: function data() {
    return {

    }
  },
  filters: {
    numFormat (value) {
      return value < 100000 ? value : Math.floor(value*Math.pow(10,-4)) + '万'
    }
  }
}
</script>
<style scoped>
.list-items{
  display:flex;
  align-items: center;
}
.list-cover img{
  // height:50px;
  width:50px;
  display: block;
  padding:0 10px;
}
.c-9{
  color:#999;
}
.w-4{
  width:80px;
}
.w-3{
  width:35px;
}
.w-8{
  width:327px;
}
.playList li{
  padding:5px 0;
  border:1px solid #fff;
}
.playList li:hover{
  background:#f2f2f2;
  border:1px solid #e1e1e1;
}
.playList li:nth-of-type(even){
  background:#f7f7f7;
}
.w-1{
  width:18px;
}
.w-2{
  width:52px;
}
.list-play{
  background:url('../assets/table.png') no-repeat 0 -103px content-box;
  height:18px;
  margin:6px 14px;
}
.list-play:hover{
  background-position:0 -128px;
  cursor: pointer;
}
.list-name{
  padding:0 10px;
}
.list-item{
  padding:0 10px;
}
.songCount{
  text-align:right;
  padding-right:8px;
}
.w-6{
  width:180px
}
.list-creator{
  color:#666;
  padding:0 10px;
}
</style>

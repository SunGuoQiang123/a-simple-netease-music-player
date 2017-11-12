<template>
  <div id="songlist">
    <ul class='songList'>
      <li v-for='(song, index) of songList' :key='index'>
        <div class="songItem">
          <span class='song-play' @click='play(song)'></span>
          <div class="song-info">
            <a href='#' class='deco songName' v-html='song.name'>{{song.name}}</a>
            <a href="#" class='songMv' v-if='song.mv > 0'></a>
          </div>
          <div class="song-handle">
            <a href='#' class='addList'></a>
            <a href='#' class='addCollect'></a>
            <a href='#' class='addShare'></a>
            <a href='#' class='songDownload'></a>
          </div>
          <span class="song-singer"><a href='#' class='deco'>{{songSingers[index]}}</a></span>
          <span class="song-album"><a href="#" class='deco'>《{{song.al.name}}》</a></span>
          <span class='songTime'>{{song.dt | formatTime}}</span>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "songlist",
  data: function data() {
    return {

    }
  },
  methods:{
    play (song) {
      this.$store.dispatch({
        type:'play',
        id:song.id
      })
    }
  },
  computed: {
    songList () {
      return this.$store.state.searchResult.songList
    },
    songSingers () {
      return this.songList.map(song => {
        return song.ar.reduce(function (prev, cur) {
          return prev == '' ? cur.name : prev + ',' + cur.name
        }, '')
      })
    }
  },
  filters: {
    formatTime (value) {
      let totalSeconds = Math.floor(value*Math.pow(10,-3))
      let minutes = Math.floor(totalSeconds/60)
      let seconds = totalSeconds%60
      return (minutes <10 ? '0'+minutes : minutes) + ':' + (seconds < 10 ? '0'+ seconds : seconds)
    }
  }
}
</script>
<style scoped>
  .songItem{
    display:flex;
    align-items: center;
    padding:10px 10px 8px 18px;
  }
  .songItem a{
    display:inline-block;
  }
  .songList li{
    padding:5px 0;
    border:1px solid #fff;
  }
  .songList li:hover{
    background:#f2f2f2;
    border:1px solid #e1e1e1;
  }
  .songList li:nth-of-type(even){
    background:#f7f7f7;
  }
  .song-play{
    background:url('../assets/table.png') no-repeat 0 -103px content-box;
    height:18px;
    width:18px;
    margin-right: 5px;
  }
  .song-play:hover{
    background-position:0 -128px;
    cursor: pointer;
  }
  .song-info{
    width:370px;
    display:flex;
    align-items: center;
  }
  .songMv{
    width:23px;
    height:17px;
    margin-left:4px;
    background:url('../assets/table.png') no-repeat 0 -151px;
  }
  .songMv:hover{
    background-position:-30px -151px;
  }
  .song-handle{
    visibility: hidden;
    width:96px;
    display:flex;
    align-items: center;
    margin-right:5px;
  }
  .songItem:hover .song-handle{
    visibility: visible
  }
  .song-handle a{
    width:13px;
    height:13px;
    margin-right:8px;
  }
  .addList{
    background:url('../assets/icon.png') no-repeat 0 -700px;
    margin-bottom:3px;
  }
  .addList:hover{
    background-position:-22px -700px;
  }
  .song-handle .addCollect{
    background:url('../assets/table.png') no-repeat 0 -174px;
    width:18px;
    height:16px;
  }
  .addCollect:hover{
    background-position:-20px -174px;
  }
  .song-handle .addShare{
    background:url('../assets/table.png') no-repeat 0 -195px;
    width:18px;
    height:16px;
  }
  .addShare:hover{
    background-position: -20px -195px;
  }
  .song-handle .songDownload{
    background:url('../assets/table.png') no-repeat -81px -174px;
    width:18px;
    height:16px;
  }
  .songDownload:hover{
    background-position: -104px -174px;
  }
  .song-singer{
    width:15%;
    margin-right:12px;
  }
  .song-album{
    width:18%;
    margin-right:12px;
    color:#666;
  }
</style>

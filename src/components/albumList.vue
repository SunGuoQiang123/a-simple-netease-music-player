<template>
  <div id="albumList">
    <ul class='albumsList'>
      <li v-for='(album, index) of albums' :key='index'>
        <a href="javascript:void(0)">
          <div class="album_item" @mouseenter='togglePlayButton(album)' @mouseleave='togglePlayButton(album)'>
            <img :src='album.picUrl' :title='album.name' />
            <span :class="[{show_play_button:album.showPlayButton}, 'album_play_button']" @click='playAlbum(album)'>
            </span>
          </div>
        </a>
        <a href='#' class='album_desc deco' v-html='album.name'>{{album.name}}</a>
        <a href="#" class='album_artist album_desc deco'>{{album.artist.name}}</a>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "albumList",
  computed:{
    albums () {
      return this.$store.state.searchResult.albumList
    }
  },
  methods: {
    togglePlayButton (album) {
      album.showPlayButton = !album.showPlayButton
    },
    playAlbum (album) {
      this.$store.dispatch({
        type:'playAlbum',
        album:album
      })
    }
  },
  data: function data() {
    return {

    }
  }
}
</script>
<style scoped>
.albumsList{
  display:flex;
  flex-wrap: wrap;
  margin-left: -33px;
}
.albumsList li{
  display:flex;
  flex-direction: column;
  width:153px;
  padding:0 0 30px 33px;
}
.albumsList li a.album_desc{
  text-overflow: ellipsis;
  overflow:hidden;
  white-space: nowrap;
  display:inline-block;
  color:#000;
  font-size:14px;
  margin:14px 0 6px;
}
.albumsList li a.album_artist{
  color:#666;
  margin:0;
  font-size:12px;
}
.album_item{
  width:100%;
  height:130px;
  position:relative;
  background:url(../assets/coverall.png) no-repeat 0 -845px;
}
.album_item img{
  width:130px;
  height:130px;
  border:0.5px solid #000;
}
.album_item .album_play_button{
  position:absolute;
  bottom:5px;
  right:33px;
  width:28px;
  height:28px;
  display:none;
}
.album_item .show_play_button{
  display:inline-block;
  background:url(../assets/icn_ply2.png) no-repeat;
}
.album_item .show_play_button:hover{
  background:url('../assets/icn_ply2_hvr.png') no-repeat;
}
.searchTab:hover{
  border-top:2px solid #a40011;
}
</style>

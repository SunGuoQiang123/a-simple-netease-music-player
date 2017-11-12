<template>
  <div id="player">
    <audio :src="song.url" controls id='r-player' ref='player' autoplay></audio>
    <div id='s-player'>
      <div class="s-playbar">
        <a href="javascript:void(0)" class="btns prev-btn" @click='playPrev'></a>
        <a href="javascript:void(0)" :class="['btns', isPlaying ? 'play-btn':'pause-btn']" @click='togglePlay'></a>
        <a href="javascript:void(0)" class="btns next-btn" @click='playNext'></a>
      </div>
      <div class="s-cover">

      </div>
    </div>
  </div>
</template>
<script>
import {mapState} from 'vuex'
let player
export default {
  name: "player",
  data: function data() {
    return {
      isPlaying: false
    }
  },
  computed: {
    song: {
      get: function () {
        return this.$store.state.playingSong
      },
      set: function (song) {
        this.$store.dispatch({
          type:'play',
          id:song.id
        })
      }
    },
    playList () {
      return this.$store.state.playingList
    }
  },
  methods: {
    togglePlay () {
      this.isPlaying ? player.pause() : player.play()
      this.isPlaying = !this.isPlaying
    },
    playPrev () {
      let prevIndex = this.playList.findIndex(song => song.id === this.song.id) - 1
      if (prevIndex >= 0) {
        this.song = this.playList[prevIndex]
      }
    },
    playNext () {
      let nextIndex = this.playList.findIndex(song => song.id === this.song.id) + 1
      if (nextIndex < this.playList.length) {
        this.song = this.playList[nextIndex]
      }
    }
  },
  mounted () {
    player = this.$refs.player
    console.dir(player)
    player.onplay = function () {
      this.isPlaying = true
    }
  }
}
</script>
<style scopde>
  #player{
    position:fixed;
    bottom:0;
    right:0;
    left:0;
    background:url(../assets/playbar.png);
    background-position: 0 0;
    height:53px;
  }
  #r-player{
    display:none;
  }
  #s-player{
    width:980px;
    margin:6px auto 0;
    height:47px;
    display:flex;
    align-items: center;
  }
  .btns{
    display:inline-block;
    background:url(../assets/playbar.png);
    margin-right:8px;
  }
  .s-playbar{
    display:flex;
    align-items: center;
  }
  .play-btn{
    width:36px;
    height:36px;
    background-position: 0 -165px;
  }
  .play-btn:hover{
    background-position:-40px -165px;
  }
  .pause-btn{
    width:36px;
    height:36px;
    background-position: 0 -204px;
  }
  .pause-btn:hover{
    background-position:-40px -204px;
  }
  .prev-btn,.next-btn{
    width:28px;
    height:28px;
  }
  .prev-btn{
    background-position:0 -130px;
  }
  .prev-btn:hover{
    background-position: -30px -130px;
  }
  .next-btn{
    background-position: -80px -130px;
  }
  .next-btn:hover{
    background-position: -110px -130px;
  }
</style>

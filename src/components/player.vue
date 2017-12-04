<template>
  <div id="player">
    <audio
      :src="song.url" controls
      id='r-player' ref='player'
      autoplay @play='togglePlayStatus(true)'
      @pause='togglePlayStatus(false)' @ended='playNext'
      @timeupdate='updateTimebar'></audio>
    <div id='s-player'>
      <div class="s-playbar">
        <a href="javascript:void(0)" class="btns prev-btn" @click='playPrev'></a>
        <a href="javascript:void(0)" :class="['btns', isPlaying ? 'play-btn':'pause-btn']" @click='togglePlay'></a>
        <a href="javascript:void(0)" class="btns next-btn" @click='playNext'></a>
      </div>
      <div class="s-cover" href='javascript:void(0)'>
        <img :src="picUrl" alt="" class='s-cover__img' />
        <a href="javascript:void(0)" class='s-cover__a'></a>
      </div>
      <div class="play">
        <div>
          <span>{{songName}}</span><span>{{songArtists}}</span>
        </div>
        <slider :max='totalTime' :min='0' :step='1' v-model='currentTime' class='play__progress' @change='handleChange' :rdyTime='readyTime'></slider>
      </div>
    </div>
  </div>
</template>
<script>
import {mapState} from 'vuex'
import slider from './slider'
let player
export default {
  name: "player",
  data: function data() {
    return {
      isPlaying: false,
      testSlider:0,
      totalTime:0,
      currentTime:0,
      readyTime:0,
    }
  },
  components: {slider},
  computed: {
    song () {
      return this.$store.state.playingSong
    },
    playList () {
      return this.$store.state.playingList
    },
    picUrl () {
      return JSON.stringify(this.song) !== '{}' ? this.song.al.picUrl : "http://s4.music.126.net/style/web2/img/default/default_album.jpg"
    },
    songName() {
      // console.log(JSON.stringify(this.song) === '{}') 
      return JSON.stringify(this.song) !== '{}' ? this.song.al.name : ""
    },
    songArtists () {
      return JSON.stringify(this.song) !== '{}' ? this.song.ar.map(artist=>artist.name).join('/') : ""
    }
  },
  methods: {
    togglePlay () {
      this.isPlaying ? player.pause() : player.play()
    },
    playPrev () {
      this.togglePlayStatus(false)
      let prevIndex = this.playList.findIndex(song => song.id === this.song.id) - 1
      if (prevIndex >= 0) {
        this.play(this.playList[prevIndex])
      }
    },
    playNext () {
      this.togglePlayStatus(false)
      let nextIndex = this.playList.findIndex(song => song.id === this.song.id) + 1
      if (nextIndex < this.playList.length) {
        this.play(this.playList[nextIndex])
      }
    },
    togglePlayStatus (isPlaying = false) {
      this.isPlaying = isPlaying
    },
    play (song) {
      this.$store.dispatch({
        type:'play',
        song:song
      })
    },
    updateTimebar () {
      // console.dir(player)
      this.currentTime = player.currentTime
      this.readyTime = player.buffered.end(player.buffered.length-1)
    },
    handleChange (time) {
      player.currentTime = time
    }
  },
  mounted () {
    player = this.$refs.player
    console.dir(player)
    player.oncanplay = () => {
      // console.dir(player.duration);
      this.totalTime = player.duration
    }
    player.onplay = function () {
      this.isPlaying = true
    }
  }
}
</script>
<style scoped>
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
    width:137px;
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
  .s-cover{
    width: 34px;
    height:34px;
    position:relative;
    margin-right:15px;
  }
  .s-cover__img{
    width:34px;
    height:34px;
  }
  .s-cover__a{
    position:absolute;
    top:0;
    left:0;
    width:34px;
    height:35px;
    background:url('../assets/playbar.png');
    background-position:0 -80px;
  }
  .play_all{
    width:493px;
    height:9px;
    -webkit-appearance:none;
    background:url('../assets/statbar.png');
    background-position: right -30px;
    outline:none;
  }
  input[type='range']::-webkit-slider-thumb {
    -webkit-appearance: none;
    background: url('../assets/iconall.png');
    background-position:0 -250px;
    width:22px;
    height:24px;
    cursor: pointer;
    z-index:10;
    position:relative;
    right:-12px;
    top:1px;
  }
  input[type='range']::-moz-range-thumb {
    -webkit-appearance: none;
    background: url('../assets/iconall.png');
    background-position:0 -250px;
    width:22px;
    height:24px;
    cursor: pointer;
  }
  input[type='range']::-webkit-slider-thumb:hover{
    background-position:0 -280px;
  }
  .play__timeBar{
    position:relative;
  }
  .play_cur{
    position:absolute;
    height:9px;
    left:0;
    top:4px;
    background:url('../assets/statbar.png');
    background-position:left -66px;
  }
</style>

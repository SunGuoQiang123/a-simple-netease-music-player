<template>
  <div id="app">
    <div class="main">
      <div class="search">
        <input type='search' v-model.trim='search' />
        <span @click='searchMusicBy(searchParts[0])'>搜索2</span>
      </div>
      <!-- <p class='searchIntroduction'>搜索"{{search}}",找到{{}}</p> -->
      <ul class="search_choice_item">
        <li v-for='(part,index) of searchParts' :key='index' @click='searchMusicBy(part)' :class="[currentType === part.search_type ? 'activeSearch' : '', 'searchTab']">
          {{part.name}}
        </li>
      </ul>
      <div class="search_result_container">
        <component :is='currentPart.listName'></component>
      </div>
    </div>
    <!-- <audio :src="playingSong.url" controls ref='audioPlayer' autoplay>

    </audio> -->
    <player></player>
  </div>
</template>

<script>

import albumList from './components/albumList'
import playList from './components/playList'
import artistList from './components/artistList'
import songList from './components/songList'
import {mapState} from 'vuex'
import {formatObject} from './util/utilFuns'
import profileList from './components/profileList'
import djRadioList from './components/djRadioList'
import player from './components/player'

export default {
  name: 'app',
  data () {
    return {
      search: '',
      playingUrl: '',
      currentType: 1,
      mvs: [],
      lyrics: [],
      searchParts: [
        {
          name: '单曲',
          search_type: 1,
          listName: 'songList'
        },
        {
          name: '专辑',
          search_type: 10,
          listName: 'albumList'
        },
        {
          name: '歌手',
          search_type: 100,
          listName: 'artistList'
        },
        {
          name: '歌单',
          search_type: 1000,
          listName: 'playList'
        },
        {
          name: '用户',
          search_type: 1002,
          listName: 'profileList',
        },
        {
          name: 'MV',
          search_type: 1004,
          listName: 'mvs'
        },
        {
          name: '歌词',
          search_type: 1006,
          listName: 'lyrics'
        },
        {
          name: '主播电台',
          search_type: 1009,
          listName: 'djRadioList'
        }
      ]
    }
  },
  methods: {
    searchMusicBy (classify) {
      if (this.search === '') return
      this.currentType = classify.search_type
      this.$store.dispatch({
        type:'searchMusic',
        search:this.search,
        classify:classify
      })
    },
    play (song) {
      axios.get("https://api.imjad.cn/cloudmusic?type=song&id=" + song.id)
      .then((res) => {
        this.playingUrl = res.data.data[0].url
        this.$nextTick(function () {
          this.$refs.audioPlayer.play()
        })
        // this.$refs.audioPlayer.play()
      }).catch((err) => {
        console.log(err)
      })
    },
  },
  computed: {
    currentPart () {
      return this.searchParts.find(item => item.search_type === this.currentType)
    },
    playingSong () {
      return this.$store.state.playingSong
    }
  },
  created: function created() {
    //do something after creating vue instance
    console.log(this.$options)
  },
  components: {albumList, playList, artistList, songList, profileList, djRadioList, player}
}
</script>

<style lang="scss">
*{
  margin:0;
  padding:0;
}
body{
  background: #f5f5f5;
  font-size:12px;
}
a{
  text-decoration: none;
  color:#333;
}
#app {
  margin:0 auto;
  width:980px;
  background:#fff;
}
.main{
  padding:40px;
}
.search{
  margin:20px auto;
  display:inline-block;
}
ul{
  list-style:none
}
a.deco:hover{
  text-decoration: underline;
}
audio{
  width:100%
}
.searchTab{
  cursor: pointer;
  color:#333;
  font-size:14px;
  flex:1;
  text-align:center;
  line-height: 39px;
  border-top:2px solid transparent;
}
.searchTab:hover{
  border-top:2px solid #c20c0c;
}
.activeSearch{
  background: #fff;
  border-top: 2px solid #c20c0c;
  border-left:1px solid #ddd;
  border-right:1px solid #ddd;
}
li.activeSearch:nth-child(1){
  border-left:none;
}
.search_choice_item{
  display:flex;
  justify-content: space-between;
  background: url('./assets/tab.png') repeat-x;
  height:39px;
  border-width: 0px 1px;
  border-color:#ccc;
  border-style: solid;
}
.search_result_container{
  margin-top:20px;
}
.scope-slots{
  color:blue;
}
</style>

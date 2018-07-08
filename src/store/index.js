import axios from 'axios';
import Vue from 'vue';
import Vuex from 'vuex';
import {formatObject} from '../util/utilFuns';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    playingSong: {},
    viewingSong: {},
    playingList: [],
    album: {},
    songList: {},
    searchResult: {
      playList: [],
      songList: [],
      albumList: [],
      artistList: [],
      profileList: [],
      mvs: [],
      djRadioList: [],
      lirics: []
    }
  },
  mutations: {
    play (state, payload) {
      state.playingSong = payload.song
    },
    fetchAlbum (state, payload) {
      state.album = payload.album
    },
    fillInPlayList (state, payload) {
      state.playingList = payload.playList
    },
    fetchPlayList (state, payload) {
      state.songList = payload.songList
    },
    searchMusic (state, payload) {
      state.searchResult[payload.classify] = payload.data
    },
    fetchSong(state, payload) {
      state.viewingSong = Object.assign(payload.song, state.searchResult.songList.find(searchSong => searchSong.id === payload.song.id));
    }
  },
  actions: {
    play ({commit}, payload) {
      axios.get("https://api.imjad.cn/cloudmusic?type=song&id=" + payload.song.id)
      .then((res) => {
        commit({
          type:'play',
          song: Object.assign(payload.song, res.data.data[0])
        })
      }).catch((err) => {
        console.log(err)
      })
    },
    fetchAlbum ({commit}, payload) {
      return new Promise((resolve, reject) => {
        let url = "https://api.imjad.cn/cloudmusic?type=album&id=" + payload.album.id
        axios.get(url).then(res => {
          console.log(res)
          commit({
            type:'fetchAlbum',
            album:res.data
          })
          resolve(res.data)
        })
      })
    },
    fetchPlayList ({commit}, payload) {
      return new Promise ((resolve, reject) => {
        let url = "https://api.imjad.cn/cloudmusic?type=playlist&id=" + payload.list.id
        axios.get(url).then(res => {
          console.log(res)
          commit({
            type:'fetchPlayList',
            songList:res.data
          })
          resolve(res.data)
        })
      })
    },
    playAlbum ({commit, dispatch}, payload) {
      dispatch('fetchAlbum',{album:payload.album}).then(album => {
        commit({
          type:'fillInPlayList',
          playList:album.songs
        })
        return album.songs[0]
      }).then(song => {
        dispatch({
          type:'play',
          song:song
        })
      }).catch(err => {console.log(err)})
    },
    playList ({commit, dispatch} ,payload) {
      dispatch('fetchPlayList',{list:payload.list}).then(playList => {
        commit ({
          type: 'fillInPlayList',
          playList: playList.privileges
        })
        return playList.privileges[0]
      }).then(song => {
        dispatch({
          type:'play',
          song:song
        })
      }).catch(err => {console.log(err)})
    },
    searchMusic ({commit, dispatch}, payload) {
      let type = payload.classify.search_type,
          search = payload.search,
          searchResult = []
      axios.get("https://api.imjad.cn/cloudmusic?type=search&search_type="+type+"&s=" + search)
      .then((res) => {
        switch (type) {
          case 1:
            searchResult = res.data.result.songs.map(song => formatObject(song, search))
            break
          case 1000:
            searchResult = res.data.result.playlists.map(list => formatObject(list, search))
            break
          case 10:
            searchResult = res.data.result.albums.map(album => {
              album = formatObject(album, search)
              album.showPlayButton = false
              return album
            })
            break
          case 100:
            searchResult = res.data.result.artists.map(artist => formatObject(artist, search))
            break
          case 1002:
            searchResult = res.data.result.userprofiles.map(userprofile => formatObject(userprofile, search))
            break
          case 1004:
            searchResult = res.data.result.mvs
            break
          case 1006:
            searchResult = res.data.result.songs
            break
          case 1009:
            searchResult = res.data.result.djRadios.map(radio => formatObject(radio, search))
            break
        }
        commit({
          type:'searchMusic',
          classify:payload.classify.listName,
          data:searchResult
        })
      }).catch((err) => {
        console.log(err)
      })
    },
    fetchSong({commit}, id) {
      axios.get("https://api.imjad.cn/cloudmusic?type=song&id=" + id)
      .then(data => {
        // console.log(song);
        commit({
          type: 'fetchSong',
          song: data.data.data[0]
        });
      }).catch(err => {
        console.log(err)
      })
    }
  }
})
export default store

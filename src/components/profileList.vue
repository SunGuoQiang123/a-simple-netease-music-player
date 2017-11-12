<template>
  <div id="profileList">
    <ul>
      <li v-for='(profile,index) of profileList' :key='index'>
        <div class="profile">
          <div class="profile-avatar">
            <img :src="profile.avatarUrl">
          </div>
          <div class="profile-info">
            <div class="profile-info-basic">
              <a class='deco' href='#javascript:void(0)' v-html='profile.nickname'></a>
              <i class='profile-icon icon-musician' v-if='profile.authStatus'></i>
              <i class='profile-icon icon-gender' :class='[profile.gender === 2 ? "icon-gender-female" : "icon-gender-male"]' v-if='profile.gender'></i>
            </div>
            <span class="profile-info-signature" v-html='profile.signature'></span>
          </div>
          <span class='profile-watch-btn'><i>关注</i></span>
          <span class='profile-playList'>歌单: {{profile.playlistCount}}</span>
          <span :style="{display:['flex-box','ms-box','xxx','flex']}">粉丝: {{profile.followeds}}</span>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "profileList",
  computed:{
    profileList () {
      return this.$store.state.searchResult.profileList
    }
  },
  data: function data() {
    return {

    }
  }
}
</script>
<style lang='scss' scoped>
  #profileList li{
    border:1px solid #fff;
  }
  #profileList li:hover{
    background:#f2f2f2;
    border:1px solid #e1e1e1;
  }
  #profileList li:nth-of-type(even){
    background:#f7f7f7;
  }
  .profile{
    display:flex;
    align-items: center;
  }
  .profile>span{
    font-size:12px;
    color:#999;
  }
  .profile-avatar{
    padding:5px 10px;
    font-size:0;
    img{
      width:50px;
      height:50px;
    }
  }
  .profile-info{
    display:flex;
    flex-direction:column;
    padding:5px 10px;
    align-self:flex-start;
    width:460px;
    color:#333;
    font-size:14px;
    margin:10px;
    .profile-info-signature{
      margin-top:5px;
      font-size:12px;
      color:#999;
    }
    .profile-info-basic{
      display:flex;
      align-items: center;
    }
    .profile-icon{
      display:inline-block;
      overflow:hidden;
      vertical-align: middle;
      margin-left:6px;
    }
    .icon-musician{
      width:12px;
      height:13px;
      background:url('../assets/icon2.png') no-repeat -110px -190px;
    }
    .icon-gender{
      width:14px;
      height:15px;
    }
    .icon-gender-male{
      background: url('../assets/icon.png') no-repeat -70px -20px;
    }
    .icon-gender-female{
      background: url('../assets/icon.png') no-repeat -70px 0;
    }
  }
  .profile-watch-btn{
    cursor:pointer;
    display:inline-block;
    width:64px;
    height:27px;
    margin-right:50px;
    background:url(../assets/button.png) no-repeat 0 -990px;
    i{
      font-style:normal;
      display:inline-block;
      line-height:25px;
      padding-left:26px;
      cursor:inherit;
    }
  }
  .profile-watch-btn:hover{
    background-position: 0 -1020px;
  }
  .profile-playList{
    width:120px;
  }
</style>

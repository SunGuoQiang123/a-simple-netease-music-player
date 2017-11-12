<template>
  <div id="artistList">
    <ul class="artistList">
      <li v-for='(artist, index) of artists' :key='index'>
        <a class="artist_item" href='#'>
          <img :src='artist.img1v1Url' />
          <p class="artist_name">
            <a href="#" class="deco" v-html='artist.name'>{{artist.name}}</a>
            <a href="#"><i v-if='artist.accountId' class='singerUser'></i></a>
          </p>
        </a>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "artistList",
  computed:{
    artists () {
      return this.$store.state.searchResult.artistList
    }
  }
}
</script>
<style scoped>
  .artistList{
    display:flex;
    flex-wrap: wrap;
    margin-left:-24px;
  }
  .artistList li{
    padding:0 0 30px 24px;
  }
  .artist_item img{
    width:130px;
    height:130px;
  }
  .singerUser{
    background:url('../assets/icon.png') no-repeat 0 -740px;
    width:17px;
    height:18px;
    display:inline-block;
    vertical-align: middle;
    float:right;
  }
  .artist_name{
    margin-top: 8px;
  }
</style>

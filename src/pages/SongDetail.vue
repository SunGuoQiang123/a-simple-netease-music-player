<template>
    <div>this is a song detail page</div>
</template>
<script>
import { mapActions, mapState } from 'vuex';
export default {
    name: 'SongDetail',
    methods: {
        ...mapActions([
            'fetchSong'
        ])
    },
    computed: {
        songId() {
            return this.$route.params.id;
        },
        ...mapState(['viewingSong'])
    },
    created() {
        this.fetchSong(this.songId);
    }
}
</script>
<style scope>
</style>

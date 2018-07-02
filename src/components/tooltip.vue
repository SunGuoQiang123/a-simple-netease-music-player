<template>
    <div class="tooltipContainer">
        <slot class="tooltipTrig"></slot>
        <div class="tooltipContent">
            <div v-if="vTitle">{{vTitle}}</div>
            <slot name="content"></slot>
        </div>
    </div>
</template>
<script>
export default {
    name: 'vueTooltip',
    props: {
        vTitle: {
            type: String
        },
        showArrow: {
            type: Boolean,
            default: true
        }
    }
}
</script>
<style scoped>
    .tooltipContainer {
        position: relative;
    }

    .tooltipContent {
        position: absolute;
        top:-30px;
        left: 0;
        display: none;
        background: #000;
        color: #fff;
        padding: 6px 4px;
        border-radius: 4px;
    }

    .tooltipContainer:hover > .tooltipContent{
        display: inline-block;
    }

</style>

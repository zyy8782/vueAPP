<template>
    <div class="grade gn-center" :class="starSize">
            <span v-for="num in newscore" class="grade-num gn-on"></span>
        <template v-if="judeg.toString().indexOf('.')!==-1">
            <span v-for="num in 1" class="grade-num gn-half"></span>
            <span v-for="num in (5-1-newscore)" class="grade-num gn-off"></span>
        </template>

        <template v-else>
            <span v-for="num in (5-newscore)" class="grade-num gn-off"></span>
        </template>
    </div>
</template>

<script>
export default {
    props: {
        'score': Number,
        'size':Number
    },
    computed: {
        newscore () {
            return Math.floor(this.score);
        },
        judeg () {
            return Math.floor(this.score*2)/2;
        },
        starSize () {
            return 'star-'+this.size;
        }
    }
};
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/index.styl'
    .grade
        display:inline-block
        &.gn-center
            width:100%
            text-align:center
        &.star-36
            &>.grade-num
                width:30px
                height:29px
                background-repeat: no-repeat
                display: inline-block
                margin-left: 22px;
                &:first-child
                    margin-left:0px
                &.gn-on
                    bg-img(star36_on)
                &.gn-off
                    bg-img(star36_off)
                &.gn-half
                    bg-img(star36_half)
        &.star-24
            &>.grade-num
                width:12px
                height:12px
                background-size: 12px 12px
                background-repeat: no-repeat
                display: inline-block
                margin-left:3px;
                &:first-child
                    margin-left:0px
                &.gn-on
                    bg-img(star24_on)
                &.gn-off
                    bg-img(star24_off)
                &.gn-half
                    bg-img(star24_half)

</style>

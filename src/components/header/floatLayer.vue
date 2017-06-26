<template>

     <div class="float-layer" v-show="showLayer.type">
                <div class="float-layer-wrap clearfix">
                    <div class="float-layer-main">
                        <h1 class="flm-title">{{seller.name}}</h1>
                        <star :score="seller.score" :size="24"></star>
                        <div class="center-line">
                            <div class="min-line"></div>
                            <h2 class="min-title">优惠信息</h2>
                            <div class="min-line"></div>
                        </div>
                        <ul class="discount">
                            <li class="discount-item" v-for="(items,index) in seller.supports.length">
                                <span class="discount-icon" :class="'icontype'+seller.supports[index].type"></span>
                                <span class="description">{{seller.supports[index].description}}</span>
                            </li>
                        </ul>
                        <div class="center-line">
                            <div class="min-line"></div>
                            <h2 class="min-title">商家公告</h2>
                            <div class="min-line"></div>
                        </div>
                        <p class="layer-intro">{{seller.bulletin}}</p>
                    </div>
                </div>
                <div class="float-layer-close iconfont icon-chacha" @click="hideLayer"></div>
            </div>

</template>

<script>
import star from '../star/star'
    export default {
        name:'floatLayer',
        props:['showLayer','seller'],
        components:{star},
        methods:{
            hideLayer () {
                this.showLayer.type = false
            }
        }
    }
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/index.styl'
@import '../../common/font/iconfont1.css'

    .float-layer
        position:fixed
        z-index:200
        top:0
        left:0
        width:100%
        height:100%
        color:#FFFFFF
        overflow:auto
        background-color:rgba(7,17,27,0.8)

    .float-layer-wrap
        min-height:100%
        width 100%

    .float-layer-main
        margin-top:64px
        padding-bottom:64px

    .float-layer-close
        position:relative
        width:32px
        height:32px
        margin:-64px auto 0 auto
        clear:both

    .flm-title
        font-size:17px
        font-weight 700
        color:#FFFFFF
        line-height 32px
        text-align center
        margin-left:10px
        padding-bottom:16px

    .center-line
        display:flex
        width:80%
        margin:30px auto 24px auto
        text-align: center
        .min-line
            flex:1
            position:relative
            top:8px
            border-top:1px solid rgba(255,255,255,0.2)
        .min-title
            padding:0 3vw
            font-size:15px
            font-weight:700
            line-height:15px
    .discount
        width:80%
        margin: 0 auto
        font-size:0
    .discount-item
        margin-bottom:12px
        padding:0 12px
       .discount-icon
            display:inline-block
            width: 16px
            height:16px
            margin-right:6px
            line-height 16px
            background-size:16px 16px
            vertical-align: top
            &.icontype0
                bg-img('decrease_2')
            &.icontype1
                bg-img('discount_2')
            &.icontype2
                bg-img('special_2')
            &.icontype3
                bg-img('invoice_2')
            &.icontype4
                bg-img('guarantee_2')
       .description
            display:inline-block
            font-size:12px
            font-weight:200
            line-height:16px
            vertical-align: top

        .layer-intro
            width:80%
            padding:0 12px
            margin: 0 auto
            font-size:12px
            font-weight:200
            line-height: 24px
    .float-layer-close
        font-size: 32px
        color: rgba(255,255,255,0.5)
</style>

<template>
   <div class="header">
        <img class="bg-blur" :src="seller.avatar" style="width:100%;height:130px">
        <div class="header-wrap">
            <div class="header-avatar"><img :src="seller.avatar" ></div>
            <div class="content-wrap">
                <div class="name-wrap">
                    <span class="name-icon"></span>
                    <span class="name-title">{{seller.name}}</span>
                </div>
                <p class="description">{{seller.description}}&nbsp/&nbsp{{seller.deliveryTime}}分钟送达</p>
                <div class="supports">
                    <span class="supports-icon"></span>
                    <span class="supports-description">{{seller.supports[0].description}}</span>
                </div>
                <div class="supports-num" @click="shows">
                    <span class="text">{{seller.supports.length+"个"}}</span>
                    <i class="iconfont icon-arrow-right"></i>
                </div>
            </div>
        </div>
        <div class="notice" @click="shows">
            <div class="notice-icon"></div>
            <span class="notice-title">{{seller.bulletin}}</span>
            <i class="notice-jt iconfont icon-arrow-right"></i>
        </div>
    <transition name="show">
      <float-Layer :showLayer="showLayer" :seller="seller"></float-Layer>
    </transition>
   </div>
</template>

<script>
import floatLayer from './floatLayer.vue'
export default {
    name:'header',
    data () {
        return {
            seller:{},
            showLayer:{type:false}
        }
    },
    methods:{
      /* 显示浮层, 通过浮层内的按钮来关闭 */
        shows () {
            this.showLayer.type = true
        }
    },
    components:{'float-Layer':floatLayer},

    created () {
        this.$http.get('/api/commodity').then((response) => {
            response = response.body;
            if (response.error === 0)
            {
                this.seller = response.data
            }
        })
    }
}

</script>

<style lang="stylus" scoped>
@import '../../common/stylus/index.styl'
@import '../../common/font/iconfont1.css'
  .show-enter-active,.show-leave-active{
      transition: opacity 0.5s
  }
  .show-enter,.show-leave-active{
      opacity: 0
  }
    .bg-blue
        filter:blur(10px)
    .header
        width:100%;
        height:136px
        background:rgba(7,17,27,0.5)
        position:relative
    .bg-blur
        position:absolute
        filter:blur(10px)
        z-index:-1
    .header-wrap
        font-size:0
        padding:24px 12px 18px 24px
        position:relative

    .header-avatar,.header-avatar>img
        display:inline-block
        width:64px
        height:64px
        vertical-align:top
        border-radius:2px

    .content-wrap
        display:inline-block
        margin-left:16px
        margin-top:2px
        font-size:16px
    .name-wrap
        margin-bottom:8px
        &>.name-icon
            display:inline-block
            width:30px
            height:18px
            bg-img('brand')
            background-size:30px 18px
            vertical-align:top
        &>.name-title
            color:#FFFFFF
            font-weight:bold
            line-height:18px

    .description
        font-size:14px
        font-weight:200
        color:#FFFFFF
        line-height:12px
        margin-bottom:10px

    .supports
        &>.supports-icon
            display:inline-block
            width:12px
            height:12px
            bg-img('decrease_1')
            background-size:12px 12px
            background-repeat:no-repeat
            vertical-align:top
        &>.supports-description
            display:inline-block
            font-size:10px
            font-weight:200
            color:#FFFFFF
            line-height:13px
            vertical-align:top

    .supports-num
        position:absolute
        right:12px
        bottom:18px
        padding:0 8px
        border-radius:14px
        height:24px
        background-color:rgba(0,0,0,0.2)
        text-align:center
        font-size:10px
        color:#FFFFFF
        .text
            vertical-align: middle
        &>i
            display: inline-block
            padding-left:2px
            height: 24px
            vertical-align: middle
            line-height: 24px

    .notice
        height:28px
        line-height:25px
        padding: 0 30px 0 12px
        white-space: nowrap
        overflow:hidden
        text-overflow:ellipsis
        position:relative
        background-color: rgba(7,17,27,0.2)
        .notice-icon
            display:inline-block
            width:22px
            height:12px
            bg-img('bulletin')
            background-size:22px 12px
            vertical-align:middle
        .notice-title
            font-size:10px
            vertical-align:middle
            color:#FFFFFF
        .notice-jt
            position:absolute
            right:17px
            bottom:0px
            color: #FFF

</style>

<template>
    <div class="merchant">
        <div class="merchant-scroll">
            <div class="info-wrap">
                <div class="merchant-info">
                    <div class="left">
                        <span class="name">{{seller.name}}</span>
                        <star :size="24" :score="seller.score"></star>
                        <span class="text">(666)</span>
                        <span class="sales">月售669单</span>
                    </div>
                    <div class="collect-wrap" @click="toggleclick">
                        <i class="iconfont icon-heart" :class="{'toggle':toggleCollect}"></i>
                        <span class="collect">收藏</span>
                    </div>
                </div>
                <div class="efficiency">
                    <div class="one">
                        <p class="description">起送价</p>
                        <p class="num">{{seller.minPrice}}
                            <span class="sub">元</span>
                        </p>
                    </div>
                    <div class="tow">
                        <p class="description">商家配送</p>
                        <p class="num">{{seller.deliveryPrice}}
                            <span class="sub">元</span>
                        </p>
                    </div>
                    <div class="three">
                        <p class="description">平均配送时间</p>
                        <p class="num">{{seller.deliveryTime}}
                            <span class="sub">分钟</span>
                        </p>
                    </div>
                </div>
            </div>
            <div class="merchant-partition"></div>
            <div class="notice-active">
                <div class="briefed" :class="{'border-show':seller.supports.length !== 0}">
                    <p class="title">公告与活动</p>
                    <p class="text">{{seller.bulletin}}</p>
                </div>
                <ul class="supports-list" v-if="seller.supports.length !== 0">
                    <li class="supports-item" v-for="item in seller.supports">
                        <span class="supports-icon" :class="'icontype'+item.type"></span>
                        <span class="supports-text">{{item.description}}</span>
                    </li>
                </ul>
            </div>
            <div class="merchant-partition"></div>
            <div class="store-pic">
                <p class="title">商家实景</p>
                <div class="picScroll-wrap">
                    <ul class="pic-list" :style="{'width':picWidth}">
                        <li class="pic-item" v-for="item in seller.pics">
                            <img :src="item" alt="" class="pic-img">
                        </li>
                    </ul>
                </div>
            </div>
            <div class="merchant-partition"></div>

            <div class="store-info">
                <p class="title">商家信息</p>
                <p class="infos" v-for="info in seller.infos">{{info}}</p>
            </div>
        </div>
    </div>
</template>

<script>
import star from '../../star/star.vue';
import Bscroll from 'better-scroll';
export default {
    components: {
        star
    },
    data () {
        return {
            toggle:false
        }
    },
    props: ['seller'],
    computed: {
        picWidth () {
            return 120*this.seller.pics.length+24+'px';
        },
        toggleCollect () {
            if(this.toggle) {
                return 'toggle'
            }else{
                return false
            }
        }

    },
    created () {
        this.$nextTick( () => {
            this.initScroll()
        })
    },
    methods: {
        initScroll () {
            let el = document.getElementsByClassName('merchant')[0];
            let el1 = document.getElementsByClassName('picScroll-wrap')[0];
            this.merchantScroll = new Bscroll(el,{
                probetype: 3,
                click: true
            });
            this.picListScroll = new Bscroll(el1,{
                probetype: 3,
                click: true,
                scrollX: true
            })
        },
        toggleclick () {
            this.toggle = !this.toggle;
            let el = document.getElementsByClassName('collect')[0];
            if(this.toggle) {
                el.innerHTML = '已收藏'
            }else{
                el.innerHTML = '收藏'
            }

        }
    }
}
</script>

<style lang="stylus" scoped>
  @import '../../../common/stylus/index.styl';
  .merchant{
      position: absolute
      top: 174px
      bottom: 46px
      width: 100%
      overflow: hidden
  }
  .info-wrap{
      font-size: 0
      padding: 18px
  }
    .merchant-info{
        padding-bottom: 18px
        display: flex
        border-1px(rgba(7,17,27,0.1))
        justify-content: space-between
        .name{
            font-size: 14px
            color: rgb(7,17,27)
            line-height: 14px
            margin-bottom: 8px
            display: block
        }
        .grade.gn-center{
            width: auto
        }
        .text,.sales{
            font-size: 10px
            color: rgb(77,85,93)
            line-height: 18px
        }
        .text{
            margin-left: 8px
        }
        .sales{
            margin-left: 12px
        }
    }
    .collect-wrap{
        .iconfont{
            font-size: 24px
            line-height: 24px
            margin-bottom: 4px
            display: block
            text-align: center
            &.toggle{
                color: #ff0000
            }
        }
        .collect{
            font-size: 10px
            color: rgb(77,85,93)
            line-height: 10px
        }
    }
.efficiency{
    display: flex
    padding-top: 18px
    .one,.tow,.three{
        flex: 1
        border-right: 1px solid rgba(7,17,27,0.1)
        text-align: center
        &:last-child{
            border: 0
        }
        .description{
            font-size: 10px
            color: rgb(147,153,159)
            line-height: 10px
            margin-bottom: 4px
        }
        .num{
            font-size: 24px
            font-weight: 200
            color: rgb(7,17,27)
            line-height:24px
            .sub{
                font-size: 10px
            }
        }
    }
}
.merchant-partition{
    width: 100%
    height: 16px
    border-top: 1px solid rgba(7,17,27,0.1)
    border-bottom: 1px solid rgba(7,17,27,0.1)
    background: rgb(243,245,247)
}

.notice-active{
    padding: 18px 18px 0 18px
    .briefed{
        &.border-show{
            border-1px(rgba(7,17,27,0.1))
        }
        .title{
            font-size: 14px
            color: rgb(7,17,27)
            line-height: 14px
            margin-bottom: 8px
        }
        .text{
            padding: 0 12px 16px 12px
            font-size: 12px
            font-weight: 200
            color: rgb(240,20,20)
            line-height: 24px
        }
    }
    .supports-list{
        .supports-item{
            padding: 16px 12px
            border-1px(rgba(7,17,27,0.1))
            &:last-child{
                &:after{
                    border: 0
                }
            }
            .supports-icon{
                width: 16px
                height: 16px
                display: inline-block
                background-size: 16px 16px
                line-height: 16px
                vertical-align: middle
                &.icontype0{
                    bg-img('decrease_3')
                }
                &.icontype1{
                    bg-img('discount_3')
                }
                &.icontype2{
                    bg-img('special_3')
                }
                &.icontype3{
                    bg-img('invoice_3')
                }
                &.icontype4{
                    bg-img('guarantee_3')
                }
            }
            .supports-text{
                font-size: 12px
                line-height: 16px
                color: rgb(7,17,27)
                font-weight: 200
                margin-left: 6px
                display: inline-block
                vertical-align: middle
            }
        }
    }
}
.store-pic{
    padding: 18px 18px 0 18px
    .title{
        font-size: 14px
        color: rgb(7,17,27)
        line-height: 14px
        margin-bottom: 12px
    }
    .pic-list{
        padding-bottom: 18px
        .pic-item{
            margin-right: 6px
            display: inline-block
            .pic-img{
                width: 120px
                height: 90px
            }
        }
    }
}
.store-info{
    padding:  18px 18px 0 18px
    .title{
        font-size: 14px
        color: rgb(7,17,27)
        line-height: 14px
        margin-bottom: 12px
    }
    .infos{
        padding: 16px 12px
        border-top: 1px solid rgba(7,17,27,0.1)
        font-size: 12px
        font-weight: 200
        color: rgb(7,17,27)
        line-height: 16px
    }
}
</style>

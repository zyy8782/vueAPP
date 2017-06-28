<template>
  <div class="evaluate">
    <div class="scroll-wrap">
      <div class="synthetic">
        <div class="synthetic-left">
          <div class="left-wrap">
            <h1 class="mark">{{seller.score}}</h1>
            <p class="text">综合评分</p>
            <p class="overTop">高于周边商家{{seller.rankRate}}%</p>
          </div>
        </div>
        <div class="synthetic-right">
          <div class="one">
            <span class="title">服务态度</span>
            <star :score="seller.serviceScore" :size="24"></star>
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="tow">
            <span class="title">食物评分</span>
            <star :score="seller.foodScore" :size="24"></star>
            <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class="three">
            <span class="title">送达时间</span>
            <span class="time">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <div class="partition"></div>
      <!--/* 评论区 */-->
      <div class="message">
        <!--筛选评论-->
        <div class="message-label">
          <span class="tag all" :class="{'active':selectType===2}" @click="userSelectType(2)">全部
            <span class="num">15</span>
          </span>
          <span class="tag good" :class="{'active':selectType===0}" @click="userSelectType(0)">满意
            <span class="num">12</span>
          </span>
          <span class="tag bad" :class="{'active':selectType===1}" @click="userSelectType(1)">不满意
            <span class="num">20</span>
          </span>
        </div>
        <div class="select">
          <i class="iconfont icon-zhengque" :class="{'active': selectClass}" @click="userClass"></i>
          <span class="text">只看有内容的评价</span>
        </div>
      </div>
      <!--用户评论-->
      <div class="content">
        <ul class="content-list">
          <li class="list-item" v-for="item in evaluate" v-show="showHide(item.rateType,item.text)">
            <img :src="item.avatar" alt="" class="portrait">
            <div class="right-wrap">
              <div class="name-wrap">
                <span class="name">{{item.username}}</span>
                <span class="date">{{item.rateTime | formatDate}}</span>
              </div>
              <div class="score-wrap">
                <star :score="item.score" :size="24"></star>
                <span class="arrive-time">{{item.deliveryTime}}分钟送达</span>
              </div>
              <p class="comment">{{item.text}}</p>
              <div class="praise-tread">
                <i class="iconfont icon-cha pt-icon" :class="{'pt-icon-down':item.rateType === 1}"></i>
                <span class="target" v-for="list in item.recommend">{{list}}</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import star from '../../star/star.vue';
import BScroll from 'better-scroll';
import { formatDate } from '../../../common/js/data.js';
export default {
  components: {
    star
  },
  props: ['seller'],
  data() {
    return {
      evaluate: {},
      selectType: 2,
      selectClass: false
    }
  },
  created() {
    this.$http.get('/api/merchant').then((response) => {
      response = response.body;
      if (response.error === 0) {
        this.evaluate = response.data;
        this.$nextTick(() => {
          this.initScroll();
        })
      }
    })
  },
  /* 用户发布时间格式化 */
  filters: {
    formatDate(time) {
      let date = new Date(time);
      return formatDate(date, 'yyyy-MM-dd hh:mm');
    }
  },
  methods: {
    initScroll() {
      let el = document.getElementsByClassName('evaluate')[0]
      this.evaluateScroll = new BScroll(el, {
        probetype: 3,
        click: true
      })
    },
    /* 只看有内容的评论 切换 并重新计算滚动高度*/
    userClass() {
      this.selectClass = !this.selectClass;
      this.$nextTick(() => {
        this.evaluateScroll.refresh()
      })
    },
    /* 评价内容 切换 */
    userSelectType(type) {
      this.selectType = type;
      this.$nextTick(() => {
        this.evaluateScroll.refresh()
      })
    },
    /* 控制每一个评论的 li 显示 */
    showHide(type, text) {
      if (this.selectClass && !text) {
        return false
      };
      if (this.selectType === 2) {
        return true
      } else {
        return type === this.selectType
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import "../../../common/stylus/index.styl"
    .evaluate {
        width: 100%
        position: absolute
        top: 174px
        bottom: 46px
        overflow: hidden
    }
    .synthetic {
        height: 106px
        padding: 18px 24px 18px 0
        display: flex
        box-sizing: border-box
    }
    .synthetic-left {
        flex: 0 0 138px
        .left-wrap{
            text-align: center
            border-right: 1px solid rgba(7,17,27,0.1)
            .mark{
                font-size: 24px
                color: rgb(255,153,0)
                line-height: 28px
                margin-bottom: 6px
            }
            .text{
                font-size: 12px
                color: rgb(7,17,27)
                line-height: 12px
                margin-bottom: 8px
                font-weight: 700
            }
            .overTop{
                font-size: 10px
                color:rgb(157, 154, 154)
                line-height: 12px
                padding-bottom: 6px
            }
        }
    }
    .synthetic-right{
        flex: 1
        padding-left: 24px
        font-size: 0
        .one,.tow{
            margin-bottom: 8px
            .title{
                font-size: 12px
                display: inline-block
                color: rgb(7,17,27)
                line-height: 18px
            }
            .grade.gn-center{
                width: auto
                margin: 0 12px
            }
            .score{
                display: inline-block
                font-size: 14px
                line-height: 20px
            }
        }
        .three{
            font-size: 0
            .title{
                font-size: 12px
                color: rgb(7,17,27)
                line-height: 18px
                margin-right: 12px
            }
            .time{
                font-size: 12px
                color: #a2a2a2
            }
        }
    }

    .partition{
        width: 100%
        height: 18px
        background: rgb(243,245,247)
        border-top: 1px solid rgb(230,231,232)
        border-bottom: 1px solid rgb(230,231,232)
    }
    .message{
        padding:0 18px
    }
    .message-label{
        padding: 18px 0
        width: 100%
        border-1px(rgba(7,17,27,0.1))
        .tag{
            display: inline-block
            padding: 10px;
            background: red
            font-size: 15px
            &.active{
                color: #FFF
            }
            .num{
                font-size: 10px
                margin-left: 3px
            }
            &.good,&.all{
                background: rgba(0,160,220,0.2)
                &.active{
                    background: rgb(0,160,220)
                }
            }
            &.bad{
                background: rgba(77,85,93,0.2)
                &.active{
                    background: rgba(77,85,93,0.7)
                }
            }
        }
    }
    .select{
        padding: 18px 0
        font-size: 0
        .iconfont{
            color: rgb(183,187,191)
            font-size: 20px
            &.active{
                color: rgb(0,160,220)
            }
        }
        .text{
            font-size: 12px
            color: rgb(183,187,191)
            margin-left: 5px
            line-height 21px
            vertical-align: top
        }
    }
    .content{
        border-top: 1px solid rgb(230,231,232)
        padding: 18px 18px 0 18px
    }
    .list-item{
        padding-bottom: 18px
        display: flex
        box-sizing: border-box
        border-1px(rgba(7,17,27,0.1))
        &:last-child{
            &:after{
                border: 0
            }
        }
    }
    .portrait{
        flex: 0 0 35px
        width: 35px
        height: 35px
        border-radius: 50%
        margin-right: 12px
    }
    .right-wrap{
        flex: 1
    }
    .name-wrap{
        display: flex
        justify-content: space-between
        font-size: 0
        margin-top: 2px
        .name{
            font-size: 10px
            color: rgb(7,17,27)
            line-height: 12px
        }
        .date{
            font-size 10px
            line-height: 12px
            color: rgb(147,153,159)
            font-weight 200
        }
    }
    .score-wrap{
        margin-top: 4px
        line-height:0
        .grade.gn-center{
            width: auto
        }
        .arrive-time{
            font-size: 10px
            line-height: 12px
            color: rgb(147,153,159)
            font-weight: 200
        }
    }
    .comment{
        margin-top: 6px
        line-height: 18px
        font-size: 12px
    }
    .praise-tread{
        margin-top: 8px
        font-size: 0
        display: flex
        flex-wrap: wrap
        .pt-icon{
            font-size: 12px
            line-height: 22px
            color: rgb(0,160,220)
            margin-right: 8px
            &.pt-icon-down{
                transform: rotateX(180deg)
                color: rgb(183,187,191)
            }
        }
        .target{
            display: inline-block
            padding: 2px 6px
            font-size: 9px
            color: rgb(147,153,159)
            line-height: 16px
            border-radius: 2px
            margin-bottom: 2px
            margin-right: 8px
            border: 1px solid rgba(7,17,27,0.1)
        }
    }
</style>

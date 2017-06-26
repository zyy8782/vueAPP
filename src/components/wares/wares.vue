<template>
  <div class="wares">
    <div class="wares-wrap">
      <div class="wares-scroll">
        <div class="wares-maxPic">
          <img :src="foods.image">
        </div>
        <div class="foods-info">
          <p class="title">{{foods.name}}</p>
          <p class="foods-sales">
            <span class="sales">月售{{foods.sellCount}}份</span>
            <span class="sales">好评率{{foods.rating}}%</span>
          </p>
          <div class="price-num">
            <div class="price-wrap">
              <span class="newPrice">¥
                <span>{{foods.price}}</span>
              </span>
              <span class="oldPrice" v-show="foods.oldPrice">¥
                <span>{{foods.oldPrice}}</span>
              </span>
            </div>
            <div class="addCars-wrap">
              <span v-show="!foods.count" class="addCars" @click="addfoods">加入购物车</span>
              <buttoner :foods="foods" v-show="foods.count"></buttoner>
            </div>
          </div>
        </div>
        <div class="split"></div>
        <div class="foods-recommend" v-if="foods.info">
          <p class="title">商品介绍</p>
          <p class="text-content">{{foods.info}}</p>
        </div>
        <div class="split" v-if="foods.info"></div>
        <div class="foods-score">
          <p class="title">商品评价</p>
          <div class="tag-wrap">
            <span class="tag all" :class="{'active':selectType===2}" @click="userScoreSelect(2)">全部
              <span class="num">12</span>
            </span>
            <span class="tag good" :class="{'active':selectType===0}" @click="userScoreSelect(0)">推荐
              <span class="num">15</span>
            </span>
            <span class="tag bad" :class="{'active':selectType===1}" @click="userScoreSelect(1)">吐槽
              <span class="num">99</span>
            </span>
          </div>
          <div class="select-score">
            <i class="iconfont icon-zhengque" @click="select" :class="{'active':selectClass}"></i>
            <span class="text">只看有内容的评价</span>
          </div>
          <ul class="score-list">
            <li class="score-item" v-show="showHide(item.rateType,item.text)" v-for="item in foods.ratings">
              <div class="date-user">
                <span class="date">{{item.rateTime}}</span>
                <span class="user">
                  {{item.username}}
                  <img :src="item.avatar" class="user-img">
                </span>
              </div>
              <p class="user-scoreText">
                <i class="iconfont icon-cha" :class="{'cai':item.rateType === 1}"></i>
                <span class="text">{{item.text}}</span>
              </p>
            </li>
          </ul>
        </div>
      </div>
      <!--最后-->
    </div>
    <div class="goBack">
      <router-link :to="{name:'commodity'}">
        <i class="iconfont icon-arrow-right"></i>
      </router-link>
    </div>
    <shoppingCarts :seller="seller" :buyMessage="buyMessage"></shoppingCarts>
  </div>
</template>

<script>
import buttoner from '../buttoner/buttoner.vue'
import shoppingCarts from '../shoppingCarts/shoppingCarts.vue'
import Bscroll from 'better-scroll'
export default {
  name: "wares",
  components: {
    buttoner,
    shoppingCarts
  },
  data() {
    return {
      foods: this.$route.params.mainParams,
      buyMessage: this.$route.params.buyMessage,
      seller: {},
      waresMenu: null,
      selectClass: false,
      selectType: 2
    }
  },
  beforeRouteEnter (to, from, next)  {
      next( vm => {
          let route = vm.$route.params.mainParams;
          let route1 = vm.$route.params.buyMessage;
          if(vm.foods.name !== route.name) {
                vm.foods = route;
                vm.buyMessage = route1;
                vm.$nextTick(() => {
                    vm.waresMenu.scrollTo(0,0);
                    vm.waresMenu.refresh();
                })
          }
      })
  },
  created() {
    this.$http.get('/api/commodity').then((response) => {
      response = response.body;
      if (response.error === 0) {
        this.seller = response.data;
        this.$nextTick(() => {
          this.initScroll();
        });
      }
    })
  },
  methods: {
    initScroll() {
      let el = document.getElementsByClassName('wares-wrap')[0];
      this.waresMenu = new Bscroll(el, {
        probeType: 3,
        click: true
      });
    },
    userScoreSelect(type) {
      this.selectType = type;
      this.$nextTick(() => {
        this.waresMenu.refresh();
      })
    },
    select() {
      this.selectClass = !this.selectClass;
      this.$nextTick(() => {
        this.waresMenu.refresh();
      })
    },
    showHide(type, text) {
      if (this.selectClass && !text) {
        return false
      };
      if (this.selectType === 2) {
        return true
      } else {
        return type === this.selectType
      };
    },
    addfoods() {
      if (!this.foods.count) {
        this.$set(this.foods, 'count', 1);
        this.buyMessage.push(this.foods)
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/index.styl'

.wares{
		width: 100%
		background: #FFFFFF
    &.link-enter-active,&.link-leave-active{
          transition: all 0.5s
          transform: translate3d(0,0,0)
    }
    &.link-enter{
          transform: translate3d(100%,0,0)
    }
    &.link-leave-active{
        transform: translate3d(-100%,0,0)
    }
}
.wares-wrap{
    position: absolute
		top: 0
    bottom: 46px
    overflow: hidden
    width: 100%
}
.wares-maxPic{
	font-size: 0
	line-height: 0
	&>img{
		height: 375px
		width: 100%
	}
}
.foods-info{
	padding: 18px
	font-size: 0
	.title{
		font-size: 14px
		font-weight: 700
		color: rgb(7,17,27)
		line-height: 14px
		margin-bottom: 8px
	}
	.foods-sales{
		margin-bottom: 18px
		.sales{
			font-size: 10px
			color: rgb(147,153,159)
			line-height: 10px
			padding-right: 12px
		}
	}
}
.price-num{
	display: flex
	justify-content: space-between
  align-items: center
	.newPrice{
		font-size: 10px
		font-weight: 700
		color: rgb(240,20,20)
		line-height 24px
		margin-right: 8px
		&>span{
			font-size: 14px
			font-weight: 700
		}
	}
	.oldPrice{
		font-size: 10px
		line-height: 24px
		font-weight: 700
		color: rgb(147,153,159)
	}
  .addCars-wrap{
    font-size: 0
    .addCars{
      padding: 6px 12px
      font-size: 10px
      color: #FFF
      line-height: 12px
      border-radius: 12px
      background: rgb(0,160,220)
    }
  }
}
.split{
    height: 16px
    background: #f3f5f7
    border-top: 1px solid rgba(7,17,27,0.1)
    border-bottom: 1px solid rgba(7,17,27,0.1)
}
.foods-recommend{
    padding: 16px
    .title{
        font-size: 14px
        font-weight: 700
        color: rgb(7,17,27)
        line-height: 28px
        margin-bottom: 6px
    }
    .text-content{
        padding 0 8px
        font-size: 12px
        font-weight: 200
        color: rgb(77,85,93)
        line-height: 24px
    }
}
.foods-score{
    padding: 18px 18px 0 18px
    .title{
        font-size: 14px
        font-weight: 700
        color: rgb(7,17,27)
        line-height: 28px
        margin-bottom: 6px
    }
    .tag-wrap{
        font-size: 0
        border-1px(rgba(7,17,27,0.1))
        padding:5px 0 18px 0
        .tag{
            display: inline-block
            padding: 8px 12px
            margin-right: 8px
            font-size: 12px
            line-height: 16px
            border-radius: 2px
            &.active{
                color: #FFF
            }
            .num{
                font-size: 8px
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
}
.select-score{
    font-size: 0
    padding: 12px 0
    color: rgb(147,153,159)
    .icon-zhengque{
        font-size: 24px
        line-height: 24px
        vertical-align: middle
        &.active{
            color: rgb(0,160,220)
        }
    }
    .text{
        font-size: 12px
        line-height: 24px
        margin-left: 4px
        vertical-align: middle
    }
}
.score-item{
    padding: 16px 18px
    border-top: 1px solid rgba(7,17,27,0.1)
    .date-user{
        display: flex
        justify-content: space-between
        color: rgb(147,153,159)
        margin-bottom: 6px
        .date{
            font-size: 10px
            line-height: 12px
        }
        .user{
            font-size: 10px
            line-height: 12px
            .user-img{
                width: 12px
                height: 12px
                margin-left: 6px
                border-radius: 50%
            }
        }
    }
    .user-scoreText{
        font-size: 0px
        color: rgb(7,17,27)
        .icon-cha{
            font-size: 12px
            color: rgb(0,160,220)
            line-height:24px
            display:inline-block
            &.cai{
                transform: rotateX(180deg)
                color: rgb(183,187,191)
            }
        }
        .text{
            margin-left: 4px
            font-size: 12px
            line-height: 24px
        }
    }
}
.goBack{
    position:fixed
    bottom: 60px
    right: 10px
    width: 25px
    height: 25px
    background: rgba(147,153,159,0.5)
    border-radius: 50%
    transform:rotate(180deg)
    text-align: center
    line-height: 25px
    color: #FFF
    .iconfont{
        font-size: 23px
    }
}
</style>

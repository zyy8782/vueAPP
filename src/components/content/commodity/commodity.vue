<template>
  <div class="commodity-wrap">
    <div class="commodity-content">
      <div class="cw-left">
        <ul class="cwl-list">
          <li class="cwl-item border-1px" track-by v-for="(item,index) in goods" :class="{'active':indexs===index}" @click="selectIndex(index,$event)">
            <span class="title">
              <span class="icon" v-if="item.type != -1" :class="'icontype'+item.type"></span> {{item.name}}
            </span>
          </li>
        </ul>
      </div>
      <div class="cw-right">
        <ul class="cwr-list">
          <li class="cwrl-item" v-for="items in goods" track-by>
            <h1 class="cwrli-max-title">{{ items.name }}</h1>
            <ul class="cwrli-list">
              <li class="cwrli-list-item" v-for=" foods in items.foods " track-by>
                <router-link :to="{name:'wares',params:{'mainParams':foods,'buyMessage':buyMessage}}">
                  <img :src="foods.icon" alt="" class="icon">
                </router-link>
                <div class="cwrli-content">
                  <h2 class="title">{{ foods.name }}</h2>
                  <p class="description">{{ foods.description }}</p>
                  <div class="sales-wrap">
                    <span class="sell-count">月售{{ foods.sellCount }}份</span>
                    <span class="rating">好评率{{ foods.rating }}%</span>
                  </div>
                  <div class="price-wrap">
                    <div class="price-left">
                      <span class="price">
                        <span>¥</span>{{ foods.price }}
                      </span>
                      <del class="old-price" v-if=" foods.oldPrice !='' ">¥{{ foods.oldPrice }}</del>
                    </div>
                    <div class="btn-wrap">
                      <buttoner :foods="foods" @ballEvent="addfoods"></buttoner>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import buttoner from '../../buttoner/buttoner.vue'
import BScroll from 'better-scroll';
export default {
  name: 'commodity',
  components: {
    buttoner
  },
  data() {
    return {
      goods: {},
      listHeight: [],
      scrollY: 0,
      foodsScroll: null,
      menuScroll: null
    }
  },
  computed: {
    /* 获取每一个购买的商品信息,共享给其他组件 */
    buyMessage() {
      let total = [];
      this.goods.forEach((good) => {
        good.foods.forEach((foods) => {
          if (foods.count) {
            total.push(foods)
          }
        })
      });
      return total
    },
    /* 右边滚动,给左边动态添加active Class */
    indexs() {
      for (let i = 0; i < this.listHeight.length; i++) {
        let h1 = this.listHeight[i];
        let h2 = this.listHeight[i + 1]
        if (this.scrollY >= this.listHeight[i] && this.scrollY < h2) {
          return i
        }
      }
    }
  },
  created() {
    this.$http.get('/api/evaluate').then((response) => {
      response = response.body;
      if (response.error === 0) {
        this.goods = response.data;
        this.$nextTick(() => {
          this.initScroll();
          this.rightListHeight();
        })
      }
    });
  },
  methods: {
    /* 异步加载,调用兄弟ShoppingCars组件方法,小球运动 */
    addfoods(el) {
      this.$nextTick(() => {
        this.$parent.$children[3].ballev(el);
        this.$emit('emitParent', this.buyMessage)
      })
    },
    /* 初始化滚动插件 */
    initScroll() {
      let el = document.getElementsByClassName('cw-left')[0];
      let el1 = document.getElementsByClassName('cw-right')[0];
      this.menuScroll = new BScroll(el, {
        click: true
      })
      this.foodsScroll = new BScroll(el1, {
        probeType: 3,
        click: true
      });
      this.foodsScroll.on('scroll', (pos) => {
        this.scrollY = Math.abs(Math.round(pos.y))
        // let num = Math.ceil(this.listHeight.length / 2);
        // if (this.scrollY > this.listHeight[num]) {
        //   this.menuScroll.scrollTo(0, -150)
        // } else {
        //   this.menuScroll.scrollTo(0, 0)
        // }
      });
    },
    /* 获取右边每一个最外层ul的高度 用来给左边click,动态滚动右边位置*/
    rightListHeight() {
      let heightlist = document.getElementsByClassName('cwrl-item');
      let height = 0;
      this.listHeight.push(height);
      for (let i = 0; i < heightlist.length; i++) {
        height += heightlist[i].offsetHeight
        this.listHeight.push(height)
      }
    },
    /* 左边点击,右边滚动到相对应的高度 */
    selectIndex(index, ev) {
      if (!ev._constructed) {
        return
      };
      let list = document.getElementsByClassName('cwrl-item');
      this.foodsScroll.scrollToElement(list[index], 300)
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '../../../common/stylus/index.styl'

.commodity-wrap{
	position: absolute
	top: 174px
	bottom: 46px
	overflow: hidden
	width: 100%
	.commodity-content{
		display: flex
		font-size: 0
		height: 100%
	}
}
.cw-left{
    flex: 0 0 80px
    width: 80px
    background-color: #f3f5f7
}
.cwl-item{
    padding: 0 12px
    display: table
    width: 56px
    height: 54px
    line-height: 14px
    background-color: #f3f5f7
    border-1px(rgba(7,17,27,0.1))
    &.active{
        background-color: #FFFFFF
        &>.title{
            font-weight: 700
		}
        &:after{
            border: 0
		}
	}
    .title{
        display: table-cell
        vertical-align: middle
        font-size: 12px
        font-weight: 200
        line-height: 14px
		.icon{
			display: inline-block
			vertical-align: top
			width: 12px
			height: 12px
			margin-top:1px
			margin-right: 1px
			line-height 12px
			background-size: 12px 12px
			&.icontype0{
				bg-img('decrease_3')
			}
			&.icontype1{
				bg-img('discount_3')
			}
			&.icontype2{
				bg-img('special_3')
			}
		}
	}
}
.cw-right{
    flex: 1
}
.cwrl-item{
    width: 100%
}
.cwrli-max-title{
    height: 26px
    line-height: 26px
    font-size: 12px
    color: rgb(147,153,159)
    border-left: 2px solid #d9dde1
    background: #f3f5f7
    width: 100%
    text-indent 14px
}
.cwrli-list-item{
    padding: 18px
    display: flex
	.icon{
		flex: 0 0 60px
		width: 60px
		height: 60px
		margin-right: 10px
		vertical-align: top
	}
}
.cwrli-content{
    flex:1
    .title{
		margin-bottom: 8px
		font-size: 14px
        line-height: 14px
        color: rgb(7,17,27)
        font-weight: bold
	}
    .description{
        display: block
        margin-bottom: 8px
        font-size: 10px
        line-height: 14px
        color: rgb(147,153,159)
	}
.sales-wrap{
    display: inline-block
    margin-bottom: 8px
    line-height: 10px
    color: rgb(147,153,159)
    font-size: 10px
}
.sell-count{
    margin-right: 8px
}
.rating{
    line-height: 15px
}
.price-wrap{
    display:flex
}
.price-left{
    flex:1
    .price{
    	display: inline-block
    	font-size: 14px
        font-weight: 700
        color: #FF0000
        line-height: 24px
		padding-right: 5px
        &>span{
        	font-size: 12px
            font-weight: 700
            padding-right: 2px
		}
	}
	.old-price{
        font-size: 10px
        color: rgb(147,153,159)
        font-weight: bold
	}
}
.btn-wrap{
    flex: 0 0 74px
}
}

// .ball-container{
//     .ball{
//         position: fixed
//         left: 32px
//         bottom: 22px
//         z-index: 200
//         transition: all 0.6s cubic-bezier(1,-0.85, 0.38, 1.3)
//         .inner{
//             width: 16px
//             height: 16px
//             border-radius: 50%
//             background: rgb(0,160,220)
//             transition: all 0.6s linear
// 		}
// 	}
// }
</style>

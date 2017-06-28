<template>
<div class="shoppingList" v-show="showList">
	<div class="top">
		<span class="shoppingCar">购物车</span>
		<span class="clear" @click="clearList">清空</span>
	</div>
	<div class="bottom bottom-hook">
		<ul class="bottom-list">
			<li class="bottom-item" v-for="item in buyMessage" v-show="item.count>0">
				<span class="title">{{item.name}}</span>
				<div class="right">
					<span class="price"><span class="icon">¥</span>{{item.price}}</span>
					<div class="btn-wrap">
						<btn :foods="item"></btn>
					</div>
				</div>
			</li>
		</ul>
	</div>
</div>
</template>

<script>
import btn from '../buttoner/buttoner.vue'
import BScroll from 'better-scroll'

export default {
    components: {
      btn
    },
    props: {
      buyMessage: Array,
      showList: Boolean
    },
    methods: {
        initScroll() {
          let el = document.getElementsByClassName("bottom-hook")[0];
          this.scrollList = new BScroll(el, {
            click: true,
            probeType: 3
          });
        },
        clearList () {
            this.buyMessage.forEach( (index) => {
                index.count = 0
            })
        }
    }
}
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/index.styl'
    .shoppingList
        width: 100%
        position: absolute
        top: 0
        left: 0
        z-index: -1
        background: rgb(69, 185, 104)
        transform: translate3d(0,-100%,0)
        &.show-enter-active,&.show-leave-active
            transition: all 0.7s
        &.show-enter,&.show-leave-active
            opacity: 0
            transform: translate3d(0,0,0)
        .top
            height: 40px
            line-height: 40px
            padding: 0 18px
            background: #f3f5f7
            border-1px(rgba(7, 17, 27, 0.1))
            .shoppingCar
              float: left
              font-size: 14px
              color: rgb(7, 17, 27)
            .clear
              float: right
              font-size: 12px
              color: rgb(0, 160, 220)
        .bottom
            padding: 0 18px
            max-height: 217px
            overflow: hidden
            background: #fff
            .bottom-item
                display: flex
                height: 48px
                justify-content: space-between
                padding: 12px 0
                box-sizing: border-box
                border-1px(rgba(7, 17, 27, 0.1))
                .title
                    flex: 1
                    line-height: 24px
                    font-size: 14px
                    color: rgb(7, 17, 27)
					.right{
						  flex: 0 0 120px
              .price{
                  display: inline-block
                  width: 30px
                  margin-right: 5px
                  font-size: 14px
                  vertical-align: top
                  line-height: 24px
                  color: #FF0000
              }
              .btn-wrap{
                  display: inline-block
              }
          }

</style>

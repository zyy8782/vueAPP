<template>
    <div class="shopping">
        <div class="shopping-carts">
            <div class="content">
                <div class="content-left">
                    <div class="icon-wrap" @click.stop.prevent="showHide">
                        <div class="icon" :class="{'active':totalPrice.num > 0}">
                            <i class="logo iconfont icon-gouwuche"></i>
                            <transition name="fade">
                                <span class="logoNum" v-show="totalPrice.num > 0">{{totalPrice.num}}</span>
                            </transition>
                        </div>
                    </div>
                </div>
                <div class="content-right">
                    <transition name="fade">
                        <span class="totalprice">¥{{totalPrice.price}}</span>
                    </transition>
                    <span class="description">另需配送费¥{{seller.deliveryPrice}}元</span>
                    <span class="differ" :class="{'active':conditionSelect.type === 1}">{{conditionSelect.text}}</span>
                </div>
            </div>
        </div>
        <transition name="show">
            <shoppingList v-show="showList" ref="child" :buyMessage="buyMessage"></shoppingList>
        </transition>
        <transition name="fade">
            <div class="shoppingList-bg" v-show="showList"></div>
        </transition>
    </div>
</template>

<script>
import shoppingList from '../shoppingCarts/shoppingList.vue';
export default {
    components: {
        shoppingList
    },
    props: {
        seller: Object,
        buyMessage: {
            type: Array,
            default: () =>{
                return []
            }
        }
    },
    data() {
        return {
            showList: false
        }
    },
    computed: {
        totalPrice() {
            let total = {
                price: 0,
                num: 0
            };
            for (var i = 0; i < this.buyMessage.length; i++) {
                total.price += this.buyMessage[i].count * this.buyMessage[i].price;
                total.num += this.buyMessage[i].count;
            }
            if (total.num <= 0) {
                this.showList = false
            }
            return total
        },
        conditionSelect() {
            let num = this.seller.minPrice - this.totalPrice.price;
            if (this.totalPrice.price === 0) {
                return {text:'¥' + num + '起送',type:0};
            };
            if (this.totalPrice.price > 0 && this.totalPrice.price < this.seller.minPrice) {
                return {text:'还差' + num + '起送',type:0};
            };
            if (this.totalPrice.price >= this.seller.minPrice) {
                return {text:'去结账',type:1};
            };
        }
    },
    methods: {
        showHide() {
            if (this.totalPrice.num <= 0) {
                return
            };
            this.showList = !this.showList;
            if (this.showList) {
                this.$nextTick(() => {
                    if (!this.$refs.child.scrollList) {
                        this.$refs.child.initScroll()
                    } else {
                        this.$refs.child.scrollList.refresh()
                    }
                });
            };
        }
    }


}
</script>

<style lang="stylus" scoped>

@import '../../common/font/iconfont1.css'
    .fade-enter-active,.fade-leave-active
        transition: opacity 0.5s
    .fade-enter,.fade-leave-active
        opacity: 0
    .shopping
        position: absolute
        left: 0
        bottom: 0
        z-index: 100
        width: 100%
        height:46px
        background: #000
        .shopping-carts
            position: absolute
            left: 0
            bottom: 0
            z-index: 100
            width: 100%
            height:46px
            background: #000
    .content
        display: flex
        font-size: 0
        .content-right
            flex: 1
            width: 105px
            height: 46px
            display: flex
            justify-content: space-between
            background: #000
            color: rgba(255,255,255,0.4)
            font-size: 12px
            .differ
                flex: 0 0 80px
                display:inline-block
                padding:0 8px
                width: 100%
                height:46px
                background: rgb(43,52,60)
                box-sizing: border-box
                font-weight: 700
                line-height: 46px
                text-align: center
                &.active
                    background: rgb(86,160,89)
                    color: #FFF
                    font-size: 13px
            .totalprice
                    flex: 0 0 30px
                    display: inline-block
                    margin-top: 12px
                    width: 40px
                    font-size: 16px
                    font-weight: 700
                    line-height: 24px
                    padding-right: 12px
                    vertical-align: top
                    box-sizing: border-box
                    color: #80858a
                    &.active
                        color: #FFF
                .description

                    display: inline-block
                    margin-top: 12px
                    font-size: 14px
                    color: #80858a
                    margin-left: 12px
                    vertical-align: top
                    box-sizing: border-box
                    line-height: 24px
        .content-left
            flex: 0 0 80px
            .icon-wrap
                position: absolute
                top: -10px
                left: 0
                z-index: 100
                display: inline-block
                width: 56px
                height: 56px
                padding: 6px
                margin: 0 12px
                box-sizing: border-box
                border-radius: 50%
                vertical-align: top
                background: #000
                .icon
                    width: 100%
                    height: 100%
                    background: rgb(43,52,60)
                    border-radius: 50%
                    text-align: center
                    position: relative
                    &.active
                        background: rgb(0,160,220)
                        .logo
                            color: #fff
                    .logoNum
                        position: absolute
                        top:-5px
                        right: -10px
                        z-index: 10
                        display: inline-block
                        color: #FFF
                        width: 24px
                        height: 16px
                        line-height: 18px
                        background: red
                        font-size: 9px
                        font-weight: 700
                        border-radius: 6px
                        box-shadow 0 4px 8px 0px rgba(0,0,0,0.4)
                    .logo
                        font-size: 24px
                        line-height: 44px
                        color: rgb(128,133,138)

    .shoppingList-bg
        position: fixed
        top: 0
        left: 0
        width: 100%
        height: 100%
        z-index: -2
        filter: blur(10px)
        background: rgba(0,0,0,0.6)
        opacity: 1
        &.fade-enter-active,&.fade-leave-active
            transition: opacity 0.5s
        &.fade-enter,&.fade-leave-active
            opacity: 0
</style>

<template>
    <div class="home">
        <v-header></v-header>
        <tab></tab>
        <transition name="show-right">
            <keep-alive>
                <router-view :seller="seller" @emitParent="solts"></router-view>
            </keep-alive>
        </transition>
        <shoppingCarts :seller="seller" :buyMessage="buyMessage"></shoppingCarts>
    </div>
</template>

<script>
import header from '../header/header.vue';
import tab from '../tab/tab.vue';
import shoppingCarts from '../shoppingCarts/shoppingCarts.vue';
export default {
    components: {
        'v-header': header,
        tab,
        shoppingCarts
    },
    data () {
        return {
            seller: {},
            buyMessage: []
        }
    },
    created () {
        this.$http.get('/api/commodity').then((response) => {
            response = response.body;
            if (response.error === 0) {
                this.seller = response.data;
            }
        })
    },
    methods: {
        solts (datas) {
            this.buyMessage = datas
        }
    }

}
</script>

<style lang="stylus">
.home{
    overflow: hidden

    /* 向左滚动 */
    .show-left-enter-active,.show-left-leave-active{
        transition: all 0.8s
        transform: translate3d(0,0,0)
    }
    .show-left-enter{
        transform: translate3d(-100%,0,0)

    }
    .show-left-leave-active{
        transform: translate3d(100%,0,0)
    }

    /* 向右滚动 */
    .show-right-enter-active,.show-right-leave-active{
        transition: all 0.8s
        transform: translate3d(0,0,0)
    }
    .show-right-enter{
        transform: translate3d(100%,0,0)
    }
    .show-right-leave-active{
        transform: translate3d(-100%,0,0)
    }
}
</style>

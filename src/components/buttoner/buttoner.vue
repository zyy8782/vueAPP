<template>
    <div class="buttoner">
        <transition name="btn">
            <div class="btn-down" @click="drop" v-show="foods.count > 0 ">-</div>
        </transition>
        <transition name="btn">
            <div class="btn-num" v-show="foods.count > 0 " @click="texts">{{foods.count}}</div>
        </transition>
        <div class="btn-up" @click="add">+</div>
    </div>
</template>

<script>
export default {
    props: {
        foods: Object
    },
    methods: {
        add (event) {
            if (!event._constructed) {
                return
            };
            if (!this.foods.count) {
                this.$set(this.foods,'count',0)
            }
            this.foods.count++
            this.$emit('ballEvent',event.target)
        },
        drop (event) {
            if (!event._constructed) {
                return
            };
            if(this.foods.count <= 0) {
                this.foods.count = 0;
                return
            };
            this.foods.count--
        },
        texts() {
          console.log(1)
        }
    }
}
</script>

<style lang="stylus">
.btn-enter-active
    animation: btn-in 0.5s linear
.btn-leave,.btn-leave-active
    transition: all 0.8s linear
    opacity: 0;
    transform: translate3d(24px,0,0) rotate(180deg)
@keyframes btn-in
    0%
        transform: translate(50px,0px) rotate(360deg)
    10%
        transform: translate(45px,-30px) rotate(324deg)
    200%
        transform: translate(40px,0px) rotate(288deg)
    30%
        transform: translate(35px,-30px) rotate(252deg)
    40%
        transform: translate(30px,0px) rotate(216deg)
    50%
        transform: translate(25px,-30px) rotate(180deg)
    60%
        transform: translate(20px,0px) rotate(144deg)
    70%
        transform: translate(15px,-30px) rotate(108deg)
    80%
        transform: translate(10px,0px) rotate(72deg)
    90%
        transform: translate(5px,-30px) rotate(36deg)
    100%
        transform: translate(0px,0px) rotate(0deg)

.buttoner
    display: flex
    justify-content: flex-end
    height: 24px
    position: relative
    z-index: 110
    .btn-down,.btn-up
        width: 18px
        height: 18px
        font-size: 24px
        font-weight: bold
        background: #FFFFFF
        color:  rgb(0,160,220)
        border: 3px solid  rgb(0,160,220)
        border-radius: 50%
        vertical-align:middle
        display: inline-block
        text-align: center
        line-height: 18px
        user-select: none
    .btn-up
        font-size: 18px
        color: #FFFFFF
        background rgb(0,160,220)
    .btn-num
        height: 22px
        width: 24px
        vertical-align: middle
        line-height:22px
        margin:0 1px
        font-size: 10px
        text-align: center
</style>

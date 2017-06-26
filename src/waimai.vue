<template>
      <keep-alive>
         <router-view></router-view>
      </keep-alive>
</template>

<script>
import header from './components/header/header.vue'
export default {
    components: { 'v-header': header }
}
</script>

<style lang="stylus" scoped>

</style>

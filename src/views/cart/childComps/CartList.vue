<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll" :probe-type="3">
      <cart-list-item v-for="(item,index) in cartList" :key="index" :itemInfo="item"></cart-list-item>
    </scroll>
  </div>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll'
import CartListItem from './CartListItem'
import {mapGetters} from 'vuex'
  export default {
    components:{
      Scroll,
      CartListItem
    },
    computed:{
      ...mapGetters(['cartList'])
    },
    activated(){
      this.$refs.scroll.scroll.refresh()
    }
  }
</script>

<style scoped>
.cart-list{
  height: calc(100vh - 93px);
  position: relative;
}
.content{
  height: 100%;
  overflow: hidden;
}
</style>
<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
  export default {
    props:{
      probeType:{
        type:Number,
        default:0
      }
    },
    data(){
      return{
        scroll:null
      }
    },
    mounted(){
      //1.创建BScroll对象
      this.scroll=new BScroll(this.$refs.wrapper,{
        probeType:this.probeType,
        click:true
      })
      //2.监听滚动的位置
      this.scroll.on('scroll',position=>{
        this.$emit('scroll',position)
      })
    }
  }
</script>

<style scoped>

</style>
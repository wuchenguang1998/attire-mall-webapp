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
      },
      pullUpLoad:{
        type:Boolean,
        default:false
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
        pullUpLoad:this.pullUpLoad,
        click:true
      })
      //2.监听滚动的位置
      this.scroll.on('scroll',position=>{
        this.$emit('scroll',position)
      })
      //3.监听上拉触底事件
      this.scroll.on('pullingUp',()=>{
        this.$emit('pullingUp')
      })
    },
    methods:{
      refresh(){
        this.scroll&&this.scroll.refresh()
      }
    }
  }
</script>

<style scoped>

</style>
<template>
  <div>
    <nav-bar>
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="title">
        <div v-for="(item,index) in titles"
        :class="{active:index==currentIndex}"
        @click="titClick(index)">{{item}}</div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
  export default {
    components:{
      NavBar
    },
    data(){
      return{
        titles:['商品','参数','评论','推荐'],
        currentIndex:0
      }
    },
    methods:{
      titClick(index){
        this.currentIndex=index
      },
      backClick(){
        this.$router.back()
      }
    }
  }
</script>

<style scoped>
.back img{
  vertical-align: middle;
}
.title{
  font-size: 13px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.active{
  color: var(--color-high-text);
}
</style>
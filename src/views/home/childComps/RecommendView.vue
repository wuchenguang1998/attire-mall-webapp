<template>
  <div class="recommend">
    <div v-for="item in recommend" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    recommend:{
      type:Array,
      default(){
        return []
      }
    }
  }
}
</script>

<style scoped>
.recommend{
  display: flex;
  font-size: 12px;
  padding: 10px 0 20px;
  border-bottom: 8px solid #eeeeee;
}
.recommend-item{
  flex: 1;
}
.recommend-item img{
  width: 70px;
  height: 70px;
  margin-bottom: 5px;
}
.recommend-item a{
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
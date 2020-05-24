<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">穿搭show</div>
    </nav-bar>
    <home-swiper :banners="banners"></home-swiper>
    <recommend-view :recommend="recommends"></recommend-view>
    <feature-view></feature-view>
    <tab-control class="tab-control" :titles="['流行','新款','精选']"></tab-control>
    <ul>
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <li>4</li>
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <li>4</li>
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <li>4</li>
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <li>4</li>
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <li>4</li>
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <li>4</li>
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <li>4</li>
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <li>4</li>
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <li>4</li>
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <li>4</li>
    </ul>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import HomeSwiper from './childComps/HomeSwiper';
import RecommendView from './childComps/RecommendView';
import FeatureView from './childComps/FeatureView'
import TabControl from 'components/content/tabControl/TabControl'
import { getHomeMultidata, getHomeGoods } from "network/home";

export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl
  },
  data() {
    return {
      banners:[],
      recommends:[],
      goods:{
        'pop':{page:0,list:[]},
        'new':{page:0,list:[]},
        'sell':{page:0,list:[]},
      }
    }
  },
  created() {   //created中只写主要逻辑
    //1.请求多个数据
    this.getHomeMultidata()
    //2.请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  methods:{
    getHomeMultidata(){
      getHomeMultidata().then(res => {
      this.banners=res.data.banner.list
      this.recommends=res.data.recommend.list
    })
    },
    getHomeGoods(type){
      const page=this.goods[type].page+1
      getHomeGoods(type,page).then(res=>{
        this.goods[type].list.push(...res.data.list)  //push中可以使用扩展运算符
        this.goods[type].page+=1
      })
    }
  }
};
</script>

<style scoped>
#home{
  padding-top: 44px;
}
/* #home{
  margin-bottom: 49px;
} */
.home-nav {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  background-color: var(--color-tint);
  color: white;
  z-index: 100;
}
.tab-control{
  position: sticky;
  top: 44px;   /* 黏连属性必须设置top */
}
</style>
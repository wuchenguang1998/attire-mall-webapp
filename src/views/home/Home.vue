<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">穿搭show</div>
    </nav-bar>
    <tab-control :titles="['流行','新款','精选']" @tabClick="tabClick" ref="tabControl1" class="tab-control" v-show="isTabFixed"></tab-control>
    <scroll class="content" ref="scroll" :probe-type="3" :pull-up-load="true" @scroll="contentscroll" @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <recommend-view :recommend="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control :titles="['流行','新款','精选']" @tabClick="tabClick" ref="tabControl2"></tab-control>
      <good-list :goods="showGoods"></good-list>
    </scroll>
    <back-top v-show="isShow" @click.native="backClick"></back-top>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";
import TabControl from "components/content/tabControl/TabControl";
import GoodList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/content/backTop/BackTop"
import { getHomeMultidata, getHomeGoods } from "network/home";
import {debounce} from "common/utils";

export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodList,
    Scroll,
    BackTop
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      currentType: "pop",
      isShow:false,
      tabOffsetTop:0,
      isTabFixed:false,
      saveY:0
    };
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    }
  },
  activated(){
    this.$refs.scroll.scroll.refresh()     //最好先刷新一下，否则会出现问题
    this.$refs.scroll.scroll.scrollTo(0,this.saveY,0)
  },
  deactivated(){
    this.saveY=this.$refs.scroll.scroll.y
  },
  created(){
    //created中只写主要逻辑
    //1.请求多个数据
    this.getHomeMultidata();
    //2.请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted(){
    //监听item中图片加载完成,让sroll更新，从而重新计算可滚动高度
    // this.$bus.$on('itemImageLoad',()=>{
    //   this.$refs.scroll&&this.$refs.scroll.scroll.refresh()    //当this.$refs.scroll有值时，才能执行后面的
    // })
    const refresh=debounce(this.$refs.scroll.refresh,200)
    this.$bus.$on('itemImageLoad',()=>{
      refresh()
    })
  },
  methods: {
    //网络请求相关方法
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list); //push中可以使用扩展运算符
        this.goods[type].page += 1;
        this.$refs.scroll&&this.$refs.scroll.scroll.finishPullUp();    //结束上拉加载，使得下次可以继续上拉加载
      });
    },
    //事件句柄
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      //对两个tabControl的currentIndex进行统一
      this.$refs.tabControl1.currentIndex=index
      this.$refs.tabControl2.currentIndex=index
    },
    backClick(){
      //操作scroll组件内部的scroll变量,使其返回顶部
      this.$refs.scroll.scroll.scrollTo(0,0,300)
    },
    contentscroll(position){
      //判断backtop是否显示
      if(position.y<-1000){
        this.isShow=true
      }else{
        this.isShow=false
      }
      //或者直接写成this.isShow=(-position.y)>1000
      //判断tabControl是否吸顶(position:fixed)
      this.isTabFixed=-(position.y)>this.tabOffsetTop
    },
    loadMore(){
      this.getHomeGoods(this.currentType)
    },
    swiperImageLoad(){
      //在轮播图加载完成后，才获取tabControl的offsetTop
      //所有的组件都有一个属性$el:用于获取组件中的元素
      this.tabOffsetTop=this.$refs.tabControl2.$el.offsetTop
    }
  }
};
</script>

<style scoped>
#home {
  /* padding-top: 44px; */
  height: 100vh;
  position: relative;
}
.home-nav {
  /* position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 100; */
  background-color: var(--color-tint);
  color: white;
}
/* 黏连属性必须设置top */
/* .tab-control {
  position: sticky;
  top: 44px;
  z-index: 100;
} */
/* 运算符之间要预留问题，不然会出问题 */
/* .content{
  height: calc(100% - 93px);
  overflow: hidden;
  margin-top: 44px;
} */
.content{
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 44px;
  left: 0;
  right: 0;
}
/* .fixed{
  position: fixed;
  top: 44px;
  left: 0;
  right: 0;
} */
.tab-control{
  position: relative;
  z-index: 9;
}
</style>
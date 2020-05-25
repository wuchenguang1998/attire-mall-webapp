<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">穿搭show</div>
    </nav-bar>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentscroll">
      <home-swiper :banners="banners"></home-swiper>
      <recommend-view :recommend="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control class="tab-control" :titles="['流行','新款','精选']" @tabClick="tabClick"></tab-control>
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
      isShow:false
    };
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    }
  },
  created() {
    //created中只写主要逻辑
    //1.请求多个数据
    this.getHomeMultidata();
    //2.请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
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
      });
    },
    //事件句柄
    tabClick(index) {
      // console.log(index)
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
    },
    backClick(){
      //操作scroll组件内部的scroll变量,使其返回顶部
      this.$refs.scroll.scroll.scrollTo(0,0,300)
    },
    contentscroll(position){
      if(position.y<-1000){
        this.isShow=true
      }else{
        this.isShow=false
      }
      //或者直接写成this.isShow=(-position.y)>1000
    }
  }
};
</script>

<style scoped>
#home {
  padding-top: 44px;
  height: 100vh;
  position: relative;
}
.home-nav {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  background-color: var(--color-tint);
  color: white;
  z-index: 100;
}
.tab-control {
  position: sticky;
  top: 44px;     /* 黏连属性必须设置top */
  z-index: 100;
}
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
</style>
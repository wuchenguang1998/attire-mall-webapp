<template>
  <div>
    <div id="detail">
      <detail-nav-bar @titClick="titClick" ref="nav"></detail-nav-bar>
      <scroll class="content" ref="scroll" :probeType="3" @scroll="contentScroll">
        <detail-swiper :topImages="topImages"></detail-swiper>
        <detail-base-info :goods="goods"></detail-base-info>
        <detail-shop-info :shop="shop"></detail-shop-info>
        <detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
        <detail-param-info ref="params" :paramInfo="paramInfo"></detail-param-info>
        <detail-comment-info ref="comment" :commentInfo="commentInfo"></detail-comment-info>
      </scroll>
      <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
      <back-top v-show="isShow" @click.native="backClick"></back-top>
    </div>
  </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll";

import BackTop from "components/content/backTop/BackTop"
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import DetailBottomBar from "./childComps/DetailBottomBar";
import { getDetail, Goods, Shop, GoodsParam } from "network/detail";
import {debounce} from "common/utils";
export default {
  name: "Detail",
  components: {
    Scroll,
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    BackTop    //可以采用混入策略，以后优化再说
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      themeTopYs: [],
      getThemeTopY: null,
      isShow:false,
    };
  },
  created() {
    //1.保存传入的iid
    this.iid = this.$route.params.iid;
    //2.根据iid请求详情数据
    getDetail(this.iid).then(res => {
      const data = res.result;
      //1.获取顶部轮播图片数据
      this.topImages = data.itemInfo.topImages;
      //2.创建商品信息信息对象
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      //3.创建店铺信息对象
      this.shop = new Shop(data.shopInfo);
      //4.获取商品详情信息
      this.detailInfo = data.detailInfo;
      //5.获取参数信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );
      //6.获取评论信息
      if (data.rate.cRate != 0) {
        this.commentInfo = data.rate.list[0];
      }
      this.$nextTick(() => {
        //下一帧
        //根据最新的数据，对应的DOM是已经渲染了
        //但是图片依然没有加载完
        // this.themeTopYs = [];
        // this.themeTopYs.push(0);
        // this.themeTopYs.push(this.$refs.params.$el.offsetTop-44);
        // this.themeTopYs.push(this.$refs.comment.$el.offsetTop-44);
      });
      this.getThemeTopY = debounce(() => {
        this.themeTopYs = [];
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.params.$el.offsetTop - 44);
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 44);
      },100);
    });
  },
  mounted() {},
  methods: {
    imageLoad() {
      this.$refs.scroll.scroll.refresh();
      this.getThemeTopY()
    },
    titClick(index) {
      this.$refs.scroll.scroll.scrollTo(0, -this.themeTopYs[index], 0);
    },
    contentScroll(position){
      //获取Y值
      const positionY=-position.y
      //positionY和主题中的值进行对比,后期可以进行防抖处理
      if(positionY>0&&positionY<this.themeTopYs[1]){
        this.$refs.nav.currentIndex=0
      }else if(positionY>this.themeTopYs[1]&&positionY<this.themeTopYs[2]){
        this.$refs.nav.currentIndex=1
      }else if(positionY>this.themeTopYs[2]){
        this.$refs.nav.currentIndex=2
      }
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
    backClick(){
      //操作scroll组件内部的scroll变量,使其返回顶部
      this.$refs.scroll.scroll.scrollTo(0,0,300)
    },
    addToCart(){
      //1.获取购物车商品信息
      const product={}
      product.image=this.topImages[0]
      product.title=this.goods.title
      product.desc=this.goods.desc
      product.price=this.goods.realPrice
      product.iid=this.iid
      //2.将商品加入购物车
      this.$store.commit('addCart',product)
    }
  }
};
</script>

<style scoped>
#detail {
  height: 100vh;
  position: relative;
  z-index: 9;
  background-color: white;
}
.content {
  height: calc(100% - 44px);
  overflow: hidden;
}
</style>
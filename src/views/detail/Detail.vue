<template>
  <div>
    <div id="detail">
      <detail-nav-bar></detail-nav-bar>
      <scroll class="content" ref="scroll">
        <detail-swiper :topImages="topImages"></detail-swiper>
        <detail-base-info :goods="goods"></detail-base-info>
        <detail-shop-info :shop="shop"></detail-shop-info>
        <detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
        <detail-param-info :paramInfo="paramInfo"></detail-param-info>
      </scroll>
    </div>
  </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll";

import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import { getDetail, Goods, Shop, GoodsParam } from "network/detail";
export default {
  name: "Detail",
  components: {
    Scroll,
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo:{},
      paramInfo:{}
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
      this.detailInfo=data.detailInfo
      //5.获取参数信息
      this.paramInfo=new GoodsParam(data.itemParams.info,data.itemParams.rule)
      //6.获取评论信息
      // if(data.rate.cRate!=0){
      //   this.commentInfo=data.rate.list[0]
      // }
    });
  },
  methods:{
    imageLoad(){
      this.$refs.scroll.scroll.refresh()
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
.content{
  height: calc(100% - 44px);
  overflow: hidden;
}
</style>
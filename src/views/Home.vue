<template>
  <div>
        <div class="body">
            <div class="block text-center">
                <el-carousel height="750px">
                    <el-carousel-item v-for="(image, index) in images" :key="index">
                        <h3 class="image-description">{{ image.description }}</h3>
                        <div class="box"> <img :src="image.src" alt="" class="carousel-image"></div>
                    </el-carousel-item>
                </el-carousel>
            </div>

            <div class="page-hot">
                    <div class="page-title-box">
                        <img src="../assets/page-bg.png" class="page-bg" alt="">
                        <div class="page-title font-num">
                            <div class="title-box">
                                <div class="cn font-hm">热门商品</div>
                                <div class="en">Hot products</div>
                                <div class="num">01</div>
                            </div>
                        </div>
                    </div>
                    <div class="hll">
                        <Sec1></Sec1>
                    </div>
                <div class="hot">
                    <div class="item-all">
                        <Hot />
                    </div>
                </div>
                <div class="page-zhuangshi-right">
                    <img src="../assets/page-zhuangshi.png" alt="">
                </div>
            </div>

    </div>
  </div>
</template>

<script>
import Hot from '@/components/Hot.vue';
import Sec1 from '@/components/Sec1.vue';

  export default {
    name:'Home',
    data(){
        return{
            images:[
            {
                src:require('@/assets/carousel1.jpg'), 
                description: '对空六课' 
            },
            {
                src:require('@/assets/carousel2.jpg'), 
                description: '绳斤' 
            },
            {
                src:require('@/assets/carousel3.jpg'), 
                description: '狡兔屋' 
            },
            {
                src:require('@/assets/carousel4.jpg'), 
                description: '白祇重工' 
            },
            {
                src:require('@/assets/carousel5.jpg'), 
                description: '维多利亚家政' 
            },
            ]
        }
    },
    methods: {
    
    },
    components: {
    Hot,
    Sec1
  }
}
</script>

<style>
    .body{
        margin: 0 auto;
    }
    .image-description {
    float: left;
    left: 400px;
    top: 580px;
    position: fixed;
    color: #ffffff;
    font-size: 100px;
    line-height: 150px;
    margin: 0;
    text-align: center;
    font-weight: 900;
    -webkit-text-stroke: 1px #000000;
    z-index: 100;
    }


    .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
    }
    .carousel-image {
        width: 100%;
        height: 750px;
        object-fit: cover;
    }
    .box{
        position: relative;
        width: 100%;
        height: 100%;
    }
    .box::before {
            content: " ";
            position: absolute;
            top: 0;
            left: -200px;
            width: 10000px;
            height: 1000%;
            /*最后一个参数是半透明度，可以透过调整0-1的数值，调整到满意的透明度*/
            box-shadow:inset 0px 0px 100px 140px #141414;
        }
        .page-hot{
            position: relative;
        }
        .hot{ 
            position: relative;
            width: 50%;
            height: 1000px;
            margin: 100px auto;
        }

        .page-title-box {
            z-index: 0;
            position: absolute;
            left: 0;
            top: 0;
            overflow: hidden;
        }

        .page-title-box img.page-bg {
            width: 37vw;
            height: auto;
        }

        .page-title {
            position: absolute;
            top: 6.25vw;
            left: -26.94vw;
            width: 38.72vw;
            height: 27.67vw;
            background: url(../assets/page-title-bg.png) no-repeat 0 0/100% 100%;
        }

        .page-title .title-box {
            position: absolute;
            top: 0;
            right: 0;
            width: 11.78vw;
            padding: 1.46vw 0 0 0.78vw;
        }

        .page-title .cn {
            font-size: 2.08vw;
        }

        .page-title .en {
            font-size: 0.94vw;
            margin-top: 0.26vw;
            text-transform: uppercase;
            padding-left: 0.21vw;
        }

        .page-title .num {
            font-size: 4.53vw;
            margin-top: 0.26vw;
        }
        .page-zhuangshi-right {
            position: absolute;
            right: 0;
            bottom: 6.25vw;
            z-index: 2;
        }

        .page-zhuangshi-right img {
            width: 8.86vw;
            height: auto;
        }
        .page-title .cn {
            font-size: 2.08vw;
        }
        .font-hm {
            line-height: 1;
            font-family: hongmengti, "Microsoft YaHei", 微软雅黑, "MicrosoftJhengHei", 华文细黑, STHeiti, MingLiu, sans-serif !important;
        }
        .item-all {
            display: flex;
            gap: 1.72vw;
            flex-wrap: wrap;
            width: 100%;
        }

</style>

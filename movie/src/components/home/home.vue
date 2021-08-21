<template>
    <div class="home">
       <div class="lunbo">
           <div class="left">
               <div class="shaow">
                   <img id="PIC" v-for=" (value,index) in toppic" :key="value.id" :src="value.path" :dataid="index">
               </div>
           </div>
           <div class="right">
               <ul id="ulist">
                   <li class="lis" id="li" v-for="(value,index) in toppic" :key="value.id" :dataid="index " >
                       <b><span :dataid="index ">{{value.name}}</span></b>
                       <p  id="p" :dataid="index ">{{value.introduce}}</p>
                   </li>
               </ul>
           </div>
       </div>
        <div class="hot">
            <div class="hot-content">
                <span><i class="iconfont icon-huo">&nbsp;</i>热播榜</span>
                <p v-for="(value,index) in hotmovie" :key="value.id"><span>{{index + 1}}</span>.{{value.name}}</p>
            </div>
        </div>
        <div class="movie">
                <div class="introduce-text">
                    <span><i class="iconfont icon-tuijian5" style="color: #ad5fff">&nbsp;</i>电影推荐</span>
                    <div class="movie-type">
                        <div class="type">
                            <div class="content-one" >
                                  <i class="iconfont icon-dianying4" style="color: #bf8946"></i>
                              <div class="show-txt" name="one">
                                  <div class="show-txt-nav" name="one">悬疑</div>
                                  <div class="movie-more" v-if="showmore.one" >
                                    <div class="more-content">
                                        <div class="more-content-text"><span>更多悬疑<b><i class="iconfont icon-qianjin4"></i></b></span></div>
                                    </div>
                                    <div class="more-pic">
                                        <div class="more-pic-shaow" v-for="value in threedata.Suspense" :key="value.id">
                                            <img src="../../assets/img/bg.jpg" alt="pic"/>
                                            <div class="more-pic-text">{{value.name}}</div>
                                        </div>
                                    </div>
                                </div>
                              </div>
                            </div>
                            <div class="content-two">
                                <div class="textbox"><span>热播大片</span></div>
                                <div class="textbox"><span>全部电影</span></div>
                            </div>
                        </div>
                        <div class="type">
                            <div class="content-one" >
                                <i class="iconfont icon-dianying4" style="color: #eed414"></i>
                                <div class="show-txt" name="two">
                                    <div class="show-txt-nav" name="two">喜剧</div>
                                    <div class="movie-more" v-if="showmore.two" >
                                        <div class="more-content">
                                            <div class="more-content-text"><span>更多喜剧<b><i class="iconfont icon-qianjin4"></i></b></span></div>
                                        </div>
                                        <div class="more-pic">
                                            <div class="more-pic-shaow" v-for="value in threedata.Comedy" :key="value.id">
                                                <img src="../../assets/img/bg.jpg" alt="pic"/>
                                                <div class="more-pic-text">{{value.name}}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div class="content-two">
                                <div class="textbox"><span>热播大片</span></div>
                                <div class="textbox"><span>全部电影</span></div>
                            </div>
                        </div>
                        <div class="type">
                            <div class="content-one" >
                                <i class="iconfont icon-dianying4" style="color: #13affe"></i>
                                <div class="show-txt" name="three">
                                    <div class="show-txt-nav" name="three">科幻</div>
                                    <div class="movie-more" v-if="showmore.three" >
                                        <div class="more-content">
                                            <div class="more-content-text"><span>更多科幻<b><i class="iconfont icon-qianjin4"></i></b></span></div>
                                        </div>
                                        <div class="more-pic">
                                            <div class="more-pic-shaow" v-for="value in threedata.Science" :key="value.id">
                                                <img src="../../assets/img/bg.jpg" alt="pic"/>
                                                <div class="more-pic-text">{{value.name}}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div class="content-two">
                                <div class="textbox"><span>热播大片</span></div>
                                <div class="textbox"><span>全部电影</span></div>
                            </div>
                        </div>
                        <div class="type">
                            <div class="content-one" >
                                <i class="iconfont icon-dianying4" style="color: #cd4736"></i>
                                <div class="show-txt" name="four">
                                    <div class="show-txt-nav" name="four">恐怖</div>
                                    <div class="movie-more" v-if="showmore.four" >
                                        <div class="more-content">
                                            <div class="more-content-text"><span>更多恐怖<b><i class="iconfont icon-qianjin4"></i></b></span></div>
                                        </div>
                                        <div class="more-pic">
                                            <div class="more-pic-shaow" v-for="value in threedata.horrible" :key="value.id">
                                                <img src="../../assets/img/bg.jpg" alt="pic"/>
                                                <div class="more-pic-text">{{value.name}}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div class="content-two">
                                <div class="textbox"><span>热播大片</span></div>
                                <div class="textbox"><span>全部电影</span></div>
                            </div>
                        </div>
                        <div class="type">
                            <div class="content-one" >
                                <i class="iconfont icon-dianying4" style="color: #ff8aeb"></i>
                                <div class="show-txt" name="five">
                                    <div class="show-txt-nav" name="five">动漫</div>
                                    <div class="movie-more" v-if="showmore.five" >
                                        <div class="more-content">
                                            <div class="more-content-text"><span>更多动漫<b><i class="iconfont icon-qianjin4"></i></b></span></div>
                                        </div>
                                        <div class="more-pic">
                                            <div class="more-pic-shaow" v-for="value in threedata.Animation" :key="value.id">
                                                <img src="../../assets/img/bg.jpg" alt="pic"/>
                                                <div class="more-pic-text">{{value.name}}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div class="content-two">
                                <div class="textbox"><span>热播大片</span></div>
                                <div class="textbox"><span>全部电影</span></div>
                            </div>
                        </div>
                        <div class="right-more">
                            <div class="right-more-leftchoose">
                                <div class="choose">
                                    <div class="choose-content">
                                        <span>纪录片</span>
                                        <span class="inside-txt">Documentary</span>
                                    </div>
                                </div>
                                <div class="choose">
                                    <div class="choose-content">
                                        <span>悲剧</span>
                                        <span class="inside-txt">TRAGEDY</span>
                                    </div>
                                </div>
                                <div class="choose">
                                    <div class="choose-content">
                                        <span>犯罪</span>
                                        <span class="inside-txt">CRIME</span>
                                    </div>
                                </div>
                                <div class="choose">
                                    <div class="choose-content">
                                        <span>爱情</span>
                                        <span class="inside-txt">LOVE</span>
                                    </div>
                                </div>
                            </div>
                            <div class="right-more-rightchoose">
                                <div class="contact_us">
                                    <div class="contact_logo"><i class="iconfont icon-duanxin"></i></div>
                                    <span>CONTACT US</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="movie-all" v-for="value in movie" :key="value.id">
                    <div class="movie-pic" >
                        <div class="mpic-bg"></div>
                        <img id='movie' :data-src="value.path"  src=""/>
                        <div class="movie-detail">
                            <div class="detailbox">
                                <span>{{value.name}}</span>
                                <p>类型:{{value.type}}</p>
                                <p>主演:NOTEN / NOTEN</p>
                                <p>{{value.introduce}}</p>
                            </div>
                        </div>
                    </div>
                    <div class="movie-text">
                        <span>{{value.name}}</span>
                        <p>{{value.introduce}}</p>
                    </div>
                </div>
            </div>
        <div class="loading" v-show="loading">
            <div class="content">
                <div class="p1"></div>
                <div class="p2"></div>
                <div class="p3"></div>
                <div class="p4"></div>
            </div>
            <div class="tips" v-if="tipshow">正在加载中......</div>
            <div class="tipsover" v-else>我已经到底了.....</div>
        </div>
        <div class ="foot" @click="btn">
            <div class="footbox">
                <div class="footbox_txt">该网站用于电影宣传，将电影推荐给用户</div>
                <div class="footbox_txt">
                    <div class="border">
                        <div class="border_box">
                            <div class="iconbox" name="top"><i class="iconfont icon-icon_wode"></i></div>
                            <div class="border_txt" name="top"><span>1人</span></div>
                        </div>
                        <div class="border_box">
                            <div class="iconbox" name="middle"><i class="iconfont icon-icon_wode"></i></div>
                            <div class="border_txt" name="middle"><span>1000人</span></div>
                        </div>
                        <div class="border_box">
                            <div class="iconbox" name="middle"><i class="iconfont icon-icon_wode"></i></div>
                            <div class="border_txt" name="middle"><span>100000人</span></div>
                        </div>
                        <div class="border_box">
                            <div class="iconbox" name="bottom"><i class="iconfont icon-icon_wode"></i></div>
                            <div class="border_txt" name="bottom"><span>1亿人</span></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {init,debounce,bottomscroll,toppic,checkpic,lunbo,Hotmovie,Moviemore,moreMovie,footanimation} from "./home.js";
    import {getitem} from '../../assets/js/common.js';
    export default {
        name: "home",
        data(){
            return{
                toppic:[],//接收轮播图数据
                movie:[],//接收部分电影数据
                hotmovie:[],//热播榜前十
                alldata:{
                    horrible:[],
                    Science:[],
                    Animation:[],
                    Comedy:[],
                    Suspense:[]
                },//所有数据分类
                threedata:{},//所有数据的每一个分类的前三个
                pagesize:9,//后台查询数据的条件
                pagenum:0,//后台查询数据的条件
                loading:false,//是否进入加载状态
                tipshow:true,//加载状态的字体内容改变
                showmore:{
                    one:false,
                    two:false,
                    three:false,
                    four:false,
                    five:false
                }//鼠标移入电影分类出现更多
            }
        },
        created(){
            let that =this;
            init(that);//加载时发送请求获取图片的数据
            toppic(that);//获得轮播图数据
            //将所有数据进行分类并统计到一个对象中,每类数据只取前三
            moreMovie(that);
        },
        mounted() {
            //触发修改vuex的islogin状态
            this.isLogin();
            //首先再页面初次加载时调用加载图片
            debounce()();
            //图片懒加载加防抖
            window.addEventListener('scroll',debounce());
            //监听鼠标滚轮事件
            window.onmousewheel = bottomscroll(this);
            //给鼠标滚轮添加监听时间
            window.addEventListener('mousewheel',footanimation);
        },
        beforeUpdate(){
        },
        updated(){
            // //当showmore发生改变时，给电影标题里的图片添加特效
            this.Moviepics();
        },
        destroyed(){
            window.removeEventListener('mousewheel',footanimation);
        },
        methods:{
            btn:function () {
                console.log(this.toppic);
            },
            Moviepics:function () {
                var  moviepics = document.querySelectorAll('.more-pic-shaow');
                if(moviepics.length !== 0){
                    moviepics.forEach(function (value) {
                       setTimeout(function () {
                           value.style.opacity = "1";
                           value.style.transform="translateX(0%)";
                       },0)

                    })
                }
                else{
                    return
                }
            },
            //将vuex中的islogin改为true，如果本地中有账户信息则修改
            isLogin:function () {
                try {
                    var islogin = getitem().Login.isLogin;
                    if(islogin && !this.$store.state.Login.isLogin){
                        //将vuex中的islogin改为true
                        this.$store.dispatch('LoginChange');
                    }
                }
                catch (e) {
                    console.log('出错了');
                }
            }
        },
        watch:{
            toppic(){
                let that =this;
                this.$nextTick(()=>{
                    //轮播图的右侧设置鼠标移入和移出事件
                    checkpic(that);
                    //自动轮播
                    lunbo();
                    //热播棒前十数据
                    Hotmovie(that);
                    //鼠标移入电影标题展示更多
                    Moviemore(that);
                })
            },
            // showmore:{
            //     handler(newVal, oldVal) {
            //         console.log(newVal,oldVal);
            //         var  moviepics = document.querySelectorAll('.more-pic-shaow');
            //         console.log(moviepics);
            //     },
            //     immediate: true,//在监听开始时就调用一次
            //     deep: true // 可以深度检测到 person 对象的属性值的变化
            // }
        }
    }
</script>

<style scoped lang="less">
    .iconfont{
        color: #ffffff;
        font-size: 0.3rem;
    }
    .home{
        position: relative;
        width:100%;
        height:auto;
        .lunbo{
            position: relative;
            left:8%;
            display: flex;
            margin:0;
            width:70%;
            height:auto;
            border-bottom-left-radius: 5px;
            border-top-left-radius: 5px;
            .left{
                position: relative;
                left:50%;
                transform: translateX(-50%);
                width:95%;
                height:7.5rem;
                .shaow{
                    position: relative;
                    width:100%;
                    height:100%;
                    box-shadow: -20px 0px 50px 20px #202020 inset ;
                    border-bottom-left-radius: 5px;
                    border-top-left-radius: 5px;
                    &:hover img{
                        filter:brightness(100%) contrast(110%);
                    }
                    img{
                        display: none;
                        position: absolute;
                        width:100%;
                        height:100%;
                        z-index: -1;
                        filter: brightness(70%);
                        border-bottom-left-radius: 5px;
                        border-top-left-radius: 5px;
                        transition: 0.75s;
                        &:nth-child(1){
                            display: block;
                        }
                    }
                }
            }
            .right{
                position: absolute;
                right:5%;
                width:25%;
                height:7.5rem;
                ul{
                    position: absolute;
                    display: flex;
                    height: auto;
                    width:100%;
                    padding: 0px;
                    margin: 0;
                    top:50%;
                    transform: translateY(-50%);
                    flex-wrap: wrap;
                    list-style: none;
                    li{
                        cursor: pointer;
                        width:100%;
                        font-size: 0.2rem;
                        text-align: right;
                        height:1rem;
                        color: #ffffff;
                        opacity: 0.5;
                        span{
                            font-size: 0.25rem;
                        }
                        p{
                            position: relative;
                            display: none;
                            font-size: 0.2rem;
                            text-overflow: ellipsis;
                            overflow: hidden;
                            white-space: nowrap;
                            margin: 0;
                            padding:10px 10px 0 10px;
                            color: #ffffff;
                        }
                    }
                }
            }
        }
        .hot{
            position: absolute;
            text-align: center;
            display: flex;
            flex-wrap: wrap;
            top:0;
            left:76%;
            width:15%;
            height:7.5rem;
            border-bottom-right-radius:5px;
            border-top-right-radius:5px;
            background-color: rgb(29, 29, 29);
            .hot-content{
                position: absolute;
                width:100%;
                height: 7.5rem;
                span{
                    display: block;
                    width:100%;
                    color: #8d72bf;
                    font-size: 0.3rem;
                    height: 10%;
                    line-height: 0.75rem;
                    i{
                        color: #bc99ff;
                    }
                }
                p{
                    width:100%;
                    height: 10%;
                    line-height: 0.75rem;
                    color: white;
                    overflow: hidden;
                    text-align: left;
                    box-sizing: border-box;
                    padding-left: 10px;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    margin:0;
                    font-size: 0.25rem;
                    cursor: pointer;
                    &:hover{
                        color: rgb(173, 95, 255);
                    }
                   span{
                       display: inline;
                   }
                    &:nth-child(2) span,&:nth-child(3) span,&:nth-child(4) span{
                        color: #9156ff;
                        font-size: 0.5rem;
                    }
                }
            }

        }
        .movie{
            font-size: 0.3rem;
            box-sizing: border-box;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-around;
            margin:0.5rem auto auto ;
            width:100%;
            height:auto;
            border-bottom-left-radius: 2%;
            border-top-left-radius: 2%;
            background-color: rgba(27, 45, 25, 0.29);
            .introduce-text{
                width: 100%;
                height:2.5rem;
                text-align: center;
                line-height: 1rem;
                color: #bc99ff;
                font-family: "华文琥珀";
                span{
                    display: block;
                    width:100%;
                    height:1rem;
                }
                .movie-type{
                    width:100%;
                    height:1.5rem;
                    margin: 0 auto;
                    display: flex;
                    flex-wrap: nowrap;
                    justify-content: space-between;
                    box-shadow:inset 0px -5px 5px -3px rgba(207, 88, 253, 0.9);
                    .type{
                        width:11%;
                        height:95%;
                        display: flex;
                        justify-content: center;
                        padding: 0 10px;
                        box-sizing: border-box;
                        flex-wrap: wrap;
                        border-top-right-radius: 20%;
                        border-right: 1px solid rgba(207, 88, 253, 0.4);
                    .content-one{
                        position: relative;
                        line-height: normal;
                        width:100%;
                        height:50%;
                        font-size: 0.2rem;
                        display: flex;
                        align-items: center;
                        .show-txt{
                            position: relative;
                            display:block;
                            width: 100%;
                            height:100%;
                            line-height: 100%;
                            font-size: 0.3rem;
                            .show-txt-nav{
                                position: absolute;
                                box-sizing: border-box;
                                padding: 0 10%;
                                width:100%;
                                height: 100%;
                                color: white;
                                transition: 0.2s;
                                display: flex;
                                flex-direction:column;
                                justify-content: center;
                                align-items: flex-start;
                                cursor: pointer;
                                &:hover{
                                    color: rgba(147, 86, 255, 0.69);
                                }
                            }
                            .movie-more{
                                position: absolute;
                                padding: 0.2rem;
                                box-sizing: border-box;
                                top:-3rem;
                                width:5rem;
                                height:3rem;
                                background-color: rgba(42, 42, 42, 0.75);
                                display: flex;
                                flex-wrap: wrap;
                                border-radius: 10px;
                                &::before{
                                    content: "";
                                    position: absolute;
                                    left:0px;
                                    transform: translateX(100%);
                                    bottom:-0.2rem;
                                    border-top: 0.2rem solid rgba(42, 42, 42, 0.75);
                                    border-left: 0.15rem solid transparent;
                                    border-right: 0.15rem solid transparent;
                                }
                                .more-content{
                                    width:100%;
                                    height:0.5rem;
                                    .more-content-text{
                                        text-align: left;
                                        width:100%;
                                        height:100%;
                                        span{
                                            display: inline;
                                            font-size: 0.25rem;
                                            color: #e7e7e7;
                                            cursor: pointer;
                                            i{
                                                font-size: 0.2rem;
                                                transition: 0.4s;
                                            }
                                            &:hover,&:hover i{
                                                color: #cf58fd;
                                            }
                                        }
                                    }
                                }
                                .more-pic{
                                    position: relative;
                                    width:100%;
                                    height:2.1rem;
                                    display: flex;
                                    justify-content: space-between;
                                    .more-pic-shaow{
                                        position: relative;
                                        width:32%;
                                        height:100%;
                                        opacity: 0;
                                        &:hover{
                                            filter: contrast(110%);
                                        }
                                        &:hover .more-pic-text{
                                            display: block;
                                            color: white;
                                        }
                                        &:nth-child(1){
                                            transform: translateX(-5%);
                                            transition: opacity 0.5s cubic-bezier(.51,.79,.88,.83),transform 0.25s cubic-bezier(.51,.79,.88,.83);
                                        }
                                        &:nth-child(2){
                                            transform: translateX(-7.5%);
                                            transition: opacity 0.75s cubic-bezier(.51,.79,.88,.83),transform 0.25s cubic-bezier(.51,.79,.88,.83);
                                        }
                                        &:nth-child(3){
                                            transform: translateX(-10%);
                                            transition: opacity 1s cubic-bezier(.51,.79,.88,.83),transform 0.25s cubic-bezier(.51,.79,.88,.83);
                                        }
                                        .more-pic-text{
                                            position: absolute;
                                            display: none;
                                            bottom:0px;
                                            width: 100%;
                                            white-space: nowrap;
                                            padding:0 5px;
                                            text-overflow: ellipsis;
                                            overflow: hidden;
                                            text-align: center;
                                            font-size: 0.2rem;
                                            z-index: 3;
                                            font-family: "Times New Roman", Times, serif;
                                            transition: 0.1s;
                                            cursor: pointer;
                                        }
                                        img{
                                            position: absolute;
                                            left:0px;
                                            cursor: pointer;
                                            z-index: 2;
                                            width:100%;
                                            height:100%;
                                            border: 1px solid #464646;
                                            border-radius: 5px;
                                        }
                                    }

                                }
                            }
                        }
                            span{
                                display: block;
                                height:auto;
                                font-size: 0.3rem;
                                color: rgba(249, 249, 249, 0.93);
                                cursor: pointer;
                                transition: 0.4s;
                            }
                        }
                    .content-two{
                        line-height: normal;
                        font-size: 0.2rem;
                        display: flex;
                        flex-wrap: wrap;
                        align-self: center;
                        width:100%;
                        height:50%;
                      .textbox{
                          width:100%;
                          height:50%;
                          color: rgba(211, 211, 211, 0.69);
                          cursor: pointer;
                          span{
                              display: block;
                              width:100%;
                              height:100%;
                          }
                          &:hover{
                              color: rgba(147, 86, 255, 0.69);
                          }
                      }
                    }
                    }
                    .right-more{
                        width:40%;
                        height:100%;
                        display: flex;
                        justify-content: center;
                        .right-more-leftchoose{
                            display: flex;
                            flex-wrap: wrap;
                            justify-content: space-between;
                            width:50%;
                            height:100%;
                            box-sizing: border-box;
                            border-top-left-radius: 15%;
                            .choose{
                                width:50%;
                                height:50%;
                                .choose-content{
                                    position: relative;
                                    width:100%;
                                    height:100%;
                                    transition: 0.5s;
                                    color: white;
                                    font-size: 0.2rem;
                                    &:hover{
                                        transform: scale(1.2);
                                        color: #795da3;
                                    }
                                    &:hover .inside-txt{
                                        opacity: 0.5;
                                        background-image: linear-gradient(to bottom, #9356ff, #924ff3, #683db1,transparent);
                                    }
                                    span{
                                        position: absolute;
                                        display: flex;
                                        flex-direction: column;
                                        justify-content: center;
                                        height:100%;
                                        cursor: pointer;
                                        &:nth-child(2){
                                            z-index: 2;
                                            opacity: 0.3;
                                            -webkit-background-clip: text;
                                            -webkit-text-fill-color: transparent;
                                            background-image: linear-gradient(to bottom, #ffffff, #c8c8c8, #6f6f6f,transparent);
                                        }
                                        &:nth-child(1){
                                            top:-0.1rem;
                                            z-index: 3;
                                        }
                                    }
                                }
                            }
                        }
                        .right-more-rightchoose{
                            display: flex;
                            width:40%;
                            height:100%;
                            box-sizing: border-box;
                            border-left: 1px solid rgba(247, 37, 253, 0.16);
                            justify-content: center;
                            align-items: center;
                            padding-left: 0.2rem;
                            .contact_us{
                                position: relative;
                                height:100%;
                                width:80%;
                                display: flex;
                                flex-wrap: wrap;
                                .contact_logo{
                                    width:100%;
                                    height:50%;
                                    i{
                                        display: block;
                                        transition: 0.25s;
                                        font-size: 0.5rem;
                                        color: #bc99ff;
                                        &:hover{
                                            color: #e100fd;
                                            cursor: pointer;
                                            transform: scale(1.1);
                                        }
                                    }
                                }
                                span{
                                    position: absolute;
                                    bottom: 0px;
                                    display: flex;
                                    flex-direction: column;
                                    justify-content: center;
                                    width:100%;
                                    height:50%;
                                    line-height: normal;
                                    font-size: 0.2rem;
                                }
                            }
                        }
                    }
                }
            }
            .movie-all{
                position: relative;
                border: 1px solid transparent;
                width:30%;
                height:29%;
                margin-top: 0.2rem;
                margin-bottom: 0.2rem;
                border-radius: 2%;
                overflow: hidden;
                .movie-pic{
                    position: relative;
                    overflow: hidden;
                    z-index:3;
                    border-radius: 2%;
                    .mpic-bg{
                        width:100%;
                        height:98%;
                        position: absolute;
                        z-index: 2;
                        cursor: pointer;
                        transition: 0.4s;
                        border-radius: 2%;
                        background-image: linear-gradient(135deg, transparent, transparent,transparent, rgba(255, 255, 255, 0.24),transparent,transparent,transparent);
                        background-size: 300%,300%;
                        &:hover +img{
                            transform: scale(1.1);
                            filter: brightness(100%);
                        }
                        &:hover{
                            transform: scale(1.1);
                            background-position: 90% 90%;
                        }
                    }
                    img{
                        width:100%;
                        height:70%;
                        transition: 0.4s;
                        filter: brightness(70%);
                        border-radius: 2%;
                    }
                    .movie-detail{
                        position: absolute;
                        overflow: hidden;
                        top:0;
                        left:-50%;
                        width:50%;
                        z-index: 4;
                        height:98%;
                        transition: .4s;
                        background-color: rgba(74, 74, 74, 0.57);
                        color: white;
                        .detailbox{
                            position: absolute;
                            box-sizing: border-box;
                            padding: 10px;
                            width:100%;
                            height:100%;
                            span{
                                display: block;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                white-space: nowrap;
                            }
                            p{
                                overflow: hidden;
                                text-overflow: ellipsis;
                                white-space: nowrap;
                                margin:5px 0 0 0;
                                font-size: 0.2rem;
                                &:nth-child(4){
                                    overflow: hidden;
                                    text-overflow: ellipsis;
                                    white-space: normal;
                                    display:-webkit-box;
                                    -webkit-line-clamp:6;
                                    -webkit-box-orient:vertical;
                                    margin:5px 0;
                                    font-size: 0.1rem;
                                }
                            }
                        }
                    }
                    &:hover .movie-detail{
                        transform: translateX(100%);
                    }
                }
                .movie-text{
                    width:100%;
                    height:1rem;
                    transition: 1s;
                    z-index: 4;
                    text-align: left;
                    background-color: transparent;
                    border-radius: 2%;
                    color: #f8f8f8;
                    span{
                        cursor: pointer;
                        transition: 0.4s;

                        &:hover{
                            color: #a37dcd;
                        }
                    }
                    p{
                        box-sizing: border-box;
                        font-size: 0.1rem;
                        width:100%;
                        padding:0rem 0.05rem;
                        margin: 0;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow:ellipsis;
                    }
                }
                &:hover{
                    border: 1px solid #a37dcd;
                    box-shadow: 0px 0px 3px 1px #ffffff;
                }
                /*&::before{*/
                    /*content: "";*/
                    /*position: absolute;*/
                    /*top:50%;*/
                    /*transform: translateY(-50%);*/
                    /*width:50%;*/
                    /*z-index: 4;*/
                    /*height:70%;*/
                    /*background-color: white;*/
                /*}*/
                /*&:hover ::before{*/
                   /*content: "";*/
                    /*position: absolute;*/
                    /*width:50%;*/
                    /*height:100%;*/
                    /*background-color: white;*/
                /*}*/
            }
        }
        .loading{
            width:100%;
            height: 3rem;
            .content{
                position: relative;
                width:2rem;
                height:2rem;
                margin: 0 auto;
                animation: loading 5s infinite linear;
                .p1,.p2,.p3,.p4{
                    position: absolute;
                    width:0.5rem;
                    height:0.5rem;
                    border-radius: 50%;
                    background-color: #0077aa;
                    &:before{
                        content: "";
                        position: absolute;
                        bottom: -0.07rem;
                        left:50%;
                        transform: translateX(-50%);
                        border-left: 0.25rem solid transparent;
                        border-right: 0.25rem solid transparent;
                    }
                }
                .p1{
                    top:16%;
                    left:50%;
                    transform: translateX(-50%);
                    background-color: #D16BA5;
                    &:before{
                        border-top: 0.25rem solid #D16BA5;
                    }
                }
                .p2{
                    top:35%;
                    transform: rotate(-90deg);
                    left:18%;
                    background-color: #86A8E7;
                    &:before{
                        border-top: 0.25rem solid #86A8E7;
                    }
                }
                .p3{
                    top:35%;
                    transform: rotate(90deg);
                    right:18%;
                    background-color:#5FFBF1 ;
                    &:before{
                        border-top: 0.25rem solid #5FFBF1;
                    }
                }
                .p4{
                    top: 55%;
                    left:50%;
                    transform: translateX(-50%) rotate(180deg);
                    background-color: #b68ff9;
                    &:before{
                        border-top: 0.25rem solid #b68ff9;
                    }
                }
            }
            .tips{
                font-size: 0.3rem;
                margin: 0 auto;
                text-align: center;
                width:3rem;
                height:1rem;
                color: #f8f8f8;
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-image: linear-gradient(to right, #d16ba5, #c777b9, #ba83ca, #aa8fd8, #9a9ae1, #8aa7ec, #79b3f4, #69bff8, #52cffe, #41dfff, #46eefa, #5ffbf1);
            }
            .tipsover{
                font-size: 0.3rem;
                margin: 0 auto;
                text-align: center;
                width:3rem;
                height:1rem;
                color: #f8f8f8;
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-image: linear-gradient(to right, #d16ba5, #c777b9, #ba83ca, #aa8fd8, #9a9ae1, #8aa7ec, #79b3f4, #69bff8, #52cffe, #41dfff, #46eefa, #5ffbf1);
            }
        }
        .foot{
            margin-top: 0.5rem;
            width:100%;
            height:2.5rem;
            background-color: rgb(27, 27, 27);
            .footbox{
                width:80%;
                height:2.5rem;
                margin:  0 auto;
                display: flex;
                flex-wrap: wrap;
                .footbox_txt{
                    width:100%;
                    height:0.8rem;
                    font-size: 0.3rem;
                    &:nth-child(1){
                        text-align: center;
                        line-height: 0.8rem;
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;
                        background-image: linear-gradient(to right, #cf06f7, #109efc, #8c2ffd,#e99cfc,#759ade,#80fc9f,#ded87d);
                    }
                    &:nth-child(2){
                       height:1.7rem;
                        position: relative;
                        .border{
                            position: absolute;
                            top:50%;
                            left:50%;
                            transform: translateY(-50%) translateX(-50%);
                            width:80%;
                            height:2px;
                            background-image: linear-gradient(to right,#2c3e50,#27ae60,#2980b9,#e7594c,#8e44ad,#eb6582,#7c70ad,#4bad72,#ad7362);
                            background-size:200% 200%;
                            opacity: 0;
                            transition: 0.75s;
                            animation: bgchange 5s infinite linear;
                            .border_box{
                                position: relative;
                                display: inline-block;
                                width:25%;
                                height:0.5rem;
                                font-family: "华文琥珀";
                                &:nth-child(1){
                                    .iconbox{
                                        position: absolute;
                                        transform: translateY(-250%);
                                        width:auto;
                                        height:auto;
                                        transition: 1s;
                                        opacity: 0;
                                        background-color: rgb(27, 27, 27);
                                        i{
                                            color: #b61fba;
                                            font-size: 0.35rem;
                                        }
                                    }
                                    .border_txt{
                                        position: absolute;
                                        transition: 1.5s;
                                        top:0.4rem;
                                        font-size: 0.2rem;
                                        color: #b61fba;
                                        transform: translateY(150%);
                                        opacity: 0;
                                    }
                                }
                                &:nth-child(2){
                                    .iconbox{
                                        position: absolute;
                                        left:50%;
                                        transition: 1s;
                                        transform: translateY(100%) translateX(-50%);
                                        width:auto;
                                        height:auto;
                                        opacity: 0;
                                        background-color: rgb(27, 27, 27);
                                        i{
                                            color: #27AE60;
                                            font-size: 0.35rem;
                                        }
                                    }
                                    .border_txt{
                                        position: absolute;
                                        transition: 1.5s;
                                        top:-0.4rem;
                                        left:50%;
                                        transform: translateY(-250%) translateX(-50%);
                                        font-size: 0.2rem;
                                        color: #27AE60;
                                        opacity: 0;
                                    }
                                }
                                &:nth-child(3){
                                    .iconbox{
                                        position: absolute;
                                        transition: 1s;
                                        left:50%;
                                        transform: translateY(-250%) translateX(-50%);
                                        width:auto;
                                        height:auto;
                                        opacity: 0;
                                        background-color: rgb(27, 27, 27);
                                        i{
                                            color: #31acf3;
                                            font-size: 0.35rem;
                                        }
                                    }
                                    .border_txt{
                                        position: absolute;
                                        transition: 1.5s;
                                        top:0.4rem;
                                        left:50%;
                                        transform: translateY(100%) translateX(-50%);
                                        font-size: 0.2rem;
                                        color: #31acf3;
                                        opacity: 0;
                                    }
                                }
                                &:nth-child(4){
                                    .iconbox{
                                        position: absolute;
                                        right:0px;
                                        transform: translateY(100%);
                                        transition: 1s;
                                        width:auto;
                                        height:auto;
                                        opacity: 0;
                                        background-color: rgb(27, 27, 27);
                                        i{
                                            color: #ffcd4d;
                                            font-size: 0.35rem;
                                        }
                                    }
                                    .border_txt{
                                        position: absolute;
                                        top:-0.4rem;
                                        right:0px;
                                        transform: translateY(-250%);
                                        transition: 1.5s;
                                        font-size: 0.2rem;
                                        color: #ffcd4d;
                                        opacity: 0;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    @keyframes loading {
        0%{
            transform: rotate(0deg) scale(1);

        }
        20%{
            transform: rotate(360deg) scale(0.5);
        }
        40%{
            transform: rotate(0deg) scale(1);
        }
        60%{
            transform: rotate(-360deg) scale(1);
        }
        80%{
            transform: rotate(-180deg) scale(0.5);
        }
        100%{
            transform: rotate(0deg) scale(1);
        }
    }
    @keyframes bgchange {
        0%{
            background-position: 0% 0%;
        }
        50%{
            background-position: 100% 100%;
        }
        100%{
            background-position: 0% 0%;
        }
    }
    //动态修改时注意权重
    .home .lunbo .right ul li .pshow{
        display: block;
    }
    .phidden{
        display: none;
    }
    .home .lunbo .right ul .lishow{
        opacity: 1;
        background-image: linear-gradient(90deg, transparent,rgba(255,255,255,0.2),rgba(255,255,255,0.2),rgba(120, 120, 120, 0.4),transparent);
        span{
            font-size: 1.4em;
        }
        p{
            opacity: 0.8;
            font-size: 0.5em;
        }
    }
    .home .lunbo .right ul .lihidden{
        background-color: transparent;
    }
    .home .movie .introduce-text .movie-type .type .content-one .show-txt .movie-more .more-pic .more-pic-shaow2{
        opacity: 1;
    }
    @import "./home.less";
</style>
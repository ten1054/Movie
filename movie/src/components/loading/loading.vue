<template>
    <div class="loading">
        <div class="box">
            <div class="box1">
                <div class="eye">
                    <div class="lefteye"></div>
                    <div class="righteye"></div>
                </div>
                <div class="mouth">
                    <div class="mouth2">
                    </div>
                </div>
            </div>
            <div class="foot">
                <div class="foot1"></div>
                <div class="foot1"></div>
                <div class="foot1"></div>
                <div class="foot1"></div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "loading",
    }
</script>

<style scoped lang="less">
 .loading{
     width:100%;
     height:10rem;
     text-align: center;
     display: flex;
     justify-content: center;
     align-content: center;
     .box{
         position: absolute;
         top:50%;
         transform: translateY(-50%);
         width:2rem;
         height:2rem;
         animation: move 5s infinite;
         &:before{
             content: "";
             position: absolute;
             width:1.15rem;
             height:0.7rem;
             border-top-left-radius: 50%;
             border-top-right-radius: 50%;
             top:20%;
             left:50%;
             transform: translateX(-50%);
             background-image: linear-gradient(to bottom, #d16ba5, #c777b9, #ba83ca, #aa8fd8, #9a9ae1, #8aa7ec, #79b3f4, #69bff8, #52cffe, #41dfff, #46eefa, #5ffbf1);
             /*background-position: 0% 0%;*/
             background-size: 200% 200%;
             animation: ej 5s infinite;
         }
         .box1{
             position: absolute;
             top:50%;
             left:50%;
             transform: translateX(-50%) translateY(-50%);
             border-top-left-radius: 50%;
             border-top-right-radius: 50%;
             width:1rem;
             height:1rem;
             display: flex;
             flex-wrap: wrap;
             background-color: #535353;
             justify-content: center;
             align-content: space-around;
             &:before{
                 content: "";
                 position: absolute;
                 top:45%;
                 left:-0.15rem;
                 width:0.15rem;
                 height:0.25rem;
                 background-color: #52cffe;
                 border-top-left-radius: 50%;
                 border-bottom-left-radius: 50%;
             }
             &:after{
                 content: "";
                 position: absolute;
                 top:45%;
                 right:-0.15rem;
                 width:0.15rem;
                 height:0.25rem;
                 background-color: #52cffe;
                 border-top-right-radius: 50%;
                 border-bottom-right-radius: 50%;
             }
             .eye{
                 margin-top: 0.2rem;
                 width:1rem;
                 height:0.3rem;
                 display: flex;
                 justify-content: space-around;
                 .lefteye,.righteye{
                     position: relative;
                     width:0.3rem;
                     height:0.3rem;
                     background-color: #dbdbdb;
                     border-radius: 45%;
                     animation: eye 5s infinite;
                     &:before{
                         content: "";
                         position: absolute;
                         top:50%;
                         width:0.1rem;
                         height:0.1rem;
                         border-radius: 50%;
                         background-color: #222222;
                     }
                 }
             }
             .mouth{
                 width:0.5rem;
                 height: 0.4rem;
                 .mouth2{
                     margin: 0.1rem auto;
                     width:0.4rem;
                     height:0.2rem;
                     border-top-left-radius: 5px;
                     border-top-right-radius: 5px;
                     border-bottom-left-radius: 60%;
                     border-bottom-right-radius: 60%;
                     background-color: #343434;
                 }
             }
         }
         .foot{
             position: absolute;
             top:1.45rem;
             left:0.5rem;
             width:1rem;
             height:0.25rem;
             display: flex;
             justify-content: space-between;
             .foot1{
                 width:0.25rem;
                 height:0.2rem;
                 background-color: #535353;
                 border-bottom-left-radius: 45%;
                 border-bottom-right-radius: 45%;
             }
         }
     }
 }
    @keyframes eye {
        0%{
            transform: rotate(0deg);
        }
        50%{
            transform: rotate(360deg);
        }
        100%{
            transform: rotate(0deg);
        }
    }
    @keyframes ej {
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
    @keyframes move {
        0%{
            transform: translateY(0%);
        }
        50%{
            transform:translateY(-50%);
        }
        100%{
            transform: translateY(0%);
        }
    }
</style>
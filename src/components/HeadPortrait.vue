<template>
  <div class="head-portrait">
    <img :src="imgUrl" alt=""/>
  </div>
</template>

<script>
export const USER_HEAD_IMG_URL = 'https://avatars.githubusercontent.com/u/27840579?v=4'
export default {
  props: {
    imgUrl: { default: USER_HEAD_IMG_URL }
  }
}
</script>

<style lang="scss" scoped>
.head-portrait {
    width: 120px;
    height: 50px;
    border-radius: 50%;
    // border: 2px solid rgb(137,140,151);
    border: 2px solid rgb(255, 255, 255);
    position:relative;
    &::before {
        content: '';
        width: 15px;
        height: 15px;
        z-index: 1;
        display: block;
        border-radius: 50%;
        //background-color: rgb(144,225,80);
        position: absolute;
        right: 0;
    }
    img {
        width: 110px;
        height: 45px;
        border-radius: 50%;
        // padding: 2px;
        box-sizing: border-box;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        vertical-align: middle;
    }
}
</style>

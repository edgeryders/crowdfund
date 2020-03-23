<template>
  <div class="section crowdfund md:section-md" id="funding">
    <div
      class="wrapper md:wrapper-md"
    >
      <h1>{{custom.introduction}} <span>{{custom.goal}}</span></h1>
      <div class="goal">
        <div class="progress"></div>
      </div>
      <div class="content" v-html="custom.text.content"></div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    getAsset(file) {
      return require("@/assets/" + file);
    }
  },
  props: ["custom"]
};
</script>
<style lang="scss" scoped>
#funding {
  .wrapper {
    h1 {
      span {
        font-weight: 300;
      }
    }

    .goal {
      @apply mt-3 mb-4 relative;
      width: 80%;
      height: 35px;
      background: #efefef;
      .progress {
        @apply absolute h-full;
        width: 20%;
        background: #ddd;
      }
    }
    .content {
      /deep/ p {
         @apply text-lg mb-2 font-bold;
      }
      /deep/ a {
        @apply underline;
      }
    }
  }
}
</style>

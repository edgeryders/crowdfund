<template>
  <div class="section md:section-md" id="about">
    <h1 class="section_title" v-if="custom.title">{{ custom.title }}</h1>
    <div
      class="flex flex-col md:flex-row"
      :class="{ reverse: custom.text.position == 'left' }"
    >
      <div
        v-if="custom.image"
        class="section_image md:section_image-md"
        :style="'flex-shrink: 0; width: ' + custom.image.width + 'px !important'"
      >
        <img class="w-full" :src="getAsset(custom.image.url)" />
      </div>

      <div v-if="custom.video" class="section_video">
        <video controls class="rounded-lg overflow-hidden">
          <source :src="custom.video.src" type="video/mp4" />

          Sorry, your browser doesn't support embedded videos.
        </video>
      </div>

      <div v-if="custom.video" class="section_video">
        <iframe
          width="560"
          height="315"
          :src="'https://www.youtube.com/embed/' + custom.video.youtube"
          frameborder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>

      <div
        class="w-full section_text pb-6 pl-0 md:pt-8 md:pb-12 md:px-4"
        v-html="custom.text.content"
      ></div>
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
  mounted() {
    var file = this.getAsset("edgeryders_group.jpg");
    window.console.log(file);
  },
  props: ["custom"]
};
</script>
<style lang="scss" scoped>
.section_video {
  flex-basis: 500px !important;
  flex-shrink: 0;
  iframe {
    width: 100%;
  }
}


.section_text {
  @apply flex-grow;
  border: none !important;
  /deep/ h3 {
    font-weight: bold;
    font-size: 20px;
  }
  /deep/ p {
    margin: 10px 0;
    font-size: 18px !important;
  }
  /deep/ ul {
    background: rgba(0, 0, 0, 0.03);
    padding: 20px 20px 20px 35px;
    border-left: 1px solid rgba(0, 0, 0, 0.03);
    li {
      list-style: disc;
      font-size: 16px;
      margin: 0;
      padding: 0;
    }
  }
}
.section_text-md {
  @apply pt-10;
}
.section_image {
  border: none;
  padding-right: 10px;
}
</style>

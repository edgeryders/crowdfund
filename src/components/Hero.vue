<template>
  <div class="head md:head-md">
    <div class="bg"></div>
    <div class="hero_wrapper md:hero_wrapper-md ">
        <h1>Crowdfunding Campaign</h1>
        <p>Remote collaboration can be hard. We have made all the mistakes and found good solutions so you don’t have to.</p>

        <div class="partner md:partner-md">
          <p>In partnership with</p>
          <a href="https://www.climate-kic.org" target="_blank">
            <img :src="getAsset('KIC.png')" />
          </a>
        </div>

        <video class="hero_video md:hero_video-md" controls="true" :src="getAsset('MOOC_1.mp4')" />

            <img class="hero_image md:hero_image-md" :src="getAsset('hangout.svg')" />
    </div>
    
  </div>
</template>

<script>

export default {
  methods: {
    getLogo() {
      if (this.data.uploaded_logo !== null) {
        return "https://edgeryders.eu/" + this.data["uploaded_logo"]["url"];
      }
    },
    getAsset(file) {
      return require("@/assets/" + file);
    },
    isCustom(field) {
      var x = field;
      if (this.custom[x]) {
        return true;
      } else {
        return false;
      }
    }
  },
  components: {
  },
  props: ["data", "custom"]
};
</script>
<style lang="scss">


.head {
  @apply relative flex flex-col;
  width: 100%;
  height: auto;
  display: flex;
  align-items: start !important;
  justify-content: start !important;
  p {
    @apply font-bold text-2xl pr-6 mt-2 leading-tight;
  }
}



.content_wrapper {
  display: flex;
  height: auto;
  width: 700px; 
  flex-direction: column;
  align-items: start !important;
  justify-content: start;
}

</style>

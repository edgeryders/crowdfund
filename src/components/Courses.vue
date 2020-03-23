<template>
  <div class="section md:section-md learn">
    <div
      class="wrapper md:wrapper-md"
    >
      <h1>Our Courses</h1>

      <div class="learn_slider">
        <div v-for="slide in slides.slice(0, number)" :key="slide" class="slide_el">
            <h2>{{slide}}</h2>
        </div>
      </div>

     
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      slides: null,
      number: 4,
      timer: null
    };
  },
  methods: {
    next() {
      const first = this.slides.splice(0, this.number)
      this.slides = this.slides.concat(first)
    },
    startRotation() {
      this.timer = setInterval(this.next, 6000);
    }
  },
  mounted() {
    this.slides = this.custom.slides;
    this.startRotation();
  },
  computed: {
  },
  props: ["custom"]
};
</script>
<style lang="scss">

@keyframes bgFade {
  0% {
    background: #0010FF;
    transform: translateX(0px);
  }
  3% {
    background: white;
    transform: translateX(0px);
    opacity: 1;
  }
  99% {
    background: white;
    transform: translateX(0px);
    opacity: 1;
  }
  100% {
    background: #0010FF;
    opacity: 0;
  }
}
@keyframes textFade {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
.learn {
  background: none;
  @apply flex items-center justify-center;
  .wrapper {
    @apply flex flex-col px-0;
    width: 85%;
    h1 {
      @apply font-bold text-2xl mb-4;
      color: blue;
    }
  }
  .learn_slider {
    @apply w-full  pb-4 mt-3;
    .slide_el {
      @apply mb-2 border flex items-center float-left;
      box-shadow: 0 0 20px rgba(0,0,0,0.05);
      border-radius: 4px;
      width: 22.5%;
      margin-right: 3%;
      height: 200px;
      opacity: 0;
      animation: bgFade 5.5s ease forwards !important;
      &:last-child {
        margin-right: 0;
      }
      h2 {
        @apply font-bold pl-4 text-lg;
        width: 50%;
        animation: textFade 1s ease forwards;
      }
    }
  }
  @for $i from 0 to 5 {
    .learn_slider div:nth-child(#{$i}) { animation-delay: $i * 0.085s !important; }
  }
}
</style>

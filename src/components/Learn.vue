<template>
  <div class="section md:section-md learn">
    <div
      class="wrapper md:wrapper-md relative"
    >
      <h1>{{custom.introduction}}</h1>
      

      <div class="learn_slider md:learn_slider-md" @mouseenter="stopRotation" @mouseleave="startRotation">
        <div class="list_el md:list_el-md" :class="{active: isActive()}">
          <div v-for="(slide, index) in slides.slice(0, number)" :key="slide" class="slide_el md:slide_el-md" :class="{active: paused}" @click="activate(index)" :content="`<div class='tooltip_custom'><h2>${slide.title}</h2><p>${slide.info}</p></div>`" v-tippy="{followCursor : true, offset: '10, 10', touch: false, theme: 'light', placement : 'left', arrow : true, arrowType : 'round', animation : 'shift-away' }" ref="newton">
              <h2>{{slide.title}}</h2>
          </div>
  
        </div>
        <div class="info md:hidden" :class="{active: isActive()}" @click="close">
          <div class="back" :class="{active: isActive()}"><div class="hand"></div>back to overview</div>
          <div v-if="isActive()" class="info_text">
            {{slides[active].info}}
          </div>
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
      showImage: false,
      tooltip: false,
      number: 4,
      paused: false,
      timer: null,
      active: null
    };
  },
  methods: {
    getAsset(file) {
      return require("@/assets/" + file);
    },
    showTip(index) { 
      var self = this;
      this.$nextTick( () => self.$refs.newton[index]._tippy.show() )
     },
    hideTip(index) { 
      var self = this;
      this.$nextTick( () => self.$refs.newton[index]._tippy.hide() )
     },
    activate(index) {
      if (this.active == null) {
        this.active = index;
      } else {
        this.active = null;
      }
    },
    close() {
        this.active = null;
    },
    isActive() {
      if (this.active !== null) {
        return true
      } else {
        return false
      }
    },
    next() {
      const first = this.slides.splice(0, this.number)
      this.slides = this.slides.concat(first)
    },
    stopRotation() {
      clearInterval(this.timer);
      this.paused = true;
    },
    startRotation() {
      this.timer = setInterval(this.next, 6000);
      this.paused = false;
    }
  },
  mounted() {
    this.slides = this.custom.slides;
    if (this.$mq == "md") {
        this.number = 4;
        this.startRotation();
      } else {
        this.number = this.custom.slides.length;
        this.tooltip = true;
      }

  },
  computed: {
  },
  props: ["custom"]
};
</script>
<style lang="scss">
.light-theme{color:#26323d;box-shadow:0 0 20px 4px rgba(154,161,177,.15),0 4px 80px -8px rgba(36,40,47,.25),0 4px 4px -2px rgba(91,94,105,.15);background-color:#fff !important}.light-theme[x-placement^=top] .tippy-arrow{border-top:8px solid #fff;border-right:8px solid transparent;border-left:8px solid transparent}.light-theme[x-placement^=bottom] .tippy-arrow{border-bottom:8px solid #fff;border-right:8px solid transparent;border-left:8px solid transparent}.tippy-tooltip.light-theme[x-placement^=left] .tippy-arrow{border-left:8px solid #fff;border-top:8px solid transparent;border-bottom:8px solid transparent}.light-theme[x-placement^=right] .tippy-arrow{border-right:8px solid #fff;border-top:8px solid transparent;border-bottom:8px solid transparent}.light-theme .tippy-backdrop{background-color:#fff}.light-theme .tippy-roundarrow{fill:#fff}.light-theme[data-animatefill]{background-color:initial}

.tippy-tooltip  {
  /* Your styling here. Example: */
  background-color: white !important;
  border: none !important;
}

.tooltip_custom {
  background: #fff !important;
  padding: 12px;
  margin: 2px 0;
  border-radius: 4px;
  text-align: left;
  color: black !important;
  h2 {
    @apply font-bold border-b pb-2 mb-2;
  }
  p {
    font-size: 13px;
  }
}

  .slide_el.active {
      opacity: 1 !important;
      animation: none !important;
      background: white;
  }

.image {
        position: fixed;
        top: 0;
        left: 0;
        width: 200px;
        height: 200px;
        z-index: 1000;
        overflow:hidden;
}
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
.slide_el:hover {
  cursor: help;
  background: #fafafa;
}
.learn {
  background: none;
  @apply flex items-center justify-center;
  .learn_slider {
    .slide_el {
      &:last-child {
        margin-right: 0;
      }
      h2 {
        @apply font-bold ml-4;
      }
    }
    .info {
      @apply w-full bg-white absolute top-0 h-full;
      transform: translateX(100%);
      transition: transform .3s ease;
      .info_text {
        @apply p-4;
        font-size: 14px;
      }
      &.active {
        transform: translateX(0%);
      }
    }
  }
  @for $i from 0 to 5 {
    .learn_slider div:nth-child(#{$i}) { animation-delay: $i * 0.085s !important; }
  }
}
</style>

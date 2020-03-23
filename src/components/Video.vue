<template>
    <div id="video">
      <div class="w-full">
        <div class="video" v-if="sources" ref="videoWrap">
            <!-- Main Video Element Wrap -->
            <div class="video__video">
                <!-- If User pass few mime-types then loop over them and assign correct to each source element -->
                <div class="mute" :class="{active: !mutedvolume}" @click="toggleMute"></div>
                <video 
                    :src="getImg('robin.mp4')"
                    @timeupdate="handleProgress" 
                    @click="toggleMute" 
                    autoplay="true"
                    playsinline
                    loop="true" 
                    :muted="mutedvolume" 
                    :poster="getImg('mooc.png')"
                    ref="videoEl"
                >
                </video> 

            </div>
            <!-- Video Controls -->
            <div class="video__controls">
              <div class="container">
                <button class="video__button toggle" title="Toggle Play" @click="togglePlay">
                    <span v-if="isPlaying">
                        <span class="pause"></span>
                    </span>
                    <span v-else>
                        <span class="play"></span>
                    </span>
                </button>

                <div 
                    class="Progress" 
                    ref="progress" 
                    @click="scrub($event)" 
                    @mousemove="isMouseDown && scrub($event)" 
                    @mousedown="isMouseDown = true" 
                    @mouseup="isMouseDown = false"
                >
                    <div class="Progress__filled" :style="{ 'flex-basis':  progressActivity + '%'  }"></div>
                </div>

                <div class="remaining">{{remainingTime}}</div>
        
                <input 
                    type="range" 
                    @change="handleRangeUpdate('volume', volumeValue)" 
                    class="volume" 
                    min="0" 
                    max="1" 
                    step="0.05" 
                    v-model="volumeValue"
                >
       
                <button @click="toggleFullScreen" class="video__button">
                    <span class="expand"></span>
                </button>
                </div>
            </div>
          </div>
        </div>
    </div>
</template>
<script>
export default {
  name: "Video",
  props: {
    sources: {
      type: [String, Array]
    },
    poster: String,
    autoPlay: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    if (this.autoPlay) {
      this.togglePlay();
    }
  },
  data() {
    return {
      isPlaying: false,
      splash: true,
      mutedvolume: true,
      progressActivity: 0,
      remainingTime: null,
      volumeValue: 1,
      playbackRateValue: 1,
      isMouseDown: false
    };
  },
  methods: {
    getImg(value) {
      return require("../assets/" + value);
      // The path could be '../assets/img.png', etc., which depends on where your vue file is
    },
    togglePlay() {
      this.$refs.videoEl.paused
        ? this.$refs.videoEl.play()
        : this.$refs.videoEl.pause();
      this.splash = false;
      this.updateButton();
    },
    toggleMute() {
      this.mutedvolume = !this.mutedvolume;
    },
    updateButton() {
      this.isPlaying = !this.isPlaying;
    },
    convert(current, duration) {
          var remaining = duration - current;
          var minutes = Math.trunc(remaining / 60),
            seconds_int = remaining - minutes * 60,
            seconds_str = seconds_int.toString(),
            seconds = seconds_str.substr(0, 2),
            time = minutes + ":" + seconds;

          return time;
        },
    handleProgress() {
      if (this.$refs.videoEl.currentTime) {
        const percent =
          (this.$refs.videoEl.currentTime / this.$refs.videoEl.duration) * 100;
        this.progressActivity = percent;

        var time = this.convert(
          this.$refs.videoEl.currentTime,
          this.$refs.videoEl.duration
        );

        this.remainingTime = time;
      }
    },
    handleRangeUpdate(name, value) {
      this.$refs.videoEl[name] = value;
    },
    scrub(e) {
      const scrubTime =
        (e.offsetX / this.$refs.progress.offsetWidth) *
        this.$refs.videoEl.duration;
      this.$refs.videoEl.currentTime = scrubTime;
    },
    toggleFullScreen() {
      if (this.$refs.videoWrap.mozRequestFullScreen) {
        this.$refs.videoWrap.mozRequestFullScreen();
      } else {
        this.$refs.videoWrap.webkitRequestFullScreen();
      }
    },
    getType(path) {
      const pattern = /\.[0-9a-z]+$/i;
      return path.match(pattern)[0].slice(1);
    }
  }
};
</script>

<style lang="scss">

.mooc {
  background-size: 40px;
  font-size: 26px !important;
  color: blue;
  .mooc_icon {
    width: 45px;
    height: 45px;
    background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 125'%3E%3Cpath fill='white' d='M48 6L13 20l-1 1v56c4 3 9 6 15 7l7-3v6c3 3 9 6 15 7l38-17 1-1V21l-1-1-3 1-13-3-1-2-4 2v-7l-1-1-3 1-13-3V7l-1-1zm16 7v5L35 30l-1 1v48l-6 2V28l36-15zm22 10v52L50 91V38l36-15zm-72 0c4 3 8 5 12 5v54c-5-1-9-4-12-6zm22 10c4 3 8 5 12 5v54c-5-1-9-4-12-6z' style='text-indent:0;text-transform:none;block-progression:tb' overflow='visible' color='%23000'/%3E%3C/svg%3E") no-repeat center 9px blue ;
    border-radius: 10px;
    margin-right: 12px;
    background-size: 60%;
  }
}
#video .wrapper {
  @apply flex flex-col;
}
    .video {
        width:100%;
        position: relative;
        font-size: 0;
        position: relative;
        overflow: hidden;
    }
    .video-md {
      width:80%;
      border:10px solid #efefef;
      @apply mx-auto mt-5;
  }
    .play_large {
    width: 100%;
    height: 100%;
    background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 125'%3E%3Cswitch%3E%3Cg%3E%3Cpath fill='white' d='M50 2.5a47.5 47.5 0 100 95 47.5 47.5 0 000-95zm15.3 49.9L42.9 67.3a2.9 2.9 0 01-4.5-2.4V35.1c0-2.3 2.6-3.7 4.5-2.4l22.4 14.9a2.9 2.9 0 010 4.8z'/%3E%3C/g%3E%3C/switch%3E%3C/svg%3E") rgba(0,0,0,0.1) no-repeat center 55%;
    background-size: 70px;
    position: absolute;
    top: 0px;
    left: 0%;
    margin: 0 auto;
    &:hover {
    cursor: pointer;
  }
  }
    .remaining {
      color: white;
      display: inline !important;
      margin-top: .5rem;
      padding: 0px 10px 0 0;
      width: auto !important;
      flex-grow: 0 !important;
      font-size: 1rem;
    }
    .video:fullscreen {
        max-width:none;
        width:100%;
        border:0;
    }
    .video:-webkit-full-screen {
        max-width:none;
        width:100%;
    }
    .video__video {
      @apply relative
    }
    .video__video .mute {
      @apply absolute;
      width: 45px;
      height: 45px;
      background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' data-name='Layer 1' viewBox='0 0 97.5 121.9'%3E%3Cpath fill='white' d='M48.8 0a48.8 48.8 0 1048.7 48.8A48.8 48.8 0 0048.7 0zM24.4 46.3a7.3 7.3 0 017.3-7.3h4.7c3.6-7.1 12-12 20.7-12a1.2 1.2 0 011.2 1.1v5l-26 25.4h-.6a7.3 7.3 0 01-7.3-7.3zm2 24.8a2.4 2.4 0 010-3.4l42.4-41.3a2.4 2.4 0 013.4 3.5L29.8 71a2.5 2.5 0 01-3.4 0zm32-1.7a1.2 1.2 0 01-1.2 1.2A24.4 24.4 0 0140.7 64l17.8-17.3zm7.6-9.8a1.2 1.2 0 01-.7-2.3c3.1-1 5.2-4.5 5.2-8.5 0-4.5-2-7-5.4-8.7l2-1.8C70.6 40 73 44 73 48.8c0 5-2.7 9.4-6.9 10.8z'/%3E%3C/svg%3E") no-repeat center;
      top: 15px;
      right: 15px;
      &.active {
      opacity: 0.2;
    }
    &:hover {
    cursor: pointer;
    opacity: 1;
  }
    }
    .video__video  video {
        width:100%;
        object-fit:cover;
    }
    .video__button {
        background:none;
        border:0;
        line-height:1;
        color:white;
        text-align: center;
        outline:0;
        padding: 0;
        cursor:pointer;
        max-width:40px;
     }
     .video__button:focus {
        border-color:#ffc600;    
     }
     .video__slider {
        width:10px;
        display: flex;
        flex-basis: 10%;
        height: 30px;
     }
     .video__controls {
         position:absolute;
         bottom:0px;
         width: 100%;
            border-radius: 20px;

         transform:translateY(100%) translateY(-5px);
         transition:all .3s;
         background:rgba(0,0,0,0.1);
     }
     .container {
      position: relative;
      display:flex;
       justify-content: space-between;


     }
     .video:hover .video__controls {
         transform:translateY(0);
                     border-radius: 0 0 8px 8px;

     }
     .video__button span {
       width: 40px;
      height: 40px;
      display: block;
      background-size: 1rem !important;
     }
     .play {
      background: url("data:image/svg+xml,%3Csvg aria-hidden='true' data-prefix='fas' data-icon='play' class='svg-inline--fa fa-play fa-w-14' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512'%3E%3Cpath fill='%23fff' d='M424 215L72 7C44-10 0 6 0 48v416c0 38 41 60 72 41l352-208c32-18 32-64 0-82z'/%3E%3C/svg%3E") no-repeat center;
     }
     .pause {
      background: url("data:image/svg+xml,%3Csvg aria-hidden='true' data-prefix='fas' data-icon='pause' class='svg-inline--fa fa-pause fa-w-14' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512'%3E%3Cpath fill='%23fff' d='M144 479H48c-26 0-48-21-48-48V79c0-26 22-48 48-48h96c27 0 48 22 48 48v352c0 27-21 48-48 48zm304-48V79c0-26-21-48-48-48h-96c-26 0-48 22-48 48v352c0 27 22 48 48 48h96c27 0 48-21 48-48z'/%3E%3C/svg%3E") no-repeat center;
     }
     .volume {
      border-radius: 10px;
     }
     .expand {
      background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1000 1000'%3E%3Cpath fill='%23fff' d='M492 602c0 6-2 11-7 15L274 829l91 92c8 8 12 17 12 28 1 11-3 21-12 29-8 8-17 12-28 12H51c-11 0-21-4-29-12s-12-18-12-29V663c0-11 4-20 12-28 8-9 18-13 29-13s20 4 28 13l92 91 212-211a20 20 0 0130 0l72 72c5 5 7 10 7 15zM990 51v286c0 11-4 20-12 28s-18 12-29 12-20-4-29-12l-91-92-212 212a20 20 0 01-30 0l-72-72a20 20 0 010-30l211-212-91-91c-9-9-13-18-13-29s4-21 13-29c8-8 17-12 28-12h286c11 0 21 4 29 12s12 18 12 29z'/%3E%3C/svg%3E") no-repeat center;
      background-size: 3rem !important;
     }
 
     .Progress {
        position: absolute;
        display:flex;
        width: 100%;
        flex-basis:100%;
        height:5px;
        transition:height 0.3s;
        background:rgba(0,0,0,0.5);
        cursor:pointer;
        border-radius: 0 0 5px 5px;
     }
     .Progress__filled {
        width:50%;
        background:blue;
        flex:0;
        flex-basis:50%;
        border-radius: 0 0 0 4px;
     }

     .video__button {
     opacity: 0;
     transition: opacity .5s ease;
   }
     .video:hover {
        .video__button {
     opacity: 1;
   }
      .Progress {
           position: relative;
        display:flex;
        flex-basis:100%;
        height:3px;
        border-radius: 10px;
        border-radius: 10px;
        margin: 12px 10px 0 0px;
        transition:height 0.3s;
        background:rgba(0,0,0,0.5);
        cursor:pointer;
         height:15px;
     }
           .Progress__filled {
                  border-radius: 10px;
         }
   }

     input[type=range] {
        -webkit-appearance: none;
        background:transparent;
        width: 40%;
        margin: 0 0px;
     }
     input[type=range]:focus {
        outline: none;
     }
     input[type=range]::-webkit-slider-runnable-track {
        width: 100%;
        height: 15px;
        cursor: pointer;
        background: rgba(255,255,255,0.8);
        border-radius: 10px;
     }
     input[type=range]::-webkit-slider-thumb {
        height: 15px;
        width: 15px;
        border-radius: 50px;
        background: blue;
        cursor: pointer;
        -webkit-appearance: none;
        margin-top: 0px;
     }
     input[type=range]:focus::-webkit-slider-runnable-track {
        background: #ddd;
     }
     input[type=range]::-moz-range-track {
        width: 100%;
        height: 15px;
        cursor: pointer;
        background: rgba(255,255,255,0.8);
        border-radius: 10px;
     }
     input[type=range]::-moz-range-thumb {
         height: 15px;
        width: 15px;
        border-radius: 50px;
        background: #00ACC2;
        cursor: pointer;
        margin-top: 0px;
     }
</style>
<template>
  <div class="section md:section-md back_story md:back_story-md" id="about">
    <h1 class="section_title" v-if="custom.title">{{ custom.subtitle }}</h1>
    <div class="flex items-start flex-col md:flex-row">
           <Video
           class="story_video md:story_video-md"
          :skip-backward="-20"
          :skip-forward="55"
          :auto-play="true"
          sources="getImg('robin.mp4')"
        />

      <div class="introduction md:introduction-md" v-html="custom.introduction"></div>
    </div>

    <div class="flex flex-col mt-6 courses_container">
       <div class="courses_header"><h4>Academy Courses</h4></div>
    <div
      class="flex courses md:courses-md" :class="{active: active}"
    >
      <div class="sidebar border-r md:sidebar-md" :class="{active: active}">
        <div class="sub_menu">
          <ol>
            <li
              v-for="(story, i) in custom.text"
              :key="story.title"
              @click="select(i)"
              :class="{ active: i == index }"
            >
              <span>{{ story.title }}</span>
            </li>
          </ol>
        </div>
      </div>

      <div class="w-full section_text section_slider px-0 md:section_slider-md" :class="{active: active}">
        <div class="back md:hidden" :class="{active: active}" @click="back"><div class="hand"></div>back to courses</div>
        <div class="scroll_container md:scroll_container-md">
        <div class="course_header">
                      <video class="course_video" :poster="getAsset(stories[index].poster)" controls="true" :src="stories[index].video" />
        </div>
        <div class="excerpt pb-20 md:pb-4">
            <div class="flex flex-col mx-6  mt-3 border-b">
              <div class="course-title flex" :id="titles[index]">
              <div class="logo" :id="titles[index]"></div>
              <h3>{{stories[index].title}}</h3>
              </div>
              <div class="flex flex-col md:flex-row">
                <Profile v-for="author in stories[index].author" class="mb-2 mr-2 self-start" :data="author" :key="author.username" />
              </div>
            </div>
            <div class="px-6" v-html="stories[index].introduction"></div>
            <div class="px-6" v-html="stories[index].content"></div>
        </div>
      </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
import Profile from "@/components/Profile.vue";
import Video from "@/components/Video.vue";

export default {
  data() {
    return {
      stories: [""],
      index: 0,
      active: false,
      titles: ["community", "ethnography", "graphryder"]
    };
  },
  components: {
    Profile,
    Video
  },
  methods: {
    getAsset(file) {
      return require("@/assets/" + file);
    },
    select(value) {
      this.index = value;
      this.active = true;
    },
    back() {
      this.active = false;
    }
  },
  mounted() {
    this.stories = this.custom.text;
  },
  props: ["custom"]
};
</script>
<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Crimson+Text:400,600&display=swap");
#about {
  margin-top: 20px;
  padding: 30px 0px !important;
}
.section_title {
  @apply text-2xl mb-3 pb-2 font-bold border-b;
      width: 100%;
      color: #0010FF;
}
.course_video {
  width: 100%;
}
.courses_container {
  border-radius: 10px;
  margin: 20px 0;
  overflow: hidden;
  @apply border;
}
.courses_header {
  background: #fff;
  display: flex;
  @apply p-4 border-b font-bold;
  align-items: center;
}
.courses {
  @apply relative;
  height: 200px;
  overflow: hidden !important;
  transition: height .5s ease;
  .header {
    background: #efefef;
    height: 20px;
  }
  &.active {
   height: 500px;
  }
}

.scroll_container {
  height: 100%;
  overflow-y: scroll;
  width: 100%;
}

.story_video {
  border: 10px solid #efefef;
  width: 80%;
  margin-right: 25px;
  margin-top: 5px;
}

.enroll {
  @apply border p-2 px-3 flex items-center font-bold bg-white;
  font-size: 12px;
  padding-bottom: 6px !important;
  border: 1px solid #efefef !important;
  border-radius: 4px;
}

.back_story .section_title {
  margin-top: 0px !important;
  margin-bottom: 20px !important;
}
.back_story {
  h3 {
    font-weight: 600;
    font-size: 25px;
  }
  .excerpt p {
    margin: 10px 0;
    font-size: 13px;
  }
  a {
    font-weight: bold;
    border-bottom: 1px dashed #000;
    padding-bottom: 2px;
  }
}

.back_story .section_text {
  @apply border-l;
  padding-left: 0 !important;
  .course_header {
    @apply flex flex-col justify-center items-start;
    width: 100%;
    background: #efefef;
    background: #E25A2F;
      background: #fafafa !important;
 box-shadow: inset 0 -2px 5px rgba(0,0,0,0.05);
  }
  .course-title {
  line-height: 20px;
  width: auto;
  align-self: flex-start;
  &#ethnography {
  background: #025AED;
  }
  &#graphryder {
  background: #009D6A;
  }
  &#community {
  background: #FF5A2F;
  }
  color: white;
  box-shadow: 0 4px 0px rgba(0,0,0,0.02);
    @apply mr-2 mb-2 pr-3;
    h3 {
        font-size: 16px !important;
            @apply py-2;
  }
}
  .logo {
    width: 40px;
max-height: 60px;
    flex-basis: 40px;
    flex-shrink: 0;
    display: inline-block;
    float: left;
@apply mr-2;
&#community {
      background: url("data:image/svg+xml,%3Csvg width='822' height='796' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23fff' fill-rule='nonzero'%3E%3Cpath d='M114.2 502.9l-1-6.6-.3-2-.1-1.1-1.4-14.3a307.7 307.7 0 011.1-59.5l.5-4.3c.4-3.7-.1.4-.2 1l.5-3.6a312.3 312.3 0 0120.4-73.9c.3-.7 1.5-3.5.3-.9a332.3 332.3 0 0130.1-54.3l5.6-7.9 2.9-3.9c.3-.4 1.7-2.3.1-.2l1-1.3a316.3 316.3 0 0148.9-49.6l3.8-3a18.4 18.4 0 011.4-1.1 324 324 0 0158.3-35.1l5.1-2.3 2.6-1.1c3.4-1.5-2.6 1-.3.1l11.1-4.4c9.8-3.7 17.5-13.7 14-24.6-3.1-9.6-14.1-17.9-24.6-14A340.7 340.7 0 0075.7 513.7c1.7 10.4 15.1 17.1 24.6 14 11.1-3.8 15.7-13.7 13.9-24.8zM601.3 687.6l-7.4 6-1.6 1.2-4.5 3.3a321.7 321.7 0 01-53.9 31.2l-4.4 2-1.2.5-10.5 4.1a317 317 0 01-60.8 16c-1.8.3-3.9.8-5.8.9 3.6-.1.5-.1-1.3.2a394.9 394.9 0 01-32.8 2.2c-14.7.3-29.4-.5-44-2.2l-3.1-.4-.6-.1-3.3-.5-10.6-1.9a297.5 297.5 0 01-60.8-18.1c-2.1-.8.9.4 1.1.5l-3-1.3-5.1-2.3c-3.6-1.7-7.3-3.4-10.8-5.2a307.6 307.6 0 01-48.7-30.4c-3-2.2-.3-.2.3.2l-2.5-2-4.9-4c-8.1-6.6-20.5-8.5-28.3 0-6.8 7.4-8.6 21.2 0 28.3a341.5 341.5 0 00163.7 75 342 342 0 00184.2-21.1c32.5-13.6 62-31.5 89.2-53.9 8.1-6.7 7.4-21.5 0-28.3-9-7.9-20-7.1-28.6.1zM517.4 173.4l9.2 3.6 2.6 1.1s-3.6-1.6-1.5-.6l5.1 2.3a320.5 320.5 0 0153.1 30.4l7.8 5.7.9.7 4.3 3.5a328.5 328.5 0 0149 49.5l1.7 2.2-1-1.3c.9 1.6 2.3 3 3.3 4.4a311.2 311.2 0 0131.4 52.4l4.1 8.9.8 1.9c1.1 2.5-1.4-3.5-.4-.9l2.1 5.2a315.5 315.5 0 0119 71.5l.3 2.2c-1-5-.2-1.5-.1-.3l.6 5.8a324 324 0 01-.3 68.8l-.3 2.8-.2 1.9.1-.6-1.3 8.4c-1.7 10.3 2.7 22 14 24.6 9.7 2.2 22.8-2.9 24.6-14 11-66.6 3.1-133.7-23.6-195.7a340.9 340.9 0 00-194.8-183.1c-9.8-3.7-22.4 4.1-24.6 14-2.5 11.5 3.6 20.8 14.1 24.7z'/%3E%3Cpath d='M504.5 134.2c0 3.7-.3 7.3-.5 11-.4 5.9.8-3.9-.2 1.9l-.8 4.5a116 116 0 01-4.9 17.2c-.6 1.6-.8 5 0 .3-.1.7-.8 1.9-1.1 2.5a114.2 114.2 0 01-7.8 14.1l-2.3 3.3-1.6 2.2c-1.3 1.7-1.1 1.4.7-.8-.8 2.1-3.7 4.5-5.2 6.1a106.4 106.4 0 01-10.6 10.2c-.9.8-2.1 2.1-3.1 2.5 2.3-1.8 2.6-2 .8-.7l-2.2 1.6c-4.4 3.1-9.1 5.8-13.9 8.3-1.9.9-4.1 2.4-6.1 2.9 5.1-1.3 1-.5-.3 0l-5.2 1.8c-5.3 1.7-10.7 2.8-16.1 3.9-4.8.9 4.6-.4-.2.1l-4.2.4a123.5 123.5 0 01-17.2 0l-4.2-.4c-4.9-.4 4.5.9-.2-.1-5.7-1.1-11.3-2.3-16.8-4.1-1.7-.6-5.9-1.2-7.1-2.6l2.3 1-2.5-1.1-3.7-1.8c-5.2-2.6-10.2-5.6-15-9-1.1-.8-4-3.7-.2-.1l-2.1-1.7a103 103 0 01-11.6-11l-2.7-3-1.7-2.1.7.9c-1.8-1.2-3.4-4.8-4.6-6.6l-3.5-5.8c-1.3-2.4-2.6-4.8-3.7-7.2-.5-1.1-1.5-2.5-1.7-3.7 1.1 2.7 1.3 3 .5 1l-1-2.6c-1.9-5.2-3.4-10.5-4.5-15.9l-.7-3.6c-.2-1-.6-5-.2-.9a137.2 137.2 0 01-.4-21.2l.4-4.1c.4-4.8-.9 4.6 0-.1a144.7 144.7 0 016.4-23.4c1.6-4.4-1.9 4.1 0-.1l1.7-3.6c2.5-5.1 5.4-10.1 8.7-14.8l1.5-2.1c2.6-3.8-2.9 3.4.1-.1l5.1-6c3.9-4.2 8.1-8 12.4-11.6 3.5-2.9-3.7 2.5.1-.1L357 58c2-1.4 4-2.7 6.1-3.9 2.3-1.4 4.6-2.6 6.9-3.8l3.6-1.7 2.4-1.1a136 136 0 0113-4c2.6-.7 5.3-1.2 8-1.7l1.4-.2c2.2-.3 1.8-.3-1.2.1 1-.7 4.3-.5 5.5-.5 5.6-.4 11.2-.4 16.8 0l4.1.4c2.8.2-.2-.7-1.2-.2 1.7-.8 7.6 1.4 9.4 1.8 3.1.7 6.1 1.6 9.1 2.5l3.8 1.3 2.5.9c2 .8 1.7.6-1.1-.5 2-.1 6 2.8 7.8 3.7 2.5 1.3 5 2.8 7.4 4.3 1.4.9 7.2 3.7 7.6 5.2l-2-1.5 2 1.6 4 3.4a114.3 114.3 0 0112.6 13.3l-.7-.9c.8.2 2.5 3.5 3 4.3 1.7 2.5 3.3 5.2 4.9 7.8a126.6 126.6 0 014.2 8.3 114 114 0 016.4 21.9c.1.7 1 3.4.7 4.1a27 27 0 00-.2-1.2l.3 2.8c.2 3.1.4 6.4.4 9.7.1 10.5 9.2 20.5 20 20s20.1-8.8 20-20c-.2-26.4-7.9-53-22.9-74.8a133.7 133.7 0 00-208.5-15.8 134.9 134.9 0 00-18.4 155.9 133.6 133.6 0 0056 53.7 133.5 133.5 0 00193.8-119c.1-10.5-9.3-20.5-20-20a20.3 20.3 0 00-20 20zM769.6 661.6a106 106 0 01-4.5 7.1l-2.4 3.4c-2.7 3.9 2.8-3.3-.2.3a124 124 0 01-11.1 11.8c-1.4 1.3-4.3 4.9-6.1 5.2l1.9-1.5-2.1 1.6-3.3 2.3c-4.4 2.9-9 5.6-13.7 7.9l-3.6 1.7c-4.2 1.9 4.3-1.6-.1 0l-6.2 2.2c-5.4 1.8-10.9 3.1-16.5 4l-1.3.2 1.4-.2c-.4-.3-2.7.3-3.3.3a86.8 86.8 0 01-15.1.3c-1.4-.1-8.4-1.5-9.2-.8.7-.7 4.3.7 1.4.1l-3.9-.7a116.2 116.2 0 01-15.6-4.3l-3.8-1.4c-3.8-1.4 3.7 1.8-.3-.1-5.6-2.7-11-5.6-16.2-9l-4.5-3.2c2.9 2.1-.2-.2-.9-.8a111 111 0 01-15.9-16.1c-3.1-3.8 2.4 3.5-.3-.5a134 134 0 01-8.9-14.5l-1.9-3.8c-.5-1.1-2.9-4.8-.3-.4-1.1-1.9-1.8-4.6-2.5-6.6a108 108 0 01-4.5-17.8l-.2-1.4a21 21 0 00.1 1.1c-.3-.4-.3-2.5-.3-2.8-.3-2.8-.4-5.7-.5-8.5 0-2.8 0-5.7.2-8.5l.3-4.3.3-2.8c-.4 2.7-.5 3.3-.2 1.8a146.3 146.3 0 016.3-23.8c.4-1.8 1.8-3.8 2.6-5.4 2.7-5.3 5.8-10.3 9.2-15.1.9-1.2 2.3-4.7.3-.5.3-.7 1.4-1.7 1.8-2.2a152.3 152.3 0 0112.9-13c.9-.8 2.1-2.1 3.2-2.6-3.4 1.6-2 1.5-.8.6 4.9-3.4 9.8-6.7 15.2-9.4l3.7-1.8c1.2-.6 4.6-3 .2-.2 1.8-1.1 4.3-1.7 6.4-2.4 5.6-1.9 11.3-3.4 17.1-4.5l2.7-.5c4.7-.8-4.7.4.1 0 2.7-.2 5.4-.5 8.2-.6 5.5-.2 11 .1 16.5.6 4.8.5-4.6-.9.2 0l4.1.7a160 160 0 0119.6 5.8c-3.9-1.5 2.9 1.4 3.5 1.7a106 106 0 0115.9 9.5c.5.4 1.8 1.1 2.2 1.6-3-3.6-1-.7.3.3a106.2 106.2 0 0113.4 13.3l1.7 2-.7-.9 1.6 2.1a121 121 0 0110.7 18.2l1.1 2.4-.5-1.2c.8.1 2.8 7.7 3.1 8.6 1.7 5.4 2.9 11 3.8 16.6.8 4.6-.4-4.8 0-.1l.4 5.2c.2 3.1.2 6.1.2 9.2l-.4 7.9c0 .5-.7 3.7-.4 4 .4-3.1.5-3.6.1-1.4a111.2 111.2 0 01-6.5 23.3l.4-1-1.1 2.5a71.7 71.7 0 01-4.5 9.2c-5.2 9.1-2.4 22.3 7.2 27.4 9.5 5 21.8 2.5 27.4-7.2a134.7 134.7 0 00-8.3-146.2 132.8 132.8 0 00-149.6-47.2 134.8 134.8 0 00-91 128.3 135 135 0 0097.4 126.7 134 134 0 00151.6-61.7c5.3-9 2.4-22.3-7.2-27.4-9.7-4.9-21.9-2.3-27.5 7.3zM192.5 687.6c-.3.3-5 3.8-1.6 1.4l-4.5 3.2a97.7 97.7 0 01-8.8 5.3l-7.5 3.7c-3.3 1.6.6-.1 1-.4-1.3 1-3.6 1.4-5.1 2a106 106 0 01-18.9 4.9c-3.8.6-.2-.8.7 0-.8-.7-7.9.7-9.2.8-4.8.2-9.7.1-14.5-.3-.6 0-3.5-.7-3.9-.4l2.7.4-2.6-.4a128.6 128.6 0 01-22.7-6.3c-4.4-1.6 4.1 1.9-.1 0l-3.6-1.7a105.5 105.5 0 01-13.7-7.9l-3.3-2.3-1.1-.8.9.7c-1.8-.4-4.7-4-6.1-5.2-2-1.8-3.9-3.7-5.7-5.7-1.9-2-3.6-4.1-5.4-6.2-3.1-3.6 2.5 3.6-.2-.3a100.1 100.1 0 01-10.8-18c-.5-1-1.6-2.7-1.7-3.8l.9 2.2-1-2.6c-1-2.5-1.9-5.1-2.6-7.7-.4-1.5-3.2-15.7-3.5-15.7l.3 2.7-.3-2.6-.3-4-.3-6.6c0-2.6 0-5.3.2-7.9l.3-3.9.3-2.6a83 83 0 012.9-12.7l2.4-7.5c.1-.3 1.1-3.6 1.4-3.7l-.5 1.2.8-1.8c2.1-4.6 4.6-9 7.3-13.3 1.4-2.2 3-4.4 4.5-6.5 2.2-3-.7.7-.7.9.2-1.1 2.7-3.2 3.4-4.1 3.6-4.1 7.4-7.9 11.5-11.4.9-.8 2.1-2.1 3.2-2.6l-.8.6a142.4 142.4 0 0117-10.3l5-2.3c-3.3 1.4-.4.2.3 0a140.7 140.7 0 0122-5.9c4.8-.9-4.7.4.2 0l6.9-.6a132.3 132.3 0 0120.5 1l8 1.7c5.3 1.4 10.3 3.4 15.5 5.2-5.1-1.7-.9-.3.2.2l3.7 1.8 7.2 4a69 69 0 016.3 4.2c.9.6 2.1 1.2 2.8 2-3.7-4 .4.4 1.4 1.2 4.3 3.6 8.2 7.6 11.9 11.9l1.8 2.2c3.2 3.7-2.5-3.5.4.5a155 155 0 0110.8 17.6l1.3 2.7c.9 2 .8 1.8-.2-.7l1.1 2.7c2.4 6.3 4.3 12.9 5.5 19.6l.5 2.8a21 21 0 00-.1-1.1l.3 2.8a109.8 109.8 0 01.1 19.9l-.3 2.8c-.3 2.2-.2 1.9.2-1.1l-.4 2.8c-1.1 6.5-2.7 12.9-4.9 19.1l-1 2.7-1 2.6a121 121 0 01-9.1 15.8l-2 2.9a20 20 0 00.5-.6l-1.8 2.2c-4.4 5.4-9.2 10.1-14.3 14.6-8 6.8-7.5 21.4 0 28.3 8.5 7.8 19.8 7.3 28.3 0a133.8 133.8 0 00-18-214.8 133.7 133.7 0 00-75.3-19.3A135.1 135.1 0 005 578.6c-14.8 51.7 4 109 46.5 141.8a134.7 134.7 0 00147.5 11c7.8-4.4 14.9-9.7 21.8-15.4 8.1-6.7 7.5-21.4 0-28.3-8.6-8-19.7-7.3-28.3-.1z'/%3E%3C/g%3E%3C/svg%3E") no-repeat center rgba(255,255,255,0.1);
      background-size: 50% !important;
    }
    &#ethnography {
      background: url("data:image/svg+xml;charset=utf-8,%3Csvg width='124' height='122' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Crect x='.7' width='123' height='122' rx='5'/%3E%3Cpath d='M33 82.8V62a30 30 0 1130 30H42.2a9.2 9.2 0 01-9.2-9.2zM63 87a25 25 0 100-50 25 25 0 000 50zm.5-13a11.5 11.5 0 110-23 11.5 11.5 0 010 23zm-.5-5a7 7 0 100-14 7 7 0 000 14z' fill='%23FFF' fill-rule='nonzero'/%3E%3C/g%3E%3C/svg%3E") no-repeat center rgba(255,255,255,0.1);
      background-size: 100% !important;
    }
    &#graphryder {
    background: url("data:image/svg+xml;charset=utf-8,%3Csvg width='124' height='122' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Crect x='.7' width='123' height='122' rx='5'/%3E%3Cpath d='M92.5 74.6a6.4 6.4 0 00-5.3 4L68.8 76v-1.7A14 14 0 0065 66l16-19a7.6 7.6 0 009.5-1.9 7.6 7.6 0 10-12-9.6 7.6 7.6 0 000 9.5l-16 18.8a14.1 14.1 0 00-13.9-1l-8.2-13a9 9 0 10-13-12.3 9 9 0 0010.2 14l8.2 13A14.2 14.2 0 0040.5 77l.6 3.2a14.1 14.1 0 0024.6 4.6c1.3-1.7 2.2-3.5 2.7-5.4l18.4 2.5a6.4 6.4 0 007 5.6 6.4 6.4 0 10-1.3-12.8zm-61.8-27a5.7 5.7 0 117.2-8.8 5.7 5.7 0 11-7.2 8.8zm50.5-9.9a4.3 4.3 0 016-.6 4.3 4.3 0 01.7 6 4.5 4.5 0 01-6.1.7 4.3 4.3 0 01-.6-6.1zm-18 44.9a10.8 10.8 0 01-15.4 1.6 10.9 10.9 0 1113.7-17 10.9 10.9 0 011.6 15.4zm32.4.4a3.2 3.2 0 01-4.4.4 3.1 3.1 0 114-4.8c1.3 1 1.5 3 .4 4.4z' fill='%23FFF' fill-rule='nonzero' stroke='%23FFF' stroke-width='2'/%3E%3C/g%3E%3C/svg%3E") no-repeat center rgba(255,255,255,0.1);
    background-size: 90% !important;
  }
  }
  /deep/ h3 {
    font-weight: 600;
    font-size: 25px;
  }
  .excerpt {
    @apply mt-4;
  }
  .excerpt p {
    font-size: 14px;
    margin: 10px 0;
  }
}
.section_image {
  border: none;
  margin: 15px 0 0 0;
  padding-right: 10px;
}


.sub_menu {
  width: 100%;
  background: rgba(0, 0, 0, 0.02);

  ol {
    list-style-type: none;
    font-size: 15px;
    li {
      @apply p-4 border-b font-bold;
      line-height: 30px;
      background: white;
      span {
      }
      &:hover {
        cursor: pointer;
      }
      &.active {
        background: #fafafa;
        span {
          line-height: 30px;
          margin: 0;
          padding: 0;
        }
      }
    }
  }
}
</style>

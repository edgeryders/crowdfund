<template>
  <div class="flex flex-col w-full site_container">
    <Nav style="margin-bottom: 60px" :data="selectedComponents" />

    <Hero :data="''" :custom="getSectionType('hero')" />

    <div
      v-for="section in data.sections"
      :key="section.title"
      :id="section.type"
    >
      <Custom
        v-if="section.type == 'text'"
        :custom="section"
        key="text"
        id="custom"
      />
      <Crowdfund
        v-if="section.type == 'funding'"
        :custom="section"
        :key="section.title"
        id="crowdfund"
      />
      <Subscribe
        v-if="section.type == 'subscribe'"
        :custom="section"
        :key="section.title"
        id="subscribe"
      />

      <Learn
        v-if="section.type == 'learn'"
        :custom="section"
        :key="section.title"
        id="learn"
      />
            <Courses
        v-if="section.type == 'Courses'"
        :custom="getSectionData(section.title)"
        :key="section.title"
        id="courses"
      />

      <Edgeryders
        v-if="section.type == 'edgeryders'"
        :custom="getSectionData(section.title)"
      />
    </div>

    <Terms />
  </div>
</template>

<script>
import config from "@/data/config.json";

import Nav from "@/components/Navigation.vue";
import Hero from "@/components/Hero.vue";
import Custom from "@/components/Custom.vue";
import Crowdfund from "@/components/Crowdfund.vue";
import Courses from "@/components/Courses.vue";
import Subscribe from "@/components/Subscribe.vue";
import Learn from "@/components/Learn.vue";
import Edgeryders from "@/components/Edgeryders.vue";
import Terms from "@/components/Terms.vue";

export default {
  name: "home",
  data() {
    return {
      data: config,
      category: null,
      categories: null
    };
  },
  components: {
    Hero,
    Nav,
    Custom,
    Crowdfund,
    Courses,
    Subscribe,
    Learn,
    Edgeryders,
    Terms
  },
  methods: {
    getSectionData(type) {
      return this.data.sections.filter(section => section.title == type)[0];
    },
    getSectionType(type) {
      return this.data.sections.filter(section => section.type == type)[0];
    }
  },
  computed: {
    selectedComponents() {
    var navArray = this.data.sections.map(function(el) {
            if (el.id) {
              return {
                title: el.title,
                id: el.id,
              } 
            }
          });
    return navArray.filter(function (el) {
        return el != null;
    });
    
    }
  }
};
</script>
<style lang="scss">
#books {
  width: 100% !important;
}
.site_container {
  width: 100vw;
  overflow-x: hidden;
}
#learn {
  @apply w-full bg-gray-100 flex items-center;
  width: 100% !important;
}
</style>

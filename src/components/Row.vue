<template>
  <div
    class="card_row"
    ref="content"
    v-dragscroll.x="true"
    :class="{ active: selected != null }"
  >
    <div
      class="card"
      v-for="(item, i) in cards"
      :key="item"
      :style="{ background: 'url(' + item.cover + ')' }"
      @click="select(i)"
      :class="{ active: i == selected }"
    ></div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  props: {
    cards: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      selected: null
    };
  },
  computed: {
    selector() {
      return document.querySelector("#content");
    }
  },
  methods: {
    scroll() {
      this.$nextTick(() => {
        this.$refs.content.scrollLeft += 300;
      });
    },
    select(value) {
      this.$emit("select", value);
      this.selected = value;
    }
  },
  filters: {
    formatDate: function(value) {
      return moment(String(value)).format("MM/DD/YY");
    }
  }
};
</script>

<style lang="scss">
.jump {
  display: inline-block;
}

.card_row.active {
  .card {
    filter: grayscale(100%);
  }
}
.card {
  background-size: cover !important;
  width: 120px !important;
  border: 2px solid white;
  height: 180px !important;
  box-shadow: 0 0 14px rgba(0, 0, 0, 0.25) !important;

  &.active {
    border: 2px solid black;
    filter: grayscale(0%) !important;
  }
}
</style>

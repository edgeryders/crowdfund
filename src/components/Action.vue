<template>
  <div class="section md:section-md" id="action">
    <h1 class="section_title" v-if="custom.title">{{ custom.title }}</h1>
    <div
      class="wrapper md:wrapper-md"
      :class="{ reverse: custom.text.position == 'left' }"
    >
      <div class="apply">
        <div v-html="custom.apply.content"></div>
      </div>
      <div class="w-full terms md:pt-4" v-html="custom.text.content"></div>
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
<style lang="scss">
#action {
  .section_title {
    margin-bottom: 20px !important;
    background: url("data:image/svg+xml,%3Csvg height='100' width='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M89.6 2.5H25v14.6H10.4v80.4H75V82.9h14.6V2.5zm-19 90.6H14.8V21.5H25v61.4h45.6v10.2zm14.6-14.6H29.4V6.9h55.8v71.6z'/%3E%3Cpath d='M39.4 19.6h35.8V24H39.4zM39.4 33.6h35.8V38H39.4zM39.4 47.5h35.8v4.4H39.4zM39.4 61.5h35.8v4.4H39.4z'/%3E%3C/svg%3E%0A")
      no-repeat 5px 7px;
    background-size: 32px;
    padding-left: 50px;
  }
}
#action /deep/ p {
  margin: 10px 0 !important;
  position: relative;
  top: 10px;
}

.section_text {
  padding-top: 0 !important;
  /deep/ h3 {
    font-weight: bold;
    font-size: 20px;
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
.apply {
  min-width: 400px !important;
  max-width: 400px;
  border-radius: 10px;
  margin-right: 30px;
  margin-top: 10px;
  padding-top: 10px;
  overflow: hidden;
  background: #fafafa !important;
  h4 {
    font-weight: bold;
    font-size: 18px;
    background: black;
    color: white;
    width: 100%;
    padding: 17px 25px 15px;
  }
  p {
    margin: 20px 0 !important;
  }
  /deep/ p {
    margin: 20px 0 !important;
  }
  a {
    font-weight: bold;
    border-bottom: 1px dashed #000;
  }
  ol {
    margin: 25px 0 25px !important;
    padding: 15px 10px;
    background: white;
    border-left: 2px solid black;
    list-style: disc;
    li {
      line-height: 25px;
      margin-left: 20px;
      font-size: 14px;
    }
  }
  div {
    padding: 0 25px;
  }
}
.section_image {
  border: none;
  padding-right: 10px;
}
</style>

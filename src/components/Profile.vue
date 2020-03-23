<template>
  <a class="profile_badge" :href="data.url">
    <img :src="data.avatar" />
    <p>{{ data.username }}</p>
  </a>
</template>

<script>
export default {
  props: ["data"]
};
</script>
<style lang="scss" scoped>
.profile_badge {
  @apply border;
  max-width: 100%;
  display: inline-flex;
  align-self: start;
  align-items: center;
  height: 35px;
  color: black;
    background: #fafafa; 
  position: relative;
border: 1px solid #efefef !important;
  padding-right: 10px;
  font-weight: bold;
  border-radius: 2px;
  overflow: hidden;
  p {
     font-size: 12px !important;
     flex-shrink: 0;
     padding-top: 2px;
  }
  img {
    width: auto;
    height: 110%;
    margin-right: 7px;
  }
}
</style>

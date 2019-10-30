<template>
  <div class="layout gradient">
    <Header :page="page" :title="title" :description="description" />
    <div class="content">
      <slot />
    </div>
  </div>
</template>

<script>
import Header from "~/components/Header.vue";

export default {
  components: {
    Header
  },
  props: {
    page: {
      type: String,
      required: true
    },
    title: String,
    description: String
  }
};
</script>

<style>
.layout {
  display: grid;
  grid-template-columns: 1fr;
  min-height: 100vh;
}

@media (min-width: 768px) {
  .layout {
    grid-template-columns: 10% 90%;
  }
}
</style>

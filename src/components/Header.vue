<template>
  <header class="header">
    <g-link to="/" exact>
      <h1>{{ $static.metaData.siteName }}</h1>
    </g-link>
    <p>{{ $static.metaData.siteDescription }}</p>
    <h2>
      <g-link :to="infoLink">{{ isInfoPage ? "close" : "info" }}</g-link>
    </h2>
  </header>
</template>

<script>
export default {
  props: {
    page: {
      type: String,
      required: true
    }
  },
  computed: {
    isInfoPage() {
      return this.page === "info" && true;
    },
    infoLink() {
      return this.isInfoPage ? "/" : "/info";
    }
  }
};
</script>

<static-query>
    query {
    metaData {
        siteName
        siteDescription
    }
    }
</static-query>

<style>
.header {
  z-index: 1;
  padding: 10rem;
  border-bottom: 1px solid #ebebeb;
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
}

.header h2 {
  margin-top: auto;
}

.header p {
  font-weight: bold;
}

@media (min-width: 700px) {
  .header h1,
  .header a {
    align-self: flex-start;
    position: sticky;
    top: 10rem;
  }
  .header p {
    padding: 1.5rem 1.25rem;
    min-width: 51rem;
  }
}
</style>
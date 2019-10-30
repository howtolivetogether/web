<template>
  <li>
    <div class="hero_image">
      <g-image
        :src="hero_image"
        :alt="title"
        width="300"
        height="300"
        quality="75"
        v-if="new Date(release_date) < new Date()"
      ></g-image>
      <div v-else class="countdown gradient">
        <div class="grid">
          <h2 v-for="(value, key) in countdown" :key="key">{{ value }}</h2>
          <g-image src="../assets/images/elephant_home.png" width="300" height="300" quality="75" />
        </div>
      </div>
    </div>
    <div class="blogList__info" v-if="new Date(release_date) < new Date()">
      <h2>{{ title }}</h2>
      <h3>{{ formatDate(date) }}</h3>
      <p v-html="formatExcerpt(content)" v-if="content"></p>
    </div>
    <div class="blogList__info" v-else>
      <h2>Comming Soon</h2>
      <h3>Release Date: {{ formatDate(release_date) }}</h3>
    </div>
  </li>
</template>

<script>
export default {
  props: [
    "id",
    "content",
    "authors",
    "release_date",
    "date",
    "title",
    "hero_image"
  ],
  data() {
    return {
      currentTime: new Date().getTime()
    };
  },
  mounted() {
    setInterval(() => (this.currentTime = new Date().getTime()), 500);
  },
  methods: {
    formatDate(date) {
      return new Date(date).toDateString().slice(4);
    },
    formatExcerpt(excerpt) {
      const blurb = excerpt.slice(3, 200).trim();
      return blurb.indexOf("</p>") !== -1
        ? blurb.slice(0, blurb.indexOf("</p>")).trim() + "..."
        : blurb + "...";
    }
  },
  computed: {
    countdown() {
      const deadline = new Date(this.release_date).getTime();
      const distance = deadline - this.currentTime;
      const days = Math.floor(
        (distance % (1000 * 60 ** 3 * 24)) / (1000 * 60 ** 2 * 24)
      );
      const hours = Math.floor(
        (distance % (1000 * 60 ** 3)) / (1000 * 60 ** 2)
      );
      const minutes = Math.floor((distance % (1000 * 60 ** 2)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      return { days, hours, minutes, seconds };
    }
  }
};
</script>

<style scoped>
.countdown {
  position: relative;
  width: 100%;
  padding-bottom: 100%;
  margin-bottom: 1.45rem;
  filter: saturate(0.5);
}
.countdown .grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 4em;
  font-size: 4em;
  font-weight: bold;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
}
.countdown h2 {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
}
.countdown img {
  position: absolute;
}
</style>
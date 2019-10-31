<template>
  <g-link :to="path" tag="article" class="post released" v-if="released">
    <g-image :src="hero_image" :alt="title" height="300" width="300"></g-image>
    <h2>{{ title }}</h2>
    <h3>{{ short_date }}</h3>
    <hr />
    <p v-html="description"></p>
  </g-link>
  <article class="post" v-else>
    <div class="countdown">
      <div class="overlay gradient">
        <p v-for="(value, key) in countdown" :key="key">{{ value }}</p>
      </div>
      <g-image src="../assets/images/elephant_home.png" height="300" width="300" />
    </div>
    <h2>Comming Soon</h2>
  </article>
</template>

<script>
import { computed, ref } from "@vue/composition-api";

export default {
  props: ["hero_image", "title", "release_date", "date", "description", "path"],
  setup(props) {
    const currentTime = ref(new Date().getTime());
    setInterval(() => (currentTime.value = new Date().getTime()), 1000);
    return {
      countdown: computed(() => {
        const deadline = new Date(props.release_date).getTime();
        const d = deadline - currentTime.value;
        return {
          days: Math.floor((d % (1000 * 60 ** 3 * 24)) / (1000 * 60 ** 2 * 24)),
          hours: Math.floor((d % (1000 * 60 ** 3)) / (1000 * 60 ** 2)),
          minutes: Math.floor((d % (1000 * 60 ** 2)) / (1000 * 60)),
          seconds: Math.floor((d % (1000 * 60)) / 1000)
        };
      }),
      released: computed(() => new Date(props.release_date) < new Date()),
      short_date: computed(() => new Date(props.date).toDateString().slice(4))
    };
  }
};
</script>

<style scoped>
.post {
  display: grid;
  grid-gap: 1rem;
  grid-auto-rows: min-content;
}

.post.released {
  cursor: pointer;
}

.countdown {
  position: relative;
}

.overlay {
  position: relative;
  display: grid;
  align-content: center;
  text-align: center;
  grid-template-columns: 1fr 1fr;
  grid-gap: 40% 0%;
  font-weight: bold;
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  opacity: 0.9;
  mix-blend-mode: overlay;
}
</style>
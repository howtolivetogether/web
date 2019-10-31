<template>
  <article>
    <h1>{{ title }}</h1>
    <hr :class="`hr${x}`" v-for="x in 3" :key="x" :style="`grid-area: hr${x}`" />
    <nav>
      <span @click="$router.go(-1)">X</span>
    </nav>
    <g-image :src="hero_image" :alt="title" />
    <p v-html="content"></p>
  </article>
</template>

<script>
export default {
  setup(props, { parent }) {
    return {
      ...parent.$page.post
    };
  }
};
</script>

<page-query>
query ($path: String!) {
  post: filter(path: $path) {
    title
    date (format: "MMMM DD YYYY")
    authors
    content
    hero_image (quality: 80)
  }
  all: allFilter {
    edges {
      node {
        path
        title
      }
      next {
        path
      }
    }
  }
}
</page-query>

<style scoped>
article {
  margin: 1rem;
  min-height: calc(100vh - 2rem);
  display: grid;
  grid-gap: 2.5rem;
  grid-template-areas:
    "title ."
    "hr1 hr1"
    "image image"
    "content content";
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto 2px 400px 1fr;
}

nav {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

nav span {
  font-size: 7rem;
  line-height: 6rem;
  transform: scale(2, 1);
  margin-right: 2rem;
  margin-top: .5rem;
  cursor: pointer;
}

h1 {
  grid-area: title;
}

img {
  grid-area: image;
  height: 100%;
  width: 100%;
  object-fit: cover;
}

p {
  grid-area: content;
  columns: 2;
}

.hr2,
.hr3 {
  display: none;
}

@media (min-width: 768px) {
  article {
    grid-template-areas:
      "title hr2 ."
      "hr1 hr2 hr3"
      "image hr2 content";
    grid-template-rows: auto 2px 1fr;
    grid-template-columns: 1fr 2px 1fr;
  }

  .hr2,
  .hr3 {
    display: block;
    border-right: var(--filet);
  }
}
</style>
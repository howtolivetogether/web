<template>
  <section v-bind="$attrs">
    <ul class="list">
      <div>{{ title }}</div>
      <g-link v-for="post in posts" :key="post.node.title" :to="post.node.path">
        <BlogPost v-bind="post.node" />
      </g-link>
    </ul>
  </section>
</template>

<script>
import BlogPost from "./BlogPost.vue";

export default {
  components: {
    BlogPost,
  },
  props: {
    posts: {
      type: Array,
      required: true
    }
  },
};
</script>

<style scoped lang="scss">
.list {
  a:hover {
    opacity: 1;
    li {
      div.hero_image {
        img {
          opacity: 0.8;
          transition: opacity 0.3s ease;
        }
      }
    }
  }
  .hero_image {
    width: 100%;
    height: 33vh;
    overflow: hidden;
    background-color: #000;
    img {
      object-fit: cover;
      object-position: 50% 50%;
      opacity: 1;
      transition: opacity 0.3s ease;
      min-height: 100%;
    }
  }
  .blogList__info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 1.5rem 1.25rem;
    h2,
    h3,
    p {
      -webkit-transform: translateX(0px);
      transform: translateX(0px);
      -webkit-transition: transform 0.5 ease-out;
      transition: transform 0.5s ease-out;
    }
  }

  li {
    opacity: inherit;
    display: flex;
    justify-content: center;
    flex-direction: column;
    min-height: 38vh;
    margin-bottom: 0;
  }
  h2 {
    margin-bottom: 0.5rem;
  }
  h3 {
    margin-bottom: 1rem;
  }
  p {
    max-width: 900px;
    color: #464646;
  }
}
</style>
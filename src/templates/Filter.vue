<template>
  <article>
    <h1>{{ title }}</h1>
    <hr :class="`hr${x}`" v-for="x in 3" :key="x" :style="`grid-area: hr${x}`" />
    <nav>
      <span @click="$router.go(-1)">X</span>
    </nav>
    <template v-if="video">
      <iframe :src="video.src" frameborder="0" allowfullscreen allow="autoplay" v-if="video.iframe"></iframe>
      <video controls autoplay muted v-else>
        <source :src="video.src" :type="video.mimeType" />
      </video>
    </template>
    <g-image :src="image" :alt="title" v-else />
    <p v-html="content"></p>
  </article>
</template>

<script>
import { toRefs, ref } from "@vue/composition-api";

export default {
  setup(props, { parent }) {
    const filter = src =>
      src
        .replace(
          /(?:http[s]?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?(.+)/g,
          "http://www.youtube.com/embed/$1?autoplay=1&loop=1&autopause=0"
        )
        .replace(
          /(?:http[s]?:\/\/(?:www.)?vimeo\.com)\/(.+)/g,
          "//player.vimeo.com/video/$1?autoplay=1&loop=1&autopause=0"
        );
    const post = parent.$page.post;
    return {
      ...toRefs(post),
      video: ref(
        post.main_media && post.main_media.mimeType.includes("video")
          ? post.main_media
          : post.main_external_video
          ? {
              src: filter(post.main_external_video),
              mimeType: post.main_external_video.includes(".webm")
                ? "video/webm"
                : "video/mp4",
              iframe:
                filter(post.main_external_video) !== post.main_external_video
            }
          : post.thumbnail.mimeType.includes("video")
          ? post.thumbnail
          : null
      ),
      image: ref(
        post.main_media && post.main_media.type === "image" ? post.main_media : post.thumbnail
      )
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
    thumbnail (quality: 80)
    main_media
    main_external_video
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
  margin-top: 0.5rem;
  cursor: pointer;
}

h1 {
  grid-area: title;
}

img,
iframe,
video {
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
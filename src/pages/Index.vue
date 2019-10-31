<template>
  <div class="index">
    <header>
      <h1>{{ title }}</h1>
      <div v-html="subtitle"></div>
      <div class="contact">
        <a v-for="(href, media) in social" :key="href" :href="href">{{ media }}</a>
      </div>
    </header>
    <div class="info">
      <h1>Home</h1>
      <h1>#1</h1>
    </div>
    <aside>
      <h3>19/09 - 26/09</h3>
    </aside>
    <nav>
      <h2
        v-for="category in categories"
        :key="category"
        :class="category"
        tabindex="0"
        @focus="active(category)"
        @blur="active(null)"
      >{{ category }}</h2>
    </nav>
    <main>
      <section v-for="{category, posts} in posts" :key="category" :class="category">
        <Post v-for="post in posts" :key="post.id" v-bind="post" />
      </section>
    </main>
    <footer>
      <a href="https://app.forestry.io/dashboard/#/">Admin</a>
      <a v-for="(href, media) in social" :key="href" :href="href">{{ media }}</a>
    </footer>
  </div>
</template>

<script>
import Post from "../components/Post.vue";
import { ref, computed } from "@vue/composition-api";

export default {
  components: {
    Post
  },
  setup(props, { parent }) {
    const categories = ["focus", "forum", "filter"];
    const actives = ref(categories);
    return {
      social: parent.$page.metadata.infoData.contact,
      title: parent.$page.metadata.siteName,
      subtitle: parent.$page.metadata.infoData.description,
      categories,
      active: category => (actives.value = category ? [category] : categories),
      posts: computed(() =>
        actives.value.map(category => ({
          category,
          posts: parent.$page.posts.edges
            .filter(({ node }) => node.fileInfo.directory === category)
            .map(({ node }) => node)
        }))
      )
    };
  }
};
</script>

<page-query>
query {
  metadata {
    siteName
    infoData {
      description
      contact {
        email
        instagram
        vimeo
        github
      }
    }
  }
  posts: allPost {
    edges {
      node {
        fileInfo {
          directory
        }
        id
        title
        path
        authors
        date  (format: "MMMM DD YYYY")
        release_date
        hero_image (width:1000, quality: 75)
        description
      }
    }
  }
}
</page-query>

<style>
img {
  max-width: 100%;
  width: 100%;
}

.index {
  display: grid;
  grid-template-areas:
    "header header"
    ". info"
    "aside nav"
    "aside main"
    "aside footer";
  grid-template-columns: 0.1fr 0.9fr;
}

footer {
  grid-area: footer;
  min-height: 10vh;
  display: flex;
  border-top: var(--filet);
  display: flex;
  justify-content: space-around;
}

header {
  grid-area: header;
  padding: 5rem 5rem 0 5rem;
  height: 60vh;
  display: grid;
  grid-gap: 1.7rem;
  border-bottom: var(--filet);
}

.contact {
  display: flex;
  justify-content: space-between;
}

footer a,
.contact a {
  text-transform: capitalize;
  text-decoration: none;
  color: black;
  writing-mode: vertical-lr;
  transform: rotate(180deg);
  padding: 1rem 0;
  border-right: var(--filet);
  font-weight: bold;
}

main,
section {
  display: grid;
  grid-gap: 5rem;
  grid-auto-rows: min-content;
}

.info {
  grid-area: info;
  border-bottom: var(--filet);
  border-left: var(--filet);
  margin-left: -2px;
  padding: 5rem;
  display: flex;
  justify-content: space-between;
}

aside {
  grid-area: aside;
  border-top: var(--filet);
  border-right: var(--filet);
  padding: 1rem 0;
  display: flex;
  justify-content: center;
  margin-top: -2px;
}

aside h3 {
  writing-mode: vertical-lr;
  transform: rotate(180deg);
  text-align: right;
  width: 2.1rem;
}

main {
  grid-area: main;
  padding: 5rem;
}

.index > nav {
  grid-area: nav;
  display: grid;
}

.index > nav > h2 {
  border-bottom: var(--filet);
  cursor: pointer;
  padding: 1rem 5rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.index > nav > h2::after {
  content: "";
  border-left: var(--filet);
  margin: -1rem -5rem;
  background: white;
}

header,
.index > nav > h2:focus {
  background: var(--main-bg-gradient);
  background-size: 400% 400%;
  animation: gradientBG 15s ease infinite;
  outline: none;
}

.index > nav > h2.focus {
  grid-template-columns: 100fr 1fr;
}

.index > nav > h2.forum {
  grid-template-columns: 2fr 1fr;
}

.index > nav > h2.filter {
  grid-template-columns: 2.5fr 3fr;
}

@media (min-width: 768px) {
  .index > nav,
  main {
    grid-template-areas: "focus forum filter";
    grid-template-columns: 4fr 3fr 2fr;
    border: none;
  }
  .focus {
    grid-area: focus;
  }
  .forum {
    grid-area: forum;
  }
  .filter {
    grid-area: filter;
  }
  .index > nav > h2 {
    border-right: var(--filet);
    border-bottom: none;
    pointer-events: none;
  }
  .index > nav > h2:last-child {
    border-right: none;
  }
  .index > nav > h2::after {
    content: none;
  }
}
</style>
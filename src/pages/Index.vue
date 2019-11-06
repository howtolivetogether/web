<template>
  <div class="index">
    <header>
      <div class="first">
        <h1>{{ title }}</h1>
        <div v-html="subtitle"></div>
        <div class="contact">
          <a v-for="(href, media) in social" :key="href" :href="href">{{ media }}</a>
        </div>
      </div>
      <SvgFooter class="svg-header" />
    </header>
    <aside class="topic">
      <h1>Home</h1>
      <h1>#1</h1>
    </aside>
    <aside class="timeline">
      <h3>19/09 - 26/09</h3>
    </aside>
    <nav
      v-for="category in categories"
      :key="'nav-'+category"
      :class="[category, {active: active === category}]"
      class="h2"
      tabindex="0"
      @focus="focus(category)"
    >{{ category }}</nav>
    <section v-for="{category, posts} in posts" :key="category" :class="category">
      <Post v-for="post in posts" :key="post.id" v-bind="post" />
    </section>
    <SvgFooter class="svg-footer" />
    <footer>
      <a href="https://app.forestry.io/dashboard/#/">Admin</a>
      <a v-for="(href, media) in social" :key="href" :href="href">{{ media }}</a>
    </footer>
  </div>
</template>

<script>
import Post from "../components/Post.vue";
import SvgFooter from "../components/SvgFooter.vue";
import { ref, computed } from "@vue/composition-api";

export default {
  components: {
    Post,
    SvgFooter
  },
  setup(props, { parent }) {
    const categories = ["focus", "forum", "filter"];
    const active = ref();
    const instagram = parent.$page.instagram.edges
      .map(({ node }) => node)
      .map(
        ({
          id,
          display_url,
          media_preview,
          edge_media_to_caption,
          shortcode,
          taken_at_timestamp
        }) => ({
          id,
          title: id,
          path: `https://www.instagram.com/p/${shortcode}/`,
          thumbnail: display_url,
          description: edge_media_to_caption.edges[0].node.text,
          date: new Date(taken_at_timestamp * 1000),
          release_date: new Date(taken_at_timestamp * 1000),        
          instagram: true  
        })
      );
    return {
      active,
      social: parent.$page.metadata.infoData.contact,
      title: parent.$page.metadata.siteName,
      subtitle: parent.$page.metadata.infoData.description,
      categories,
      focus: category => (active.value = category),
      posts: computed(() =>
        (active.value ? [active.value] : categories).map(category => ({
          category,
          posts: [
            ...parent.$page.posts.edges
              .filter(({ node }) => node.fileInfo.directory === category)
              .map(({ node }) => node),
            ...(category === "filter" ? instagram : [])
          ]
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
  instagram: allInstagramPhoto {
		edges {
      node {
        id
        display_url 
        media_preview 
        shortcode
        taken_at_timestamp
        edge_media_to_caption 
        {
          edges 
          {
            node {
              text
            }
          }
        }
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
        date  (format: "MMMM DD YYYY")
        release_date
        thumbnail (width:1000, quality: 75)
        description
      }
    }
  }
}
</page-query>

<style lang="scss" scoped>
.index {
  display: grid;
  grid-template-areas:
    "header header"
    ". topic"
    "timeline nav-focus"
    "timeline nav-forum"
    "timeline nav-filter"
    "timeline section-focus"
    "timeline section-forum"
    "timeline section-filter"
    "svg-footer svg-footer"
    "footer footer";
  grid-template-columns: 0.1fr 1fr;

  :not(section) a,
  > aside h3 {
    writing-mode: vertical-lr;
    transform: rotate(180deg);
  }

  :not(section) a {
    padding: 1rem 1rem 3rem 0;
    border-right: var(--filet);
    text-transform: uppercase;
  }

  > header,
  > nav.active {
    background: var(--main-bg-gradient);
    background-size: 400% 400%;
    animation: gradientBG 15s ease infinite;
    outline: none;
  }

  > header .contact,
  > footer {
    display: flex;
    justify-content: space-around;
  }

  > header {
    display: grid;
    min-height: 60vh;
    border-bottom: var(--filet);
    grid-template-columns: 1fr;

    h1 {
      font-size: 3.4rem;
      line-height: 4.3rem;
    }

    .first {
      display: grid;
      padding: var(--gutter) var(--gutter) 0 var(--gutter);
      grid-gap: var(--gutter);
      grid-template-rows: max-content auto min-content;
    }

    svg {
      width: 100%;
      height: 100%;
      min-height: 30vh;
    }
  }

  > aside.topic {
    border-bottom: var(--filet);
    border-left: var(--filet);
    padding: var(--gutter);
    margin-left: calc(var(--filet-width) * -1);
    display: flex;
    justify-content: space-between;
  }

  > aside.timeline {
    border-top: var(--filet);
    border-right: var(--filet);
    margin-top: calc(var(--filet-width) * -1);
    padding: var(--gutter);
    display: flex;
    justify-content: center;
    align-items: flex-start;

    > h3 {
      height: max-content;
    }
  }

  > nav {
    display: grid;
    padding: calc(var(--gutter) * 0.25) var(--gutter);
    border-bottom: var(--filet);

    &:after {
      content: "";
      border-left: var(--filet);
      margin: calc(var(--gutter) * -0.25) calc(var(--gutter) * -1)
        calc(var(--gutter) * -0.25) 0;
      background: white;
    }

    &.focus {
      grid-template-columns: 100fr 1fr;
    }

    &.forum {
      grid-template-columns: 2fr 1fr;
    }

    &.filter {
      grid-template-columns: 1fr 1fr;
    }
  }

  > nav:first-child {
    border: none;
  }

  > section {
    display: grid;
    grid-gap: var(--gutter);
    padding: var(--gutter);
  }

  > .svg-footer {
    grid-area: svg-footer;
  }

  > footer {
    min-height: 10vh;
    border-top: var(--filet);
  }
}

@media (min-width: 1024px) {
  .index {
    grid-template-areas:
      "header header header header"
      ". topic topic topic"
      "timeline nav-focus nav-forum nav-filter"
      "timeline section-focus section-forum section-filter"
      "timeline svg-footer svg-footer svg-footer"
      "timeline footer footer footer";
    grid-template-columns: 1fr 7fr 6fr 4fr;

    > header {
      grid-template-columns: 2.2fr 1fr;

      h1 {
        font-size: 4.8rem;
        line-height: 5.6rem;
      }
    }

    > nav {
      border-bottom: 0;
      border-left: var(--filet);
      pointer-events: none;

      &::after {
        content: none;
      }

      &:first-of-type {
        border-left: none;
      }
    }
  }
}
</style>
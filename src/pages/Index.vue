<template>
  <Layout page="home">
    <div class="hero gradient"></div>
    <div class="tri">
      <BlogList :posts="$page.focus.edges" class="focus" />
      <BlogList :posts="$page.forum.edges" class="forum" />
      <BlogList :posts="$page.filter.edges" class="filter" />
    </div>
  </Layout>
</template>

<script>
import BlogList from "~/components/BlogList.vue";
import Header from "~/components/Header.vue";

export default {
  metaInfo: {
    title: "Home"
  },
  components: {
    BlogList,
    Header
  }
};
</script>

<style scoped>
.hero {
  height: 10vh;
  background-size: 70rem 8rem;
  /* background-image: linear-gradient(to right, black 1rem, transparent 1rem),
    linear-gradient(to bottom, transparent 1px, transparent 1px); */
  animation: gradientBG 100s ease infinite;
}

@media (min-width: 768px) {
  .hero {
    height: 100vh;
  }
}

.tri {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 5rem;
  padding: 10rem;
  background: white;
}

.focus {
  grid-column: span 3;
}

.forum {
  grid-column: span 2;
}

@media (min-width: 1280px) {
  .tri {
    grid-template-columns: 4fr 3fr 2fr;
  }

  .focus {
    grid-column: auto;
  }

  .forum {
    grid-column: auto;
  }
}
</style>

<page-query>
    query getAllBlogData {
        forum: allForum {
            edges {
                node {
                    id
                    title
                    path
                    authors
                    date  (format: "MMMM DD YYYY")
                    release_date
                    hero_image (width:1000, quality: 75)
                    content
                }
            }
        }
        focus: allFocus {
            edges {
                node {
                    id
                    title
                    path
                    authors
                    date  (format: "MMMM DD YYYY")
                    release_date
                    hero_image (width:1000, quality: 75)
                    content
                }
            }
        }
        filter: allFilter {
            edges {
                node {
                    id
                    title
                    path
                    authors
                    date  (format: "MMMM DD YYYY")
                    release_date
                    hero_image (width:1000, quality: 75)
                }
            }
        }
    }
</page-query>

<template>
  <Layout page="home">
    <div class="tri">
      <BlogList :posts="$page.focus.edges" />
      <BlogList :posts="$page.forum.edges" />
      <BlogList :posts="$page.filter.edges" />
    </div>
  </Layout>
</template>

<script>
import BlogList from "~/components/BlogList.vue";

export default {
  metaInfo: {
    title: "Home"
  },
  components: {
    BlogList
  }
};
</script>

<style scoped>
.tri {
  display: grid;
  grid-template-columns: 4fr 3fr 2fr;
  grid-gap: 1em;
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
                    hero_image (width:1000, quality: 75)
                    content
                }
            }
        }
    }
</page-query>

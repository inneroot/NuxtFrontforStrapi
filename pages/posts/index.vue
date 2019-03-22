<template>
  <div class="maincontainer">
    <main role="main">{{posts}}</main>
  </div>
</template>

<script>
import Strapi from 'strapi-sdk-javascript/build/main'
const apiUrl = process.env.API_URL || 'http://localhost:1337'
const strapi = new Strapi(apiUrl)

export default {
  data() {
    return {}
  },
  computed: {
    posts() {
      return this.$store.getters['posts/list']
    }
  },
  async fetch({ store }) {
    store.commit('posts/emptyList')
    const response = await strapi.request('post', '/graphql', {
      data: {
        query: `query {
          posts (limit: 100, start: 0, sort: "date:desc"){
            id
            title
            date
            image {
              url
            }
          }
        }
        `
      }
    })
    response.data.posts.forEach(post => {
      post.image.url = `${apiUrl}${post.image.url}`
      store.commit('posts/add', {
        id: post.id,
        ...post
      })
    })
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>

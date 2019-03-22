<template>
  <div class="maincontainer">
    <header>{{slides}}</header>
    <MainSlider/>
    <main role="main">{{posts}}</main>
  </div>
</template>

<script>
import Strapi from 'strapi-sdk-javascript/build/main'
import MainSlider from '~/components/MainSlider.vue'

const apiUrl = process.env.API_URL || 'http://localhost:1337'
const strapi = new Strapi(apiUrl)

export default {
  components: {
    MainSlider
  },
  data() {
    return {}
  },
  computed: {
    posts() {
      return this.$store.getters['posts/list']
    },
    slides() {
      return this.$store.getters['slides/list']
    }
  },
  async fetch({ store }) {
    store.commit('posts/emptyList')
    store.commit('slides/emptyList')
    const response = await strapi.request('post', '/graphql', {
      data: {
        query: `query {
          slides {
            image {
              id
              url
            }
          }
          posts (limit: 10, start: 0, sort: "date:desc"){
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
    response.data.slides.forEach(slide => {
      slide.image.url = `${apiUrl}${slide.image.url}`
      store.commit('slides/add', {
        slide
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

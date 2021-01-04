<template>
  <main class="container mt-3">
    <div class="row justify-content-md-center">
      <div class="col-md-8">
        <h3 class="pb-4 mb-4 font-italic border-bottom">Blog</h3>

        <article
          class="blog-post"
          v-for="article in sliced_posts"
          :key="article.id"
          :id="'article-' + article.id"
        >
          <h2 class="blog-post-title">{{ article.title }}</h2>
          <p class="blog-post-meta">{{ article.date }}</p>
          <div v-if="article.type == 'html'" v-html="article.post" />
          <markdown v-else-if="(type = 'md')" id="md" :source="article.post" />
        </article>

        <nav class="blog-pagination" aria-label="Pagination">
          <a
            class="btn"
            :class="[
              page == 1
                ? 'btn-outline-secondary disabled'
                : 'btn-outline-primary',
            ]"
            @click="page--"
            href="#"
            >Older</a
          >
          {{ page }}
          <a
            class="btn"
            :class="[
              page == total_pages
                ? 'btn-outline-secondary disabled'
                : 'btn-outline-primary',
            ]"
            @click="page++"
            href="#"
            >Newer</a
          >
        </nav>
      </div>

      <div class="col-md-4">
        <div class="p-4 mb-3 bg-light rounded">
          <h4 class="font-italic">About</h4>
          <p class="mb-0">
            컴퓨터로 세상을 만들어가는 것이 너무나 즐거워 다양한 프로그래밍 관련
            포스팅을 올리고 있습니다. 아울러 누구나 무료로 사용할 수 있는 다양한
            어플리케이션도 배포하고 있으니 많은 사랑 부탁드립니다.
          </p>
        </div>

        <blog-plugin>
          <template v-slot:header>Archives</template>
          <ol class="list-unstyled mb-0">
            <li v-for="(archive, index) in archives" :key="index">
              <a
                data-toggle="collapse"
                :data-target="'#archive-' + index"
                href="#"
                >{{ archive.key }}</a
              >
              <div class="collapse" :id="'archive-' + index">
                <ol class="list-unstyled ml-3">
                  <li v-for="post in archive.posts" :key="post.id">
                    {{ post.date.substring(0, 10) + ': ' }}
                    <a
                      :href="'#article-' + post.id"
                      @click="onArchive($event, post.id)"
                      >{{ post.title.substring(0, 20) }}</a
                    >
                  </li>
                </ol>
              </div>
            </li>
          </ol>
        </blog-plugin>

        <blog-plugin>
          <template v-slot:header>Elsewhere</template>
          <ol class="list-unstyled">
            <li>
              <a href="https://github.com/dongprojectteam" target="_blank"
                >GitHub</a
              >
            </li>
            <li>
              <a href="https://blog.naver.com/armigar" target="_blank">Blog</a>
            </li>
            <li>
              <a href="https://www.facebook.com/dongprojectteam" target="_blank"
                >Facebook</a
              >
            </li>
          </ol>
        </blog-plugin>
      </div>
    </div>
    <!-- /.row -->
  </main>
  <!-- /.container -->
</template>

<script>
import { ref, reactive, onMounted, computed } from 'vue'
import Markdown from 'vue3-markdown-it'
import useAxios from '/@compositions/axios.js'
import BlogPlugin from '/@components/BlogPlugin.vue'
export default {
  setup() {
    // 데이타 가져오기
    const { axiosGet } = useAxios()
    const posts = reactive([])
    onMounted(() => {
      axiosGet('/db/blog', onSuccess)
    })

    const onSuccess = (data) => {
      Object.assign(posts, data.data)
      total_rows.value = posts.length

      const temp_group = posts.reduce((accumulator, currentValue) => {
        ;(accumulator[currentValue['date'].substring(0, 7)] =
          accumulator[currentValue['date'].substring(0, 7)] || []).push(
          currentValue
        )
        return accumulator
      }, {})

      Object.assign(
        archives,
        Object.keys(temp_group).map((key) => ({
          key: key,
          posts: temp_group[key],
        }))
      )
    }

    // pagination
    const rows = ref(5)
    const total_rows = ref(0)
    const page = ref(1)
    const total_pages = computed(() => {
      return Math.ceil(total_rows.value / rows.value)
    })
    const sliced_posts = computed(() => {
      return posts.slice((page.value - 1) * rows.value, page.value * rows.value)
    })

    // archives
    const archives = reactive([])
    const onArchive = (evt, id) => {
      const index = posts.findIndex((post) => post.id == id) + 1
      page.value = Math.ceil(index / rows.value)
    }

    return {
      sliced_posts,
      page,
      total_pages,
      archives,
      onArchive,
    }
  },
  components: {
    Markdown,
    BlogPlugin,
  },
}
</script>

<style scoped>
/* Pagination */
.blog-pagination {
  margin-bottom: 4rem;
}
.blog-pagination > .btn {
  border-radius: 2rem;
}

/*
 * Blog posts
 */
.blog-post {
  margin-bottom: 4rem;
}
.blog-post-title {
  margin-bottom: 0.25rem;
  font-size: 2.5rem;
}
.blog-post-meta {
  margin-bottom: 1.25rem;
  color: #727272;
}
</style>

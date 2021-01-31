<template>
  <form @submit="onSubmit" class="m-1 row">
    <div class="text-right my-2">
      <button class="btn btn-primary btn-sm" type="submit">저장하기</button>
    </div>
    <div>
      <input v-model="title" placeholder="제목" class="w-100 my-2" required />
    </div>
    <div class="col-sm-6">
      <textarea
        id="mdTextarea"
        class="w-100"
        v-model="content"
        required
      ></textarea>
    </div>
    <div class="col-sm-6 text-left">
      <markdown class="border" id="md" :source="content" />
    </div>
  </form>
</template>

<script>
import Markdown from 'vue3-markdown-it'
import { ref } from 'vue'
import useAxios from '/@compositions/axios.js'
export default {
  setup() {
    const { axiosPost } = useAxios()
    const title = ref('')
    const content = ref('')

    const onSubmit = (evt) => {
      if (evt) {
        evt.preventDefault()
      }

      if (content.value.length > 0) {
        axiosPost(
          '/db/blog',
          {
            title: title.value,
            content: content.value,
            type: 'md',
          },
          (data) => {
            console.log('저장하였습니다.')
            title.value = content.value = ''
          },
          (data) => {
            console.error('저장하지 못했습니다.')
          }
        )
      } else {
        console.error('컨텐츠를 작성하세요.')
      }
    }

    return {
      title,
      content,
      onSubmit,
    }
  },
  components: { Markdown },
}
</script>

<style scoped>
#mdTextarea {
  height: 500px;
}

#md {
  height: 500px;
  overflow: scroll;
}
</style>

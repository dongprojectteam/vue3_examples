<template>
  <MyTable :header="header" :rows="rows" />
</template>

<script>
import MyTable from './components/MyTable.vue'

export default {
  name: 'App',
  data() {
    return {
      header: ['1번 제목', '2번 제목'],
      rows: [
        [{ data: '1번 내용' }, { data: '2번 내용' }],
        [{ data: '1번 내용2', colspan: 2 }],
        [{ data: '1번 내용3', rowspan: 3 }, { data: '2번 내용3' }],
        [{ data: '2번 내용4' }],
        [{ data: '2번 내용5' }],
      ],
    }
  },
  components: {
    MyTable,
  },
}
</script>

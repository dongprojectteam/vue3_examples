<template>
  <label>이름 : </label>
  <input type="text" v-model="result.name" placeholder="이름" /><br />
  <label>나이 : </label>
  <input type="number" v-model="result.age" placeholder="나이" /><br />
  <label>성별 : </label>
  <label>남성</label>
  <input type="radio" name="gender" v-model="result.gender" value="male" />
  <label>여성</label>
  <input
    type="radio"
    name="gender"
    v-model="result.gender"
    value="female"
  /><br />
  <label>취미 : </label>
  <span v-for="(hobby, index) in hobby_options" :key="index">
    <label>{{ hobby }}</label>
    <input type="checkbox" v-model="result.hobby" v-bind:value="hobby" /> </span
  ><br />
  <label>비번 : </label>
  <input type="password" v-model="result.password" /><br />
  <label>국가 : </label>
  <select v-model="result.country">
    <option v-for="(country, index) in country_options" :key="index">
      {{ country }}
    </option></select
  ><br />
  <div>
    <h3>결과</h3>
    <hr />
    {{ result }}
  </div>
</template>

<script>
import { reactive } from 'vue'

export default {
  setup() {
    const name = ''
    const age = 0
    const gender = 'male'
    const hobby = ['스포츠']
    const password = ''
    const country = '한국'
    const country_options = ['한국', '미국', '중국']
    const hobby_options = ['스포츠', '그림', '음악', '코딩']

    const result = reactive({
      name,
      age,
      gender,
      hobby,
      password,
      country,
    })

    return {
      result,
      country_options,
      hobby_options,
    }
  },
}
</script>

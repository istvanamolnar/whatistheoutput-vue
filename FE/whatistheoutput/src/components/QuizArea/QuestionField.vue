<template>
  <div class="row" v-if="questionText">
    <highlight-code lang="javascript" class="m-auto">
      {{ questionText }}
    </highlight-code>
  </div>
</template>

<script>
export default {
  name: 'QuestionField',
  props: ['questionText'],
}
</script>

<style scoped>

</style>
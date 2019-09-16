<template>
  <div v-if="questionText" class="question-field">
    <highlight-code lang="javascript" class="question-text m-auto p-2">
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
  @media all and (max-height: 420px) {
    .question-text {
      font-size: 2.5vw;
    }
  }
  
  .question-field {
    background-color: rgba(255, 255, 255, 0.8);
    font-size: 24px;
    font-size: 2.5vh;
  }

</style>
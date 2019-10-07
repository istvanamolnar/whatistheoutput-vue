<template>
  <div class="question-field bounce" ref="questionField">
    <highlight-code lang="javascript" class="question-text">
      {{ questionText }}
    </highlight-code>
  </div>
</template>

<script>
export default {
  name: 'QuestionField',
  props: {
    questionText: String
  }
}
</script>

<style scoped>
  @media all and (max-height: 420px) {
    .question-text {
      font-size: 2.5vw;
    }
  }

  .question-field {
    border-bottom: 0;
    border-top: 4px;
    display: flex;
    font-size: 22px;
    font-size: 2.5vh;
  }

  /* Animations */
  .bounce {
    animation: bounce-in 0.4s;
  }
  @keyframes bounce-in {
    0% {
      transform: scale(0);
    }
    50% {
      transform: scale(1.2);
    }
    100% {
      transform: scale(1);
    }
  }
</style>
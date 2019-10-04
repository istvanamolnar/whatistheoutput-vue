<template>
  <div class="question-field bounce" ref="questionField">
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

  .question-text {
    overflow: visible;
  }
  
  .question-field {
    border-bottom: 0;
    border-top: 4px;
    display: flex;
    font-size: 24px;
    font-size: 2.5vh;
    width: 100%;
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
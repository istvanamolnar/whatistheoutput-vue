<template>
  <transition name="bounce">
    <div v-if="show" class="question-field">
      <highlight-code lang="javascript" class="question-text m-auto p-2">
        {{ questionText }}
      </highlight-code>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'QuestionField',
  props: ['questionText'],
  data() {
    return {
      show: false
    }
  },
  mounted() {
    this.show = true;
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
    background-color: rgba(255, 255, 255, 0.8);
    font-size: 24px;
    font-size: 2.5vh;
  }

  /* Animations */
  .bounce-enter-active {
    animation: bounce-in .5s;
  }
  @keyframes bounce-in {
    0% {
      transform: scale(0);
    }
    50% {
      transform: scale(1.5);
    }
    100% {
      transform: scale(1);
    }
  }
</style>
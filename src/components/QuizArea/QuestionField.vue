<template>
  <transition name="bounce">
    <div v-if="show" class="question-field" ref="questionField">
      <highlight-code lang="javascript" class="question-text m-auto p-2">
        {{ questionText }}
      </highlight-code>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'QuestionField',
  props: ['questionText', 'theme'],
  data() {
    return {
      show: false
    }
  },
  mounted() {
    this.show = true;
    setTimeout(() => { // for some reason it doesn't work outside of the setTimeout, I haven't found any more practical solution for this
      this.$refs.questionField.style.backgroundColor = this.theme[0] === 'd' ? 'rgba(0, 0, 0, 0.6)' : 'rgba(255, 255, 255, 0.6)';
    }, 0);
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
    border-radius: 4px;
    display: flex;
    font-size: 24px;
    font-size: 2.5vh;
    width: 100%;
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
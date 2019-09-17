<template>
  <div v-if="answers" class="container d-flex flex-column">
    <div v-for="ans in answers" :key="ans._id" :ref="ans.isCorrect"
      class="mx-auto my-1 btn btn-outline-success" 
      @click.once="selectAnswer($event, ans)"
      :class="[selected !== null && selected === ans._id ? 'active' : selected !== null ? 'disabled' : '']">
      <highlight-code lang="javascript" class="m-auto">
        {{ ans.answer }}
      </highlight-code>
    </div>
    <div class="action-buttons mx-auto d-flex flex-row justify-content-between p-0">
      <transition name="slide-fade">
        <div v-if="reveal" class="mx-0 my-1 btn-outline-warning explain"
          @click="checkSolution($event)">Explain</div>
      </transition>
      <transition name="slide-fade">
        <div v-if="reveal" class="mx-0 my-1 btn-outline-success next"
          @click="getNextQuestion">Next</div>
      </transition>
    </div>
  </div>
</template>
<script>

export default {
  name: 'AnswersField',
  props: ['answers', 'selected'],
  data() {
    return {
      reveal: false
    }
  },
  methods: {
    selectAnswer(event, ans) {
      this.$emit('chosenAnswer', ans._id);
      if (this.selected === null) {
        const selectedAnswer = this.answers.find(answer => answer._id === ans._id);
        setTimeout(() => {
          if (!selectedAnswer.isCorrect) {
            this.$refs[1][0].className = 'mx-auto my-1 p-0 btn btn-outline-success active'
            this.$refs[0].find(answer => answer.className.includes('active')).className = 'mx-auto my-1 p-0 btn btn-danger active';
          }
          this.reveal = true;
        }, 1000);
      }
    },

    getNextQuestion() {
      this.reveal = false;
      this.$emit('chosenAnswer', null);
    },

    checkSolution(event) {
      event.target.className += ' active';
    }
  }
}
</script>

<style scoped>
  .btn {
    display: flex;
    width: 300px;
    height: 40px;
    background-color: #fff;
    border: 2px solid #009b48;
    font-weight: 600; 
  }

  .btn:not(.disabled):hover, .explain:not(.disabled):hover {
    -webkit-text-fill-color: #fff;
  }

  .action-buttons {
    height: 40px;
    width: 300px;
  }

  .next, .explain {
    align-items: center;
    background-color: #fff;
    border-radius: 4px;
    border-width: 2px;
    display: flex;
    font-weight: 600;
    height: 40px;
    justify-content: center;
    text-align: center;
    width: 140px;
  }

  .next:hover, .explain:hover {
    cursor: pointer;
  }

  .next {
    border: 2px solid #009b48;
  }

  .explain {
    border: 2px solid #ffd500;
  }

  .active {
    -webkit-text-fill-color: #fff;
  }

  .disabled {
    background-color: #fff;
  }

  /* Animations */
  .slide-fade-enter-active {
    transition: all .3s ease;
  }
  .slide-fade-leave-active {
    transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-to {
    transform: translateX(10px);
    opacity: 0;
  }
</style>
<template>
  <div v-if="currentQuestion" class="container py-2 d-flex flex-column" ref="answersField">
    <div v-for="ans in currentQuestion.answers" :key="ans._id"
      class="mx-auto my-1 p-0 btn btn-outline-success option"
      :data-id="ans._id"
      :ref="ans.isCorrect"
      @click="selectAnswer($event, ans)">
      <highlight-code lang="javascript" class="m-auto">
        {{ ans.answer }}
      </highlight-code>
    </div>
  </div>
</template>
<script>

export default {
  name: 'AnswersField',
  props: ['currentQuestion', 'mode', 'selected', 'theme'],
  data() {
    return {
      serverURL: process.env.VUE_APP_BACKEND_SERVER_URL
    }
  },

  mounted() {
    this.$refs.answersField.style.backgroundColor = this.theme[0] === 'd' ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.8)';
    if (this.mode === 'manage') {
      this.$refs[true][0].classList.add('btn-success', 'active');
      this.$refs[false].forEach(falseAnswer => {
        falseAnswer.classList.add('disabled');
      })
    } else if (this.mode === 'summary') {
      this.$refs[true][0].classList.add('btn-success', 'active');
      this.$refs[false].forEach(falseAnswer => {
        if (falseAnswer.dataset.id === this.selected._id) {
          falseAnswer.classList.remove('btn-outline-success');
          falseAnswer.classList.add('btn-danger', 'active');
        } else {
          falseAnswer.classList.add('disabled');
        }
      })
    }
  },

  methods: {
    selectAnswer(event, ans) {
      if (this.selected === null) {
        this.$emit('chosenAnswer', ans);
        const selectedAnswer = this.currentQuestion.answers.find(answer => answer._id === ans._id);
        const correctAnswer = this.$refs[true][0];
        if (correctAnswer.dataset.id === selectedAnswer._id) {
          correctAnswer.classList.remove('btn-outline-success');
          correctAnswer.classList.add('btn-success', 'active');
          this.$refs[false].forEach(falseAnswer => falseAnswer.classList.add('disabled'));
        } else {
          correctAnswer.classList.add('disabled');
          this.$refs[false].forEach(answer => {
            answer.classList.add(answer.dataset.id === ans._id ? 'active': 'disabled');
          });
        }
        setTimeout(() => {
          correctAnswer.classList.add('bounce-in', 'active');
          for (let i = 1; i < 5; i++) {
            setTimeout(() => {
              if (correctAnswer.className.includes('active')) {
                correctAnswer.classList.remove('btn-success', 'active');
                correctAnswer.classList.add('btn-outline-success', 'disabled');
              } else {
                correctAnswer.classList.remove('btn-outline-success', 'disabled');
                correctAnswer.classList.add('btn-success', 'active');
              }
            }, 500 * i);
          }
          if (selectedAnswer.isCorrect === false) {
            this.$refs[false].forEach((answer) => {
              if (answer.dataset.id === selectedAnswer._id) {
                answer.classList.remove('btn-outline-success', 'btn-success');
                answer.classList.add('btn-danger', 'bounce-out');
              } else {
                answer.classList.add('disabled');
              }
            });
          }
        }, 1500);
      }
    }
  }
}
</script>

<style scoped>

  .btn {
    display: flex;
    font-weight: 600;
    height: 40px;
    max-width: 300px;
    min-width: max-content;
    width: 100%;
  }

  .option:not(.disabled):not(.active):hover {
    border-radius: 8px;
    cursor: pointer;
    -webkit-text-fill-color: #fff;
  }

  .btn.active {
    background-color: #3ca744;
  }

  .btn:not(.btn-danger):not(.btn-success):not(.btn-outline-success):hover {
    background-color: #3ca744;
  }

  .active {
    -webkit-text-fill-color: #fff;
  }

  .bounce-in {
    animation: bounce-in 0.5s;
  }

  .bounce-out {
    animation: bounce-out 0.5s;
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

  @keyframes bounce-out {
      0% {
        transform: scale(0);
      }
      50% {
        transform: scale(0.8);
      }
      100% {
        transform: scale(1);
      }
    }
</style>
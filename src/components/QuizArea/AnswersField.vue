<template>
  <div v-if="currentQuestion" class="container py-2 d-flex flex-column" ref="answersField">
    <div v-for="ans in currentQuestion.answers" :key="ans._id"
      class="mx-auto my-1 btn btn-outline-success option"
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
      this.$refs[true][0].className = 'mx-auto my-1 p-0 btn btn-success active disabled';
    } else if (this.mode === 'summary') {
      this.$refs[true][0].className = 'mx-auto my-1 p-0 btn btn-success active';
      this.$refs[false].forEach(falseAnswer => {
        falseAnswer.className = falseAnswer.dataset.id === this.selected._id ? 'mx-auto my-1 p-0 btn btn-danger active' : 'mx-auto my-1 p-0 btn btn-outline-success disabled';
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
          correctAnswer.className = 'mx-auto my-1 p-0 btn btn-success active';
          this.$refs[false].forEach(falseAnswer => falseAnswer.className += ' disabled')
        } else {
          correctAnswer.className += ' disabled';
          this.$refs[false].forEach(answer => {
            if (answer.dataset.id === ans._id) {
              answer.className = 'mx-auto my-1 p-0 btn btn-success active';
            } else {
              answer.className += ' disabled';
            }
          });
        }
        setTimeout(() => {
          correctAnswer.className = 'mx-auto my-1 p-0 btn btn-success active';
          for (let i = 1; i < 5; i++) {
            setTimeout(() => {
              if (correctAnswer.className.includes('active')) {
                correctAnswer.className = 'mx-auto my-1 p-0 btn btn-outline-success disabled';
              } else {
                correctAnswer.className = 'mx-auto my-1 p-0 btn btn-success active';
              }
            }, 500 * i);
          }
          if (selectedAnswer.isCorrect === false) {
            this.$refs[false].forEach((answer) => {
              if (answer.dataset.id === selectedAnswer._id) {
                answer.className = 'mx-auto my-1 p-0 btn btn-danger active';
              } else {
                answer.className = 'mx-auto my-1 p-0 btn btn-outline-success disabled'
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
    border: 2px solid #3ca744;
    font-weight: 600;
    height: 40px;
    max-width: 300px;
    min-width: max-content;
    width: 100%;
  }

  .option:not(.disabled):hover {
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

</style>
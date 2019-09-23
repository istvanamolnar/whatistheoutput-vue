<template>
  <div v-if="currentQuestion" class="container py-2 d-flex flex-column rounded" ref="answersField">
    <div v-for="ans in currentQuestion.answers" :key="ans._id" :ref="ans.isCorrect"
      class="mx-auto my-1 btn btn-outline-success" 
      @click.once="selectAnswer($event, ans)"
      :class="[selected !== null && selected === ans._id ? 'active' : selected !== null ? 'disabled' : '']">
      <highlight-code lang="javascript" class="m-auto">
        {{ ans.answer }}
      </highlight-code>
    </div>
    <div class="action-buttons mx-auto p-0 d-flex flex-row justify-content-between" ref="buttonContainer">
      <transition name="slide-fade">
        <div v-if="reveal" class="mx-0 my-1 btn-outline-warning explain" alt="explainButton"
          @click="checkSolution($event)"
          data-toggle="modal" data-target="#seedetails">Explain</div>
      </transition>
      <transition name="slide-fade">
        <div v-if="reveal" class="mx-0 my-1 btn-outline-success next" ref="nextButton"
          @click="getNextQuestion()">Next</div>
      </transition>
      <div v-if="mode === 'manage'">
        <img :src="serverURL + '/images/wrench.png'" 
          class="edit-icon" alt="Edit icon"
          data-toggle="modal" data-target="#editquestion"
          @click="emitPickedQuestion($event, currentQuestion)"/>
      </div>
    </div>
    <explain-modal :description="currentQuestion.description" :theme="theme" :questionText="currentQuestion.question"/>
  </div>
</template>
<script>
import ExplainModal from './ExplainModal';

export default {
  name: 'AnswersField',
  components: {
    'explain-modal': ExplainModal
  },
  props: ['currentQuestion', 'mode', 'selected', 'theme'],
  data() {
    return {
      serverURL: process.env.VUE_APP_BACKEND_SERVER_URL,
      reveal: false
    }
  },

  mounted() {
    this.$refs.answersField.style.backgroundColor = this.theme[0] === 'd' ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.8)';
    if (this.mode === 'manage') {
      this.$refs[1][0].className = 'mx-auto my-1 p-0 btn btn-success active';
      this.$refs.buttonContainer.className = 'd-flex flex-row-reverse';
    }
  },

  methods: {
    checkSolution(event) {
      event.target.className += ' active';
    },

    emitPickedQuestion(event, currentQuestion) {
      this.$emit('questionToEdit', currentQuestion);
    },

    getNextQuestion() {
      this.reveal = false;
      this.$emit('chosenAnswer', null);
    },

    selectAnswer(event, ans) {
      if (this.selected === null) {
        this.$emit('chosenAnswer', ans);
        const selectedAnswer = this.currentQuestion.answers.find(answer => answer._id === ans._id);
        setTimeout(() => {
          if (!selectedAnswer.isCorrect) {
            this.$refs[1][0].className = 'mx-auto my-1 p-0 btn btn-outline-success active'
            this.$refs[0].find(answer => answer.className.includes('active')).className = 'mx-auto my-1 p-0 btn btn-danger active';
          }
          this.reveal = true;
        }, 1000);
      }
    }
  }
}
</script>

<style scoped>

  .btn {
    display: flex;
    width: 300px;
    height: 40px;
    border: 2px solid #3ca744;
    font-weight: 600;
    min-width: max-content;
  }

  .btn:not(.disabled):not(.btn-danger):hover {
    background-color: #3ca744;
    cursor: pointer;
    -webkit-text-fill-color: #fff;
  }

  .action-buttons {
    height: 40px;
    width: 300px;
  }

  .next, .explain {
    align-items: center;
    border-radius: 4px;
    border-width: 2px;
    display: flex;
    font-weight: 600;
    height: 40px;
    justify-content: center;
    text-align: center;
    width: 140px;
  }

  .next:hover {
    background-color: #3ca744;
    cursor: pointer;
  }
  
  .explain:hover {
    background-color: #ffd500;
    cursor: pointer;
    -webkit-text-fill-color: #fff;
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

  .edit-icon {
    height: 40px;
    width: 40px;
    padding: 10px 10px 0 0;
  }

  .edit-icon:hover {
    cursor: pointer;
  }


  /* Animations */
  .slide-fade-enter-active {
    transition: all .5s ease;
  }
  .slide-fade-leave-active {
    transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-to {
    transform: translateX(10px);
    opacity: 0;
  }
</style>
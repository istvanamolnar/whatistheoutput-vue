<template>
  <div class="main-container d-flex flex-column m-auto p-0 h-100" ref="main_container">
    <div class="title mx-auto">What Is The Output?</div>
    <transition name="slide-fade">
      <div v-if="questionText" class="mx-auto my-2 d-flex rotated">
        <question-field class="question m-auto" :questionText="questionText"/>
        <answers-field class="answers mx-auto p-2"
          :selected="selected"
          :answers="currentQuestion.answers" 
          @chosenAnswer="handleSelected"/>
      </div>
    </transition>
    <div class="score text-center">Score: {{ user.currentGame.score }}</div>
  </div>
</template>

<script>
import QuestionField from './QuestionField';
import AnswersField from './AnswersField';

import { eventBus } from '../../main';

export default {
  name: 'QuizArea',
  components: {
    'question-field': QuestionField,
    'answers-field': AnswersField
  },
  data() {
    return {
      user: eventBus.user,
      currentQuestion : [],
      selected: null,
      questionText: ''
    }
  },

  mounted() {
    this.getAQuestion();
    this.$refs.main_container.style.backgroundImage = `url('${process.env.VUE_APP_BACKEND_SERVER_URL}/images/${eventBus.user.theme}.png')`;
  },

  methods: {
    handleSelected(value) {
      eventBus.user.currentGame.answers.push({
        questionId: this.currentQuestion._id,
        answer: value
      });
      if (!this.selected) {
        this.selected = value._id;
      } else {
        this.selected = null;
        this.questionText = '';
        setTimeout(() => {
          this.getAQuestion();
        }, 400);
      }
    },

    getAQuestion() {
      this.currentQuestion = this.user.currentGame.questions[0];
      this.user.currentGame.questions = this.user.currentGame.questions.slice(1);
      this.questionText = this.currentQuestion.question.join('\n');
    },
  }
}
</script>

<style scoped>
  .row {
    width: 99vw;
  }

  .rotated {
    flex-direction: column
  }

  .title {
    background: linear-gradient(to right, #bbb, #ddd);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-family: 'ZCOOL KuaiLe', cursive;
    font-size: 24px;
    font-size: 4vh;
    font-weight: 600;
    margin-top: 5vh;
  }

  .score {
    background: linear-gradient(to right, #bbb, #ddd);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-family: 'ZCOOL KuaiLe', cursive;
    font-size: 24px;
    font-size: 3.5vh;
    font-weight: 600;
  }

  @media all and (max-height: 420px) {
    .rotated {
      flex-direction: row;
      justify-content: center;
      width: 90vw;
    }

    .title {
      font-size: 30px;
    }

    .score {
      font-size: 2.5vw;
      position:fixed;
      bottom: 3vh;
      right: 3vw;
    }
  }

  /* Animations */
  .slide-fade-leave-active {
    transition: all .4s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-leave-to {
    transform: translateX(10px);
    opacity: 0;
  }
</style>
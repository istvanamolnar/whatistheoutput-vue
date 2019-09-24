<template>
  <div v-if="user" class="main-container d-flex flex-column m-auto p-0 h-100" ref="main_container">
    <div class="title mx-auto" ref="title">What Is The Output?</div>
    <transition name="slide-fade">
      <div v-if="currentQuestion" class="mx-auto my-2 d-flex rotated">
        <question-field class="question m-auto" 
          :questionText="currentQuestion.question" 
          :theme="theme"/>
        <answers-field class="answers mx-auto p-2"
          :selected="selected"
          :currentQuestion="currentQuestion"
          :theme="theme"
          :mode="mode"
          @chosenAnswer="handleSelected"/>
      </div>
    </transition>
    <div class="score text-center" ref="questionCounter">Question: {{ user.currentGame.numOfQuestions - user.currentGame.questions.length }} / {{ user.currentGame.numOfQuestions }}</div>
    <div class="score text-center" ref="score">Score: {{ user.currentGame.score }}</div>
  </div>
</template>

<script>
import QuestionField from './QuestionField';
import AnswersField from './AnswersField';
import { eventBus } from '../../main';

export default {
  name: 'QuizArea',
  components: {
    'answers-field': AnswersField,
    'question-field': QuestionField
  },
  data() {
    return {
      currentQuestion : [],
      mode: 'quiz',
      scoreCounter: 0,
      selected: null,
      theme: eventBus.user.theme[0] === 'd' ? 'dark' : 'light',
      user: eventBus.user
    }
  },

  created() {
    this.getAQuestion();
  },

  mounted() {
    this.$refs.main_container.style.backgroundImage = `url('${process.env.VUE_APP_BACKEND_SERVER_URL}/images/${eventBus.user.theme}.png')`;
    if (this.theme === 'dark') {
      this.$refs.title.style.color = '#ddd';
      this.$refs.questionCounter.style.color = '#ddd';
      this.$refs.score.style.color = '#ddd';
    } else if (this.theme === 'light') {
      this.$refs.title.style.color = '#222';
      this.$refs.questionCounter.style.color = '#222';
      this.$refs.score.style.color = '#222';
    }
  },

  methods: {
    getAQuestion() {
      if (this.user.currentGame.questions.length === 0) {
        delete eventBus.user.currentGame.questions;
        this.finishGame();
      } else {
        this.scoreCounter = Date.now();
        this.currentQuestion = this.user.currentGame.questions[0];
        this.user.currentGame.questions = this.user.currentGame.questions.slice(1);
      }
    },

    handleSelected(value) {
      if (!this.selected) {
        this.selected = value._id;
        eventBus.user.currentGame.answers.push({
          question: this.questionText,
          answer: value
        });
        setTimeout(() => {
          if (value.isCorrect === 1) {
            eventBus.user.currentGame.score += Math.floor((Date.now() - this.scoreCounter) / 100);
          }
        }, 2000);
      } else {
        this.selected = null;
        this.currentQuestion = null;
        setTimeout(() => {
          this.getAQuestion();
        }, 400);
      }
    },

    finishGame() {
      this.$router.push('claimreward');
    }
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
    font-family: 'ZCOOL KuaiLe', cursive;
    font-size: 24px;
    font-size: 4vh;
    font-weight: 600;
    margin-top: 5vh;
  }

  .score {
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
      bottom: 3vh;
      font-size: 2.5vw;
      position:fixed;
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
<template>
  <div v-if="user" class="main-container d-flex flex-column m-auto p-0 h-100" ref="mainContainer">
    <div class="title mx-auto" ref="title">What Is The Output?</div>
      <div v-if="currentQuestion" class="mx-auto my-2 d-flex rotated" ref="quizContainer">
        <question-field class="m-auto" 
          :questionText="currentQuestion.question"
          :theme="theme"/>
        <answers-field class="mx-auto p-2"
          :selected="selected"
          :currentQuestion="currentQuestion"
          :theme="theme"
          :mode="mode"
          @chosenAnswer="handleSelected"/>
        <div class="action-buttons mx-auto p-0 d-flex flex-row justify-content-between" 
          ref="buttonContainer"
          :key="currentQuestion._id">
          <div class="mx-0 my-1 btn-outline-warning explain"
            data-toggle="modal" 
            data-target="#seedetails">Explain</div>
          <div class="mx-0 my-1 btn-outline-success next"
            @click="getAQuestion()">Next</div>
        </div>
      </div>
    <div class="score text-center" ref="questionCounter">
      Question: {{ user.currentGame.numOfQuestions - user.currentGame.questions.length }} / {{ user.currentGame.numOfQuestions }}
      <br>Score: {{ user.currentGame.score }}
    </div>
    <explain-modal 
      :description="currentQuestion.description" 
      :questionText="currentQuestion.question"
      :theme="theme"/>
  </div>
</template>

<script>
import QuestionField from './QuestionField';
import AnswersField from './AnswersField';
import ExplainModal from './ExplainModal';

import { eventBus } from '../../main';

export default {
  name: 'QuizArea',
  components: {
    'answers-field': AnswersField,
    'question-field': QuestionField,
    'explain-modal': ExplainModal
  },
  data() {
    return {
      currentQuestion : Object,
      mode: 'quiz',
      scoreCounter: 0,
      selected: null,
      theme: eventBus.user.theme,
      user: eventBus.user
    }
  },

  created() {
    this.getAQuestion();
  },

  mounted() {
    this.$refs.mainContainer.style.backgroundImage = `url('${process.env.VUE_APP_IMAGES_URL}/images/${eventBus.user.theme}.png')`;
    if (this.theme[0] === 'd') {
      this.$refs.quizContainer.style.backgroundColor = '#000';
      this.$refs.title.style.color = '#ddd';
      this.$refs.questionCounter.style.color = '#ddd';
    } else if (this.theme[0] === 'l') {
      this.$refs.quizContainer.style.backgroundColor = '#fff';
      this.$refs.title.style.color = '#222';
      this.$refs.questionCounter.style.color = '#222';
    }
  },

  methods: {
    getAQuestion() {
      this.nextButtonRevealed = false;
      this.selected = null;
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
        this.selected = value;
        eventBus.user.currentGame.answers.push({
          answers: this.currentQuestion.answers,
          question: this.currentQuestion.question,
          selectedAnswer: value,
          description: this.currentQuestion.description
        });
        setTimeout(() => {
          this.nextButtonRevealed = true;
          this.$refs.buttonContainer.classList.add('appear')
          if (value.isCorrect === true) {
            eventBus.user.currentGame.score += Math.floor((Date.now() - this.scoreCounter) / 100);
          }
        }, 1500);
      } else {
        this.currentQuestion = null;
        this.getAQuestion();
      }
    },

    finishGame() {
      this.$router.push('summary');
    }
  }
}
</script>

<style scoped>
  .row {
    width: 99vw;
  }

  .rotated {
    flex-direction: column;
    padding: 10px;
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

  .action-buttons {
    height: 50px;
    width: 300px;
    opacity: 0;
  }

  .appear {
    opacity: 1;
    transition: opacity 0.6s cubic-bezier(0.39, 0.575, 0.565, 1);
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
    border: 2px solid #3ca744;
  }

  .explain {
    border: 2px solid #ffd500;
  }

  .active {
    -webkit-text-fill-color: #fff;
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
      right: 3vw;
      top: 3vh;
    }
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
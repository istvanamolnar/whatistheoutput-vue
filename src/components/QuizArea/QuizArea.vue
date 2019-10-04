<template>
  <div v-if="user" class="main-container d-flex flex-column align-items-center m-auto h-100" ref="mainContainer">
    <div class="title" ref="title">What Is The Output?</div>
    <div v-if="currentQuestion" 
      class="mx-auto d-flex align-items-center quiz-container"
      ref="quizContainer">
      <div class="score text-center" ref="questionCounter">
        Question: {{ user.currentGame.numOfQuestions - user.currentGame.questions.length }} / {{ user.currentGame.numOfQuestions }}
        <br>Score: {{ user.currentGame.score }}
      </div>
      <question-field class="m-auto" 
        :questionText="currentQuestion.question"
        :key="currentQuestion.question"/>
      <div class="answers-actionbuttons-container d-flex flex-column">
        <answers-field class="mx-auto p-2"
          :selected="selected"
          :currentQuestion="currentQuestion"
          :mode="mode"
          @chosenAnswer="handleSelected"/>
        <div 
          v-if="nextButtonRevealed"
          class="action-buttons mx-auto px-2 py-0 d-flex flex-row justify-content-between" 
          ref="buttonContainer"
          :key="currentQuestion._id">
          <div class="mx-0 my-1 btn-outline-warning explain"
            data-toggle="modal" 
            data-target="#seedetails">Explain</div>
          <div class="mx-0 my-1 btn-outline-success next"
            @click="getAQuestion()">Next</div>
        </div>
      </div>
    </div>
    <div class="theme-selector" ref="themeSelector">
      <img :src="imagesURL + '/images/' + background + '.png'" class="theme"
        v-for="background in themes" :key="background"
        @click="changeTheme" :alt="background">
    </div>
    <explain-modal 
      :description="currentQuestion.description"
      :key="theme" 
      :questionText="currentQuestion.question"/>
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
      imagesURL: process.env.VUE_APP_IMAGES_URL,
      mode: 'quiz',
      nextButtonRevealed: false,
      scoreCounter: 0,
      selected: null,
      theme: eventBus.user.theme,
      themes: ['d-bicycles', 'd-shattered', 'l-alchemy', 'l-ahoy'],
      user: eventBus.user
    }
  },

  created() {
    this.getAQuestion();
  },

  mounted() {
    this.$refs.mainContainer.style.backgroundImage = `url('${process.env.VUE_APP_IMAGES_URL}/images/${eventBus.user.theme}.png')`;
    if (this.theme[0] === 'd') {
      this.$refs.quizContainer.style.backgroundColor = '#111';
      this.$refs.quizContainer.style.color = '#eee';
      this.$refs.title.style.color = '#ddd';
      this.$refs.questionCounter.style.backgroundColor = '#111';
      this.$refs.questionCounter.style.color = '#ddd';
    } else if (this.theme[0] === 'l') {
      this.$refs.quizContainer.style.backgroundColor = '#eee';
      this.$refs.quizContainer.style.color = '#333';
      this.$refs.title.style.color = '#222';
      this.$refs.questionCounter.style.backgroundColor = '#eee';
      this.$refs.questionCounter.style.color = '#222';
    }
  },

  methods: {
    changeTheme(event) {
      eventBus.user.theme = event.target.alt;
      this.theme = event.target.alt;
      this.$refs.mainContainer.style.backgroundImage = `url('${process.env.VUE_APP_IMAGES_URL}/images/${eventBus.user.theme}.png')`;
      if (this.theme[0] === 'd') {
        this.$refs.quizContainer.style.backgroundColor = '#111';
        this.$refs.quizContainer.style.color = '#eee';
        this.$refs.title.style.color = '#ddd';
        this.$refs.questionCounter.style.color = '#ddd';
        this.$refs.questionCounter.style.backgroundColor = '#111';
      } else if (this.theme[0] === 'l') {
        this.$refs.quizContainer.style.backgroundColor = '#eee';
        this.$refs.quizContainer.style.color = '#333';
        this.$refs.title.style.color = '#222';
        this.$refs.questionCounter.style.color = '#222';
        this.$refs.questionCounter.style.backgroundColor = '#eee';
      } else {
        // eslint-disable-next-line
        console.log("Something went wrong");
      }
    },

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
        }, 1499);
        setTimeout(() => {
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

  .theme-selector {
    align-items: center;
    border: 1px solid #3ca744;
    bottom: 20px;
    display: flex;
    flex-direction: row;
    margin: auto;
    position: fixed;
  }

  .theme {
    border: 3px solid #3ca744;
    cursor: pointer;
    height: 60px;
    margin: 1vh;
    padding: 0;
    width: 60px;
  }

  .quiz-container {
    border-radius: 15px;
    flex-direction: column;
    opacity: 0.9;
    padding: 10px;
  }

  .title {
    font-family: 'ZCOOL KuaiLe', cursive;
    font-size: 24px;
    font-size: 4vh;
    font-weight: 600;
    margin-top: 5vh;
    margin: 5vh auto 0 auto;
  }

  .score {
    border-bottom: 2px solid #888;
    color: #777;
    font-family: 'ZCOOL KuaiLe', cursive;
    font-size: 24px;
    font-size: 3.5vh;
    font-weight: 600;
    min-width: max-content;
    width: 30px;
  }

  .action-buttons {
    height: 50px;
    width: 316px;
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
    width: 135px;
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
    .quiz-container {
      flex-direction: row;
      justify-content: center;
      width: 90vw;
    }

    .title {
      font-size: 30px;
      margin-top: 0;
    }

    .score {
      font-size: 2.5vw;
      position:fixed;
      right: 3vw;
      top: 3vh;
    }

    .theme-selector {
      left: 20px;
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
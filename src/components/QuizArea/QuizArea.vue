<template>
  <div class="main-container" ref="mainContainer">
    <div v-if="currentQuestion"
      class="quiz-container"
      ref="quizContainer">
      <div class="title" ref="title">What Is The Output?</div>
      <div class="score" ref="questionCounter">
        Question: {{ numOfQuestions - questions.length + 1 }} / {{ numOfQuestions }}
        <br>Score: {{ score }}
      </div>
      <question-field class="m-auto" 
        :questionText="currentQuestion.question"
        :key="currentQuestion.question"/>
      <div class="answers-buttons">
        <answers-field
          :selected="selected"
          :currentQuestion="currentQuestion"
          :mode="mode"
          @chosenAnswer="handleSelected"/>
        <div 
          v-if="nextButtonRevealed"
          class="action-buttons" 
          ref="buttonContainer"
          :key="currentQuestion._id">
          <div class="btn-outline-warning explain"
            data-toggle="modal" 
            data-target="#seedetails">Explain</div>
          <div class="btn-outline-success next"
            @click="getAQuestion()">Next</div>
        </div>
      </div>
    </div>
    <div class="theme-selector" ref="themeSelector">
      <img :src="imagesURL + '/images/' + background + '.png'" class="theme"
        v-for="background in themes" :key="background"
        @click="changeTheme" :alt="background">
    </div>
    <explain-modal v-if="currentQuestion" 
      :description="currentQuestion.description"
      :key="theme" 
      :questionText="currentQuestion.question"/>
  </div>
</template>

<script>
import QuestionField from './QuestionField';
import AnswersField from './AnswersField';
import ExplainModal from './ExplainModal';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'QuizArea',
  components: {
    'answers-field': AnswersField,
    'question-field': QuestionField,
    'explain-modal': ExplainModal
  },

  computed: mapGetters([
    'currentQuestion',
    'numOfQuestions',
    'questions',
    'score',
    'theme',
    'themes'
  ]),

  data() {
    return {
      imagesURL: process.env.VUE_APP_IMAGES_URL,
      mode: 'quiz',
      nextButtonRevealed: false,
      scoreCounter: 0,
      selected: null
    }
  },

  mounted() {
    this.setColors()
    this.scoreCounter = Date.now();
  },

  methods: {
    ...mapActions([
      'addAnswer',
      'increaseScore',
      'getNewQuestion',
      'setTheme',
    ]),

    changeTheme(event) {
      this.setTheme(event.target.alt);
      this.setColors();
    },

    getAQuestion() {
      this.nextButtonRevealed = false;
      this.selected = null;
      this.getNewQuestion();
      if (this.questions.length === 0) {
        this.finishGame();
      } else {
        this.scoreCounter = Date.now();
        this.getNewQuestion;
      }
    },

    handleSelected(value) {
      if (!this.selected) {
        this.selected = value;
        this.addAnswer({
          answers: this.currentQuestion.answers,
          question: this.currentQuestion.question,
          questionId: this.currentQuestion._id,
          selectedAnswer: value,
          description: this.currentQuestion.description
        });
        setTimeout(() => {
          this.nextButtonRevealed = true;
        }, 1499);
        setTimeout(() => {
          if (value.isCorrect === true) {
            this.increaseScore(Math.floor((Date.now() - this.scoreCounter) / 100));
          }
        }, 1500);
      } else {
        this.currentQuestion = null;
        this.getAQuestion();
      }
    },

    finishGame() {
      this.$router.push('summary');
    },

    setColors() {
      this.$refs.mainContainer.style.backgroundImage = `url('${process.env.VUE_APP_IMAGES_URL}/images/${this.theme}.png')`;
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
    }
  }
}
</script>

<style scoped>
  .main-container {
    align-items: center;
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
  }

  .quiz-container {
    align-items: center;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    min-width: max-content;
    opacity: 0.9;
    padding: 10px;
    position: absolute;
    z-index: 1;
  }

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
    background-size: contain;
    border: 2px solid #3ca744;
    cursor: pointer;
    height: 60px;
    margin: 1vh;
    padding: 0;
    width: 60px;
  }

  .title {
    font-family: 'ZCOOL KuaiLe', cursive;
    font-size: 24px;
    font-size: 4vh;
    font-weight: 600;
  }

  .score {
    font-family: 'ZCOOL KuaiLe', cursive;
    font-size: 24px;
    font-size: 3.5vh;
    font-weight: 600;
    min-width: max-content;
    width: 30px;
    text-align: center;
  }

  .answers-buttons {
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .action-buttons {
    display: flex;
    height: 50px;
    justify-content: space-between;
    width: 300px;
  }

  .next, .explain {
    align-items: center;
    border-radius: 4px;
    border-width: 2px;
    display: flex;
    font-weight: 700;
    height: 40px;
    justify-content: center;
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
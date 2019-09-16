<template>
  <div class="main-container d-flex flex-column m-auto p-0 h-100 rotated" v-if="questionText">
    <div class="title mx-auto">What Is The Output?</div>
    <div class="mx-auto my-2 d-flex rotated">
      <question-field class="question m-auto" :questionText="questionText"/>
      <answers-field class="answers mx-auto p-2"
        :selected="selected"
        :answers="currentQuestion.answers" 
        @chosenAnswer="handleSelected"/>
    </div>
    <div class="score text-center">Score: 8966</div>
  </div>
</template>

<script>
import QuestionField from './QuestionField';
import AnswersField from './AnswersField';

import axios from 'axios';

export default {
  name: 'QuizArea',
  components: {
    'question-field': QuestionField,
    'answers-field': AnswersField
  },
  data() {
    return {
      questions: [],
      currentQuestion : [],
      selected: null,
      questionText: ''
    }
  },

  beforeCreate() {
    axios.get("http://localhost:3000/questions")
      .then(res => {
        this.questions = res.data.slice(1);
      })
      .then(() => {
        this.currentQuestion = this.questions.find(question => question._id === '5d7bc2771c9d44000079f9f9');
        this. questionText = this.currentQuestion.question.join('\n');
      })
      // eslint-disable-next-line
      .catch(err => console.log(err));
  },
  methods: {
    handleSelected(value) {
      if (!this.selected) {
        this.selected = value;
      }
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
    background: linear-gradient(to right, #444, #555);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-family: 'ZCOOL KuaiLe', cursive;
    font-size: 24px;
    font-size: 4vh;
    font-weight: 600;
    margin-top: 5vh;
  }

  .score {
    background: linear-gradient(to right, #555, #333);
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
      bottom: 5vh;
      right: 5vw;
    }
  }
</style>
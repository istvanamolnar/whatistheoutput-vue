<template>
  <div class="container-fluid p-0" v-if="questionText">
    <div class="row d-flex flex-column my-5">
      <div class="p mx-auto my-5 title">What Is The Output?</div>
      <question-field class="question p-2 m-auto" :questionText="questionText"/>
      <answers-field class="answers d-flex flex-column m-auto p-2"
        :selected="selected"
        :answers="currentQuestion.answers" 
        @chosenAnswer="handleSelected"/>
    </div>
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
        this.currentQuestion = this.questions.find(question => question._id === '5d7bc0ae1c9d44000079f9f7');
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
  .question {
    background-color: #f8f8f8;
    font-size: 24px;
    font-size: 2.5vh;
  }

  .title {
    font-family: 'ZCOOL KuaiLe', cursive;
    font-size: 20px;
    font-size: 4.5vh;
    background: linear-gradient(to right, #333, #555);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
</style>
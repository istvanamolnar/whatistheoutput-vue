<template>
<div class="container" v-if="currentQuestion">
  <div class="row">
    <question-field class="col-xl-7 col-lg-8 col-sm-10 col-xs-10 question" :currentQuestion="currentQuestion.question"/>
    <answers-field class="col-xl-7 col-lg-8 col-sm-10 col-xs-10 answers"
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
      selected: null
    }
  },

  mounted() {
    axios.get("http://localhost:3000/questions")
      .then(res => {
        this.questions = res.data.slice(1);
      })
      .then(() => {
        this.currentQuestion = this.questions.find(question => question._id === '5d7bc0ae1c9d44000079f9f7');
      })
      // eslint-disable-next-line
      .catch(err => console.log(err));
  },
  methods: {
    handleSelected(value) {
      if (!this.selected) {
        const selectedAnswer = this.currentQuestion.answers.find(answer => answer._id === value);
        this.selected = value;
        if (selectedAnswer.isCorrect) {
          // eslint-disable-next-line
          console.log('yaay');
        } else {
          // eslint-disable-next-line
          console.log('nope');
        }
      }
    }
  }
}
</script>

<style scoped>
  .container {
    margin: auto;
    height: 40vh;
  }

  /* .container {
    padding: 3vh;
    border-radius: 15px;
    background-color: #f5f5f5;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 65%;
    margin: 2vh auto;
  } */
</style>
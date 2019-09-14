<template>
<div v-if="currentQuestion">
  <div class="container">
    <question-field :currentQuestion="currentQuestion.question"/>
    <answers-field 
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
    padding: 3vh;
    border-radius: 15px;
    background-color: #f5f5f5;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 65%;
    margin: 2vh auto;
  }
</style>
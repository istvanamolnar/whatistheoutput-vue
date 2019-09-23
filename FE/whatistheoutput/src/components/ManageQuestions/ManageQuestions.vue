<template>
  <div class="manageContainer">
    <nav class="navbar">
      <div class="btn btn-success" 
        data-toggle="modal" 
        data-target="#editquestion"
        @click="newQuestion">Add new question</div>
    </nav>
    <div v-if="questions" class="d-flex flex-column align-items-center">
      <div v-for="question in questions" :key="question._id" class="d-flex flex-column align-items-center justify-content-center answerCheck" :ref="question._id">
        <question-field class="question mx-auto mt-2" :questionText="question.question" :theme="theme"/>
        <answers-field class="answers mx-auto p-2"
          :currentQuestion="question" 
          :theme="theme"
          :mode="mode"
          @questionToEdit="handleQuestion($event)"/>
      </div>
      <handle-question
        :pickedQuestion="pickedQuestion" 
        :theme="theme"/>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import QuestionField from '../QuizArea/QuestionField';
import AnswersField from '../QuizArea/AnswersField';
import HandleQuestion from '../ManageQuestions/HandleQuestion';

export default {
  name: 'ManageQuestions',
  components: {
    'question-field': QuestionField,
    'answers-field': AnswersField,
    'handle-question': HandleQuestion
  },

  data() {
    return {
      serverURL: process.env.VUE_APP_BACKEND_SERVER_URL,
      questions: [],
      theme: 'd-shattered',
      mode: 'manage',
      pickedQuestion: {
        question: [], 
        answers: [
          { answer: '', isCorrect: 0 },
          { answer: '', isCorrect: 0 },
          { answer: '', isCorrect: 0 },
          { answer: '', isCorrect: 0 },
        ],
        description: []
      }
    }
  },

  created() {
    axios(process.env.VUE_APP_BACKEND_SERVER_URL + '/questions/getall')
    .then((response) => {
      this.questions = response.data;
      this.questions.forEach(question => {
        question.question = question.question.join('\n');
        question.description = question.description.join('\n');
      });
    })
    .catch((error) => {
      // eslint-disable-next-line
      console.log(error);
    });
  },

  methods: {
    handleQuestion(event) {
      this.pickedQuestion = event;
    },

    newQuestion() {
      this.pickedQuestion = {
        question: [], 
        answers: [
          { answer: '', isCorrect: 0 },
          { answer: '', isCorrect: 0 },
          { answer: '', isCorrect: 0 },
          { answer: '', isCorrect: 0 },
        ],
        description: []
      };
    }
  }
}

</script>

<style>
  .manageContainer {
    width: 99vw;
    background-repeat: repeat;
    background-image: url('http://localhost:3000/images/d-shattered.png');
    padding-top: 50px;
  }

  .navbar {
    background-color: #0f0f0f;
    position: fixed;
    top: 0;
    width: 99vw;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
  }

  .question-container {
    margin: 15px;
  }

  .answerCheck {
    padding: 0;
    background-color: transparent;
    margin-top: 30px;
  }
</style>
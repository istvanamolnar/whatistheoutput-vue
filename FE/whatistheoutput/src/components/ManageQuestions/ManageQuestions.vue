<template>
  <div class="manageContainer" ref="manageContainer">
    <nav class="navbar">
      <div class="btn btn-success new-question" 
        data-target="#editquestion"
        data-toggle="modal" 
        @click="newQuestion">Add new question</div>
    </nav>
    <div v-if="questions" class="d-flex flex-column align-items-center">
      <div v-for="question in questions" :key="question._id" 
        class="d-flex flex-column align-items-center justify-content-center answerCheck" 
        :ref="question._id">
        <question-field class="question mx-auto mt-2" 
          :questionText="question.question" 
          :theme="theme"/>
        <answers-field class="answers mx-auto p-2"
          :currentQuestion="question" 
          :mode="mode"
          :theme="theme"
          @questionToEdit="handleQuestion($event)"/>
        <div>
          <img :src="serverURL + '/images/wrench.png'" 
            class="edit-icon" alt="Edit icon"
            data-toggle="modal" data-target="#editquestion"
            @click="pickedQuestion = question"/>
        </div>
      </div>
    </div>
    <handle-question
      :pickedQuestion="pickedQuestion" 
      :theme="theme"/>
  </div>
</template>

<script>
import QuestionField from '../QuizArea/QuestionField';
import AnswersField from '../QuizArea/AnswersField';
import HandleQuestion from '../ManageQuestions/HandleQuestion';

import axios from 'axios';

export default {
  name: 'ManageQuestions',
  components: {
    'answers-field': AnswersField,
    'handle-question': HandleQuestion,
    'question-field': QuestionField
  },

  data() {
    return {
      mode: 'manage',
      questions: [],
      serverURL: process.env.VUE_APP_BACKEND_SERVER_URL,
      theme: 'd-shattered',
      pickedQuestion: {
        answers: [
          { answer: '' },
          { answer: '' },
          { answer: '' },
          { answer: '' },
        ],
        correctOne: null,
        description: [],
        question: [], 
        reference: ''
      }
    };
  },

  created() {
    axios(process.env.VUE_APP_BACKEND_SERVER_URL + '/questions/getall')
    .then((response) => {
      this.questions = response.data;
      this.questions.forEach((question) => {
        question.question = question.question.join('\n');
        question.description = question.description.join('\n');
      });
    })
    .catch((error) => {
      // eslint-disable-next-line
      console.log(error);
    });
  },

  mounted() {
    this.$refs.manageContainer.style.backgroundImage = `url('${process.env.VUE_APP_BACKEND_SERVER_URL}/images/${this.theme}.png')`;
  },

  methods: {
    handleQuestion(event) {
      this.pickedQuestion = event;
      this.pickedQuestion.answers.forEach((answer, index) => {
        answer.isCorrect ? this.pickedQuestion.correctOne = index : null;
      })
    },

    newQuestion() {
      this.isNew = 1;
      this.pickedQuestion = {
        answers: [
          { answer: '' },
          { answer: '' },
          { answer: '' },
          { answer: '' },
        ],
        correctOne: null,
        description: [],
        question: [], 
        reference: ''
      };
    }
  }
}

</script>

<style>
  .manageContainer {
    background-repeat: repeat;
    padding-top: 50px;
    width: 99vw;
  }

  .navbar {
    align-items: center;
    background-color: #0f0f0f;
    display: flex;
    justify-content: center;
    position: fixed;
    top: 0;
    width: 99vw;
    z-index: 1;
  }

  .question-container {
    margin: 15px;
  }

  .answerCheck {
    background-color: #000;
    margin-top: 30px;
    padding: 0;
  }

  .edit-icon {
    height: 40px;
    margin-bottom: 10px;
    position: inherit;
    width: 40px;
  }

  .edit-icon:hover, .new-question:hover {
    cursor: pointer;
  }
</style>
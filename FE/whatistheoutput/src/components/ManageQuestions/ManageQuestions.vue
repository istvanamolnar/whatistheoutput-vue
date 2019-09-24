<template>
  <div class="manageContainer" ref="manageContainer">
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
          { answer: '' },
          { answer: '' },
          { answer: '' },
          { answer: '' },
        ],
        description: [],
        reference: '',
        correctOne: null
      }
    }
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
    this.$refs.manageContainer.style.backgroundImage = `url('${process.env.VUE_APP_BACKEND_SERVER_URL}/images/${this.theme}.png')`
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
        question: [], 
        answers: [
          { answer: '' },
          { answer: '' },
          { answer: '' },
          { answer: '' },
        ],
        description: [],
        correctOne: null,
        reference: ''
      };
    }
  }
}

</script>

<style>
  .manageContainer {
    width: 99vw;
    background-repeat: repeat;
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
    background-color: #000;
    margin-top: 30px;
  }

  .edit-icon {
    height: 40px;
    width: 40px;
    position: inherit;
  }

  .edit-icon:hover {
    cursor: pointer;
  }

</style>
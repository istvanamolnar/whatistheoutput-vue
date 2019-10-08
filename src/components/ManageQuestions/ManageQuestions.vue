<template>
  <div class="manage-container" ref="manageContainer">
    <nav class="navbar">
      <div class="btn btn-success new-question" 
        data-target="#editquestion"
        data-toggle="modal" 
        @click="newQuestion">Add new question</div>
    </nav>
    <div v-if="questions">
      <div v-for="question in questions" :key="question._id" 
        class="answer-check">
        <img :src="imagesURL + '/images/wrench.png'" 
          class="edit-icon" alt="Edit icon"
          data-toggle="modal" data-target="#editquestion"
          @click="handleQuestion(question)"/>
        <question-field class="question" 
          :questionText="question.question"/>
        <answers-field class="answers"
          :currentQuestion="question" 
          :mode="mode"/>
      </div>
    </div>
    <handle-question
      :operation="operation"
      :pickedQuestion="pickedQuestion"/>
    <img :src="imagesURL + '/images/settings.png'" class="manage-questions" @click="$router.push('/')"/>
  </div>
</template>

<script>
import QuestionField from '../QuizArea/QuestionField';
import AnswersField from '../QuizArea/AnswersField';
import HandleQuestion from '../ManageQuestions/HandleQuestion';
import axios from 'axios';
import { eventBus } from '../../main';

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
      operation: null,
      questions: [],
      imagesURL: process.env.VUE_APP_IMAGES_URL,
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
    eventBus.user = { theme: 'd-shattered' }
    axios({
      headers: { "x-api-key": process.env.VUE_APP_API_KEY },
      method: 'get',
      url: this.serverURL + '/whatistheoutput'
    })
    .then((response) => {
      this.questions = response.data;
    })
    .catch((error) => {
      // eslint-disable-next-line
      console.log(error);
    });
  },

  mounted() {
    this.$refs.manageContainer.style.backgroundImage = `url('${this.imagesURL}/images/${this.theme}.png')`;
  },

  methods: {
    handleQuestion(question) {
      this.operation = 'edit';
      this.pickedQuestion = question;
      // to select current correct answer in modal
      this.pickedQuestion.answers.forEach((answer, index) => {
        answer.isCorrect === true ? this.pickedQuestion.correctOne = index : null;
      })
    },

    newQuestion() {
      this.operation = 'new';
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

<style scoped>
  .manage-container {
    background-repeat: repeat;
    padding: 50px 0;
    width: 100%;
  }

  .navbar {
    align-items: center;
    background-color: #0f0f0f;
    display: flex;
    justify-content: center;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 1;
  }

  .answer-check {
    align-items: center;
    background-color: #000;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 30px auto;
    padding: 10px;
    width: max-content;
  }

  .edit-icon {
    height: 25px;
    margin: 10px;
    width: 25px;
    align-self:flex-end
  }

  .edit-icon:hover, .new-question:hover {
    cursor: pointer;
  }

  .manage-questions {
    bottom: 10px;
    height: 15px;
    left: 10px;
    position:fixed;
    width: 15px;
  }

  .manage-questions:hover {
    cursor: pointer;
  }
</style>

<template>
  <div class="modal fade h-100 m-0 p-0" id="questionSummary" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-dialog-centered d-flex justify-content-center align-items-center" role="document">
      <div class="modal-content summary-container" ref="title">
        <div class="close-button-container">
          <button type="submit" class="btn btn-info close-summary" data-dismiss="modal">Close</button>
        </div>
        <div v-if="answers" class="d-flex flex-column align-items-center summary-background">
          <div v-for="answer in answers" :key="answer._id" 
            class="d-flex flex-column align-items-center justify-content-center correct-container"
            :ref="answer._id">
            <question-field class="question mx-auto mt-2" 
              :questionText="answer.question" 
              :theme="theme"/>
            <answers-field class="answers mx-auto p-2"
              :currentQuestion="answer" 
              :mode="mode"
              :picked="answer.selectedAnswer"
              :theme="theme"/>
            <div class="modal-body mx-auto hint" ref="details">
              {{ answer.description }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { eventBus } from '../../main';
import AnswerField from '../QuizArea/AnswersField';
import QuestionField from '../QuizArea/QuestionField';

export default {
  name: 'QuestionSummary',
  components: {
    'answers-field': AnswerField,
    'question-field': QuestionField
  },

  data() {
    return {
      mode: 'summary',
      answers: eventBus.user.currentGame.answers,
      theme: eventBus.user.theme,
      imagesURL: process.env.VUE_APP_IMAGES_URL
    }
  },

  mounted() {
    if (this.theme[0] === 'd') {
      this.$refs.title.style.backgroundColor = '#0f0f0f';
    } else if (this.theme[0] === 'l') {
      this.$refs.title.style.backgroundColor = '#f0f0f0';
    }
  },
}
</script>

<style scoped>
  .close-button-container {
    background-color: rgba(126, 126, 126, 0.8);
    width: 100%;
    height: 60px;
    position: fixed;
    top: 0;
    left: 0;
  }

  .close-summary {
    height: 40px;
    width: 90px;
    position: fixed;
    top: 10px;
    right: 25px;
  }

  .correct-container {
    border: 2px solid #888;
    border-radius: 15px;
    margin-bottom: 10px;
    padding: 20px;
    width: 100%;
  }

  .summary-container {
    border-radius: 15px;
    background-color: '#888';
  }

  .summary-background {
    background-color: transparent;
    padding: 10px;
  }

  .hint {
    color: #888;
    font-family: 'Courier New', Courier, monospace;
    font-size: 18px;
    font-weight: 600;
    margin-top: -50px;
  }
</style>
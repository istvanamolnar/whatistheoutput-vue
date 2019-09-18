<template>
  <form class="add-question d-flex flex-column align-items-center h-75">
    <div class="d-flex flex-column w-50 mb-4">
      <label for="question">Question</label>
      <textarea type="text" rows="8" v-model="form.question" 
        class="" id="question" aria-describedby="questionHelp" required/>
    </div>
    <div class="w-50 mb-4">
      <label for="answers-field" aria-describedby="answerHelp">Answers</label>
      <div class="input-group">
        <div class="input-group-prepend">
          <div class="input-group-text">
            <input type="radio" name="is-correct" value="0" v-model="form.isCorrect" aria-label="Answer one" required>
          </div>
        </div>
        <input type="text" class="form-control" v-model="form.answers[0].answer" aria-label="Answer one" required>
      </div>
      <div class="input-group">
        <div class="input-group-prepend">
          <div class="input-group-text">
            <input type="radio" name="is-correct" value="1" v-model="form.isCorrect" aria-label="Answer two" required>
          </div>
        </div>
        <input type="text" class="form-control" v-model="form.answers[1].answer" aria-label="Answer two" required>
      </div>
      <div class="input-group">
        <div class="input-group-prepend">
          <div class="input-group-text">
            <input type="radio" name="is-correct" value="2" v-model="form.isCorrect" aria-label="Answer three" required>
          </div>
        </div>
        <input type="text" class="form-control" v-model="form.answers[2].answer" aria-label="Answer three">
      </div>
      <div class="input-group">
        <div class="input-group-prepend">
          <div class="input-group-text">
            <input type="radio" name="is-correct" value="3" v-model="form.isCorrect" aria-label="Answer four" required>
          </div>
        </div>
        <input type="text" class="form-control" v-model="form.answers[3].answer" aria-label="Answer four">
      </div>
      <small id="answerHelp" class="form-text text-muted">Add at least two, up to four answers and select the correct one</small>
    </div>
    <div class="d-flex flex-column w-50 mb-4">
      <label for="description">Description</label>
      <textarea type="text" rows="5" v-model="form.description" 
        class="" id="description" required/>
    </div>
    <button type="submit" class="btn btn-success" @click.prevent="addQuestion(form)">Submit</button>
  </form>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ManageQuestions',
  data() {
    return {
      form: {
        question: '',
        answers: [
          { answer: '' },
          { answer: '' },
          { answer: '' },
          { answer: '' },
        ],
        isCorrect: 0,
        description: ''
      }
    }
  },

  methods: {
    addQuestion(form) {
      axios({
        method: 'post',
        url: 'http://localhost:3000/addquestion',
        data: form
      })
      .then((response) => {
        // eslint-disable-next-line
        console.log(response);
      })
      .catch((error) => {
        // eslint-disable-next-line
        console.log(error);
      });
    }
  }
}
</script>

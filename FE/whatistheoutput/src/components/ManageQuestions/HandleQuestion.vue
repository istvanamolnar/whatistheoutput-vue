<template>
  <div class="modal fade" id="editquestion" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-dialog-centered d-flex justify-content-center align-items-center" role="document">
      <div class="modal-content" ref="title">
        <div class="modal-body mx-auto" ref="details">
          <div class="handleContainer">
            <form class="add-question d-flex flex-column align-items-center">
              <div class="d-flex flex-column mb-4">
                <label for="question">Question</label>
                <textarea type="text" rows="8" v-model="pickedQuestion.question" 
                  class="question-area" placeholder="Enter question here" aria-describedby="questionHelp" required/>
              </div>
              <div class="mb-4">
                <label for="answers-field" aria-describedby="answerHelp">Answers</label>
                <div class="input-group answers-area">
                  <div class="input-group-prepend">
                    <div class="input-group-text">
                      <input type="radio" name="is-correct" value="1" v-model="pickedQuestion.answers[0].isCorrect" aria-label="Answer one" required>
                    </div>
                  </div>
                  <input type="text" class="form-control" v-model="pickedQuestion.answers[0].answer" placeholder="Answer one" required>
                </div>
                <div class="input-group">
                  <div class="input-group-prepend">
                    <div class="input-group-text">
                      <input type="radio" name="is-correct" value="1" v-model="pickedQuestion.answers[1].isCorrect" aria-label="Answer two" required>
                    </div>
                  </div>
                  <input type="text" class="form-control" v-model="pickedQuestion.answers[1].answer" placeholder="Answer two" required>
                </div>
                <div class="input-group">
                  <div class="input-group-prepend">
                    <div class="input-group-text">
                      <input type="radio" name="is-correct" value="1" v-model="pickedQuestion.answers[2].isCorrect" aria-label="Answer three" required>
                    </div>
                  </div>
                  <input type="text" class="form-control" v-model="pickedQuestion.answers[2].answer" placeholder="Answer three">
                </div>
                <div class="input-group">
                  <div class="input-group-prepend">
                    <div class="input-group-text">
                      <input type="radio" name="is-correct" value="1" v-model="pickedQuestion.answers[3].isCorrect" aria-label="Answer four" required>
                    </div>
                  </div>
                  <input type="text" class="form-control" v-model="pickedQuestion.answers[3].answer" placeholder="Answer four">
                </div>
                <small id="answerHelp" class="form-text text-muted">Add at least two, up to four answers and select the correct one</small>
              </div>
              <div class="d-flex flex-column mb-4">
                <label for="description">Description</label>
                <textarea type="text" rows="5" v-model="pickedQuestion.description" 
                  class="description-area" id="description" placeholder="Add explaination" required/>
              </div>
              <div class="d-flex justify-content-between w-50">
                <button type="button" class="btn btn-outline-warning cancel-button" data-dismiss="modal">Cancel</button>
                <button v-if="!pickedQuestion.question.length" type="submit" class="btn btn-success submit-button" data-dismiss="modal" @click.prevent="addQuestion(pickedQuestion)">Submit</button>
                <button v-if="pickedQuestion.question.length" type="submit" class="btn btn-danger submit-button" data-dismiss="modal" @click.prevent="deleteQuestion(pickedQuestion)">Delete</button>
                <button v-if="pickedQuestion.question.length" type="submit" class="btn btn-success submit-button" data-dismiss="modal" @click.prevent="editQuestion(pickedQuestion)">Update</button>
              </div>
            </form>
          </div>
        </div>
        <div class="modal-footer mx-auto" ref="footer">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'HandleQuestion',
  props: ['pickedQuestion', 'theme'],
  methods: {
    addQuestion(form) {
      axios({
        method: 'post',
        url: `${process.env.VUE_APP_BACKEND_SERVER_URL}/questions/add`,
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
    },

    deleteQuestion(form) {
      axios({
        method: 'delete',
        url: `${process.env.VUE_APP_BACKEND_SERVER_URL}/questions/delete`,
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
    },

    editQuestion(form) {
      axios({
        method: 'put',
        url: `${process.env.VUE_APP_BACKEND_SERVER_URL}/questions/update`,
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

<style>
  .modal-content {
    width: max-content;
    border: none;
    background-color: transparent;
  }

  .modal-body {
    border-radius: 10px;
    padding: 30px;
    background-color: #333;
  }

  .modal-footer {
    border: none;
  }

  .question-area, .answers-area, .description-area {
    min-width: 300px;
    width: 50vw;
    background-color: #000;
    color: #fff;
  }

  .question {
    background-color: #fff;
  }

  label {
    color: #fff;
    font-weight: 700;
  }

  .form-control:focus {
    background-color: #000;
    color: #009b48;
    border: none;
  }

  .form-control {
    background-color: #000;
    padding: 5px;
    color: #fff;
  }

  .input-group-text {
    background-color: #000;
    border: none;
  }

  .input-group {
    border: 1px solid #888;
    margin: 10px auto;
    border-radius: 5px;
  }

  .add-question {
    width: 50vw;
  }
</style>
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
                  class="question-area" placeholder="Enter question here" required/>
              </div>
              <div class="mb-4">
                <label for="answers-field">Answers</label>
                <div class="input-group answers-area">
                  <div class="input-group-prepend">
                    <div class="input-group-text">
                      <input type="radio" name="is-correct" value="0" 
                        v-model="pickedQuestion.correctOne" aria-label="Answer one" required>
                    </div>
                  </div>
                  <input type="text" class="form-control" 
                    v-model="pickedQuestion.answers[0].answer" placeholder="Answer one" required>
                </div>
                <div class="input-group">
                  <div class="input-group-prepend">
                    <div class="input-group-text">
                      <input type="radio" name="is-correct" value="1" 
                        v-model="pickedQuestion.correctOne" aria-label="Answer two" required>
                    </div>
                  </div>
                  <input type="text" class="form-control" 
                    v-model="pickedQuestion.answers[1].answer" placeholder="Answer two" required>
                </div>
                <div class="input-group">
                  <div class="input-group-prepend">
                    <div class="input-group-text">
                      <input type="radio" name="is-correct" 
                        value="2" v-model="pickedQuestion.correctOne" aria-label="Answer three" required>
                    </div>
                  </div>
                  <input type="text" class="form-control" 
                    v-model="pickedQuestion.answers[2].answer" placeholder="Answer three">
                </div>
                <div class="input-group">
                  <div class="input-group-prepend">
                    <div class="input-group-text">
                      <input type="radio" name="is-correct" value="3" 
                        v-model="pickedQuestion.correctOne" aria-label="Answer four" required>
                    </div>
                  </div>
                  <input type="text" class="form-control" 
                    v-model="pickedQuestion.answers[3].answer" placeholder="Answer four">
                </div>
                <small id="answerHelp" class="form-text text-muted">
                  Add at least two, up to four answers and select the correct one</small>
              </div>
              <input type="text" class="form-control" 
                v-model="pickedQuestion.reference" placeholder="link">
              <div class="d-flex flex-column mb-4">
                <label for="description">Description</label>
                <textarea type="text" rows="5" v-model="pickedQuestion.description" 
                  class="description-area" id="description" placeholder="Add explaination" required/>
              </div>
              <div class="d-flex justify-content-between w-100">
                <button type="submit" class="btn btn-light submit-button" data-dismiss="modal">Cancel</button>
                <button type="submit" class="btn btn-danger submit-button" data-dismiss="modal" 
                  @click.prevent="deleteQuestion(pickedQuestion)">Remove</button>
                <button type="submit" class="btn btn-primary submit-button" data-dismiss="modal" 
                  @click.prevent="editQuestion(pickedQuestion)">Update</button>
                <button type="submit" class="btn btn-success submit-button" data-dismiss="modal" 
                  @click.prevent="addQuestion(pickedQuestion)">Submit</button>
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
      form.game = 'doyouknow';
      axios({
        method: 'post',
        url: `${process.env.VUE_APP_BACKEND_SERVER_URL}/questions`,
        data: form,
      })
      .then((response) => {
        // eslint-disable-next-line
        console.log(response);
      })
      .catch((error) => {
        // eslint-disable-next-line
        console.log(error);
      });

      this.$emit('resetMethod', 0);
    },

    deleteQuestion(form) {
      axios({
        method: 'delete',
        url: `${process.env.VUE_APP_BACKEND_SERVER_URL}/questions?questionId=${form._id}`,
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
        url: `${process.env.VUE_APP_BACKEND_SERVER_URL}/questions`,
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
    background-color: transparent;
    border: none;
    width: max-content;
  }

  .modal-body {
    background-color: #333;
    border-radius: 10px;
    padding: 30px;
  }

  .modal-footer {
    border: none;
  }

  .question-area, .answers-area, .description-area {
    background-color: #000;
    color: #fff;
    min-width: 300px;
    width: 50vw;
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
    border: none;
    color: #009b48;
  }

  .form-control {
    background-color: #000;
    color: #fff;
    padding: 5px;
  }

  .input-group-text {
    background-color: #000;
    border: none;
  }

  .input-group {
    border: 1px solid #888;
    border-radius: 5px;
    margin: 10px auto;
  }

  .add-question {
    width: 50vw;
  }
</style>
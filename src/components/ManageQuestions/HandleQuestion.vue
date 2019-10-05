<template>
  <div class="modal fade" id="editquestion" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-dialog-centered d-flex justify-content-center align-items-center" role="document">
      <div class="modal-content handle-content" ref="title">
        <div class="handlemodal-body mx-auto" ref="details">
          <div v-if="operation" class="handleContainer">
            <form class="add-question d-flex flex-column align-items-left">
              <div class="d-flex flex-column mb-2">
                <label for="question">Question</label>
                <textarea type="text" rows="3" v-model="pickedQuestion.question" 
                  class="question-area" placeholder="Enter question here" required/>
              </div>
              <div class="mb-2">
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
                      <input type="radio" name="is-correct" value="2" 
                        v-model="pickedQuestion.correctOne" aria-label="Answer three" required>
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
              <div class="d-flex flex-column">
                <label for="reference">Reference</label>
                <input type="email" class="mb-2 form-control" 
                  v-model="pickedQuestion.reference" id="reference" placeholder="domain@link">
              </div>
              <div class="d-flex flex-column mb-2">
                <label for="description">Description</label>
                <textarea type="text" rows="3" v-model="pickedQuestion.description" 
                  class="description-area" id="description" placeholder="Add explaination" required/>
              </div>
              <input type="password" class="mb-4 form-control" 
                    v-model="secretCode" placeholder="Secret code">
              <div class="d-flex justify-content-around w-100">
                <button type="submit" class="btn btn-light submit-button" data-dismiss="modal">Cancel</button>
                <button v-if="operation === 'edit'" type="submit" class="btn btn-danger submit-button" data-dismiss="modal"
                  @click.prevent="deleteQuestion(pickedQuestion)">Remove</button>
                <button v-if="operation === 'edit'" type="submit" class="btn btn-primary submit-button" data-dismiss="modal"
                  @click.prevent="editQuestion(pickedQuestion)">Update</button>
                <button v-if="operation === 'new'" type="submit" class="btn btn-success submit-button" data-dismiss="modal"
                  @click.prevent="addQuestion(pickedQuestion)">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'HandleQuestion',
  props: {
    operation: String,
    pickedQuestion: Object,
    theme: String
  },
  data() {
    return {
      secretCode: ''
    }
  },

  methods: {
    addQuestion(form) {
      if (form.secretCode === process.env.VUE_APP_SECRET_CODE) {
        axios({
          data: form,
          headers: { "x-api-key": process.env.VUE_APP_API_KEY },
          method: 'post',
          url: `${process.env.VUE_APP_BACKEND_SERVER_URL}/questions`
        })
        .then((response) => {
          // eslint-disable-next-line
          console.log(response);
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error);
        });
      } else {
        // eslint-disable-next-line
        console.log('access denied!');
      }
      this.$emit('resetMethod', 0);
    },

    deleteQuestion(form) {
      form.secretCode = this.secretCode;
      axios({
        data: form,
        headers: { "x-api-key": process.env.VUE_APP_API_KEY },
        method: 'delete',
        url: `${process.env.VUE_APP_BACKEND_SERVER_URL}/questions?questionId=${form._id}`
      }, {crossdomain: true})
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
      form.game = 'whatistheoutput';
      form.secretCode = this.secretCode;
      axios({
        data: form,
        headers: { "x-api-key": process.env.VUE_APP_API_KEY },
        method: 'put',
        url: `${process.env.VUE_APP_BACKEND_SERVER_URL}/questions`
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

<style scoped>
  .handle-content {
    background-color: transparent;
    border: none;
  }

  .handlemodal-body {
    background-color: #333;
    border-radius: 10px;
    padding: 20px;
    width: 100%;
  }

  .handlemodal-footer {
    border: none;
  }

  .question-area, .answers-area, .description-area {
    background-color: #000;
    color: #fff;
    min-width: 300px;
    width: 100%;
  }

  .question {
    background-color: #fff;
  }

  label {
    color: #fff;
    font-weight: 700;
    margin-bottom: 0;
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
    width: 100%;
  }

  .add-question {
    width: 100%;
  }
</style>

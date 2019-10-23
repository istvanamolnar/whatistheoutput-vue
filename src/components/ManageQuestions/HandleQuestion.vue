<template>
  <div class="modal fade" id="editquestion" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content handle-content" ref="title">
        <div class="handlemodal-body" ref="details">
          <div v-if="operation" class="handleContainer">
            <form class="add-question">
              <label for="question">Question</label>
              <textarea type="text" rows="3" v-model="pickedQuestion.question" 
                class="question-area" placeholder="Enter question here" required/>
              <label for="answers-field">Answers</label>
              <div class="input-group">
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
              <label for="reference">Reference</label>
              <input type="email" class="mb-2 form-control" 
                v-model="pickedQuestion.reference" id="reference" placeholder="domain@link">
              <label for="description">Description</label>
              <textarea type="text" rows="3" v-model="pickedQuestion.description" 
                class="description-area" id="description" placeholder="Add explaination" required/>
              <input type="password" class="form-control" 
                    v-model="secretCode" placeholder="Secret code">
              <div class="d-flex justify-content-around w-100 mt-3">
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
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'HandleQuestion',
  props: {
    operation: String
  },

  computed: mapGetters([
    'pickedQuestion',
  ]),

  data() {
    return {
      secretCode: ''
    }
  },

  methods: {
    ...mapActions([
      'addNew',
      'deleteSelected',
      'editSelected'
    ]),

    addQuestion(form) {
      form.secretCode = this.secretCode;
      form.game = 'whatistheoutput';
      form.correctOne = parseInt(form.correctOne);
      if (form.secretCode === process.env.VUE_APP_SECRET_CODE) {
        this.addNew(form)
      } else {
        // eslint-disable-next-line
        console.log('access denied');
      }
    },

    deleteQuestion(form) {
      form.secretCode = this.secretCode;
      this.deleteSelected({secretCode: this.secretCode, id: form._id});
    },

    editQuestion(form) {
      form.secretCode = this.secretCode;
      if (form.secretCode === process.env.VUE_APP_SECRET_CODE) {
        form.game = 'whatistheoutput';
        this.editSelected(form);
      } else {
        // eslint-disable-next-line
        console.log('access denied!');
      }
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
  }

  .handlemodal-footer {
    border: none;
  }

  .question-area, .description-area {
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

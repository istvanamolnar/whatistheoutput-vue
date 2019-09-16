<template>
  <div v-if="answers" class="container d-flex flex-column">
    <div v-for="ans in answers" :key="ans._id" 
      class="mx-auto my-1 btn btn-outline-success" 
      @click.once="selectAnswer($event, ans)"
      :class="[selected !== null && selected === ans._id ? 'active' : selected !== null ? 'disabled' : '']">
      <highlight-code lang="javascript" class="m-auto">
        {{ ans.answer }}
      </highlight-code>
    </div>
  </div>
</template>
<script>

export default {
  name: 'AnswersField',
  props: ['answers', 'selected'],
  methods: {
    selectAnswer(event, ans) {
      this.$emit('chosenAnswer', ans._id);
      if (this.selected === null) {
        const selectedAnswer = this.answers.find(answer => answer._id === ans._id);
        setTimeout(() => {
          if (selectedAnswer.isCorrect) {
            // eslint-disable-next-line
            console.log(this.selected);
          } else {
            // eslint-disable-next-line
            console.log('nope');
          }
        }, 3000);
      }
    }
  }
}
</script>

<style scoped>
  .btn {
    display: flex;
    width: 300px;
    height: 40px;
    background-color: #fff;
    border: 2px solid #009b48;
    font-weight: 600; 
  }

  .btn:not(.disabled):hover {
    -webkit-text-fill-color: #fff;
  }
  .active {
    -webkit-text-fill-color: #fff;
  }

  .disabled {
    background-color: #fff;
  }
</style>
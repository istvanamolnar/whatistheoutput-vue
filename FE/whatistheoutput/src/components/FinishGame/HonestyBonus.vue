<template>
  <div>
    <p>Well done! Your score is {{score}}</p>
    <p>You can boost your score by being honest and ticking questions where you...</p>
    <button>Let's be honest</button>
    <div v-for="ans in answers" :key="ans.answer.id" class="container">
      <highlight-code lang="javascript" class="question-text m-auto p-2">
        {{ ans.question }}
      </highlight-code>
      <div :class="answer.answer.isCorrect ? 'btn-success' : 'btn-danger'"> {{ans.answer.answer}}</div>
    </div>
  </div>
</template>

<script>
import { eventBus } from '../../main';

export default {
  name: 'HonestyBonus',
  data() {
    return {
      score: eventBus.user.currentGame.score,
      answers: eventBus.user.answers
    }
  },

  mounted() {
  }
}
</script>
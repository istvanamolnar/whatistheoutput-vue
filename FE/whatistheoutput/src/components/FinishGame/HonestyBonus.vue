<template>
  <div class="container-fluid justify-content-center align-items-center honestyContainer" ref="container">
    <div class="d-flex flex-column align-items-center justify-content-center">
      <h1 class="honestyText font-weight-bold" ref="honestyHeader">Well done!</h1>
    </div>
    <div>
      <h2 class="honestyText" ref="honestyScore">Your score is: <span class="finalScore">{{score}}</span></h2>
    </div>
      <div class="honestyText h3" ref="honestyText">
        <div>
          You can get a boost by being honest and ticking questions where you cheated in the console 
          <img class="pirate" :src="serverURL + '/images/pirate.png'"/>
        </div>
      </div>
    <div class="btn btn-success">Let's be honest</div>
    <div v-if="answers">
      <div v-for="ans in answers" :key="ans.answer.id" class="answerCheck" ref="answerCheck">
        <highlight-code lang="javascript" class="m-auto p-2">
          {{ ans.question }}
        </highlight-code>
        <div :class="ans.answer.isCorrect ? 'bg-success answerBox' : 'bg-danger answerBox'">
          <p class="m-auto p-2 selectedAnswer">
            {{ans.answer.answer}}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { eventBus } from '../../main';

export default {
  name: 'HonestyBonus',
  data() {
    return {
      serverURL: process.env.VUE_APP_BACKEND_SERVER_URL,
      score: eventBus.user.currentGame.score,
      answers: eventBus.user.currentGame.answers,
      theme: eventBus.user.theme
    }
  },

  mounted() {
    console.log(this.$refs);
    this.$refs.container.style.backgroundImage = `url('${process.env.VUE_APP_BACKEND_SERVER_URL}/images/${this.theme}.png')`;
    if (this.theme[0] === 'd') {
      this.$refs.honestyHeader.style.color = '#ddd';
      this.$refs.honestyScore.style.color = '#ddd';
      this.$refs.honestyText.style.color = '#ddd';
      this.$refs.answerCheck.forEach(answer => answer.style.backgroundColor = '#222');
    } else {
      this.$refs.honestyHeader.style.color = '#333';
      this.$refs.honestyScore.style.color = '#333';
      this.$refs.honestyText.style.color = '#333';
      this.$refs.answerCheck.forEach(answer => answer.style.backgroundColor = '#fff');
    }
  },


}
</script>

<style>
  .honesty-boost {
    height: 100vh;
    display: flex;
    flex-direction: column;
  }
  .honestyContainer {
    height: 100vh;
    display: flex;
    flex-direction: column;
  }

  .honestyText {
    font-family: 'ZCOOL KuaiLe', cursive;
    border: none;
    text-align: justify;
    width: 80vw;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .pirate {
    height: 1em;
  }

  .finalScore {
    color: #009b48;
    padding: 20px;
    font-size: 34px;
    font-weight: 700;
  }

  .answerBox {
    border-radius: 4px;
    padding-left: 10px;
  }

  .selectedAnswer {
    color: #fff;
    font-weight: 600;
  }

  .answerCheck {
    background-color: #333;
    margin: 50px;
    padding: 20px;
    border-radius: 5px;
  }
</style>
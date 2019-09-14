<template>
  <div v-if="questions">
    <div class="container" v-for="question in questions" :key="question.question.id">
      <div v-for="text in question.question" :key="text">
        <pre v-highlightjs class="line"><code class="javascript">{{ text }}</code></pre>
      </div>
    </div>
  </div>
  
</template>

<script>
import axios from "axios";

export default {
  name: 'QuestionField',
  data() {
    return {
      questions: []
    }
  },
  mounted() {
    axios.get("http://localhost:3000/questions")
      .then(res => {
        this.questions = res.data.slice(1);
        // eslint-disable-next-line
        console.log(this.questions);
      })
      // eslint-disable-next-line
      .catch(err => console.log(err));
  }
}
</script>

<style>
  .container {
    padding: 3vh;
    border-radius: 15px;
    background-color: #f5f5f5;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: left;
    width: max-content;
    margin: 2vh auto;
  }

  .line {
    margin: 0;
    padding: 0;
    width: max-content;
  }

  .javascript {
    padding: 2px !important;
    background-color: #f5f5f5;
    font-size: 24px;
    font-size: 3.5vw;
  }

</style>
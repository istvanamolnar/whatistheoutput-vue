<template>
  <div v-if="answers" class="container">
    <div v-for="{answer, _id} in answers" 
      :key="_id" class="option btn btn-outline-success" 
      @click.once="selectAnswer($event, _id)"
      :class="[selected === _id ? 'active' : 'blue']">
      <pre v-highlightjs class="line"><code class="javascript">{{ answer }}</code></pre>
    </div>
  </div>
</template>
<script>

export default {
  name: 'AnswersField',
  props: ['answers', 'selected'],
  methods: {
    selectAnswer(event, id) { 
      this.$emit('chosenAnswer', id);
    }
  }
}
</script>

<style scoped>

  .container {
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    text-align: center;
    width: 100%;
    height: 50vh;
  }

  .option {
    margin: 5px auto;
    font-size: 20px;
    font-size: 2.5vh;
    width: 100%;
    padding: 10px;
    background-color: #fff;
  }

  .option:hover {
    cursor: pointer;
    -webkit-text-fill-color: #fff;
  }

  .line {
    margin: 0;
    padding: 0;
    width: max-content;
    margin: auto;
  }

  .javascript {
    padding: 2px;
    background-color: transparent;
  }

  .active {
    border: 2px solid green;
  }

</style>
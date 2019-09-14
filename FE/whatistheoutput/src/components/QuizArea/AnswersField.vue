<template>
  <div v-if="answers" class="container">>
    <div v-for="{answer, _id} in answers" 
          :key="_id" class="option" 
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
    width: 100%;
    color: #fff;
  }
  .option {
    border: 1px solid #999;
    border-radius: 15px;
    display: flex;
    justify-content: center;
    margin: 20px;
    padding: 10px;
    width: 80%;
    background-color: currentColor;
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

  .active {
    border: 2px solid green;
  }

</style>
<template>
  <div v-if="currentQuestion">
    <div v-for="text in currentQuestion" :key="text.id">
      <pre v-highlightjs class="line"><code class="javascript">{{ text }}</code></pre>
    </div>
  </div>
</template>

<script>
export default {
  name: 'QuestionField',
  props: ['currentQuestion']
}
</script>

<style scoped>
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
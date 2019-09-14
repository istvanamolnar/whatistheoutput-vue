<template>
  <div v-if="currentQuestion" class="container">
    <div v-for="text in currentQuestion" :key="text.id" class="text_field">
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
  .text_field {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: left;
  }
  .line {
    margin: 0;
    padding: 0;
  }
  .container {
    padding: 3vh;
    border-radius: 15px;
    background-color: #f5f5f5;
    display: flex;
    flex-direction: column;
    font-size: 24px;
    font-size: 2.5vh;
    justify-content: center;
    align-items: left;
    margin: 2vh auto;
  }

  .javascript {
    padding: 2px !important;
    background-color: #f5f5f5;
  }

</style>
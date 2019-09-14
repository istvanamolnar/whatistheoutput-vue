<template>
<div>
  <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.9.0/styles/default.min.css">
  <question-field />
</div>
</template>

<script>
import QuestionField from './components/QuestionField';

export default {
  name: 'app',
  components: {
    'question-field': QuestionField
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
</style>

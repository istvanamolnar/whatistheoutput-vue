<template>
<div>
  <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.9.0/styles/default.min.css">
  <quiz-area/>
</div>
</template>

<script>
import QuizArea from './components/QuizArea/QuizArea';

export default {
  name: 'app',
  components: {
    'quiz-area': QuizArea
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
</style>

<template>
<div>
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

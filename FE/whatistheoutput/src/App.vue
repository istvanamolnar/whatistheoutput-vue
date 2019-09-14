<template>
  <div class="container">
    <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.9.0/styles/default.min.css">
    <pre v-highlightjs class="line"><code class="javascript">const x = { spaceShip : 9};</code></pre>
    <pre v-highlightjs class="line"><code class="javascript">const inventory = (function() {</code></pre>
    <pre v-highlightjs class="line"><code class="javascript">  delete x.spaceShip;</code></pre>
    <pre v-highlightjs class="line"><code class="javascript">  return x.spaceShip;</code></pre>
    <pre v-highlightjs class="line"><code class="javascript">})();</code></pre>
    <pre v-highlightjs class="line"><code class="javascript">console.log(inventory);</code></pre>
  </div>
</template>

<script>

export default {
  name: 'app',
  components: {
    
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

.container {
  padding: 3vh;
  border-radius: 15px;
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;
  width: max-content;
  margin: 0vh auto;
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

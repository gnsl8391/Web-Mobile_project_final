<template>
  <div id="schedule">
    <div class="section">
      <lists></lists>
    </div>
  </div>
</template>

<script>
import Lists from "../components/Lists";

export default {
  components: {
    "lists": Lists
  }
};
</script>

<style>
.section {
  padding: 40px 0 0 0;
  line-height: 1.5;
  margin-top: 30px;
  margin-bottom: 50px;
}
.drag, .drop {
  box-sizing: border-box;
  display: inline-block;
  border-radius: 10px;
  width: 100px;
  height: 100px;
  background: #ccc;
  vertical-align: middle;
  margin-right: 20px;
  position: relative;
  padding: 5px;
  padding-top: 35px;
  text-align: center;
  margin: 3px;
}
.drag {
  color: #fff;
  cursor: move;
  background: #777;
  border-right: 2px solid #a1a1a1;
  border-bottom: 2px solid #a1a1a1;
}
.drop {
  background: #eee;
  border-top: 3px solid #ccc;
  border-left: 3px solid #ddd;
}
#schedule {
  padding: 10px 40px;
  height: auto;
}
</style>

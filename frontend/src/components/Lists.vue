<template>
  <div>
    <div class="write">
      <v-flex xs12 sm6 md4>
        <v-text-field
        label="To Do를 작성해 주세요"
        ></v-text-field>
      </v-flex>
    </div>
    <div style="width: 100%">
      <span class="listId"><h3>to do</h3></span>
      <span class="listId"><h3>progress</h3></span>
      <span class="listId"><h3>complete</h3></span>
    </div>
    <span v-for="(list, i) in lists" :key="i" class="clear">
      <drop class="drop list bord" @drop="handleDrop(list, ...arguments)">
        <drag v-for="item in list"
        class="drag card"
        :key="item"
        :class="{ [item]: true }"
        :transfer-data="{ item: item, list: list, example: 'lists' }">
        {{ item }}
      </drag>
    </drop>
  </span>
</div>
</template>

<script>
import { Drag, Drop } from "vue-drag-drop";
import FirebaseService from "@/services/FirebaseService";

export default {
  components: { Drag, Drop },
  data() {
    return {
      lists: [
        [],
        [],
        []
      ]
    };
  },
  mounted() {
    this.getTodo();
    this.getProgress();
    this.getComplete();
  },
  methods: {
    getTodo() {
      let todo = FirebaseService.getTodo();
      todo.then(r => {
        for (var i = 0; i < r.length; i++) {
          this.lists[0].push(r[i].body);
        }
      });
    },
    getProgress() {
      let todo = FirebaseService.getProgress();
      todo.then(r => {
        for (var i = 0; i < r.length; i++) {
          this.lists[1].push(r[i].body);
        }
      });
    },
    getComplete() {
      let todo = FirebaseService.getComplete();
      todo.then(r => {
        for (var i = 0; i < r.length; i++) {
          this.lists[2].push(r[i].body);
        }
      });
    },
    handleDrop(toList, data) {
      const fromList = data.list;
      if (fromList) {
        toList.push(data.item);
        fromList.splice(fromList.indexOf(data.item), 1);
        toList.sort((a, b) => a > b);
      }
    }
  }
};
</script>

<style scoped>
.drag {
  display: inline-block;
}
.drag.A { background: #aaa; }
.drag.B { background: #888; }
.drag.C { background: #666; }
.drag.D { background: #444; }
.drag.E { background: #222; }
.drag.F { background: #000; }
.drop {
  display: inline-block;
  vertical-align: top;
  padding: 15px;
  margin-bottom: 20px;
  width: auto;
  height: auto;
}
.listId {
  padding: 10px;
  margin: 20px;
  width: 30%;
  text-align: center;
  float: left;
  color: #3d3d3d;
  font-family: 'Indie Flower', cursive;
}
.clear {
  clear: both;
}
.bord {
  margin-bottom: 1px;
  width: 30%;
  height: 100%;
  padding: 10px;
  margin: 20px;
}
.card {
  width:90%;
}
.write {
  margin: 50px;
  margin-top: 70px;
}
</style>

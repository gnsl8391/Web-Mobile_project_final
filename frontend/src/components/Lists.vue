<template>
  <div>
    <div class="write">
      <v-flex>
        <v-text-field
        label="To Do를 작성 후 Enter를 입력하세요"
        v-model="writeTodo"
        style="float: left; width: 80%"
        @keyup.enter="postTodo"
        ></v-text-field>
      </v-flex>
    </div>
    <div class="clear" style="width: 100%">
      <span class="listId"><h2>to do</h2></span>
      <span class="listId"><h2>progress</h2></span>
      <span class="listId"><h2>complete</h2></span>
    </div>
    <span v-for="(list, i) in lists" :key="i" class="clear">
      <drop class="drop list bord" @drop="handleDrop(i, list, ...arguments)">
        <drag v-for="item in list"
        @drag = "setDrag(i)"
         class="drag card cardstyle"
        :key="item.id"
        :class="{ [item]: true }"
        :transfer-data="{ item: item, list: list, example: 'lists' }">
        <div class="right discard" @click="discard(item.id)"><i class="fas fa-times"></i></div>
        {{ item.body }}
      </drag>
    </drop>
  </span>
  <div class="clear"></div>
</div>
</template>

<script>
import { Drag, Drop } from "vue-drag-drop";
import FirebaseService from "@/services/FirebaseService";

export default {
  components: { Drag, Drop },
  data() {
    return {
      writeTodo: "",
      drag: -1,
      color: ["#ffeebf", "#fdd6ff", "#c2ebff", "#ceffc2"],
      lists: [
        [],
        [],
        []
      ]
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.getTodo();
      this.getProgress();
      this.getComplete();
    },
    setDrag(index) {
      this.drag = index;
    },
    discard(uid) {
      FirebaseService.discardinAll(uid).then(r => {
        this.getData();
      });
    },
    postTodo() {
      FirebaseService.postTodo(this.writeTodo).then(r => {
        this.getData();
      });
    },
    getTodo() {
      if (this.lists[0].length != 0) {
        this.lists[0] = [];
      }
      let todo = FirebaseService.getTodo();
      todo.then(r => {
        for (var i = 0; i < r.length; i++) {
          if (r[i].dataMap.user == this.$store.state.user.uid) {
            var idandbody = { id: r[i].id, body: r[i].dataMap.body };
            this.lists[0].push(idandbody);
          }
        }
      });
    },
    getProgress() {
      if (this.lists[1].length != 0) {
        this.lists[1] = [];
      }
      let progress = FirebaseService.getProgress();
      progress.then(r => {
        for (var i = 0; i < r.length; i++) {
          if (r[i].dataMap.user == this.$store.state.user.uid) {
            var idandbody = { id: r[i].id, body: r[i].dataMap.body };
            this.lists[1].push(idandbody);
          }
        }
      });
    },
    getComplete() {
      if (this.lists[2].length != 0) {
        this.lists[2] = [];
      }
      let complete = FirebaseService.getComplete();
      complete.then(r => {
        for (var i = 0; i < r.length; i++) {
          if (r[i].dataMap.user == this.$store.state.user.uid) {
            var idandbody = { id: r[i].id, body: r[i].dataMap.body };
            this.lists[2].push(idandbody);
          }
        }
      });
    },
    handleDrop(index, toList, data) {
      const fromList = data.list;
      if (fromList) {
        toList.push(data.item);
        fromList.splice(fromList.indexOf(data.item), 1);
        toList.sort((a, b) => a > b);
      }

      if (this.drag == 0) {
        if (index == 1) {
          FirebaseService.postProgress(data.item.body).then(r => {
            FirebaseService.discardTodo(data.item.id).then(r => {
              window.location.reload();
            });
          });
        } else if (index == 2) {
          FirebaseService.postComplete(data.item.body).then(r => {
            FirebaseService.discardTodo(data.item.id).then(r => {
              window.location.reload();
            });
          });
        }
      } else if (this.drag == 1) {
        if (index == 0) {
          FirebaseService.postTodo(data.item.body).then(r => {
            FirebaseService.discardProgress(data.item.id).then(r => {
              window.location.reload();
            });
          });
        } else if (index == 2) {
          FirebaseService.postComplete(data.item.body).then(r => {
            FirebaseService.discardProgress(data.item.id).then(r => {
              window.location.reload();
            });
          });
        }
      } else if (this.drag == 2) {
        if (index == 1) {
          FirebaseService.postProgress(data.item.body).then(r => {
            FirebaseService.discardComplete(data.item.id).then(r => {
              window.location.reload();
            });
          });
        } else if (index == 0) {
          FirebaseService.postTodo(data.item.body).then(r => {
            FirebaseService.discardComplete(data.item.id).then(r => {
              window.location.reload();
            });
          });
        }
      }
    }
  }
};
</script>

<style scoped>
.drag {
  display: inline-block;
}
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
.right {
  float: right;
}
.write {
  margin: 50px;
  margin-top: 70px;
  width: 60%;
}
.discard {
  padding-right: 10px;
  color: white;
}
.cardstyle {
  background: #cfcfcf;
  color: black;
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 16px;
}
</style>

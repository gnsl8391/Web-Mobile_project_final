<template>
  <div>
    <div class="write">
      <v-flex>
        <v-text-field
        label="To Do를 작성 후 Enter를 입력하세요"
        v-model="writeTodo"
        style="float: left; width: 80%"
        @keyup.enter="postTodo"
        :rules="textRule"
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
         class="drag card cardstyle text-truncate"
        :style="{ background: cardColors[i%9] }"
        :key="item.id"
        :class="{ [item]: true }"
        :transfer-data="{ item: item, list: list, example: 'lists' }">
        <div class="right discard" @click="discard(item.id, i)"><i class="fas fa-times margin"></i></div>
        {{ item.body }}
      </drag>
    </drop>
  </span>
  <v-card
  color="#FACC2E"
  dark
  v-if="loading"
  class="load"
  >
  <v-card-text>
    처리 중...
    <v-progress-linear
    indeterminate
    color="white"
    class="mb-0"
    ></v-progress-linear>
  </v-card-text>
</v-card>
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
      textRule: [
        v => (v && v.length < 20) || "you can write in 20 characters"
      ],
      cardColors: [
        "azure",
        "beige",
        "bisque",
        "blanchedalmond",
        "burlywood",
        "cornsilk",
        "gainsboro",
        "ghostwhite",
        "ivory",
        "khaki"
      ],
      loading: false,
      writeTodo: "",
      drag: -1,
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
    pickColor() {
      const rand = Math.floor(Math.random() * 10);
      return this.cardColors[rand];
    },
    getData() {
      this.getTodo();
      this.getProgress();
      this.getComplete();
    },
    setDrag(index) {
      this.drag = index;
    },
    discard(uid, i) {
      this.loading = true;
      if (i == 0) {
        FirebaseService.discardTodo(uid).then(r => {
          window.location.reload();
        });
      } else if (i == 1) {
        FirebaseService.discardProgress(uid).then(r => {
          window.location.reload();
        });
      } else {
        FirebaseService.discardComplete(uid).then(r => {
          window.location.reload();
        });
      }
    },
    postTodo() {
      this.loading = true;
      FirebaseService.postTodo(this.writeTodo).then(r => {
        window.location.reload();
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
          this.loading = true;
          FirebaseService.postProgress(data.item.body).then(r => {
            FirebaseService.discardTodo(data.item.id).then(r => {
              window.location.reload();
            });
          });
        } else if (index == 2) {
          this.loading = true;
          FirebaseService.postComplete(data.item.body).then(r => {
            FirebaseService.discardTodo(data.item.id).then(r => {
              window.location.reload();
            });
          });
        }
      } else if (this.drag == 1) {
        if (index == 0) {
          this.loading = true;
          FirebaseService.postTodo(data.item.body).then(r => {
            FirebaseService.discardProgress(data.item.id).then(r => {
              window.location.reload();
            });
          });
        } else if (index == 2) {
          this.loading = true;
          FirebaseService.postComplete(data.item.body).then(r => {
            FirebaseService.discardProgress(data.item.id).then(r => {
              window.location.reload();
            });
          });
        }
      } else if (this.drag == 2) {
        if (index == 1) {
          this.loading = true;
          FirebaseService.postProgress(data.item.body).then(r => {
            FirebaseService.discardComplete(data.item.id).then(r => {
              window.location.reload();
            });
          });
        } else if (index == 0) {
          this.loading = true;
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
  /* background: #cfcfcf; */
  color: black;
  font-family: 'Do Hyeon', sans-serif;
  font-size: 18px;
}
.load {
  width: 35%;
  z-index: 100;
  position: fixed;
  left: 50%;
  top: 50%;
  margin-top: -100px;
  margin-left: -260px;
}
.margin {
  margin-left: 10px;
}
</style>

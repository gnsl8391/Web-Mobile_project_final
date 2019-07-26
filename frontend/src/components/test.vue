<template>
    <v-layout>
        <div>
            <v-btn color="success" @click="getData">
                눌러
            </v-btn>
        {{ number }}uyguynp
        </div>
    </v-layout>
</template>

<script>
import axios from "axios";
export default{
  name: "test",
  data: () => ({
    number: 0
  }),
  methods: {
    getData () {
      axios.get("/go").then(res => {
        // 불러온 값을 Console에 뿌려줍니다.
        this.number = res.data;
        console.log(res.data);
      });
    }
  }
};
</script>

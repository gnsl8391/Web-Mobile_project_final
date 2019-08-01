<template>
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-img
          src="https://cdn.vuetifyjs.com/images/lists/ali.png"
          height="300px"
        >
          <v-layout
            column
            fill-height
          >
            <v-spacer></v-spacer>
            <v-card-title class="white--text pl-5 pt-5">
              <div class="display-1 pl-5 pt-5">My Page</div>
            </v-card-title>
          </v-layout>
        </v-img>

        <!-- 이름 -->
        <v-list two-line>
          <v-list-tile>
            <v-list-tile-action>
              <v-icon class="far fa-laugh-wink" size="30px"></v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>namename</v-list-tile-title>
              <v-list-tile-sub-title>name</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-divider inset></v-divider>

          <!-- 메일 -->
          <v-list-tile>
            <v-list-tile-action>
              <v-icon class="far fa-envelope" size="30px"></v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>aliconnors@example.com</v-list-tile-title>
              <v-list-tile-sub-title>Personal</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider inset></v-divider>

          <!-- 패스워드 -->
          <v-list-tile>
            <v-list-tile-action>
              <v-icon class="fas fa-key" size="30px"></v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>패스워드</v-list-tile-title>
              <v-list-tile-sub-title>Password</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider inset></v-divider>

          <!-- 패스워드 변경 -->
          <!-- 포트폴리오 수  -->
          <!-- 포스트 수 -->
          <!-- 권한등급 -->
          <!-- 수정,삭제 버튼-->

        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>

</script>

  <template>
  <v-layout wrap style="margin-top : 100px; z-index:0">
    <v-flex
      hidden-md-and-down
      lg3
      class="pa-3 mb-3 feature-pane"
    >
      <v-btn
        fab
        outline
        small
        absolute
        left
        color="orange"
        @click="$refs.calendar.prev()"
      >
        <v-icon dark>
          fas fa-chevron-left
        </v-icon>
      </v-btn>
      <v-btn
        fab
        outline
        small
        absolute
        right
        color="orange"
        @click="$refs.calendar.next()"
      >
        <v-icon
          dark
        >
          fas fa-chevron-right
        </v-icon>
      </v-btn>
      <br><br><br>
      <v-select
        v-model="type"
        :items="typeOptions"
        label="Type"
      ></v-select>
      <v-checkbox
        v-model="dark"
        label="Dark"
      ></v-checkbox>
      <v-select
        v-model="color"
        :items="colorOptions"
        label="Color"
      ></v-select>
      <v-menu
        ref="startMenu"
        v-model="startMenu"
        :close-on-content-click="false"
        :nudge-right="40"
        :return-value.sync="start"
        transition="scale-transition"
        min-width="290px"
        lazy
        offset-y
        full-width
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="start"
            label="Start Date"
            prepend-icon="far fa-calendar-alt"
            readonly
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="start"
          no-title
          scrollable
        >
          <v-spacer></v-spacer>
          <v-btn
            flat
            :color="color"
            @click="startMenu = false"
          >
            Cancel
          </v-btn>
          <v-btn
            flat
            :color="color"
            @click="$refs.startMenu.save(start)"
          >
            OK
          </v-btn>
        </v-date-picker>
      </v-menu>
      <v-menu
        ref="nowMenu"
        v-model="nowMenu"
        :close-on-content-click="false"
        :nudge-right="40"
        :return-value.sync="now"
        transition="scale-transition"
        min-width="290px"
        lazy
        offset-y
        full-width
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="now"
            label="Today"
            prepend-icon="far fa-calendar-alt"
            readonly
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="now"
          no-title
          scrollable
        >
          <v-spacer></v-spacer>
          <v-btn
            flat
            :color="color"
            @click="nowMenu = false"
          >
            Cancel
          </v-btn>
          <v-btn
            flat
            :color="color"
            @click="$refs.nowMenu.save(now)"
          >
            OK
          </v-btn>
        </v-date-picker>
      </v-menu>
      <v-select
        v-model="weekdays"
        :items="weekdaysOptions"
        label="Weekdays"
      ></v-select>
    </v-flex>
    <!-- 전체 화면 이외 -->
    <v-flex
      hidden-lg-and-up
      style="text-align: center;"
    >
    <v-btn
      fab
      outline
      small
      :color="color"
      @click="$refs.calendar.prev(); prev()"
      style="float:left;"
    >
      <v-icon dark>
        fas fa-chevron-left
      </v-icon>
    </v-btn>
    <span style="font-size:20px;"> {{ this.curMonth + 1 }}월 </span>
    <v-btn
      fab
      outline
      small
      :color="color"
      @click="$refs.calendar.next(); next()"
      style="float:right;"
    >
      <v-icon
        dark
      >
        fas fa-chevron-right
      </v-icon>
    </v-btn>
    <br><br><br>
    </v-flex>
    <!-- 달력 -->
    <v-flex
      sm12
      lg9
      class="pl-3"
    >
      <v-sheet height="500">
        <v-calendar
          ref="calendar"
          v-model="start"
          :type="type"
          :start="start"
          :end="end"
          :now="now"
          :dark="dark"
          :weekdays="weekdays"
          :first-interval="intervals.first"
          :interval-minutes="intervals.minutes"
          :interval-count="intervals.count"
          :interval-height="intervals.height"
          :interval-style="intervalStyle"
          :show-interval-label="showIntervalLabel"
          :color="color"
        >
        <template v-slot:day="{ date }">
          <template v-for="event in eventsMap[date]">
            <v-menu
              :key="event.title"
              full-width
              offset-x
            >
              <template v-slot:activator="{ on }">
                <v-sheet
                  v-if="!event.time"
                  v-ripple
                  :color="color"
                  class="white--text pa-1"
                  style="margin:2px 0 !important;"
                  v-on="on"
                  v-html="event.title"
                ></v-sheet>
              </template>
              <v-card
                color="grey lighten-4"
                min-width="300px"
                flat
              >
                <v-toolbar :color="color" dark>
                  <v-bottom-sheet v-model="sheet">
                    <template v-slot:activator>
                      <v-btn icon @click="printValue(event)">
                        <v-icon>fas fa-ellipsis-h</v-icon>
                      </v-btn>
                    </template>
                    <v-list>
                      <v-subheader>Open in</v-subheader>
                      <v-list-tile
                        v-for="tile in tiles"
                        :key="tile.title"
                        @click="tileFunc(tile.id)"
                      >
                        <v-list-tile-avatar>
                          <v-avatar size="32px" tile>
                            <img
                              :src="`https://cdn.vuetifyjs.com/images/bottom-sheets/${tile.img}`"
                              :alt="tile.title"
                              >
                            </v-avatar>
                          </v-list-tile-avatar>
                        <v-list-tile-title>{{ tile.title }}</v-list-tile-title>
                      </v-list-tile>
                    </v-list>
                  </v-bottom-sheet>
                  <v-toolbar-title v-html="event.title"></v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-btn icon>
                    <v-icon>fas fa-times</v-icon>
                  </v-btn>
                </v-toolbar>
                <!-- 세부정보 -->
                <v-list two-line >
                    <v-list-tile>
                      <v-list-tile-avatar>
                        <v-icon>far fa-clock</v-icon>
                      </v-list-tile-avatar>
                      <v-list-tile-content>
                        <v-list-tile-title>Time</v-list-tile-title>
                        <v-list-tile-sub-title>{{ event.dateDetail }}</v-list-tile-sub-title>
                      </v-list-tile-content>
                    </v-list-tile>
                    <v-divider ></v-divider>
                    <v-list-tile>
                      <v-list-tile-avatar>
                        <v-icon>far fa-file-alt</v-icon>
                      </v-list-tile-avatar>
                      <v-list-tile-content>
                        <v-list-tile-title>Description</v-list-tile-title>
                        <v-list-tile-sub-title>{{ event.details }}</v-list-tile-sub-title>
                      </v-list-tile-content>
                    </v-list-tile>
                    <v-divider ></v-divider>
                    <v-list-tile>
                      <v-list-tile-avatar>
                        <v-icon>{{ event.catImg }}</v-icon>
                      </v-list-tile-avatar>
                      <v-list-tile-content>
                        <v-list-tile-title>Category</v-list-tile-title>
                        <v-list-tile-sub-title>{{ event.category }}</v-list-tile-sub-title>
                      </v-list-tile-content>
                    </v-list-tile>
                </v-list>
                </v-card>
              </v-menu>
            </template>
          </template>
        </v-calendar>
      </v-sheet>
    </v-flex>
    <v-flex xs12>
      <v-btn
      :color="color"
      dark
      @click.stop="writeDialog = true"
      style="margin: 20px;"
    >
      일정 등록
    </v-btn>

    <v-dialog
      v-model="writeDialog"
      max-width="350"
    >
      <v-card>
        <v-toolbar :color="color " dark flat>
          <v-toolbar-title v-if="this.$store.state.user.displayName!=''">{{ this.$store.state.user.displayName }}님의 일정 등록하기</v-toolbar-title>
          <v-toolbar-title v-else>{{ this.$store.state.user.email.split('@')[0] }}님의 일정 등록하기</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>

        <v-list two-line >
            <v-list-tile style="margin-top: 10px;">
              <v-list-tile-avatar>
                <v-icon>far fa-calendar-alt</v-icon>
              </v-list-tile-avatar>
              <v-list-tile-content>
                  <v-menu
                  ref="menu1"
                  v-model="menu1"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  lazy
                  transition="scale-transition"
                  offset-y
                  full-width
                  max-width="290px"
                  min-width="290px"
                  >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                    v-model="dateFormatted"
                    label="DATE"
                    hint="MM/DD/YYYY format"
                    persistent-hint
                    @blur="date = parseDate(dateFormatted)"
                    v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="date" no-title @input="menu1 = false"></v-date-picker>
                </v-menu>
              </v-list-tile-content>
            </v-list-tile>
            <v-divider ></v-divider>
            <v-list-tile>
              <v-list-tile-avatar>
                <v-icon>far fa-clock</v-icon>
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-sub-title>
                  <v-menu bottom offset-y>
                    <template v-slot:activator="{ on }">
                      <span v-on="on" style="text-align:left; font-size:16px; color:black;">
                        <span v-if="picker==null">--:--</span>
                        <span v-else>{{picker}}</span>
                         <i class="fas fa-check"></i></span>
                    </template>
                    <div>
                      <v-time-picker v-model="picker"></v-time-picker>
                    </div>
                  </v-menu>
                </v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-divider ></v-divider>
            <v-list-tile>
              <v-list-tile-avatar>
                <v-icon>far fa-file</v-icon>
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title>TITLE</v-list-tile-title>
                <v-list-tile-sub-title><input type="text" style="background: #F2F2F2; width:90%;" v-model="title"></v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-divider ></v-divider>
            <v-list-tile>
              <v-list-tile-avatar>
                <v-icon>far fa-file-alt</v-icon>
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title>DESCRIPTION</v-list-tile-title>
                <v-list-tile-sub-title><input type="text" style="background: #F2F2F2; width:90%;" v-model="description"></v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-divider ></v-divider>
            <v-list-tile>
              <v-list-tile-avatar>
                <v-icon>fas fa-cat</v-icon>
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-sub-title>
                  <v-menu bottom offset-y>
                    <template v-slot:activator="{ on }">
                      <v-btn flat v-on="on">{{catName}}</v-btn>
                    </template>
                    <v-list>
                      <v-list-tile v-for="(item, i) in categories" :key="i" @click="category=item.scheCat_id ; catName = item.scheCat_name">
                        <v-list-tile-avatar>
                          <v-icon>{{item.scheCat_img}}</v-icon>
                        </v-list-tile-avatar>
                        <v-list-tile-title>
                          {{item.scheCat_name}}
                        </v-list-tile-title>
                      </v-list-tile>
                    </v-list>
                  </v-menu>
                </v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
        </v-list>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
          :disabled="!checkEmpty"
          :loading="loading"
          flat
          color="warning darken-1"
          @click="saveList()"
          >저장</v-btn>
            <v-dialog
            v-model="loading"
            hide-overlay
            persistent
            width="300"
            >
            <v-card
            :color="color"
            dark
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
        </v-dialog>
          <v-btn
            color="warning darken-1"
            flat="flat"
            @click="writeDialog = false"
          >
            닫기
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    </v-flex>
  </v-layout>
</template>

<script>
const weekdaysDefault = [0, 1, 2, 3, 4, 5, 6];

const intervalsDefault = {
  first: 0,
  minutes: 60,
  count: 24,
  height: 40
};

const stylings = {
  default (interval) {
    return undefined;
  },
  workday (interval) {
    const inactive = interval.weekday === 0 ||
    interval.weekday === 6 ||
    interval.hour < 9 ||
    interval.hour >= 17;
    const startOfHour = interval.minute === 0;
    const dark = this.dark;
    const mid = dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)";

    return {
      backgroundColor: inactive ? (dark ? "rgba(0,0,0,0.4)" : "rgba(0,0,0,0.05)") : undefined,
      borderTop: startOfHour ? undefined : "1px dashed " + mid
    };
  },
  past (interval) {
    return {
      backgroundColor: interval.past ? (this.dark ? "rgba(0,0,0,0.4)" : "rgba(0,0,0,0.05)") : undefined
    };
  }
};

export default {
  data: () => ({
    writeDialog: false,
    dark: false,
    startMenu: false,
    start: "2019-08-01",
    endMenu: false,
    end: "2019-08-15",
    nowMenu: false,
    now: null,
    type: "month",
    typeOptions: [
      { text: "Day", value: "day" },
      { text: "4 Day", value: "4day" },
      { text: "Week", value: "week" },
      { text: "Month", value: "month" }
    ],
    weekdays: weekdaysDefault,
    weekdaysOptions: [
      { text: "Sunday - Saturday", value: weekdaysDefault },
      { text: "Mon, Wed, Fri", value: [1, 3, 5] },
      { text: "Mon - Fri", value: [1, 2, 3, 4, 5] },
      { text: "Mon - Sun", value: [1, 2, 3, 4, 5, 6, 0] }
    ],
    intervals: intervalsDefault,
    intervalsOptions: [
      { text: "Default", value: intervalsDefault },
      { text: "Workday", value: { first: 16, minutes: 30, count: 20, height: 40 } }
    ],
    styleInterval: "default",
    styleIntervalOptions: [
      { text: "Default", value: "default" },
      { text: "Workday", value: "workday" },
      { text: "Past", value: "past" }
    ],
    color: "orange",
    colorOptions: [
      { text: "Primary", value: "primary" },
      { text: "Secondary", value: "secondary" },
      { text: "Accent", value: "accent" },
      { text: "Red", value: "red" },
      { text: "Pink", value: "pink" },
      { text: "Purple", value: "purple" },
      { text: "Deep Purple", value: "deep-purple" },
      { text: "Indigo", value: "indigo" },
      { text: "Blue", value: "blue" },
      { text: "Light Blue", value: "light-blue" },
      { text: "Cyan", value: "cyan" },
      { text: "Teal", value: "teal" },
      { text: "Green", value: "green" },
      { text: "Light Green", value: "light-green" },
      { text: "Lime", value: "lime" },
      { text: "Yellow", value: "yellow" },
      { text: "Amber", value: "amber" },
      { text: "Orange", value: "orange" },
      { text: "Deep Orange", value: "deep-orange" },
      { text: "Brown", value: "brown" },
      { text: "Blue Gray", value: "blue-gray" },
      { text: "Gray", value: "gray" },
      { text: "Black", value: "black" }
    ],
    events: [
      {
        title: "Vacation",
        details: "Going to the beach!",
        date: "2000-08-17",
        dateDetail: "2000-08-17 08:15:00",
        category: "TRAVEL",
        catImg: "fas fa-plane",
        eventId: 1,
        open: false
      }
    ],
    sheet: false,
    tiles: [ /* 특정날짜 세부 옵션지정 */
      { img: "messenger.png", title: "일정 수정하기", id: "edit" },
      { img: "inbox.png", title: "일정 삭제하기", id: "delete" },
      { img: "keep.png", title: "일정 알람설정", id: "alarm" },
      { img: "hangouts.png", title: "팀원에게 공지하기", id: "notice" }
    ],
    date: new Date().toISOString().substr(0, 10),
    curMonth: new Date().getMonth(),
    dateFormatted: "",
    menu1: false,
    picker: null,
    title: "",
    description: "",
    categories: ["없음"],
    category: 1,
    catName: "CATEGORY",
    loading: false,
    obj: {},
    crossUrl: "http://13.58.134.195:8082/"
  }),
  created() {
    this.getList();
    this.getCat();
  },
  computed: {
    intervalStyle () {
      return stylings[ this.styleInterval ].bind(this);
    },
    eventsMap () {
      const map = {};
      this.events.forEach(e => (map[e.date] = map[e.date] || []).push(e));
      return map;
    },
    computedDateFormatted () {
      return this.formatDate(this.date);
    },
    checkEmpty () {
      if (this.dateFormatted == "" || this.picker == null || this.title == "" || this.description == "") {
        return false;
      }
      else return true;
    }
  },
  watch: {
    date (val) {
      this.dateFormatted = this.formatDate(this.date);
    }
  },
  methods: {
    printValue (obj) {
      this.obj = obj;
    },
    formatDate (date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${month}/${day}/${year}`;
    },
    parseDate (date) {
      if (!date) return null;

      const [month, day, year] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    },
    getCat () {
      const axios = require("axios");
      axios.get(this.crossUrl + "/getCatList").then(res => {
        this.categories = res.data;
      }).catch((ex) => {
        console.log(ex);
      });
    },
    saveList() {
      this.loading = true;
      const axios = require("axios");
      axios.get(this.crossUrl + "/regToDoList", {
        params: {
          sche_title: this.title,
          sche_details: this.description,
          sche_date: this.date + " " + this.picker + ":00",
          scheCat_id: this.category + "",
          uid: this.$store.state.user.uid
        }
      }).then(res => {
        this.getList();
        this.loading = false;
        this.writeDialog = false;
      }).catch((ex) => {
        console.log(ex);
      });
    },
    getList () {
      const axios = require("axios");
      let formData = new FormData();
      formData.append("uid", this.$store.state.user.uid);
      axios.get(this.crossUrl + "/getToDoList", {
        params: {
          uid: this.$store.state.user.uid
        }
      }).then(res => {
        this.events = [];
        res.data.forEach(e => this.events.push({ title: e.sche_title,
          details: e.sche_details,
          date: e.sche_date.substring(0, 10),
          dateDetail: e.sche_date,
          category: e.scheCat_name,
          catImg: e.scheCat_img,
          eventId: e.sche_id,
          open: false
        }));
      }).catch((ex) => {
        console.log(ex);
      });
    },
    showIntervalLabel (interval) {
      return interval.minute === 0;
    },
    open (event) {
      alert(event.title);
    },
    tileFunc (id) {
      var eventId = this.obj.eventId;
      if (id == "edit") {

      }
      else if (id == "delete") {
        const axios = require("axios");
        let formData = new FormData();
        formData.append("sche_id", eventId);
        axios.get(this.crossUrl + "/delToDoList", {
          params: {
            sche_id: eventId
          }
        }).then(res => {
          this.getList();
        }).catch((ex) => {
          console.log(ex);
        });
      }
      else if (id == "alarm") {
      }
      else { // notice

      }
      this.sheet = false;
    },
    prev () {
      if (this.curMonth < 1) {
        this.curMonth = 11;
      } else {
        this.curMonth -= 1;
      }
    },
    next () {
      if (this.curMonth > 10) {
        this.curMonth = 0;
      } else {
        this.curMonth += 1;
      }
    }
  }
};
</script>

<style scoped>

  .feature-pane {
    position: relative;
    padding-top: 30px;
    box-shadow: 0 0 10px rgba(0,0,0,0.3);
  }

  .day-header {
    margin: 0px 2px 2px 2px;
    padding: 2px 6px;
    background-color: #1867c0;
    color: #ffffff;
    border: 1px solid #1867c0;
    border-radius: 2px;
    user-select: none;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .day-body {
    position: absolute;
    top: 400px;
    height: 36px;
    margin: 2px;
    padding: 2px 6px;
    background-color: #1867c0;
    color: #ffffff;
    border: 1px solid #1867c0;
    border-radius: 2px;
    left: 0;
    right: 0;
    user-select: none;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .day {
    position: relative;
    height: 24px;
    margin: 0px;
    padding: 0px 6px;
    background-color: #1867c0;
    color: #ffffff;
    border: 1px solid #1867c0;
    border-radius: 2px;
    left: 0;
    right: 0;
    user-select: none;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

</style>

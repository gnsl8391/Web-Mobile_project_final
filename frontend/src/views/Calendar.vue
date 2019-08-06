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
      style="margin-bottom:20px; text-align: center;"
    >
    <v-btn
      fab
      outline
      small
      color="orange"
      @click="$refs.calendar.prev()"
      style="float:left;"
    >
      <v-icon dark>
        fas fa-chevron-left
      </v-icon>
    </v-btn>
    <span style="font-size:20px;"> 10월 </span>
    <v-btn
      fab
      outline
      small
      color="orange"
      @click="$refs.calendar.next()"
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
              v-model="event.open"
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
                      <v-btn icon>
                        <v-icon>fas fa-ellipsis-h</v-icon>
                      </v-btn>
                    </template>
                    <v-list>
                      <v-subheader>Open in</v-subheader>
                      <v-list-tile
                        v-for="tile in tiles"
                        :key="tile.title"
                        @click="sheet = false"
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
                <v-list three-line >
                  <template v-for="(item, index) in items">
                    <v-list-tile v-if="item.action" :key="item.title">
                      <v-list-tile-avatar>
                        <v-icon>{{ item.action }}</v-icon>
                      </v-list-tile-avatar>
                      <v-list-tile-content>
                        <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                        <v-list-tile-sub-title>{{ item.title }}</v-list-tile-sub-title>
                      </v-list-tile-content>
                    </v-list-tile>
                    <v-divider v-else-if="item.divider" :key="index"></v-divider>
                    <v-subheader v-else-if="item.header" :key="item.header" class="grey--text text--lighten-4">{{ item.header }}</v-subheader>
                    <v-divider :key="index" />
                  </template>
                </v-list>
                <v-card-actions>
                    <v-btn flat :color="color" >
                      수정
                    </v-btn>
                    <v-btn flat :color="color" >
                      삭제
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-menu>
            </template>
          </template>
        </v-calendar>
      </v-sheet>
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
    dark: false,
    startMenu: false,
    start: "2019-01-12",
    endMenu: false,
    end: "2019-01-27",
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
        date: "2018-12-30",
        open: false
      },
      {
        title: "Vacation",
        details: "Going to the beach!",
        date: "2018-12-31",
        open: false
      },
      {
        title: "Vacation",
        details: "Going to the beach!",
        date: "2019-01-01",
        open: false
      },
      {
        title: "Meeting",
        details: "Spending time on how we do not have enough time",
        date: "2019-01-07",
        open: false
      },
      {
        title: "30th Birthday",
        details: "Celebrate responsibly",
        date: "2019-01-03",
        open: false
      },
      {
        title: "New Year",
        details: "Eat chocolate until you pass out",
        date: "2019-01-01",
        open: false
      },
      {
        title: "Conference",
        details: "Mute myself the whole time and wonder why I am on this call",
        date: "2019-01-21",
        open: false
      },
      {
        title: "Hackathon",
        details: "Code like there is no tommorrow",
        date: "2019-02-01",
        open: false
      }
    ],
    sheet: false,
    tiles: [ /* 특정날짜 세부 옵션지정 */
      { img: "keep.png", title: "Keep" },
      { img: "inbox.png", title: "Inbox" },
      { img: "hangouts.png", title: "Hangouts" },
      { img: "messenger.png", title: "Messenger" },
      { img: "google.png", title: "Google+" }
    ],
    items: [
      {
        action: "far fa-clock",
        title: "Time"
      },
      {
        action: "far fa-file-alt",
        title: "Detail"
      },
      {
        action: "fas fa-tag",
        title: "Category"
      },
      {
        action: "fas fa-user-plus",
        title: "Member"
      }
    ]
  }),
  computed: {
    intervalStyle () {
      return stylings[ this.styleInterval ].bind(this);
    },
    eventsMap () {
      const map = {};
      this.events.forEach(e => (map[e.date] = map[e.date] || []).push(e));
      return map;
    }
  },
  methods: {
    showIntervalLabel (interval) {
      return interval.minute === 0;
    },
    open (event) {
      alert(event.title);
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

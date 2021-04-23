<template>
  <div>
    <v-row align="center" justify="center" class="mt-4 mb-1 hidden-lg-and-up">
      <v-chip label class="d-flex align-center flex-row caption text--text">
        <v-icon :size="20" color="text" class="scroll-chevron-left mr-1">
          mdi-chevron-double-left
        </v-icon>

        <span class="scroll-keyword text--text">{{
          "Scroll to view details"
        }}</span>

        <v-icon :size="20" color="text" class="scroll-chevron-right ml-1">
          mdi-chevron-double-right
        </v-icon>
      </v-chip>
    </v-row>
    <v-data-table
      :headers="headers"
      :items="dataList"
      class="elevation-0 transparentTable px-2 container--fluid position-relative"
      :search="search"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <!-- <v-divider
              class="mx-4"
              inset
              vertical
          ></v-divider> -->
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="600px" v-if="ifNewAndEdit()">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                新项目
              </v-btn>
              <!-- <span
                class="tooltip-header position-relative"
                v-on="on"
              ></span> -->
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col
                      cols="12"
                      sm="6"
                      md="6"
                      v-for="item in configList"
                      :key="item.value"
                      v-show="item.value != 'id' && item.value != 'drugCount'"
                    >
                      <v-select
                        :items="item.item"
                        :label="item.text"
                        v-show="item.select"
                        v-model="editedItem[item.value]"
                      ></v-select>
                      <v-text-field
                        :label="item.text"
                        v-show="!item.select"
                        v-model="editedItem[item.value]"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close"> 取消 </v-btn>
                <v-btn color="blue darken-1" text @click="save"> 保存 </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="headline">确定删除该项目？</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete"
                  >取消</v-btn
                >
                <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                  >确定</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.checkText="{ item }">
        <v-btn color="green" text @click="dialogCheckText = true">点击查看诊断记录</v-btn>
        <v-dialog v-model="dialogCheckText" max-width="500px" :retain-focus="false">
            <v-card>
              <v-card-title class="headline"
                >诊断记录</v-card-title
              >
              <v-card-text>
                {{ item.checkText }}
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="dialogCheckText = false"
                  >退出</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
      </template>
      <template v-slot:item.drugCount="{ item }">
        <v-tooltip
          allow-overflow
          offset-overflow
          :open-delay="-1"
          content-class="transparent backdrop-blur o-100 pa-0"
          bottom
        >
          <template v-slot:activator="{ on, attrs }">
            <td v-bind="attrs" v-on="on" @mouseenter="drugPreview(item.id)">
              {{ item.drugCount }}
            </td>
          </template>
          <v-card color="background" elevation="9">
            <v-card-title>
              <span class="title ml-2">
                {{ "Drug" }}
              </span>
            </v-card-title>
            <v-card-text>
              <v-simple-table dense>
                <thead>
                  <tr>
                    <th>
                      {{ "药物名" }}
                    </th>
                    <th class="font-weight-bold">
                      {{ "量词" }}
                    </th>
                    <th>
                      {{ "数量" }}
                      <v-icon small> mdi-sort-descending </v-icon>
                    </th>
                    <th>
                      {{ "总价" }}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(stat, index) in PreviewBuff"
                    :key="index"
                    class="monospace"
                    :class="'font-weight-bold'"
                  >
                    <td>
                      <v-icon small>
                        {{ "mdi-chevron-double-right" }}
                      </v-icon>
                      {{ stat.name }}
                    </td>
                    <td>
                      {{ stat.measure }}
                    </td>
                    <td>
                      {{ stat.quantity }}
                    </td>
                    <td>
                      {{ stat.price_count }}
                    </td>
                  </tr>
                  <tr v-if="index > 0" style="background: inherit !important">
                    <td colspan="3" class="text-center">
                      <v-icon color="grey"> mdi-dots-horizontal </v-icon>
                    </td>
                  </tr>
                </tbody>
              </v-simple-table>
            </v-card-text>
          </v-card>
        </v-tooltip>
      </template>

      <template v-slot:item.doctorName="{ item }">
        <v-tooltip
          allow-overflow
          offset-overflow
          :open-delay="-1"
          content-class="transparent backdrop-blur o-100 pa-0"
          bottom
        >
          <template v-slot:activator="{ on, attrs }">
            <td
              v-bind="attrs"
              v-on="on"
              @mouseenter="doctorPreview(item.doctorId)"
            >
              {{ item.doctorName }}
            </td>
          </template>
          <v-card color="background" elevation="9">
            <v-card-text>
              <v-simple-table dense>
                <thead>
                  <tr>
                    <th>
                      {{ "名字" }}
                    </th>
                    <th class="font-weight-bold">
                      {{ "科室" }}
                    </th>
                    <th class="font-weight-bold">
                      {{ "职责" }}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    :key="index"
                    class="monospace"
                    :class="'font-weight-bold'"
                  >
                    <td>
                      <v-icon small>
                        {{ "mdi-chevron-double-right" }}
                      </v-icon>
                      {{ PreviewBuff.name }}
                    </td>
                    <td>
                      {{ PreviewBuff.office }}
                    </td>
                    <td>
                      {{ PreviewBuff.responsibility }}
                    </td>
                  </tr>
                  <tr v-if="index > 0" style="background: inherit !important">
                    <td colspan="3" class="text-center">
                      <v-icon color="grey"> mdi-dots-horizontal </v-icon>
                    </td>
                  </tr>
                </tbody>
              </v-simple-table>
            </v-card-text>
          </v-card>
        </v-tooltip>
      </template>

      <template v-slot:item.patientName="{ item }">
        <v-tooltip
          allow-overflow
          offset-overflow
          :open-delay="-1"
          content-class="transparent backdrop-blur o-100 pa-0"
          bottom
        >
          <template v-slot:activator="{ on, attrs }">
            <td
              v-bind="attrs"
              v-on="on"
              @mouseenter="patientPreview(item.patientId)"
            >
              {{ item.patientName }}
            </td>
          </template>
          <v-card color="background" elevation="9">
            <v-card-text>
              <v-simple-table dense>
                <thead>
                  <tr>
                    <th>
                      {{ "姓名" }}
                    </th>
                    <th>
                      {{ "性别" }}
                    </th>
                    <th>
                      {{ "年龄" }}
                    </th>
                    <th>
                      {{ "身份证号" }}
                    </th>
                    <th>
                      {{ "手机号" }}
                    </th>
                    <th>
                      {{ "地址" }}
                    </th>
                    <th>
                      {{ "是否在治疗" }}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    :key="index"
                    class="monospace"
                    :class="'font-weight-bold'"
                  >
                    <td>
                      <v-icon small>
                        {{ "mdi-chevron-double-right" }}
                      </v-icon>
                      {{ PreviewBuff.name }}
                    </td>
                    <td>
                      {{ PreviewBuff.sex }}
                    </td>
                    <td>
                      {{ PreviewBuff.age }}
                    </td>
                    <td>
                      {{ PreviewBuff.idCard }}
                    </td>
                    <td>
                      {{ PreviewBuff.telNum }}
                    </td>
                    <td>
                      {{ PreviewBuff.address }}
                    </td>
                    <td>
                      {{ PreviewBuff.treatIf }}
                    </td>
                  </tr>
                  <tr v-if="index > 0" style="background: inherit !important">
                    <td colspan="3" class="text-center">
                      <v-icon color="grey"> mdi-dots-horizontal </v-icon>
                    </td>
                  </tr>
                </tbody>
              </v-simple-table>
            </v-card-text>
          </v-card>
        </v-tooltip>
      </template>

      <template v-slot:item.actions="{ item }">
        <v-btn
          x-small
          @click="editItem(item)"
          fab
          dark
          color="purple"
          v-show="ifNewAndEdit()"
        >
          <v-icon dark> mdi-pencil </v-icon></v-btn
        >
        <v-btn x-small @click="deleteItem(item)" fab dark color="pink">
          <v-icon dark> mdi-delete </v-icon></v-btn
        >
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize"> Reset </v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import API from "../../api/api_data";
export default {
  inject: ["reload"],
  props: ["dataList", "configList", "ifNew"],
  data: () => ({
    PreviewBuff: {},
    snackbar: false,
    search: "",
    dialog: false,
    dialogDelete: false,
    tableCellClasses: "px-2 font-weight-bold monospace",
    headers: [],
    desserts: [],
    newItem: {},
    editedIndex: -1,
    editedItem: {},
    defaultItem: {},
    dialogCheckText: false,
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    console.log(this.dataList);
    this.initialize();
  },

  methods: {
    ifNewAndEdit() {
      let url = window.location.href;
      if (url.split("/").pop() == "bill") {
        console.log("1");
        return false;
      } else {
        return true;
      }
    },
    initialize() {
      this.headers = [];
      for (let key in this.dataList[0]) {
        if (key === "patientId" || key === "doctorId") continue;
        let obj = new Object();
        let buf = this.configList[key];
        if (key === "id") {
          this.editedItem[key] = null;
          this.defaultItem[key] = null;
        } else {
          this.editedItem[key] = "";
          this.defaultItem[key] = "";
        }
        obj["value"] = key;
        obj["text"] = buf["text"];
        obj["align"] = buf["align"];
        this.headers.push(obj);
      }
      let obj = new Object();
      obj["value"] = "actions";
      obj["text"] = "操作";
      obj["align"] = "center";
      this.headers.push(obj);
      console.log(this.headers);
    },
    editItem(item) {
      this.editedIndex = this.dataList.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.dataList.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      let url = window.location.href;
      let _this = this;
      API.Post(
        "api/" + url.split("/").pop() + "/delete",
        this.editedItem.id
      ).then(function (res) {
        //验证
        if (res.code == 104) {
          alert(res.msg);
        } else if (res.code == 101) {
          alert(res.msg);
          let NewPage = "_empty" + "?time=" + new Date().getTime() / 500;
          _this.$router.push(NewPage);
          _this.$router.go(-1);
        }
      });
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    save() {
      let url = window.location.href;
      let _this = this;
      if (this.editedItem.id === null || this.editedIndex === -1) {
        //new item
        API.Post("api/" + url.split("/").pop() + "/new", this.editedItem).then(
          function (res) {
            // 验证
            if (res.code == 104) {
              alert(res.msg);
            } else if (res.code == 101) {
              _this.close();
              alert(res.msg);
              let NewPage = "_empty" + "?time=" + new Date().getTime() / 500;
              _this.$router.push(NewPage);
              _this.$router.go(-1);
            }
          }
        );
      } else {
        API.Post("api/" + url.split("/").pop() + "/edit", this.editedItem).then(
          function (res) {
            // 验证
            if (res.code == 104) {
              alert(res.msg);
            } else if (res.code == 101) {
              _this.close();
              alert(res.msg);
              let NewPage = "_empty" + "?time=" + new Date().getTime() / 500;
              _this.$router.push(NewPage);
              _this.$router.go(-1);
            }
          }
        );
      }
      this.close();
    },
    drugPreview(id) {
      let _this = this;
      API.Post("api/bill/drugPreview", id).then(function (res) {
        _this.PreviewBuff = res;
      });
    },
    doctorPreview(id) {
      let _this = this;
      console.log("doctor" + id);
      API.Post("api/bill/doctorPreview", id).then(function (res) {
        console.log(res);
        _this.PreviewBuff = res;
      });
      console.log(this.PreviewBuff);
    },
    patientPreview(id) {
      let _this = this;
      console.log("patient" + id);
      API.Post("api/bill/patientPreview", id).then(function (res) {
        _this.PreviewBuff = res;
        console.log(res);
      });
      console.log(this.PreviewBuff);
    },
  },
};
</script>

<style scoped>
.full-width {
  width: 100%;
}

.stage-card--background {
  background-size: cover !important;
  background-repeat: no-repeat !important;
  background-position: center center !important;
}

.theme--light .stage-card--header {
  background: rgba(240, 240, 240, 0.9) !important;
  background: linear-gradient(
    to bottom,
    rgba(240, 240, 240, 0.9),
    rgba(240, 240, 240, 0.85)
  ) !important;
}

.theme--light .stage-card--content {
  background: rgba(255, 255, 255, 0.85) !important;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.85),
    rgba(255, 255, 255, 0.7)
  ) !important;
}

.theme--dark .stage-card--header {
  background: rgba(30, 30, 30, 0.9) !important;
  background: linear-gradient(
    to bottom,
    rgba(30, 30, 30, 0.9),
    rgba(30, 30, 30, 0.85)
  ) !important;
}

.theme--dark .stage-card--content {
  background: rgba(0, 0, 0, 0.8) !important;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.85),
    rgba(0, 0, 0, 0.7)
  ) !important;
}

.history-stage-cards {
  /* 92px: 2 lines of cardHeight (38px stage card height + 2 * 4px margin) */
  max-height: 92px;
  overflow: hidden;

  /* 83(82.8)px: 1.8 * cardHeight */
  /* 65px: 2 * cardHeight - 4px margin */
  /*mask: linear-gradient(to right, rgba(0, 0, 0, 1) 90%, transparent);*/
  /*-webkit-mask: -webkit-gradient(linear, left top, left bottom, from(rgba(0, 0, 0, 1)), color-stop(92), to(rgba(0, 0, 0, 0)));*/
  /*-webkit-mask: -webkit-gradient(linear, left top, left bottom, from(rgba(0, 0, 0, 1) ), to(rgba(0, 0, 0, 0)));*/
}
</style>
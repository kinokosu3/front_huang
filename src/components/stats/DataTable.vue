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
      :item-class="rowClass"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <!-- <v-divider
              class="mx-4"
              inset
              vertical
          ></v-divider> -->
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="600px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                New Item
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
                      v-show="item.value != 'id'"
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
                <v-btn color="blue darken-1" text @click="close">
                  Cancel
                </v-btn>
                <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="headline"
                >Are you sure you want to delete this item?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete"
                  >Cancel</v-btn
                >
                <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                  >OK</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>

      <template v-slot:item.actions="{ item }">
        <v-btn x-small @click="editItem(item)" fab dark color="purple">
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
  props: ["dataList", "configList"],
  data: () => ({
    dialog: false,
    dialogDelete: false,
    tableCellClasses: "px-2 font-weight-bold monospace",
    headers: [],
    desserts: [],
    newItem: {},
    editedIndex: -1,
    editedItem: {
    },
    defaultItem: {
    },
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
    this.initialize();
  },

  methods: {
    initialize() {
      for (let key in this.dataList[0]) {
        let obj = new Object();
        let buf = this.configList[key];
        if(key === "id"){
          this.editedItem[key] = null;
          this.defaultItem[key] = null;
        }else{
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
    },
    editItem(item) {
      this.editedIndex = this.dataList.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
      console.log(this.editedIndex);
    },

    deleteItem(item) {
      this.editedIndex = this.dataList.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      let url = window.location.href;
      API.Post('api/'+url.split('/').pop()+'/delete', this.editedItem.id).then(function (res){
          //验证
          if(res.code == 104){
            alert(res.msg);
          }else if(res.code == 101){
            alert(res.msg);
          }
      })
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
      if(this.editedItem.id === null || this.editedIndex === -1){
        //new item
        console.log(this.editedItem);
        console.log(this.editedIndex);
        let _this = this;
        API.Post('api/'+url.split('/').pop()+'/new', this.editedItem).then(function (res){
            // 验证
            if(res.code == 104){
              alert(res.msg);
            }else if(res.code == 101){
              alert(res.msg);
              _this.close();
            }
        })
      }else{
        API.Post('api/'+url.split('/').pop()+'/edit',this.editedItem).then(function (res){
          // 验证
            if(res.code == 104){
              alert(res.msg);
            }else if(res.code == 101){
              alert(res.msg);
              this.dialog = false;
              _this.close();
            }
        })
      }
      this.close();
    },
  },
};
</script>

<style scoped>
.full-width {
  width: 100%;
}
.rowClass {
  font-weight: bold;
  font-family: monospace;
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
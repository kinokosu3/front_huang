<template>
  <v-container fluid class="align-content-center justify-center">
    <v-row class="my-3 mx-6 flex-row" align="center">
      <span class="title">
        {{ "planner.actions._name" }}
      </span>
      <v-divider vertical class="mx-4" />
    </v-row>
    <v-row class="my-3 mx-6 flex-row" align="center">
      <v-dialog v-model="dialog" persistent max-width="900px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            block
            class="my-1"
            :class="{}"
            color="teal white--text"
            :disabled="false"
            x-large
            :loading="false"
            v-bind="attrs"
            v-on="on"
          >
            <template v-slot:loader>
              <v-progress-circular
                indeterminate
                :size="16"
                :width="2"
                class="mr-2"
              />
              {{ "planner.actions.calculating" }}
            </template>
            <v-icon left> mdi-calculator </v-icon>
            {{ "planner.actions.calculate" }}
            <v-icon right> mdi-chevron-right </v-icon>
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">账单</span>
          </v-card-title>

          <v-card-text>
            <v-container>
              <v-row class="mb-3 mt-2">
                <v-col cols="12" sm="6" md="5">
                  <v-autocomplete
                    v-model="name"
                    :items="nameItems"
                    :loading="nameLoading"
                    :search-input.sync="nameSearch"
                    flat
                    clearable
                    hide-no-data
                    hide-details
                    item-text="name"
                    item-value="name"
                    label="姓名*"
                    required
                    cache-items
                  >
                    <template v-slot:item="{ item }">
                      <v-list-item-avatar
                        color="indigo"
                        class="headline font-weight-light white--text"
                      >
                        {{ item.name.charAt(0) }}
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-title
                          v-text="item.name"
                        ></v-list-item-title>
                        <v-list-item-subtitle
                          v-text="item.idCard"
                        ></v-list-item-subtitle>
                      </v-list-item-content>
                    </template>
                  </v-autocomplete>
                </v-col>
                <v-col cols="12" sm="6" md="5">
                  <v-autocomplete
                    v-model="staff"
                    :items="staffItems"
                    :loading="staffLoading"
                    :search-input.sync="staffSearch"
                    flat
                    clearable
                    hide-no-data
                    hide-details
                    item-text="name"
                    item-value="office"
                    label="主治医师*"
                    required
                    cache-items
                  >
                    <template v-slot:item="{ item }">
                      <v-list-item-avatar
                        color="indigo"
                        class="headline font-weight-light white--text"
                      >
                        {{ item.name.charAt(0) }}
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-title
                          v-text="item.name"
                        ></v-list-item-title>
                        <v-list-item-subtitle
                          v-text="item.office"
                        ></v-list-item-subtitle>
                      </v-list-item-content>
                    </template>
                  </v-autocomplete>
                </v-col>
              </v-row>

              <v-row v-for="(item, index) in dynamicDrugItems" :key="index">
                <v-col cols="12" md="5" sm="6">
                  <v-autocomplete
                    v-model="item.name"
                    :items="drugNameItems"
                    :loading="drugNameLoading"
                    :search-input.sync="item.sync_func"
                    flat
                    clearable
                    hide-no-data
                    hide-details
                    item-text="name"
                    item-value="name"
                    label="药物"
                    cache-items
                    required
                  >
                    <template v-slot:item="{ item }">
                      <v-list-item-avatar
                        color="indigo"
                        class="headline font-weight-light white--text"
                      >
                        {{ item.name.charAt(0) }}
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-title
                          v-text="item.name"
                        ></v-list-item-title>
                        <v-list-item-subtitle
                          v-text="item.company"
                        ></v-list-item-subtitle>
                      </v-list-item-content>
                    </template>
                  </v-autocomplete>
                </v-col>
                <v-col cols="12" md="2" sm="6">
                  <v-select
                    :items="drugMeasureObj[item.name]"
                    label="量词"
                    v-model="item.measure"
                  ></v-select>
                </v-col>
                <v-col cols="12" md="1" sm="6">
                  <v-text-field
                    label="数量"
                    v-model="item.number"
                  ></v-text-field>
                </v-col>
                <template v-if="index == Object.keys(dynamicDrugItems).length">
                  <v-col cols="3" md="2">
                    <v-btn
                      color="primary"
                      class="mt-3"
                      @click="addItem((parseInt(index) + 1).toString())"
                      >new item</v-btn
                    >
                  </v-col>
                </template>
                <v-col cols="3" md="1">
                  <v-btn
                    class="mt-3"
                    color="error"
                    v-if="index !== '1'"
                    @click="deleteItem(index)"
                    >delete item</v-btn
                  >
                </v-col>
              </v-row>
              <v-textarea
                outlined
                name="input-7-4"
                label="Outlined textarea"
                value="欲练神功，必先自宫"
                v-model="check_text"
              ></v-textarea>
              <v-btn
                block
                class="my-1"
                color="teal white--text"
                :disabled="false"
                x-large
                :loading="false"
                @click="calculate"
              >
                <v-icon left> mdi-calculator </v-icon>
                {{ "calculate" }}
                <v-icon right> mdi-chevron-right </v-icon>
              </v-btn>
              <v-alert
                :value="alert"
                color="red darken-1"
                dark
                border="top"
                icon="mdi-credit-card-check"
                transition="scale-transition"
              >
                一共{{ count_price }}元
              </v-alert>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialog = false">
              Close
            </v-btn>
            <v-btn color="blue darken-1" text @click="saveBill"> Save </v-btn>
          </v-card-actions>

          <!-- <v-toolbar dark color="teal">
            <v-toolbar-title>State selection</v-toolbar-title>
            <v-autocomplete
              v-model="select"
              :items="items"
              :loading="loading"
              :search-input.sync="search"
              class="mx-4"
              flat
              clearable
              hide-no-data
              hide-details
              item-text="username"
              item-value="id"
              label="Search for a coin..."
              solo-inverted
            >
              <template v-slot:item="{ item }">
                <v-list-item-avatar
                  color="indigo"
                  class="headline font-weight-light white--text"
                >
                  {{ item.username.charAt(0) }}
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title v-text="item.username"></v-list-item-title>
                  <v-list-item-subtitle
                    v-text="item.password"
                  ></v-list-item-subtitle>
                </v-list-item-content>
              </template>
            </v-autocomplete> -->
          <!-- </v-toolbar> -->
        </v-card>
      </v-dialog>
    </v-row>
  </v-container>
</template>


<script>
import API from "../api/api_data";
export default {
  data() {
    return {
      count_price: 0,
      alert: false,
      dialog: false,
      loading: false,
      nameLoading: false,
      // items: [],
      nameSearch: null,
      // select: null,
      name: null,
      nameItems: [],
      nameLoading: false,
      staff: null,
      staffSearch: null,
      staffItems: [],
      staffLoading: false,
      check_text: "",

      auto_watchfunc_cache: [],
      price_dict: {},
      drug_id_dict:{},
      dynamicDrugItems: {
        1: {
          measure: "",
          name: "",
          number: "",
          sync_func: null,
        },
      },
      drugName: "",
      drugNameItems: [],
      drugMeasureObj: new Object(),
      drugNameLoading: false,
      drugNameSearch: null,
      bill_list: {
        id: "",
        name_id: "",
        doctor_id: "",
        drug_list: {},
        count_price: "",
        check_text: "",
        time:"",
      },
    };
  },
  // computed: {
  //   newA: function () {
  //     return JSON.parse(JSON.stringify(this.test_items));
  //   },
  // },
  watch: {
    search(val) {
      val && val !== this.select && this.querySelections(val);
    },
    nameSearch(val) {
      val && val !== this.name && this.nameSelections(val);
    },
    staffSearch(val) {
      val && val !== this.staff && this.staffSelections(val);
    },
    dynamicDrugItems(val) {
      console.log(val);
    },
    "dynamicDrugItems.1.sync_func": {
      deep: true,
      handler: function (val) {
        console.log(val);
        val && val !== this.drugName && this.drugSelections(val);
      },
    },
  },
  methods: {
    calculate() {
      this.count_price = this.count_func();
      this.alert = !this.alert;
    },
    querySelections(v) {
      this.nameItems = [];
      this.loading = true;
      let _this = this;
      API.Post("api/user/search", v).then(function (res) {
        _this.items = res;
        _this.loading = false;
      });
    },
    nameSelections(val) {
      this.nameItems = [];
      this.nameLoading = true;
      let _this = this;
      API.Post("api/patient/search", val).then(function (res) {
        _this.nameItems = res;
        _this.nameLoading = false;
      });
    },
    staffSelections(val) {
      this.staffItems = [];
      this.staffLoading = true;
      let _this = this;
      API.Post("api/officeManage/search", val).then(function (res) {
        _this.staffItems = res;
        _this.staffLoading = false;
      });
    },
    drugSelections(val) {
      this.drugNameItems = [];
      this.drugLoading = true;
      let _this = this;
      API.Post("api/drug/search", val).then(function (res) {
        _this.drugNameItems = res;
        for (var i = 0; i < res.length; i++) {
          if (res[i].name + "|" + res[i].measure in _this.price_dict) {
            continue;
          } else {
            _this.price_dict[res[i].name + "|" + res[i].measure] = res[i].price;
            _this.drug_id_dict[res[i].name + "|" + res[i].measure] = res[i].id;
          }
          if (res[i].name in _this.drugMeasureObj) {
            _this.drugMeasureObj[res[i].name].push(res[i].measure);
          } else {
            var list = [];
            list.push(res[i].measure);
            _this.drugMeasureObj[res[i].name] = list;
          }
        }
        _this.drugLoading = false;
      });
    },
    addItem(num) {
      if (this.auto_watchfunc_cache.find((el) => el == num) == num) {
      } else {
        this.$watch(
          "dynamicDrugItems." + num + ".sync_func",
          function (val) {
            val && val !== this.drugName && this.drugSelections(val);
          },
          { deep: true }
        );
        this.auto_watchfunc_cache.push(num);
      }
      this.$set(this.dynamicDrugItems, num, {
        measure: "",
        name: "",
        number: "",
        sync_func: null,
      });
    },
    deleteItem(index) {
      this.$delete(this.dynamicDrugItems, index);
    },
    count_func(){
      this.bill_list.drug_list = {};
      let count = 0;
      for(var i in this.dynamicDrugItems){
        if (
          this.dynamicDrugItems[i].name == "" ||
          this.dynamicDrugItems[i].measure == "" ||
          this.dynamicDrugItems[i].number == "" || this.dynamicDrugItems[i].number == "0"
        ) {
          alert("药物有参数为空");
          return false;
        } else {
          let name = this.dynamicDrugItems[i].name+'|'+this.dynamicDrugItems[i].measure;
          let num = this.dynamicDrugItems[i].number;
          count = count + this.price_dict[name] * num
          this.bill_list.drug_list[this.drug_id_dict[name]] = num;
        }
      }
      return count;
    },
    saveBill() {
      // this.bill_list.name_id = this.nameItems[0].id;
      // this.bill_list.doctor_id = this.staffItems[0].id;
      // this.bill_list.drug_list = this.dynamicDrugItems;
      // // this.bill_list
      // console.log(this.bill_list);
      if(this.nameItems.length == 0 || this.staffItems.length == 0 || this.check_text == ""){
          alert("姓名或医生或诊断文本有参数为空");
          return;
      }else{
            this.bill_list.name_id = this.nameItems[0].id;
            this.bill_list.doctor_id = this.staffItems[0].id;
            let count_price = this.count_func();
            if(count_price){    
                this.bill_list.count_price = count_price;
            }else{
              return;
            }
            this.bill_list.check_text = this.check_text;
      }
      API.Post("api/bill", this.bill_list).then(function (res) {

      })
    },
  },
};
</script>






<style>
</style>
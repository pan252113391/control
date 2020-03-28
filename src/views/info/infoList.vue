<template>
  <div class="infoList">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <!-- 类型 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="类型">
            <el-select v-model="formInline.value" clearable placeholder="请选择">
              <el-option
                v-for="item in formInline1.options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <!-- 时间 -->
        <el-col :span="8">
          <el-date-picker
            v-model="formInline.value1"
            type="datetimerange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['12:00:00']"
          ></el-date-picker>
        </el-col>
        <!-- 关键字 -->
        <el-col :span="8">
          <el-form-item label="关键词">
            <el-select v-model="formInline.value" clearable placeholder="请选择">
              <el-option
                v-for="item in formInline.options2"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "infoList",
  data() {
    return {
      formInline: {
        options1: [
          {
            value: "选项1",
            label: "国内信息"
          },
          {
            value: "选项2",
            label: "国外信息"
          },
           {
            value: "选项2",
            label: "国外信息"
          }
        ],
        options2: [
          {
            value: "选项1",
            label: "国际信息"
          },
          {
            value: "选项2",
            label: "黄金"
          }
        ],
        value: "",
        value1: ""
      }
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
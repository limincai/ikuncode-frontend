<template>
  <div id="ranking-view">
    <!-- 用户排名列表 -->
    <a-table
      :columns="columns"
      :data="userRankingList.records"
      page-position="bottom"
      :pagination="{
        current: userRankingRequest.currentPage,
        pageSize: userRankingRequest.pageSize,
        total: userRankingList.total,
        showTotal: true,
      }"
      @pageChange="handlePageChange"
      class="question-table"
    >
      <!-- 排名 -->
      <template #rank="{ record }">
        {{ record.index }}
      </template>
      <!-- 用户 -->
      <template #userLink="{ record }">
        <a-link
          :hoverable="false"
          style="color: rgb(17, 47, 143)"
          @click="toUserHomeView(record.userId)"
        >
          {{ record.userNickname }}
        </a-link>
      </template>
    </a-table>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import UserControllerApi from "@/api/UserControllerApi";
import { useRouter } from "vue-router";

const router = useRouter();

/**
 * 题目列表
 */
const userRankingList = ref([]);

/**
 * 题目列表请求对象
 */
const userRankingRequest = reactive({
  // 当前页码
  currentPage: 1,
  // 页面尺寸
  pageSize: 10,
});

/**
 * 获取用户排名列表
 */
const fetchUserRankingList = async () => {
  console.log("userRankingRequest:" + userRankingRequest.currentPage);
  userRankingList.value = await UserControllerApi.getUserRankingListByPost({
    currentPage: userRankingRequest.currentPage,
    pageSize: userRankingRequest.pageSize,
  });
  // 为每条记录添加索引
  userRankingList.value.records.forEach((item, index) => {
    item.index =
      (userRankingRequest.currentPage - 1) * userRankingRequest.pageSize +
      index +
      1;
  });
};

/**
 * 页面加载时获取题目列表
 */
onMounted(async () => {
  await fetchUserRankingList();
});

/**
 * 展示列
 */
const columns = [
  {
    title: "排名",
    slotName: "rank",
    align: "center",
  },
  {
    title: "用户",
    slotName: "userLink",
    align: "center",
  },
  {
    title: "完成题目数量",
    dataIndex: "acceptedQuestionNum",
    align: "center",
  },
  {
    title: "鸡脚数量",
    dataIndex: "userJijiao",
    align: "center",
  },
];

/**
 * 处理页数变化
 */
const handlePageChange = async (currentPage) => {
  console.log("currentPage" + currentPage);
  userRankingRequest.currentPage = currentPage;
  await fetchUserRankingList();
};

const toUserHomeView = (userId) => {
  router.push(`/user/${userId}`);
};
</script>

<style lang="scss" scoped>
#ranking-view {
}
</style>

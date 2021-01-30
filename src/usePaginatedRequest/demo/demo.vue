<template>
  <div>
    <p>loading: {{ loading }}</p>
    <Pagination
      v-model:current="pagination.current"
      v-model:pageSize="pagination.pageSize"
      :total="pagination.total"
    />
    <ul v-if="!loading && data" style="font-size: 14px">
      <li v-for="user of data?.list" :key="user.id">
        <span>{{ user.name }}</span> - <span>{{ user.email }}</span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { usePaginatedRequest } from 'ahooks-vue';
import Mock from 'mockjs';
import Pagination from './Pagination.vue';

interface UserListItem {
  id: string;
  name: string;
  gender: 'male' | 'female';
  email: string;
  disabled: boolean;
}

const userList = (current: number, pageSize: number) =>
  Mock.mock({
    total: 55,
    [`list|${pageSize}`]: [
      {
        id: '@guid',
        name: '@cname',
        'gender|1': ['male', 'female'],
        email: '@email',
        disabled: false,
      },
    ],
  });

async function getUserList(params: {
  current: number;
  pageSize: number;
  gender?: string;
}): Promise<{ total: number; list: UserListItem[] }> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(userList(params.current, params.pageSize));
    }, 1000);
  });
}

export default {
  components: {
    Pagination,
  },
  setup() {
    const {
      pagination,
      loading,
      data,
    } = usePaginatedRequest(({ current, pageSize }) =>
      getUserList({ current, pageSize }),
    );

    return {
      pagination,
      loading,
      data,
    };
  },
};
</script>

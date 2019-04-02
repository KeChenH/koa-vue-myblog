<template>
  <div class="layout">
    <Layout>
      <!-- <Header>123123</Header> -->
      <Content class="content">
        <Card class="blog-item" v-for="item in blogs" :key="item.index">
          <p slot="title">{{item.title}}</p>
          <p v-html="item.content"></p>
        </Card>
      </Content>
      <Footer></Footer>
    </Layout>
  </div>
</template>
<script>
export default {
  data() {
    return {
      blogs: []
    };
  },
  methods: {
    getBlog() {
      //设置分页数据
      let query = {
        page: 1,
        pageSize: 8
      };
      this.$http.get("/user/getAll", { params: query }).then(res => {
        this.blogs = res.data;
      });
    }
  },
  mounted() {
    this.getBlog();
  }
};
</script>

<style lang=less>
.layout {
  height: 100%;
}
.content {
  display: flex;
  align-content: center;
  justify-content: center;
  flex-flow: row wrap;
  .blog-item {
    margin: 20px;
    width: 300px;
    height: 400px;
    overflow: hidden;
  }
}
</style>

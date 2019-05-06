<template>
  <div class="wrap">
    <Card :border="false" class="login-wrap">
      <p slot="title" class="title">HKC</p>
      <Form ref="formInline" :model="formInline" :rules="ruleInline">
        <FormItem prop="username">
          <Input type="text" v-model="formInline.username" placeholder="Username"></Input>
        </FormItem>
        <FormItem prop="password">
          <Input type="password" v-model="formInline.password" placeholder="Password"></Input>
        </FormItem>
        <FormItem>
          <Button type="default" ghost long @click="handleSubmit('formInline')">登录</Button>
        </FormItem>
      </Form>
    </Card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      formInline: {
        username: "",
        password: ""
      },
      ruleInline: {
        username: [
          {
            required: true,
            message: "Please fill in the user name",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "Please fill in the password.",
            trigger: "blur"
          },
          {
            type: "string",
            min: 6,
            message: "The password length cannot be less than 6 bits",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          let params = this.formInline;
          this.$http.post("/user/login", params).then(res => {
            if (res.code === 0) {
              localStorage.setItem("koaToken", res.data.token);
              localStorage.setItem("koaUser", res.data.user);
              this.$router.push("/list");
            } else {
              this.$Message.error("用户名或密码不正确!");
            }
          });
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.wrap {
  width: 100%;
  height: 100%;
  background: url("../../static/img/bg.jpg") no-repeat 0 0;
  padding-top: 240px;
  background-size: cover;
}

.login-wrap {
  width: 360px;
  margin-left: 60%;
  background: none;
  opacity: 0.8;
  text-align: center;
  &:hover {
    opacity: 1;
  }
}
.title {
  color: #fff;
}
</style>


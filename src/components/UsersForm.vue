<template>
  <Form :validation-schema="schema" @submit="submitHandler">
    <div class="card-header">
      <h3 class="card-title">User</h3>
      <div class="card-tools">
        <button
          type="button"
          class="btn btn-tool"
          data-card-widget="collapse"
          title="Collapse"
        >
          <i class="fas fa-minus"></i>
        </button>
      </div>
    </div>
    <div class="card-body">
      <div v-if="!successful">
        <!-- NAME -->
        <div class="form-group">
          <label for="name">Name</label>
          <Field
            v-model="form.name"
            name="name"
            type="text"
            class="form-control"
            required
          />
          <ErrorMessage name="name" class="error-feedback" />
        </div>
        <!-- EMAIL -->
        <div class="form-group">
          <label for="email">Email</label>
          <Field
            v-model="form.email"
            name="email"
            type="text"
            class="form-control"
            required
          />
          <ErrorMessage name="email" class="error-feedback" />
        </div>
        <!-- PASSWORD -->
        <div class="form-group">
          <label for="start_date">Password</label>
          <Field
            v-model="form.password"
            name="password"
            type="password"
            class="form-control"
            required
          />
          <ErrorMessage name="password" class="error-feedback" />
        </div>
        <!-- PASSWORD CONFIRM -->
        <div class="form-group">
          <label for="password_confirmation">Password Confirm</label>
          <Field
            v-model="form.password_confirmation"
            name="password_confirmation"
            type="password"
            class="form-control"
            required
          />
          <ErrorMessage name="password_confirmation" class="error-feedback" />
        </div>
      </div>
      <!-- MESSAGE -->
      <div
        v-if="message"
        class="alert"
        :class="successful ? 'alert-success' : 'alert-danger'"
      >
        {{ message }}
      </div>
    </div>
    <div class="card-footer clearfix">
      <!-- SAVE -->
      <button class="btn btn-primary float-right" :disabled="loading">
        <span v-show="loading" class="spinner-border spinner-border-sm" />
        Save
      </button>
      <!-- BACK -->
      <router-link
        v-if="UserService.can('view any users')"
        to="/users"
        class="btn btn-text float-right"
        ><i class="fas fa-pencil"></i> Back</router-link
      >
    </div>
  </Form>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import UsersService from "../services/users.service.js";
import UserService from "../services/user.service.js";
import moment from "moment";

export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  props: {
    user: {
      type: Object,
      default: () => ({}),
    },
  },
  emits: ["on-submit"],
  data() {
    const schema = yup.object().shape({
      name: yup.string().required("Name is required!"),
      email: yup.string().required("Email is required!"),
      password: yup.string().required("Password is required!"),
      password_confirmation: yup.string().required("Password Confirmation is required!"),
    });
    return {
      form: {
        name: this.user?.name || "",
        email: this.user?.email || "",
        password: "",
        password_confirmation: "",
      },
      successful: false,
      loading: false,
      message: "",
      schema,
      UserService: UserService,
      UsersService: UsersService,
      moment: moment,
    };
  },
  methods: {
    submitHandler() {
      this.message = "";
      this.successful = false;
      this.loading = true;
      this.$emit("on-submit", this.form);
    },
  },
};
</script>

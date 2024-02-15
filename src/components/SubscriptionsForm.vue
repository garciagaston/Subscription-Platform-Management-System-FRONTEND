<template>
  <Form :validation-schema="schema" @submit="submitHandler">
    <div class="card-body">
      <div v-if="!successful">
        <!-- USER_ID -->
        <div class="form-group">
          <label for="user_id">User Id</label>
          <Field
            v-model="form.user_id"
            name="user_id"
            type="text"
            class="form-control"
            required
          />
          <ErrorMessage name="user_id" class="error-feedback" />
        </div>
        <!-- PACKAGE ID -->
        <div class="form-group">
          <label for="package_id">Package ID</label>
          <Field
            v-model="form.package_id"
            name="package_id"
            type="textarea"
            class="form-control"
            required
          />
          <ErrorMessage name="package_id" class="error-feedback" />
        </div>
        <!-- START_DATE -->
        <div class="form-group">
          <label for="start_date">Start Date</label>
          <Field
            v-model="form.start_date"
            name="start_date"
            type="date"
            class="form-control"
            required
          />
          <ErrorMessage name="start_date" class="error-feedback" />
        </div>
        <!-- END_DATE -->
        <div class="form-group">
          <label for="end_date">End Date</label>
          <Field
            v-model="form.end_date"
            name="end_date"
            type="date"
            class="form-control"
            required
          />
          <ErrorMessage name="end_date" class="error-feedback" />
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
        v-if="UserService.can('view any subscriptions')"
        to="/subscriptions"
        class="btn btn-text float-right"
        ><i class="fas fa-pencil"></i> Back</router-link
      >
    </div>
  </Form>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import SubscriptionService from "../services/subscriptions.service.js";
import UserService from "../services/user.service.js";
import moment from "moment";

export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  props: {
    subscription: {
      type: Object,
      default: () => ({}),
    },
  },
  emits: ["on-submit"],
  data() {
    const schema = yup.object().shape({
      user_id: yup
        .number()
        .required("User Id is required!"),
      package_id: yup
        .number()
        .required("Package Id is required!"),
      start_date: yup
        .date()
        .required("start_date is required!"),
      end_date: yup
        .date()
        .required("end_date is required!"),
    });
    return {
      form: {
        user_id: this.subscription?.user_id || "",
        package_id: this.subscription?.package_id || "",
        start_date: (this.subscription?.start_date) ? moment(this.subscription.start_date).format("YYYY-MM-DD") : "",
        end_date: (this.subscription?.end_date) ? moment(this.subscription.end_date).format("YYYY-MM-DD") : "",
      },
      successful: false,
      loading: false,
      message: "",
      schema,
      UserService: UserService,
      SubscriptionService: SubscriptionService,
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

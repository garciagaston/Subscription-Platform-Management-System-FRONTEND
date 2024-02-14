<template>
  <Form :validation-schema="schema" @submit="submitHandler">
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
        <!-- DESCRIPTION -->
        <div class="form-group">
          <label for="description">Description</label>
          <Field
            v-model="form.description"
            name="description"
            type="textarea"
            class="form-control"
            required
          />
          <ErrorMessage name="description" class="error-feedback" />
        </div>
        <!-- LINEUP_ID -->
        <div class="form-group">
          <label for="lineup_id">Lineup Id</label>
          <Field
            v-model="form.lineup_id"
            name="lineup_id"
            type="number"
            class="form-control"
            required
          />
          <ErrorMessage name="lineup_id" class="error-feedback" />
        </div>
        <!-- CALL_SIGN -->
        <div class="form-group">
          <label for="call_sign">Call Sign</label>
          <Field
            v-model="form.call_sign"
            name="call_sign"
            type="text"
            class="form-control"
            required
          />
          <ErrorMessage name="call_sign" class="error-feedback" />
        </div>
        <!-- IMAGE_URL -->
        <div class="form-group">
          <label for="image_url">Image URL</label>
          <Field
            v-model="form.image_url"
            name="image_url"
            type="text"
            class="form-control"
            required
          />
          <ErrorMessage name="image_url" class="error-feedback" />
        </div>
        <!-- ACTIVE -->
        <div class="form-group row">
          <div class="col-sm-10">
            <div class="form-check">
              <input
                id="active"
                v-model="form.active"
                name="active"
                type="checkbox"
                class="form-check-input"
              />
              <label class="form-check-label" for="active">Active</label>
            </div>
          </div>
        </div>
      </div>
      <!-- DISPLAY_ORDER -->
      <div class="form-group">
        <label for="display_order">Display Order</label>
        <Field
          v-model="form.display_order"
          name="display_order"
          type="number"
          class="form-control"
          required
        />
        <ErrorMessage name="display_order" class="error-feedback" />
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
        v-if="UserService.can('view any channels')"
        to="/channels"
        class="btn btn-text float-right"
        ><i class="fas fa-pencil"></i> Back</router-link
      >
    </div>
  </Form>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import ChannelService from "../services/channels.service.js";
import UserService from "../services/user.service.js";

export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  props: {
    channelDetail: {
      type: Object,
      default: () => ({}),
    },
  },
  emits: ["on-submit"],
  data() {
    const schema = yup.object().shape({
      name: yup
        .string()
        .required("Name is required!")
        .min(1, "Must be at least 1 characters!")
        .max(255, "Must be maximum 255 characters!"),
      description: yup
        .string()
        .required("Description is required!")
        .max(250, "Must be maximum 255 characters!"),
      lineup_id: yup
        .number()
        .required("lineup_id is required!"),
      call_sign: yup
        .string()
        .required("call_sign is required!")
        .max(255, "Must be maximum 255 characters!"),
      image_url: yup
        .string()
        .url()
        .required("Image URL is required!")
        .max(255, "Must be maximum 255 characters!"),
      display_order: yup
        .number()
        .required("Display Order is required!"),
      active: yup.bool(),
    });
    return {
      form: {
        name: this.channelDetail?.name || "",
        description: this.channelDetail?.description || "",
        lineup_id: this.channelDetail?.lineup_id || "",
        call_sign: this.channelDetail?.call_sign || "",
        image_url: this.channelDetail?.image_url || "",
        active: this.channelDetail?.active || false,
        display_order: this.channelDetail?.display_order || "",
      },
      successful: false,
      loading: false,
      message: "",
      schema,
      UserService: UserService,
      ChannelService: ChannelService,
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

<template>
  <div class="content-header">
    <h1>Edit Package</h1>
  </div>
  <div class="content px-2">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="card">
            <Form
              :validation-schema="schema"
              @submit="handleEditPackage"
              v-if="packageDetail"
            >
              <div class="card-body">
                <div v-if="!successful">
                  <!-- NAME -->
                  <div class="form-group">
                    <label for="name">Name</label>
                    <Field
                      name="name"
                      type="text"
                      class="form-control"
                      v-model="packageDetail.name"
                      required
                    />
                    <ErrorMessage name="name" class="error-feedback" />
                  </div>
                  <!-- DESCRIPTION -->
                  <div class="form-group">
                    <label for="description">Description</label>
                    <Field
                      name="description"
                      type="textarea"
                      class="form-control"
                      v-model="packageDetail.description"
                      required
                    />
                    <ErrorMessage name="description" class="error-feedback" />
                  </div>
                  <!-- SKU -->
                  <div class="form-group">
                    <label for="sku">SKU</label>
                    <Field
                      name="sku"
                      type="text"
                      class="form-control"
                      v-model="packageDetail.sku"
                      required
                    />
                    <ErrorMessage name="sku" class="error-feedback" />
                  </div>
                  <!-- IMAGE_URL -->
                  <div class="form-group">
                    <label for="image_url">Image URL</label>
                    <Field
                      name="image_url"
                      type="text"
                      class="form-control"
                      v-model="packageDetail.image_url"
                      required
                    />
                    <ErrorMessage name="image_url" class="error-feedback" />
                  </div>
                  <!-- ACTIVE -->
                  <div class="form-group row">
                    <div class="col-sm-10">
                      <div class="form-check">
                        <input
                          name="active"
                          type="checkbox"
                          class="form-check-input"
                          id="active"
                          v-model="packageDetail.active"
                        />
                        <label class="form-check-label" for="active"
                          >Active</label
                        >
                      </div>
                    </div>
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
                  <span
                    v-show="loading"
                    class="spinner-border spinner-border-sm"
                  />
                  Save
                </button>
                <!-- BACK -->
                <router-link
                  v-if="UserService.can('view any packages')"
                  to="/packages"
                  class="btn btn-text float-right"
                  ><i class="fas fa-pencil"></i> Back</router-link
                >
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import PackageService from "../services/packages.service.js";
import UserService from "../services/user.service.js";

export default {
  name: "PackagesEditPage",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
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
      sku: yup
        .string()
        .required("SKU is required!")
        .max(255, "Must be maximum 255 characters!"),
      image_url: yup
        .string()
        .required("Image URL is required!")
        .max(255, "Must be maximum 255 characters!"),
      active: yup.bool(),
    });

    return {
      successful: false,
      loading: false,
      message: "",
      schema,
      packageDetail: null,
      packageId: this.$route.params.id,
      UserService: UserService,
      PackageService: PackageService,
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  methods: {
    getPackage(packageId) {
      let thiss = this;
      PackageService.getPackage(packageId).then(function (response) {
        thiss.packageDetail = response.data;
      });
      return thiss.packageDetail;
    },
    handleEditPackage() {
      this.message = "";
      this.successful = false;
      this.loading = true;
      this.PackageService.editPackage(this.packageId, this.packageDetail).then(
        (data) => {
          this.message = data.message;
          this.successful = true;
          this.loading = false;
          this.$router.push("/packages");
        },
        (error) => {
          this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          this.successful = false;
          this.loading = false;
        },
      );
    },
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push("/login");
    }
    this.getPackage(this.packageId);
  },
};
</script>

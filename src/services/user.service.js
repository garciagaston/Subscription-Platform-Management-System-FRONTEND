class UserService {
  constructor() {
    this.user = JSON.parse(localStorage.getItem("user"));
  }
  can(permission) {
    return this.user?.user.permissions.includes(permission);
  }
}
export default new UserService();

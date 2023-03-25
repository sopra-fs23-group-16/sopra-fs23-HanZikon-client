/**
 * User model
 */
class User {
  constructor(data = {}) {
    this.id = null;
    this.username = null;
	this.password = null;
    this.token = null;
    this.status = null;
	this.creationDate = null;
	this.birthday = null;
    Object.assign(this, data);
  }
}
export default User;

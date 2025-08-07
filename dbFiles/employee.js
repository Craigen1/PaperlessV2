class Employee {
  constructor(
    firstname,
    middlename,
    lastname,
    username,
    password,
    department,
    mobilenumber
  ) {
    this.firstname = firstname;
    this.middlename = middlename;
    this.lastname = lastname;
    this.username = username;
    this.password = password;
    this.department = department;
    this.mobilenumber = mobilenumber;
  }
}

module.exports = Employee;

# Get Employees From Department

- **URL:**

  /getEmployees

- **Method**

  `GET`

- **URL Params:**

  None

- **Data Params**

  _Required:_ Department ID

  `deptID: [int]`

  `1`

- **Auth Required:**

  Only database authorization

- **Content:**

  - `userId`

  - `userName`

## Response

- **Success Response:**

  **Code:** `200 OK`

  **Content:**

  ```json
  [
    {
        "userId": 3,
        "userName": "test"
    },
    {
        "userId": 1234,
        "userName": "test_create_account"
    }
  ]
  ```

## Sample Call

```javascript
axios({
  method: 'GET',
  url: '/getEmployees',
  responseType: 'json',
  data: {
    deptId: 1
  }
});
```

# Post Department

- **URL:**

  /postDepartment

- **Method:**

  `POST`

- **URL Params:**

  None

- **Data Params:**

  _Required:_ Department Name

  `deptName: [string]`

  `Dining`

  _Required:_ Department Location

  `deptLocaiton: [string]`

  `MSC`

  _Required:_ Maximum allowed working hours

  `deptHourCap: [int]`

  `25`

- **Auth Required:**

  Only database authorization

## Response

- **Success Response:**

  **Code:** `201 CREATED`

  **Content**

  Returns the deptId for the created department
  
  ```json
  [
    5
  ]
  ```

## Sample Call

```javascript
axios({
  method: 'POST',
  url: '/postDepartment',
  responseType: 'json',
  data: {
    deptName: 'TestDept',
    deptLocation: 'TestLocation',
    deptHourCap: 40
  }
})
```

# Get Departments

Returns json data for all existing departments

- **URL:**

  /getDepartments

- **Method:**

  `GET`

- **URL Params:**

  None

- **Data Params:**

  None

- **Auth Required:**

  Only database authorization

## Response

- **Success Response:**

  **Code:** `200 OK`

  **Content:**

  ```json
  [
    {
        "deptId": 1,
        "deptName": "Help Desk",
        "deptLocation": "Sorensen",
        "deptHourCap": 20
    },
    {
        "deptId": 2,
        "deptName": "CS Tutor",
        "deptLocation": "Jarvis",
        "deptHourCap": 10
    },
    {
        "deptId": 3,
        "deptName": "Cafeteria",
        "deptLocation": "Price Commons",
        "deptHourCap": 25
    },
    {
        "deptId": 4,
        "deptName": "Involvement Center",
        "deptLocation": "MSC",
        "deptHourCap": 15
    },
    {
        "deptId": 5,
        "deptName": "Math Tutor Lab",
        "deptLocation": "Jarvis Hall",
        "deptHourCap": 20
    }
  ]
  ```

## Sample Call

```javascript
axios({
  method: 'GET',
  url: '/getDepartments',
  responseType: 'json'
})
```

# Post Employee

Allows you to create an user in the database

- **URL:**

  /postEmployee

- **Method:**

  `POST`

- **URL Params:**

  None

- **Data Params**

  _Required:_ User ID - must be able to contain leading 0

  `userId: [string]`

  `0705988`

  _Required:_ Department ID

  `deptId: [int]`

  `2`

  _Required:_ Employee Name

  `userName: [string]`

  `Garrett Preston`

  _Required:_ userPermissions
  
  `userPermissions: [int]`

  `0`

  _Required:_ isManager

  `isManager: [bool]`

  `false`

- **Auth Required:** Posting user must be a manager

## Response

- **Success Response:**

  **Code:** `201 CREATED`

  **Content:**

  ```json
  {
    "message": "Employee created"
  }
  ```

- **Fail Response**

  **Code:** `500 Internal Server Error`

  **Content:**

  ```json
  {
    "message": "Internal server error while creating employee"
  }
  ```

## Sample Call

```javascript
axios({
  method: 'POST'
  url: '/postEmployee',
  responseType: 'json',
  data: {
    "userId": "0705988",
    "deptId": 1,
    "isManager": false,
    "userPermissions": 0
  }
})
```

# Delete Employee

Allows you to delete a user in the database

- **URL:**

  /deleteEmployee

- **Method:**

  `DELETE`

- **URL Params:**

  None

- **Data Params**

  _Required:_ User ID - must be able to contain leading 0

  `userId: [string]`

  `0705988`

- **Auth Required:** Deleting user must be a manager

## Response

- **Success Response:**

  **Code:** `202 ACCEPTED`

  **Content:**

  ```json
  {
    "message": "Employee deleted"
  }
  ```

- **Fail Response**

  **Code:** `500 Internal Server Error`

  **Content:**

  ```json
  {
    "message": "Internal server error while deleting employee"
  }
  ```

## Sample Call

```javascript
axios({
  method: 'DELETE'
  url: '/deleteEmployee',
  responseType: 'json',
  data: {
    "userId": "0705988"
  }
})
```

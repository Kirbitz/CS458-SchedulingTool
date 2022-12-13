# Search employees

- **URL:**

  /searchEmployees

- **Method**

  `GET`

- **URL Params:**

  _Required:_ search - either the user ID or the name of the employee (case insensitive)

  `search: [string]`

  `gar`

- **Data Params**

  None

- **Auth Required:**

  JWT set in authorization header

## Response

- **Success Response:**

  **Code:** `200 OK`

  **Content:**

  ```json
  [
    {
        "userId": 3,
        "userName": "Garrett"
    },
    {
        "userId": 1234,
        "userName": "Garth"
    }
  ]
  ```

- **Bad Input Response**

  **Code:** `400 BAD REQUEST`

  **Content:**

  ```json
  {
        "message": "Invalid combination of characters: use alphabetical or digits - not both"
  }
  ```

- **Internal Server Error**

  **Code:** `500 INTERNAL SERVER ERROR`

  **Content:**
  
  ```json
  {
        "message": "Server error while searching for employees"
  }
  ```

## Sample Call

```javascript
axios({
  method: 'GET',
  url: '/searchEmployees',
  responseType: 'json',
  data: { }
});
```
# Get Employees From Department

- **URL:**

  /getEmployees

- **Method**

  `GET`

- **URL Params:**

  None

- **Data Params**

  None

- **Auth Required:**

  JWT set in authorization header

## Response

- **Success Response:**

  **Code:** `200 OK`

  **Content:**

  ```json
  {
    "depName": "Help Desk",
    "deptId": 1,
    "depEmployees": [
        {
            "userId": 3,
            "userName": "test"
        },
        {
            "userId": 1,
            "userName": "Garrett Preston"
        }
    ]
  }
  ```

## Sample Call

```javascript
axios({
  method: 'GET',
  url: '/getEmployees',
  responseType: 'json',
  data: { }
});
```

# Add Employees

Allows you to add a list of employees to a department in the _userDept table

- **URL:**

  /addEmployee

- **Method:**

  `POST`

- **URL Params:**

  None

- **Data Params**

  _Required:_ Employee list - requires userId

  `depEmployees: [employee]`

  ```json
  {
    "depEmployees": [
        {
            "userId": 1234
        },
        {
            "userId": 4
        }
    ]
  }
  ```

- **Auth Required:** JWT set in authorization header

## Response

- **Success Response:**

  **Code:** `201 CREATED`

  **Content:**

  ```json
  {
    "message": "Employee placed into department"
  }
  ```

- **Fail Response**

  **Code:** `500 Internal Server Error`

  **Content:**

  ```json
  {
    "message": "Internal server error while inserting employee"
  }
  ```

## Sample Call

```javascript
axios({
  method: 'POST'
  url: '/addEmployee',
  responseType: 'json',
  data: {
    'userId': '0705988',
    'deptId': '3'
  }
})
```

# Delete Employee

Allows you to delete a user from the _userDept table (IE remove them from the department)

- **URL:**

  /deleteEmployee

- **Method:**

  `DELETE`

- **URL Params:**

  None

- **Data Params**

  _Required:_ Employee list - requires userId

  `depEmployees: [employee]`

  ```json
  
  {
    "depEmployees": [
      {
        "userId": 1234
      },
      {
        "userId": 4
      }
    ]
    
  }
  ```

- **Auth Required:** JWT set in authorization header

## Response

- **Success Response:**

  **Code:** `202 ACCEPTED`

  **Content:**

  ```json
  {
    "message": "Employee deleted"
  }
  ```

- **Not Found Response**

  **Code:** `404 Not Found`

  **Content:**

  ```json
  {
    "message": "No employee with that id found"
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
    'userId': '0705988',
    'deptId': '3'
  }
})
```

# Create New Account

Returns json data about the account creation.

- **URL:**

  /create_new_account

- **Method:**

  `POST`

- **URL Params:**

  None

- **Data Params:**

  __Required:__ Username

  `username: [string]`

  `jshmoe1234`

  __Required:__ Password

  `password: [string]`

  `MyPet'sName1234!`

  __Required:__ User ID

  `userID: [int]`

  123456

  __Required:__ Name

  `name: [string]`

  `Joe Shmoe`

  __Required:__ Permissions

  `permissions: [int: 0 || 1 ]`

  1

  __Required:__ Max Hours

  `maxHours: [double]`

  20

  __Required:__ Manager ID

  `managerId: [int]`

  2

- **Auth Required:** Yes, JWT set in Authorization header.

## Response

- **Success Response:**

  **Code:** `201 CREATED`

  **Content:**

  ```json
  {
    "success": {
      "status": 201,
      "message": "Created new account"
    }
  }
  ```

- **Error Response**

  **Code:** `401 UNAUTHORIZED`

  **Content:**

  ```json
  {
    "error": {
      "status": 401,
      "message": "Unauthorized"
    }
  }
  ```

  **Code:** `429 TOO MANY REQUESTS`

  **Content:**

  None

  **Code:** `500 INTERNAL SERVER ERROR`

  **Content:** 

  ```json
  {
    "error": {
      "status": 500,
      "message": "Internal Server Error"
    }
  }
  ```

## Sample Call

```javascript
axios({
  method: 'POST',
  url: '/create_new_account',
  reponseType: 'json',
  data: {
    username: 'jshmoe1234',
    password: "MyPet'sName1234!",
    userid: 123456,
    name: 'Joe Shmoe',
    permissions: 0,
    maxHours: 20,
    managerId: 2 // Should be the User ID of the current user
  }
})
```
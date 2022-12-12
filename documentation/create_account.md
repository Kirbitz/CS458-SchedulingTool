# Create New Account

Returns json data about the account creation.

- **URL:**

  /api/create_new_account

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

  __Required:__ New User ID

  `newUserID: [int]`

  123456

  __Required:__ Name

  `name: [string]`

  `Joe Shmoe`

  __Required:__ Hour Cap

  `hourCap: [double]`

  20

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

  **Code:** `400 BAD REQUEST`

  **Content:** 

  ```json
  {
    "error": {
      "status": 400,
      "message": "Bad Request - Non-Unique Fields",
      "fields": ["field1", "field2"]
    }
  }
  ```

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
  url: '/api/create_new_account',
  responseType: 'json',
  data: {
    username: 'jshmoe1234',
    password: "MyPet'sName1234!",
    newUserId: 123456,
    name: 'Joe Shmoe',
    hourCap: 20,
  }
})
```
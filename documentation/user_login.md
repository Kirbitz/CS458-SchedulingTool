# User Login

Returns json data about the login session.

- **URL:**

  /login

- **Method:**

  `POST`

- **URL Params:**

  None

- **Data Params**

  _Required:_ User email

  `username: [string]`

  `jshmoe1234`

  _Required:_ User password

  `password: [string]`

  `MyPet'sName1234!`

- **Auth required:** Yes, JWT token set in Authorization header
<!-- Will update once it is finalized. -->

## Response

- **Success Response:**

  **Code:** `200`

  **Content:**

  ```json
  {
    "userId": 1234,
    "isManager": false
  }
  ```

- **Error Response:**

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

  OR

  **Code:** `404 NOT FOUND`

  **Content:**

  ```json
  {
    "error": {
      "status": 404,
      "message": "Not Found"
    }
  }
  ```

  OR

  **Code:** `500 INTERNAL ERROR`

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
  url: '/login',
  responseType: 'json',
  data: {
    username: 'jshmoe1234',
    password: "MyPet'sName1234!"
  }
});
```
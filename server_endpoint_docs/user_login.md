# User Login

Returns json data about he login session.

- **URL:**

  /login/

- **Method:**

  `POST`

- **URL Params:**
  None

- **Data Params**
  _Required:_ User email

  `email: [string]`

  `joeshmo@example.xyz`

  _Required:_ User password

  `password: [string]`

  `MyPet'sName1234!`

- **Auth required:** YES, TBD
<!-- Bearer token or express-session seem pretty easy -->
<!-- Can set in Authorization header or something, then validate with each request -->

## Response

- **Success Response:**

  **Code:** `200`

  **Content:**

  ```json
  {
    "userId": 1234,
    "email": "joeshmo@example.xyz",
    "isManager": false,
    "sessionID": "random-session-id-string"
    // sessionID could probably be a cookie
    // also stored in DB table, validated with .env variable
  }
  ```

- **Error Response:**

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
    email: 'joeshmo@example.xyz',
    password: "MyPet'sName1234!"
  }
});
```
# User Login

Returns json data about the login session.

- **URL:**

  /api/login

- **Method:**

  `POST`

- **URL Params:**

  None

- **Data Params**

  _Required:_ Username

  `username: [string]`

  `jshmoe1234`

  _Required:_ Password

  `password: [string]`

  `MyPet'sName1234!`

- **Auth Required:** Yes, JWT set in Authorization header.

  **Content:** 

  - `userid`
  
  - `isManager`

## Response

- **Success Response:**

  **Code:** `200 OK`

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

  **Code:** `429 TOO MANY REQUESTS`

  **CONTENT:**

  None

## Sample Call

```javascript
axios({
  method: 'POST',
  url: '/api/login',
  responseType: 'json',
  data: {
    email: 'joeshmo@example.xyz',
    password: "MyPet'sName1234!"
  }
});
```
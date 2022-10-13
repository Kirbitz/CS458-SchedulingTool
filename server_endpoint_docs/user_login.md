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

  `email=[string]`

  `joeshmo@example.xyz`

  _Required:_ User password

  `password=[string]`

  `MyPet'sName1!`

- **Auth required:** YES, Bearer token in Authorization header ------ probably change idk for now

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
$.ajax({
  url: '/login/',
  dataType: 'json',
  type: 'POST',
  beforeSend: function (xhr) {
    xhr.
  },
  success: function (r) {
    console.log(r);
  }
});
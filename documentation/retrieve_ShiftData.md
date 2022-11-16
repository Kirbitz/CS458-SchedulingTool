# Retrive shift list data

Returns json data list for the selected days shifts.

- **URL:**

  /api/day

- **Method:**

  `GET`

- **URL Params:**

  None

- **Data Params**

  _Required:_ startDay

  `startDate: [date]`

  _Required:_ User endDay

  `endDate: [date]`


- **Auth required:** Yes, JWT set in Authorization header.

## Response

- **Success Response:**

  **Code:** `200`

  **Content:**

  ```json
  {
    "dates": {
      "2022-11-15":[
        {
          "startTime":"5:00pm",
          "endTime": "6:00pm",
          "positionId": "1",
          "user": "some person"
        }, // ...
      ], // ...
    }
  
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
  **Code:** `401 NOT FOUND`

  **Content:**
  ```json
    {
      "error":{
        "status": 401,
        "message": "Bad token"

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
  method: 'GET',
  url: '/day',
  responseType: 'json',
  data: {
    email: 'joeshmo@example.xyz',
    password: "MyPet'sName1234!"
  }
});
```

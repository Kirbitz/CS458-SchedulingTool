# Master Schedule Shift View

Returns json data about shift assignment

- **URL:**

  /api/shift_view

- **Method:**

  `POST`

- **URL Params:**

  None

- **Data Params:**

  __Required:__ Records
  
    `records: object`
    ```json
    {
      "records": [
        {
          "timeBlockId": 1,
          "employeeId": 1
        },
        // ...
      ]
    }
    ```
  
  __Required:__ Employee ID

    `employeeId: [int]`
    `1234`

- **Auth Required:** Yes, JWT set in Authorization header. 

## Response

- **Success Response:**

  **Code:** `200 OK`

  **Content:**

  ```json 
  {
    "success": {
      "status": 200,
      "message": "Assigned Successfully"
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
      "message": "Bad Request - User or Time Block Does Not Exist",
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
  url: '/api/shift_view',
  reponseType: 'json',
  data: {
    timeBlockId: 1234,
    employeeId: 1234,
  }
})
```
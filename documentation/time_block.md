# Time Block Data

Returns json data of time blocks that belong to either a department or user

- **URL:**

  /api/collect_time_blocks

- **Method:**

  `GET`

- **URL Params:**

  None

- **Data Params:**
    
  None

- **Auth Required:** Yes, JWT set in Authorization header.

## Response

- **Success Response:**

  **Code:** `200 OK`

  **Content:**

  ```json
  {
    "success": {
      "status": 200,
      "timeBlocks": [
        {
          
        }
      ]
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
    userid: 123456,
    name: 'Joe Shmoe',
    hourCap: 20,
  }
})
```
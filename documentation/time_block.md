# Time Block Data

### Returns json data of time blocks that belong to either a department or user

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
          "timeStart": "YYYY-MM-DD HH:mm:ss",
          "timeEnd": "YYYY-MM-DD HH:mm:ss",
          "timeType": 2,
          "positionName": "Grill"
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
      "message": "Bad Request - Data Not Found"
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

## Sample Call

```javascript
axios({
  method: 'GET',
  url: '/api/create_new_account',
  responseType: 'json'
})
```

---

### Returns json data about time block modifications/creation

- **URL:**

  /api/create_modify_time_blocks

- **Method:**

  `POST`

- **URL Params:**

  None

- **Data Params:**
    
  __Required:__ Time Start

  `timeStart: [YYYY-MM-DD HH:mm:ss]`

  `20XX-01-01 00:00:00`

  __Required:__ Time End

  `timeEnd: [YYYY-MM-DD HH:mm:ss]`

  `20XX-01-01 00:00:00`

  __Required:__ Time Type

  `timeType: [int]`

  2

  __Required:__ Position Name

  `positionName: [string]`

  `Grill`

- **Auth Required:** Yes, JWT set in Authorization header.

## Response

- **Success Response:**

  **Code:** `200 OK`

  **Content:**

  ```json
  {
    "success": {
      "status": 200,
      "message": "Time Block Created or Modified"
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
    timeStart: "20XX-01-01 00:00:00",
    timeEnd: "20XX-01-01 00:00:00",
    timeType: 2,
    positionName: "Grill"
  }
})
```

---

### Returns json data about time block deletion

- **URL:**

  /api/delete_time_blocks

- **Method:**

  `DELETE`

- **URL Params:**

  None

- **Data Params:**
    
  __Required:__ Time Block Id

  `timeId: [int]`

  123456

- **Auth Required:** Yes, JWT set in Authorization header.

## Response

- **Success Response:**

  **Code:** `200 OK`

  **Content:**

  ```json
  {
    "success": {
      "status": 200,
      "message": "Time Block Deleted"
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
      "message": "Bad Request - Data Not Found"
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
  method: 'DELETE',
  url: '/api/create_new_account',
  responseType: 'json',
  data: {
    timeId: 123456
  }
})
```
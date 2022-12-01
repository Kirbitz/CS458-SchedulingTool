# Time Block Data

### Returns json data of time blocks that belong to either a department or user

- **URL:**

  /api/collect_time_blocks/:startDate/:endDate

- **Method:**

  `GET`

- **URL Params:**

  __Required:__ Start Date

  `startDate: [YYYY-MM-DD]`

  `20XX-01-01`

  __Required:__ End Date

  `endDate: [YYYY-MM-DD]`

  `20XX-01-01`

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
          "timeId": 1234,
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
      "message": "Bad Request - Invalid Parameters"
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
  url: '/api/collect_time_blocks/20XX-01-01/20XX-01-01',
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

  __Optional:__ Position Id

  `positionId: [int]`

  `12`

  __Optional:__ Time Id

  `timeId: [int]`

  `1234`

  __Optional:__ Employee Id

  `employeeId: [int]`

  `1234`

- **Auth Required:** Yes, JWT set in Authorization header.

## Response

- **Success Response:**

  **Code:** `201 CREATED`

  **Content:**

  ```json
  {
    "success": {
      "status": 201,
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
      "message": "Bad Request - Input Invalid",
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
  url: '/api/create_modify_time_blocks',
  responseType: 'json',
  data: {
    timeStart: "20XX-01-01 00:00:00",
    timeEnd: "20XX-01-01 00:00:00",
    timeType: 2,
    positionId: 12,
    timeId: 123,
    employeeId: 1234
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

  **Code:** `204 NO CONTENT`

  **Content:**

  ```json
  {
    "success": {
      "status": 204,
      "message": "Time Block Deleted",
      "timeId": 123456
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
      "message": "Bad Request - Invalid or Missing Time ID"
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
  url: '/api/delete_time_blocks',
  responseType: 'json',
  data: {
    timeId: 123456
  }
})
```
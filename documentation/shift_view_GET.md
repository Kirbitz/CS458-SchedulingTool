# Master Schedule Shift View

Returns json data containing a list of time blocks and employees.

- **URL:**

  /api/shift_view

- **Method:**

  `GET`

- **URL Params:**

  None

- **Data Params:**

  __Required:__ Date

  `date: [string]`

  `2022-12-1 00:00:00`

- **Auth Required:** Yes, JWT set in Authorization header.

## Response

- **Success Response:**

  **Code:** `200 OK`

  **Content:**

```json
{
  "timeblocks": [
    {
      "timeID": 1,
      "startTime": "01:00:00",
      "endTime": "23:00:00",
      "positionID": 1,
      "positionName": "Grill",
      "assignedToID": 5,
      "assignedToName": "Joe Schmoe",
    },
    {
      // .... As many as found
    }
  ],
  "employees": [
    {
      "employeeID": 5,
      "employeeName": "Joe Schmoe",
      "positionIDs": [
        1, 2, 3, 4
      ]
    },
    {
      // ... As many as found
    }
  ]
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
  method: 'GET',
  url: '/api/shift_view',
  reponseType: 'json',
  data: {
    date: "2022-12-1 00:00:00"
  }
})
```
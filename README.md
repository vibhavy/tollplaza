# Tollplaza Application

Application for the basic implementation of Tollplaza entry of Vehicles.

## Stack

**Frontend:** Reactjs
**Backend:** Nodejs(express)
**Database:** Mysql

## Installation

**Step 1.** Once cloned the project, use below code to install all the dependencies.

```bash
npm install
```

**Step 2.** Create config.js file inside the directory **'server'**.

```Javascript
module.exports = {
    mysql: {
        host: '<host name>',
        username: '<user>',
        password: '<password>',
        db: '<db name>'
    }
};
```

**Step 3.** Install required Schema to store information into database.

```bash
npm run migration
```

## Usage

*To Start Frontend*
```bash
npm start
```

*To run Tests for API Endpoints* 
```bash
npm run server-test
```

*To Start Server*
```bash
npm run server
```

# API Documentation

## Error Codes Details

```
130: Parameter Error
140: Item Missing
160: Server Error
200: Success
```

## Example Error Response

```
http code 400
{ 
    code: 201,
    error: {
        "message": "registration_number is required"
    }
}
```

## Example Success Response

```
http code 200
{ 
    code: 200,
    data: {
        message: '',
        trips: []
    }
}
```

## Get Trips

Returns all the trips of current date

### Request
```
GET /trips HTTP/1.1
Content-Type: application/json
```

### Response
```
HTTP/1.1 200 OK
Content-Type: application/json
{ 
    code: 200,
    data: {
        trips: []
    }
}
```

## Create Trip Entry

Create new Trip entry and Returns all the trips of current date

### Request
```
GET /trips HTTP/1.1
Accept: application/json
Content-Type: application/json
{
    "registration_number": "foo",
    "visit_type": "round-trip" or "one-way" 
}
```

### Response
```
HTTP/1.1 200 OK
Content-Type: application/json
{ 
    code: 200,
    data: {
        message: '',
        trips: []
    }
}
```

# Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

# License
[MIT](https://choosealicense.com/licenses/mit/)
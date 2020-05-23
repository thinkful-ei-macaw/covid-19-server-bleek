# "Covid-19 In The US - A Message Board", a RESTful server application by Brandon Leek!

#### This server application was programmed in Node.js, using the Express library for a streamlined process, Knex.js for database manipulation and PostgreSQL for the database itself. Deployed on [Heroku](https://stark-garden-39238.herokuapp.com/)! This was created for use with my [COVID-19 in the US Message Board](https://corona-message-board-us.now.sh/), a client-side React application. The purpose was to create a full-stack application for people living in the US to anonymously share how this viral pandemic has affected them, amongst their neighbors within the state that they reside. You can find out more and check out the client-side codebase [HERE](https://github.com/thinkful-ei-macaw/covid-19-client-bleek)!

## API Documentation

This API is protected by Cross-Origin Resourse Sharing (CORS), a middleware that prevents unspecified domains from getting access to this application. If you're interested in using or even helping expand this project, please reach out and I'd be glad to grant you access.

### GET /api/states

Returns an array of 54 objects from a STATES table, representing the 54 US states and territories by name, an ID 0 - 53, and the number of confirmed positive corona virus cases and confirmed corona virus fatalities. A "state_name", "id", "confirm_cases" and "confirm_fatal" represent these values.

```json
[
  {
    "state_name": "New Jersey,
     "id": 0,
     "confirm_cases": 6079,
     "confirm_fatal": 4560
  },
    {
    "state_name": "New York",
     "id": 1,
     "confirm_cases": 195031,
     "confirm_fatal": 10056
  },
  {
    "state_name": "Massachusetts",
     "id": 2,
     "confirm_cases": 25475,
     "confirm_fatal": 756
  },
  .......
  {
    "state_name": "North Dakota",
     "id": 48,
     "confirm_cases": 341,
     "confirm_fatal": 9
  },
  {
    "state_name": "Alaska",
     "id": 49,
     "confirm_cases": 277,
     "confirm_fatal": 8
  },
  .........
  // (until the final id and value pairing of "id": 53)
]
```

### GET /api/states/state:id (example; /api/states/35 returns the "Oregon" JSON object)

Append a value of 0 - 53 to GET an individual state response from the STATES database: Every item in the states table has a unique "id" number that the second and final states router utilizes...

#### STATE:ID

```json
[
  {
    "state_name": "Oregon",
    "id": 35,
    "confirm_cases": 1584,
    "confirm_fatal": 53
  }
]
```

#### GET /api/comments

Responds with a JSON array of however many current anonymous users have made posts to the server, with the following...
A unique "id", "state_id", "user_name", "comment_body" and "date_posted".

```json
[
  {
   "id": "8934958938",
  "state_id": "0", (relation to "id" in States table)
  "user_name": "John Doe",
  "comment_body": "John Doe's Comment",
  "date_posted": "5/3/2020"
  }
]
```

### GET /api/comments/state:id

Similar to the GET states/state:id endpoint, this will return a specific states (i.e - if you wanted to see all posted content in "Iowa"... GET /api/comments/33), as intended by the "state_id" value in the comments table and it's relationship to the "id" in the States table.

### POST /api/comments/state:id

Post a new object in the Users table by the selected "state_id", as the above users example. A request must have values for "user_name": "anon name string", "state_id: 0 - 53" and "comment_body": "anon users comment"...

Here's an example request...

```json
[
  {
    "state_id": 32,
    "user_name": "John from Delaware",
    "comment_body": "I am a web developer, and have been doing ok in the pandemic!"
  }
]
```

... and the desired response!

```json
[
  {
    "id": 2837592384720,
    "state_id": 32,
    "user_name": "John from Delaware",
    "comment_body": "I am a web developer, and have been doing ok in the pandemic!",
    "date_posted": 5 / 23 / 2020
  }
]
```

#### Now, a new entry from "John from Delaware", now exists in the "user_comments" table, with a refrence to id 32(Delaware) in the States Table!

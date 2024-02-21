
# Mean Movie Website

This is a MEAN (MongoDB, Express.js, Angular, Node.js) stack application for a movie website.

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites

- Node.js and npm installed
- MongoDB installed and running

### Installing

1. Clone the repository:

   ```bash
   git clone https://github.com/AswinArsha/MEAN-Movie-Website.git
   ```

2. Change to the project directory:

   ```bash
   cd mean-movie-website
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

### Configuration

1. In the project root APP_SERVER/models/db.js add the MongoDB connection string. Example:

   ```
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.vnfuqnw.mongodb.net/?retryWrites=true
   ```

2. Save the file.

### Running

Start the application:

```bash
npm start
```

The server will run on `http://localhost:3000`.

## Built With

- MongoDB - Database
- Express.js - Server framework
- Angular - Frontend framework
- Node.js - Server runtime



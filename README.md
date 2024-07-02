## Database setup and migration
1. extract db-setup.zip into db-folder
2. Go to the db-setup directory and execute setup.js

```
cd db-setup
node setup.js
```
This script will create the database table and execute migrations to insert data from the csv files.


## Start server

```
npm run dev
```

Open browser at localhost:port, default port is 3000
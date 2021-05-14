# Install all the modules required in your project directory

npm install

# Run the server

nodemon index.js

# Open Postman and create a POST request API

POST localhost:8080/calculate-expense

# Request Body

{"data_json":{
"members": ["A", "B", "C", "D", "E"],
"account": [
{ "person": "A", "expense": 304, "split": ["A", "B", "C"] },
{ "person": "B", "expense": 200, "split": ["B", "C"] },
{ "person": "A", "expense": 540, "split": ["A", "D", "C", "E"] },
{ "person": "C", "expense": 2400,"split": ["D", "C", "E"] },
{ "person": "D", "expense": 342, "split": ["D", "C", "A", "B"] },
{ "person": "E", "expense": 1210,"split": ["E", "A", "B", "D"] },
{ "person": "D", "expense": 214, "split": ["E", "A"] },
{ "person": "A", "expense": 300, "split": ["A", "B", "C"] },
{ "person": "B", "expense": 1200,"split": ["E", "D", "B"] },
{ "person": "C", "expense": 400, "split": ["A", "C"] },
{ "person": "D", "expense": 354, "split": ["A", "B", "D"] },
{ "person": "E", "expense": 1000,"split": ["A", "E"] },
{ "person": "D", "expense": 400, "split": ["D", "A"] },
{ "person": "C", "expense": 1034,"split": ["A", "B", "D", "C"] },
{ "person": "A", "expense": 500, "split": ["A", "E"] },
{ "person": "E", "expense": 600, "split": ["C", "D", "E"] }
]
}
}

# Result

Your will get a success response and an excel file with name "account-export.xlsx" will be created in your project directory with desired output.

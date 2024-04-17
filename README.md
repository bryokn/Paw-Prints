# Paw-Prints
The Pet Adoption Application is a web-based application that allows users to browse and adopt pets. It provides a user-friendly interface for searching and viewing available pets, as well as functionality for creating new adoptions.

## Technologies Used
- Flask (Python web framework)
- SQLAlchemy (Python SQL toolkit and Object-Relational Mapper)
- React (JavaScript library for building user interfaces)
- SQLite (lightweight, file-based database)

## Installation and Setup
1. Clone the repository:
```
git clone https://github.com/bryokn/paw-prints.git
```
2. Navigate to the project directory:
```
cd paw-prints
```
3. Create and activate a virtual environment (recommended):

```
pipenv install
pipenv shell
```
4. Install the required dependencies
```
pipenv install
```
5. Initialize the database and run the Flask application.
```
flask db upgrade
flask run
```
6. In a separate terminal, navigate to the `client` directory and start th React development server:
```
cd paw-prints
npm install
npm start
```
The application should now be accessible at `http://localhost:3000`.

## API Endpoints
The application provides the following API endpoints:

- `GET /pets`: Retrieves a list of all available pets.
- `GET /pets/<int:pet_id>`: Retrieves a specific pet by its ID.
- `PATCH /pets/<int:pet_id>`: Updates the information for a specific pet.
- `DELETE /pets/<int:pet_id>`: Deletes a specific pet.
- `POST /adoptions`: Creates a new adoption for a pet.

## DEVELOPMENT
This project was developed and maintained by:
- Brian Kipkirui <a href="https://github.com/bryokn"> Github</a>
- Carol Wachira <a href="https://github.com/Carol-dev-ux"> Github</a>
- Nehemiah Cheruiyot <a href="https://github.com/simotwo-jr"> Github</a>

### Contributing
If you would like to contribute to the Pet Adoption Application, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Implement your changes and ensure the application is still functioning correctly.
4. Submit a pull request with a detailed description of your changes.

### LICENSE
This project is licensed under the MIT License.
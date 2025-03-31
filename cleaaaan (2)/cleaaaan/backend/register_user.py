import os
import bcrypt
import mysql.connector

def get_database_connection():
    """Establish and return a database connection."""
    return mysql.connector.connect(
        host="localhost",          # Your database host
        user="root",               # Your MySQL username
        password="EngineerShruti@2027",  # Your MySQL password
        database="user_db"         # Your database name
    )

def register_user(username, email, password):
    """Register a new user in the database."""
    connection = get_database_connection()
    cursor = connection.cursor()

    # Hash the password securely
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

    try:
        # Insert user details into the database
        query = "INSERT INTO users (username, email, password_hash) VALUES (%s, %s, %s)"
        values = (username, email, hashed_password.decode('utf-8'))
        cursor.execute(query, values)
        connection.commit()
        print("User registered successfully!")
    except mysql.connector.Error as err:
        print(f"Error: {err}")
    finally:
        # Close the cursor and connection
        cursor.close()
        connection.close()

if __name__ == "__main__":
    # Testing code
    username = input("Enter username: ")
    email = input("Enter email: ")
    password = input("Enter password: ")
    register_user(username, email, password)
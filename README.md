### API Document


##### 📍 USER AUTHENTICATION 

http://localhost:8080/api/auth/register
(POST) method - Register a new user
Sample Data 
   {
        "name": "Aisha Test",
        "email": "aisha@a.com",
        "username": "aisha_me",
        "password": "password"
    }
Sample Response 
[
    {
        "id": 5,
        "name": "Aisha Test",
        "email": "aisha@a.com",
        "username": "aisha_me",
        "password": "$2b$10$.M3hCifRkcy/5GFP1Kamau2Ttan5WhpGvCa5DSSZjJA6Sgpg1sHC2",
        "avatar": "https://pub-static.fotor.com/assets/projects/pages/7252c2b86395453a836cdd57b13b3d39/600w/fotor-7c742084acd7491aae9923279bdc3218.jpg",
        "created_at": "2024-01-01T03:17:29.000Z"
    }
]

http://localhost:8080/api/auth/login
(POST) method - Login an existing user
Sample Data 
    {
            "username": "aisha_me",
            "password": "password"
    }

Sample Response
{
    "id": 5,
    "name": "Aisha Test",
    "email": "aisha@a.com",
    "username": "aisha_me",
    "avatar": "https://pub-static.fotor.com/assets/projects/pages/7252c2b86395453a836cdd57b13b3d39/600w/fotor-7c742084acd7491aae9923279bdc3218.jpg",
    "created_at": "2024-01-01T03:17:29.000Z"
}

http://localhost:8080/api/auth/logout
(POST) method - Logout out and clear access token
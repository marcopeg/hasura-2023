TRUNCATE TABLE movies_json RESTART IDENTITY;
INSERT INTO movies_json (data)
VALUES
    -- Movie 1
    ('{
        "title": "Inception",
        "rating": 8.8,
        "genre": ["Action", "Adventure", "Sci-Fi"],
        "kpis": {
            "production_cost": 160000000,
            "revenue": 825532764,
            "cast_size": 10,
            "duration": 148
        },
        "people": {
            "director": "Christopher Nolan",
            "director_of_photography": "Wally Pfister",
            "sound_director": "Richard King",
            "cast": ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Ellen Page"]
        }
    }'),
    -- Movie 2
    ('{
        "title": "The Shawshank Redemption",
        "rating": 9.3,
        "genre": ["Drama"],
        "kpis": {
            "production_cost": 25000000,
            "revenue": 58300000,
            "cast_size": 12,
            "duration": 142
        },
        "people": {
            "director": "Frank Darabont",
            "director_of_photography": "Roger Deakins",
            "sound_director": "Frank E. Eulner",
            "cast": ["Tim Robbins", "Morgan Freeman"]
        }
    }'),
    -- Movie 3
    ('{
        "title": "The Dark Knight",
        "rating": 9.0,
        "genre": ["Action", "Crime", "Drama"],
        "kpis": {
            "production_cost": 185000000,
            "revenue": 1004558444,
            "cast_size": 17,
            "duration": 152
        },
        "people": {
            "director": "Christopher Nolan",
            "director_of_photography": "Wally Pfister",
            "sound_director": "Richard King",
            "cast": ["Christian Bale", "Heath Ledger", "Aaron Eckhart"]
        }
    }'),
    -- Movie 4
    ('{
        "title": "Pulp Fiction",
        "rating": 8.9,
        "genre": ["Crime", "Drama"],
        "kpis": {
            "production_cost": 8000000,
            "revenue": 213928762,
            "cast_size": 13,
            "duration": 154
        },
        "people": {
            "director": "Quentin Tarantino",
            "director_of_photography": "Andrzej Sekula",
            "sound_director": "Robert Rodriguez",
            "cast": ["John Travolta", "Samuel L. Jackson", "Uma Thurman"]
        }
    }'),
    -- Movie 5
    ('{
        "title": "The Godfather",
        "rating": 9.2,
        "genre": ["Crime", "Drama"],
        "kpis": {
            "production_cost": 6000000,
            "revenue": 245066411,
            "cast_size": 18,
            "duration": 175
        },
        "people": {
            "director": "Francis Ford Coppola",
            "director_of_photography": "Gordon Willis",
            "sound_director": "Nino Rota",
            "cast": ["Marlon Brando", "Al Pacino", "James Caan"]
        }
    }'),
    -- Movie 6
    ('{
        "title": "Fight Club",
        "rating": 8.8,
        "genre": ["Drama"],
        "kpis": {
            "production_cost": 63000000,
            "revenue": 100853753,
            "cast_size": 9,
            "duration": 139
        },
        "people": {
            "director": "David Fincher",
            "director_of_photography": "Jeff Cronenweth",
            "sound_director": "Ren Klyce",
            "cast": ["Brad Pitt", "Edward Norton", "Helena Bonham Carter"]
        }
    }'),
    -- Movie 7
    ('{
        "title": "The Matrix",
        "rating": 8.7,
        "genre": ["Action", "Sci-Fi"],
        "kpis": {
            "production_cost": 63000000,
            "revenue": 463517383,
            "cast_size": 16,
            "duration": 136
        },
        "people": {
            "director": "Lana Wachowski",
            "director_of_photography": "Bill Pope",
            "sound_director": "Dane A. Davis",
            "cast": ["Keanu Reeves", "Laurence Fishburne", "Carrie-Anne Moss"]
        }
    }'),
    -- Movie 8
    ('{
        "title": "The Lord of the Rings: The Return of the King",
        "rating": 8.9,
        "genre": ["Adventure", "Drama", "Fantasy"],
        "kpis": {
            "production_cost": 94000000,
            "revenue": 1119929521,
            "cast_size": 14,
            "duration": 201
        },
        "people": {
            "director": "Peter Jackson",
            "director_of_photography": "Andrew Lesnie",
            "sound_director": "Christopher Boyes",
            "cast": ["Elijah Wood", "Viggo Mortensen", "Ian McKellen"]
        }
    }'),
    -- Movie 9
    ('{
        "title": "Goodfellas",
        "rating": 8.7,
        "genre": ["Biography", "Crime", "Drama"],
        "kpis": {
            "production_cost": 25000000,
            "revenue": 46836394,
            "cast_size": 15,
            "duration": 146
        },
        "people": {
            "director": "Martin Scorsese",
            "director_of_photography": "Michael Ballhaus",
            "sound_director": "Tom Fleischman",
            "cast": ["Robert De Niro", "Ray Liotta", "Joe Pesci"]
        }
    }'),
    -- Movie 10
    ('{
        "title": "Schindlers List",
        "rating": 8.9,
        "genre": ["Biography", "Drama", "History"],
        "kpis": {
            "production_cost": 22000000,
            "revenue": 321306305,
            "cast_size": 11,
            "duration": 195
        },
        "people": {
            "director": "Steven Spielberg",
            "director_of_photography": "Janusz Kamiński",
            "sound_director": "Andy Nelson",
            "cast": ["Liam Neeson", "Ralph Fiennes", "Ben Kingsley"]
        }
    }'),
    -- Movie 11
    ('{
        "title": "The Departed",
        "rating": 8.5,
        "genre": ["Crime", "Drama", "Thriller"],
        "kpis": {
            "production_cost": 90000000,
            "revenue": 289847354,
            "cast_size": 18,
            "duration": 151
        },
        "people": {
            "director": "Martin Scorsese",
            "director_of_photography": "Michael Ballhaus",
            "sound_director": "Philip Stockton",
            "cast": ["Leonardo DiCaprio", "Matt Damon", "Jack Nicholson"]
        }
    }'),
    -- Movie 12
    ('{
        "title": "Seven",
        "rating": 8.6,
        "genre": ["Crime", "Drama", "Mystery"],
        "kpis": {
            "production_cost": 33000000,
            "revenue": 327311859,
            "cast_size": 7,
            "duration": 127
        },
        "people": {
            "director": "David Fincher",
            "director_of_photography": "Darius Khondji",
            "sound_director": "Ren Klyce",
            "cast": ["Morgan Freeman", "Brad Pitt", "Kevin Spacey"]
        }
    }'),
    -- Movie 13
    ('{
        "title": "Forrest Gump",
        "rating": 8.8,
        "genre": ["Drama", "Romance"],
        "kpis": {
            "production_cost": 55000000,
            "revenue": 677945399,
            "cast_size": 13,
            "duration": 142
        },
        "people": {
            "director": "Robert Zemeckis",
            "director_of_photography": "Don Burgess",
            "sound_director": "Gloria S. Borders",
            "cast": ["Tom Hanks", "Robin Wright", "Gary Sinise"]
        }
    }'),
    -- Movie 14
    ('{
        "title": "The Lion King",
        "rating": 8.5,
        "genre": ["Animation", "Adventure", "Drama"],
        "kpis": {
            "production_cost": 45000000,
            "revenue": 968550600,
            "cast_size": 8,
            "duration": 88
        },
        "people": {
            "director": "Roger Allers",
            "director_of_photography": "Keith Baxter",
            "sound_director": "George Watters II",
            "cast": ["Matthew Broderick", "Jeremy Irons", "James Earl Jones"]
        }
    }'),
    -- Movie 15
    ('{
        "title": "Gladiator",
        "rating": 8.5,
        "genre": ["Action", "Adventure", "Drama"],
        "kpis": {
            "production_cost": 103000000,
            "revenue": 457640427,
            "cast_size": 18,
            "duration": 155
        },
        "people": {
            "director": "Ridley Scott",
            "director_of_photography": "John Mathieson",
            "sound_director": "David Farmer",
            "cast": ["Russell Crowe", "Joaquin Phoenix", "Connie Nielsen"]
        }
    }'),
    -- Movie 16
    ('{
        "title": "The Green Mile",
        "rating": 8.6,
        "genre": ["Crime", "Drama", "Fantasy"],
        "kpis": {
            "production_cost": 60000000,
            "revenue": 286801374,
            "cast_size": 10,
            "duration": 189
        },
        "people": {
            "director": "Frank Darabont",
            "director_of_photography": "David Tattersall",
            "sound_director": "Gregg Landaker",
            "cast": ["Tom Hanks", "Michael Clarke Duncan", "David Morse"]
        }
    }'),
    -- Movie 17
    ('{
        "title": "The Prestige",
        "rating": 8.5,
        "genre": ["Drama", "Mystery", "Sci-Fi"],
        "kpis": {
            "production_cost": 40000000,
            "revenue": 109676311,
            "cast_size": 8,
            "duration": 130
        },
        "people": {
            "director": "Christopher Nolan",
            "director_of_photography": "Wally Pfister",
            "sound_director": "Richard King",
            "cast": ["Christian Bale", "Hugh Jackman", "Scarlett Johansson"]
        }
    }'),
    -- Movie 18
    ('{
        "title": "The Silence of the Lambs",
        "rating": 8.6,
        "genre": ["Crime", "Drama", "Thriller"],
        "kpis": {
            "production_cost": 19000000,
            "revenue": 272742922,
            "cast_size": 9,
            "duration": 118
        },
        "people": {
            "director": "Jonathan Demme",
            "director_of_photography": "Tak Fujimoto",
            "sound_director": "Tom Fleischman",
            "cast": ["Jodie Foster", "Anthony Hopkins", "Lawrence A. Bonney"]
        }
    }'),
    -- Movie 19
    ('{
        "title": "The Usual Suspects",
        "rating": 8.5,
        "genre": ["Crime", "Mystery", "Thriller"],
        "kpis": {
            "production_cost": 6000000,
            "revenue": 34282190,
            "cast_size": 7,
            "duration": 106
        },
        "people": {
            "director": "Bryan Singer",
            "director_of_photography": "Newton Thomas Sigel",
            "sound_director": "Ron Bartlett",
            "cast": ["Kevin Spacey", "Gabriel Byrne", "Chazz Palminteri"]
        }
    }'),
    -- Movie 20
    ('{
        "title": "Saving Private Ryan",
        "rating": 8.6,
        "genre": ["Drama", "War"],
        "kpis": {
            "production_cost": 70000000,
            "revenue": 481840909,
            "cast_size": 15,
            "duration": 169
        },
        "people": {
            "director": "Steven Spielberg",
            "director_of_photography": "Janusz Kamiński",
            "sound_director": "Gary Rydstrom",
            "cast": ["Tom Hanks", "Matt Damon", "Tom Sizemore"]
        }
    }'),
    -- Movie 21
    ('{
        "title": "Interstellar",
        "rating": 8.6,
        "genre": ["Adventure", "Drama", "Sci-Fi"],
        "kpis": {
            "production_cost": 165000000,
            "revenue": 677471339,
            "cast_size": 13,
            "duration": 169
        },
        "people": {
            "director": "Christopher Nolan",
            "director_of_photography": "Hoyte Van Hoytema",
            "sound_director": "Richard King",
            "cast": ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"]
        }
    }'),
    -- Movie 22
    ('{
        "title": "The Departed",
        "rating": 8.5,
        "genre": ["Crime", "Drama", "Thriller"],
        "kpis": {
            "production_cost": 90000000,
            "revenue": 289847354,
            "cast_size": 18,
            "duration": 151
        },
        "people": {
            "director": "Martin Scorsese",
            "director_of_photography": "Michael Ballhaus",
            "sound_director": "Philip Stockton",
            "cast": ["Leonardo DiCaprio", "Matt Damon", "Jack Nicholson"]
        }
    }'),
    -- Movie 23
    ('{
        "title": "Seven",
        "rating": 8.6,
        "genre": ["Crime", "Drama", "Mystery"],
        "kpis": {
            "production_cost": 33000000,
            "revenue": 327311859,
            "cast_size": 7,
            "duration": 127
        },
        "people": {
            "director": "David Fincher",
            "director_of_photography": "Darius Khondji",
            "sound_director": "Ren Klyce",
            "cast": ["Morgan Freeman", "Brad Pitt", "Kevin Spacey"]
        }
    }'),
    -- Movie 24
    ('{
        "title": "Forrest Gump",
        "rating": 8.8,
        "genre": ["Drama", "Romance"],
        "kpis": {
            "production_cost": 55000000,
            "revenue": 677945399,
            "cast_size": 13,
            "duration": 142
        },
        "people": {
            "director": "Robert Zemeckis",
            "director_of_photography": "Don Burgess",
            "sound_director": "Gloria S. Borders",
            "cast": ["Tom Hanks", "Robin Wright", "Gary Sinise"]
        }
    }'),
    -- Movie 25
    ('{
        "title": "The Lion King",
        "rating": 8.5,
        "genre": ["Animation", "Adventure", "Drama"],
        "kpis": {
            "production_cost": 45000000,
            "revenue": 968550600,
            "cast_size": 8,
            "duration": 88
        },
        "people": {
            "director": "Roger Allers",
            "director_of_photography": "Keith Baxter",
            "sound_director": "George Watters II",
            "cast": ["Matthew Broderick", "Jeremy Irons", "James Earl Jones"]
        }
    }'),
    -- Movie 26
    ('{
        "title": "Gladiator",
        "rating": 8.5,
        "genre": ["Action", "Adventure", "Drama"],
        "kpis": {
            "production_cost": 103000000,
            "revenue": 457640427,
            "cast_size": 18,
            "duration": 155
        },
        "people": {
            "director": "Ridley Scott",
            "director_of_photography": "John Mathieson",
            "sound_director": "David Farmer",
            "cast": ["Russell Crowe", "Joaquin Phoenix", "Connie Nielsen"]
        }
    }'),
    -- Movie 27
    ('{
        "title": "The Green Mile",
        "rating": 8.6,
        "genre": ["Crime", "Drama", "Fantasy"],
        "kpis": {
            "production_cost": 60000000,
            "revenue": 286801374,
            "cast_size": 10,
            "duration": 189
        },
        "people": {
            "director": "Frank Darabont",
            "director_of_photography": "David Tattersall",
            "sound_director": "Gregg Landaker",
            "cast": ["Tom Hanks", "Michael Clarke Duncan", "David Morse"]
        }
    }'),
    -- Movie 28
    ('{
        "title": "The Prestige",
        "rating": 8.5,
        "genre": ["Drama", "Mystery", "Sci-Fi"],
        "kpis": {
            "production_cost": 40000000,
            "revenue": 109676311,
            "cast_size": 8,
            "duration": 130
        },
        "people": {
            "director": "Christopher Nolan",
            "director_of_photography": "Wally Pfister",
            "sound_director": "Richard King",
            "cast": ["Christian Bale", "Hugh Jackman", "Scarlett Johansson"]
        }
    }'),
    -- Movie 29
    ('{
        "title": "The Silence of the Lambs",
        "rating": 8.6,
        "genre": ["Crime", "Drama", "Thriller"],
        "kpis": {
            "production_cost": 19000000,
            "revenue": 272742922,
            "cast_size": 9,
            "duration": 118
        },
        "people": {
            "director": "Jonathan Demme",
            "director_of_photography": "Tak Fujimoto",
            "sound_director": "Tom Fleischman",
            "cast": ["Jodie Foster", "Anthony Hopkins", "Lawrence A. Bonney"]
        }
    }'),
    -- Movie 30
    ('{
        "title": "The Usual Suspects",
        "rating": 8.5,
        "genre": ["Crime", "Mystery", "Thriller"],
        "kpis": {
            "production_cost": 6000000,
            "revenue": 34282190,
            "cast_size": 7,
            "duration": 106
        },
        "people": {
            "director": "Bryan Singer",
            "director_of_photography": "Newton Thomas Sigel",
            "sound_director": "Ron Bartlett",
            "cast": ["Kevin Spacey", "Gabriel Byrne", "Chazz Palminteri"]
        }
    }'),
    -- Movie 31
    ('{
        "title": "Saving Private Ryan",
        "rating": 8.6,
        "genre": ["Drama", "War"],
        "kpis": {
            "production_cost": 70000000,
            "revenue": 481840909,
            "cast_size": 15,
            "duration": 169
        },
        "people": {
            "director": "Steven Spielberg",
            "director_of_photography": "Janusz Kamiński",
            "sound_director": "Gary Rydstrom",
            "cast": ["Tom Hanks", "Matt Damon", "Tom Sizemore"]
        }
    }'),
    -- Movie 32
    ('{
        "title": "Interstellar",
        "rating": 8.6,
        "genre": ["Adventure", "Drama", "Sci-Fi"],
        "kpis": {
            "production_cost": 165000000,
            "revenue": 677471339,
            "cast_size": 13,
            "duration": 169
        },
        "people": {
            "director": "Christopher Nolan",
            "director_of_photography": "Hoyte Van Hoytema",
            "sound_director": "Richard King",
            "cast": ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"]
        }
    }'),
    -- Movie 33
    ('{
        "title": "The Dark Knight Rises",
        "rating": 8.4,
        "genre": ["Action", "Thriller"],
        "kpis": {
            "production_cost": 250000000,
            "revenue": 1081041287,
            "cast_size": 15,
            "duration": 164
        },
        "people": {
            "director": "Christopher Nolan",
            "director_of_photography": "Wally Pfister",
            "sound_director": "Richard King",
            "cast": ["Christian Bale", "Tom Hardy", "Anne Hathaway"]
        }
    }'),
    -- Movie 34
    ('{
        "title": "The Shining",
        "rating": 8.4,
        "genre": ["Drama", "Horror"],
        "kpis": {
            "production_cost": 19000000,
            "revenue": 44500000,
            "cast_size": 8,
            "duration": 146
        },
        "people": {
            "director": "Stanley Kubrick",
            "director_of_photography": "John Alcott",
            "sound_director": "Gordon Stainforth",
            "cast": ["Jack Nicholson", "Shelley Duvall", "Danny Lloyd"]
        }
    }'),
    -- Movie 35
    ('{
        "title": "Eternal Sunshine of the Spotless Mind",
        "rating": 8.3,
        "genre": ["Drama", "Romance", "Sci-Fi"],
        "kpis": {
            "production_cost": 20000000,
            "revenue": 72258126,
            "cast_size": 9,
            "duration": 108
        },
        "people": {
            "director": "Michel Gondry",
            "director_of_photography": "Ellen Kuras",
            "sound_director": "Pierre Brouwers",
            "cast": ["Jim Carrey", "Kate Winslet", "Tom Wilkinson"]
        }
    }'),
    -- Movie 36
    ('{
        "title": "Back to the Future",
        "rating": 8.5,
        "genre": ["Adventure", "Comedy", "Sci-Fi"],
        "kpis": {
            "production_cost": 19000000,
            "revenue": 381109762,
            "cast_size": 11,
            "duration": 116
        },
        "people": {
            "director": "Robert Zemeckis",
            "director_of_photography": "Dean Cundey",
            "sound_director": "Bill Varney",
            "cast": ["Michael J. Fox", "Christopher Lloyd", "Lea Thompson"]
        }
    }'),
    -- Movie 37
    ('{
        "title": "Whiplash",
        "rating": 8.5,
        "genre": ["Drama", "Music"],
        "kpis": {
            "production_cost": 3300000,
            "revenue": 49197437,
            "cast_size": 8,
            "duration": 107
        },
        "people": {
            "director": "Damien Chazelle",
            "director_of_photography": "Sharone Meir",
            "sound_director": "Craig Mann",
            "cast": ["Miles Teller", "J.K. Simmons", "Melissa Benoist"]
        }
    }'),
    -- Movie 38
    ('{
        "title": "The Avengers",
        "rating": 8.0,
        "genre": ["Action", "Adventure", "Sci-Fi"],
        "kpis": {
            "production_cost": 220000000,
            "revenue": 1518812988,
            "cast_size": 17,
            "duration": 143
        },
        "people": {
            "director": "Joss Whedon",
            "director_of_photography": "Seamus McGarvey",
            "sound_director": "Christopher Boyes",
            "cast": ["Robert Downey Jr.", "Chris Evans", "Mark Ruffalo"]
        }
    }'),
    -- Movie 39
    ('{
        "title": "The Pianist",
        "rating": 8.5,
        "genre": ["Biography", "Drama", "Music"],
        "kpis": {
            "production_cost": 35000000,
            "revenue": 120072577,
            "cast_size": 9,
            "duration": 150
        },
        "people": {
            "director": "Roman Polanski",
            "director_of_photography": "Paweł Edelman",
            "sound_director": "Jean-Marie Blondel",
            "cast": ["Adrien Brody", "Emilia Fox", "Michał Żebrowski"]
        }
    }'),
    -- Movie 40
    ('{
        "title": "Toy Story",
        "rating": 8.3,
        "genre": ["Animation", "Adventure", "Comedy"],
        "kpis": {
            "production_cost": 30000000,
            "revenue": 373554033,
            "cast_size": 13,
            "duration": 81
        },
        "people": {
            "director": "John Lasseter",
            "director_of_photography": "Sharon Calahan",
            "sound_director": "Gary Rydstrom",
            "cast": ["Tom Hanks", "Tim Allen", "Don Rickles"]
        }
    }');


TRUNCATE TABLE movies_jsonb RESTART IDENTITY;
INSERT INTO movies_jsonb (data)
VALUES
    -- Movie 1
    ('{
        "title": "Inception",
        "rating": 8.8,
        "genre": ["Action", "Adventure", "Sci-Fi"],
        "kpis": {
            "production_cost": 160000000,
            "revenue": 825532764,
            "cast_size": 10,
            "duration": 148
        },
        "people": {
            "director": "Christopher Nolan",
            "director_of_photography": "Wally Pfister",
            "sound_director": "Richard King",
            "cast": ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Ellen Page"]
        }
    }'),
    -- Movie 2
    ('{
        "title": "The Shawshank Redemption",
        "rating": 9.3,
        "genre": ["Drama"],
        "kpis": {
            "production_cost": 25000000,
            "revenue": 58300000,
            "cast_size": 12,
            "duration": 142
        },
        "people": {
            "director": "Frank Darabont",
            "director_of_photography": "Roger Deakins",
            "sound_director": "Frank E. Eulner",
            "cast": ["Tim Robbins", "Morgan Freeman"]
        }
    }'),
    -- Movie 3
    ('{
        "title": "The Dark Knight",
        "rating": 9.0,
        "genre": ["Action", "Crime", "Drama"],
        "kpis": {
            "production_cost": 185000000,
            "revenue": 1004558444,
            "cast_size": 17,
            "duration": 152
        },
        "people": {
            "director": "Christopher Nolan",
            "director_of_photography": "Wally Pfister",
            "sound_director": "Richard King",
            "cast": ["Christian Bale", "Heath Ledger", "Aaron Eckhart"]
        }
    }'),
    -- Movie 4
    ('{
        "title": "Pulp Fiction",
        "rating": 8.9,
        "genre": ["Crime", "Drama"],
        "kpis": {
            "production_cost": 8000000,
            "revenue": 213928762,
            "cast_size": 13,
            "duration": 154
        },
        "people": {
            "director": "Quentin Tarantino",
            "director_of_photography": "Andrzej Sekula",
            "sound_director": "Robert Rodriguez",
            "cast": ["John Travolta", "Samuel L. Jackson", "Uma Thurman"]
        }
    }'),
    -- Movie 5
    ('{
        "title": "The Godfather",
        "rating": 9.2,
        "genre": ["Crime", "Drama"],
        "kpis": {
            "production_cost": 6000000,
            "revenue": 245066411,
            "cast_size": 18,
            "duration": 175
        },
        "people": {
            "director": "Francis Ford Coppola",
            "director_of_photography": "Gordon Willis",
            "sound_director": "Nino Rota",
            "cast": ["Marlon Brando", "Al Pacino", "James Caan"]
        }
    }'),
    -- Movie 6
    ('{
        "title": "Fight Club",
        "rating": 8.8,
        "genre": ["Drama"],
        "kpis": {
            "production_cost": 63000000,
            "revenue": 100853753,
            "cast_size": 9,
            "duration": 139
        },
        "people": {
            "director": "David Fincher",
            "director_of_photography": "Jeff Cronenweth",
            "sound_director": "Ren Klyce",
            "cast": ["Brad Pitt", "Edward Norton", "Helena Bonham Carter"]
        }
    }'),
    -- Movie 7
    ('{
        "title": "The Matrix",
        "rating": 8.7,
        "genre": ["Action", "Sci-Fi"],
        "kpis": {
            "production_cost": 63000000,
            "revenue": 463517383,
            "cast_size": 16,
            "duration": 136
        },
        "people": {
            "director": "Lana Wachowski",
            "director_of_photography": "Bill Pope",
            "sound_director": "Dane A. Davis",
            "cast": ["Keanu Reeves", "Laurence Fishburne", "Carrie-Anne Moss"]
        }
    }'),
    -- Movie 8
    ('{
        "title": "The Lord of the Rings: The Return of the King",
        "rating": 8.9,
        "genre": ["Adventure", "Drama", "Fantasy"],
        "kpis": {
            "production_cost": 94000000,
            "revenue": 1119929521,
            "cast_size": 14,
            "duration": 201
        },
        "people": {
            "director": "Peter Jackson",
            "director_of_photography": "Andrew Lesnie",
            "sound_director": "Christopher Boyes",
            "cast": ["Elijah Wood", "Viggo Mortensen", "Ian McKellen"]
        }
    }'),
    -- Movie 9
    ('{
        "title": "Goodfellas",
        "rating": 8.7,
        "genre": ["Biography", "Crime", "Drama"],
        "kpis": {
            "production_cost": 25000000,
            "revenue": 46836394,
            "cast_size": 15,
            "duration": 146
        },
        "people": {
            "director": "Martin Scorsese",
            "director_of_photography": "Michael Ballhaus",
            "sound_director": "Tom Fleischman",
            "cast": ["Robert De Niro", "Ray Liotta", "Joe Pesci"]
        }
    }'),
    -- Movie 10
    ('{
        "title": "Schindlers List",
        "rating": 8.9,
        "genre": ["Biography", "Drama", "History"],
        "kpis": {
            "production_cost": 22000000,
            "revenue": 321306305,
            "cast_size": 11,
            "duration": 195
        },
        "people": {
            "director": "Steven Spielberg",
            "director_of_photography": "Janusz Kamiński",
            "sound_director": "Andy Nelson",
            "cast": ["Liam Neeson", "Ralph Fiennes", "Ben Kingsley"]
        }
    }'),
    -- Movie 11
    ('{
        "title": "The Departed",
        "rating": 8.5,
        "genre": ["Crime", "Drama", "Thriller"],
        "kpis": {
            "production_cost": 90000000,
            "revenue": 289847354,
            "cast_size": 18,
            "duration": 151
        },
        "people": {
            "director": "Martin Scorsese",
            "director_of_photography": "Michael Ballhaus",
            "sound_director": "Philip Stockton",
            "cast": ["Leonardo DiCaprio", "Matt Damon", "Jack Nicholson"]
        }
    }'),
    -- Movie 12
    ('{
        "title": "Seven",
        "rating": 8.6,
        "genre": ["Crime", "Drama", "Mystery"],
        "kpis": {
            "production_cost": 33000000,
            "revenue": 327311859,
            "cast_size": 7,
            "duration": 127
        },
        "people": {
            "director": "David Fincher",
            "director_of_photography": "Darius Khondji",
            "sound_director": "Ren Klyce",
            "cast": ["Morgan Freeman", "Brad Pitt", "Kevin Spacey"]
        }
    }'),
    -- Movie 13
    ('{
        "title": "Forrest Gump",
        "rating": 8.8,
        "genre": ["Drama", "Romance"],
        "kpis": {
            "production_cost": 55000000,
            "revenue": 677945399,
            "cast_size": 13,
            "duration": 142
        },
        "people": {
            "director": "Robert Zemeckis",
            "director_of_photography": "Don Burgess",
            "sound_director": "Gloria S. Borders",
            "cast": ["Tom Hanks", "Robin Wright", "Gary Sinise"]
        }
    }'),
    -- Movie 14
    ('{
        "title": "The Lion King",
        "rating": 8.5,
        "genre": ["Animation", "Adventure", "Drama"],
        "kpis": {
            "production_cost": 45000000,
            "revenue": 968550600,
            "cast_size": 8,
            "duration": 88
        },
        "people": {
            "director": "Roger Allers",
            "director_of_photography": "Keith Baxter",
            "sound_director": "George Watters II",
            "cast": ["Matthew Broderick", "Jeremy Irons", "James Earl Jones"]
        }
    }'),
    -- Movie 15
    ('{
        "title": "Gladiator",
        "rating": 8.5,
        "genre": ["Action", "Adventure", "Drama"],
        "kpis": {
            "production_cost": 103000000,
            "revenue": 457640427,
            "cast_size": 18,
            "duration": 155
        },
        "people": {
            "director": "Ridley Scott",
            "director_of_photography": "John Mathieson",
            "sound_director": "David Farmer",
            "cast": ["Russell Crowe", "Joaquin Phoenix", "Connie Nielsen"]
        }
    }'),
    -- Movie 16
    ('{
        "title": "The Green Mile",
        "rating": 8.6,
        "genre": ["Crime", "Drama", "Fantasy"],
        "kpis": {
            "production_cost": 60000000,
            "revenue": 286801374,
            "cast_size": 10,
            "duration": 189
        },
        "people": {
            "director": "Frank Darabont",
            "director_of_photography": "David Tattersall",
            "sound_director": "Gregg Landaker",
            "cast": ["Tom Hanks", "Michael Clarke Duncan", "David Morse"]
        }
    }'),
    -- Movie 17
    ('{
        "title": "The Prestige",
        "rating": 8.5,
        "genre": ["Drama", "Mystery", "Sci-Fi"],
        "kpis": {
            "production_cost": 40000000,
            "revenue": 109676311,
            "cast_size": 8,
            "duration": 130
        },
        "people": {
            "director": "Christopher Nolan",
            "director_of_photography": "Wally Pfister",
            "sound_director": "Richard King",
            "cast": ["Christian Bale", "Hugh Jackman", "Scarlett Johansson"]
        }
    }'),
    -- Movie 18
    ('{
        "title": "The Silence of the Lambs",
        "rating": 8.6,
        "genre": ["Crime", "Drama", "Thriller"],
        "kpis": {
            "production_cost": 19000000,
            "revenue": 272742922,
            "cast_size": 9,
            "duration": 118
        },
        "people": {
            "director": "Jonathan Demme",
            "director_of_photography": "Tak Fujimoto",
            "sound_director": "Tom Fleischman",
            "cast": ["Jodie Foster", "Anthony Hopkins", "Lawrence A. Bonney"]
        }
    }'),
    -- Movie 19
    ('{
        "title": "The Usual Suspects",
        "rating": 8.5,
        "genre": ["Crime", "Mystery", "Thriller"],
        "kpis": {
            "production_cost": 6000000,
            "revenue": 34282190,
            "cast_size": 7,
            "duration": 106
        },
        "people": {
            "director": "Bryan Singer",
            "director_of_photography": "Newton Thomas Sigel",
            "sound_director": "Ron Bartlett",
            "cast": ["Kevin Spacey", "Gabriel Byrne", "Chazz Palminteri"]
        }
    }'),
    -- Movie 20
    ('{
        "title": "Saving Private Ryan",
        "rating": 8.6,
        "genre": ["Drama", "War"],
        "kpis": {
            "production_cost": 70000000,
            "revenue": 481840909,
            "cast_size": 15,
            "duration": 169
        },
        "people": {
            "director": "Steven Spielberg",
            "director_of_photography": "Janusz Kamiński",
            "sound_director": "Gary Rydstrom",
            "cast": ["Tom Hanks", "Matt Damon", "Tom Sizemore"]
        }
    }'),
    -- Movie 21
    ('{
        "title": "Interstellar",
        "rating": 8.6,
        "genre": ["Adventure", "Drama", "Sci-Fi"],
        "kpis": {
            "production_cost": 165000000,
            "revenue": 677471339,
            "cast_size": 13,
            "duration": 169
        },
        "people": {
            "director": "Christopher Nolan",
            "director_of_photography": "Hoyte Van Hoytema",
            "sound_director": "Richard King",
            "cast": ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"]
        }
    }'),
    -- Movie 22
    ('{
        "title": "The Departed",
        "rating": 8.5,
        "genre": ["Crime", "Drama", "Thriller"],
        "kpis": {
            "production_cost": 90000000,
            "revenue": 289847354,
            "cast_size": 18,
            "duration": 151
        },
        "people": {
            "director": "Martin Scorsese",
            "director_of_photography": "Michael Ballhaus",
            "sound_director": "Philip Stockton",
            "cast": ["Leonardo DiCaprio", "Matt Damon", "Jack Nicholson"]
        }
    }'),
    -- Movie 23
    ('{
        "title": "Seven",
        "rating": 8.6,
        "genre": ["Crime", "Drama", "Mystery"],
        "kpis": {
            "production_cost": 33000000,
            "revenue": 327311859,
            "cast_size": 7,
            "duration": 127
        },
        "people": {
            "director": "David Fincher",
            "director_of_photography": "Darius Khondji",
            "sound_director": "Ren Klyce",
            "cast": ["Morgan Freeman", "Brad Pitt", "Kevin Spacey"]
        }
    }'),
    -- Movie 24
    ('{
        "title": "Forrest Gump",
        "rating": 8.8,
        "genre": ["Drama", "Romance"],
        "kpis": {
            "production_cost": 55000000,
            "revenue": 677945399,
            "cast_size": 13,
            "duration": 142
        },
        "people": {
            "director": "Robert Zemeckis",
            "director_of_photography": "Don Burgess",
            "sound_director": "Gloria S. Borders",
            "cast": ["Tom Hanks", "Robin Wright", "Gary Sinise"]
        }
    }'),
    -- Movie 25
    ('{
        "title": "The Lion King",
        "rating": 8.5,
        "genre": ["Animation", "Adventure", "Drama"],
        "kpis": {
            "production_cost": 45000000,
            "revenue": 968550600,
            "cast_size": 8,
            "duration": 88
        },
        "people": {
            "director": "Roger Allers",
            "director_of_photography": "Keith Baxter",
            "sound_director": "George Watters II",
            "cast": ["Matthew Broderick", "Jeremy Irons", "James Earl Jones"]
        }
    }'),
    -- Movie 26
    ('{
        "title": "Gladiator",
        "rating": 8.5,
        "genre": ["Action", "Adventure", "Drama"],
        "kpis": {
            "production_cost": 103000000,
            "revenue": 457640427,
            "cast_size": 18,
            "duration": 155
        },
        "people": {
            "director": "Ridley Scott",
            "director_of_photography": "John Mathieson",
            "sound_director": "David Farmer",
            "cast": ["Russell Crowe", "Joaquin Phoenix", "Connie Nielsen"]
        }
    }'),
    -- Movie 27
    ('{
        "title": "The Green Mile",
        "rating": 8.6,
        "genre": ["Crime", "Drama", "Fantasy"],
        "kpis": {
            "production_cost": 60000000,
            "revenue": 286801374,
            "cast_size": 10,
            "duration": 189
        },
        "people": {
            "director": "Frank Darabont",
            "director_of_photography": "David Tattersall",
            "sound_director": "Gregg Landaker",
            "cast": ["Tom Hanks", "Michael Clarke Duncan", "David Morse"]
        }
    }'),
    -- Movie 28
    ('{
        "title": "The Prestige",
        "rating": 8.5,
        "genre": ["Drama", "Mystery", "Sci-Fi"],
        "kpis": {
            "production_cost": 40000000,
            "revenue": 109676311,
            "cast_size": 8,
            "duration": 130
        },
        "people": {
            "director": "Christopher Nolan",
            "director_of_photography": "Wally Pfister",
            "sound_director": "Richard King",
            "cast": ["Christian Bale", "Hugh Jackman", "Scarlett Johansson"]
        }
    }'),
    -- Movie 29
    ('{
        "title": "The Silence of the Lambs",
        "rating": 8.6,
        "genre": ["Crime", "Drama", "Thriller"],
        "kpis": {
            "production_cost": 19000000,
            "revenue": 272742922,
            "cast_size": 9,
            "duration": 118
        },
        "people": {
            "director": "Jonathan Demme",
            "director_of_photography": "Tak Fujimoto",
            "sound_director": "Tom Fleischman",
            "cast": ["Jodie Foster", "Anthony Hopkins", "Lawrence A. Bonney"]
        }
    }'),
    -- Movie 30
    ('{
        "title": "The Usual Suspects",
        "rating": 8.5,
        "genre": ["Crime", "Mystery", "Thriller"],
        "kpis": {
            "production_cost": 6000000,
            "revenue": 34282190,
            "cast_size": 7,
            "duration": 106
        },
        "people": {
            "director": "Bryan Singer",
            "director_of_photography": "Newton Thomas Sigel",
            "sound_director": "Ron Bartlett",
            "cast": ["Kevin Spacey", "Gabriel Byrne", "Chazz Palminteri"]
        }
    }'),
    -- Movie 31
    ('{
        "title": "Saving Private Ryan",
        "rating": 8.6,
        "genre": ["Drama", "War"],
        "kpis": {
            "production_cost": 70000000,
            "revenue": 481840909,
            "cast_size": 15,
            "duration": 169
        },
        "people": {
            "director": "Steven Spielberg",
            "director_of_photography": "Janusz Kamiński",
            "sound_director": "Gary Rydstrom",
            "cast": ["Tom Hanks", "Matt Damon", "Tom Sizemore"]
        }
    }'),
    -- Movie 32
    ('{
        "title": "Interstellar",
        "rating": 8.6,
        "genre": ["Adventure", "Drama", "Sci-Fi"],
        "kpis": {
            "production_cost": 165000000,
            "revenue": 677471339,
            "cast_size": 13,
            "duration": 169
        },
        "people": {
            "director": "Christopher Nolan",
            "director_of_photography": "Hoyte Van Hoytema",
            "sound_director": "Richard King",
            "cast": ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"]
        }
    }'),
    -- Movie 33
    ('{
        "title": "The Dark Knight Rises",
        "rating": 8.4,
        "genre": ["Action", "Thriller"],
        "kpis": {
            "production_cost": 250000000,
            "revenue": 1081041287,
            "cast_size": 15,
            "duration": 164
        },
        "people": {
            "director": "Christopher Nolan",
            "director_of_photography": "Wally Pfister",
            "sound_director": "Richard King",
            "cast": ["Christian Bale", "Tom Hardy", "Anne Hathaway"]
        }
    }'),
    -- Movie 34
    ('{
        "title": "The Shining",
        "rating": 8.4,
        "genre": ["Drama", "Horror"],
        "kpis": {
            "production_cost": 19000000,
            "revenue": 44500000,
            "cast_size": 8,
            "duration": 146
        },
        "people": {
            "director": "Stanley Kubrick",
            "director_of_photography": "John Alcott",
            "sound_director": "Gordon Stainforth",
            "cast": ["Jack Nicholson", "Shelley Duvall", "Danny Lloyd"]
        }
    }'),
    -- Movie 35
    ('{
        "title": "Eternal Sunshine of the Spotless Mind",
        "rating": 8.3,
        "genre": ["Drama", "Romance", "Sci-Fi"],
        "kpis": {
            "production_cost": 20000000,
            "revenue": 72258126,
            "cast_size": 9,
            "duration": 108
        },
        "people": {
            "director": "Michel Gondry",
            "director_of_photography": "Ellen Kuras",
            "sound_director": "Pierre Brouwers",
            "cast": ["Jim Carrey", "Kate Winslet", "Tom Wilkinson"]
        }
    }'),
    -- Movie 36
    ('{
        "title": "Back to the Future",
        "rating": 8.5,
        "genre": ["Adventure", "Comedy", "Sci-Fi"],
        "kpis": {
            "production_cost": 19000000,
            "revenue": 381109762,
            "cast_size": 11,
            "duration": 116
        },
        "people": {
            "director": "Robert Zemeckis",
            "director_of_photography": "Dean Cundey",
            "sound_director": "Bill Varney",
            "cast": ["Michael J. Fox", "Christopher Lloyd", "Lea Thompson"]
        }
    }'),
    -- Movie 37
    ('{
        "title": "Whiplash",
        "rating": 8.5,
        "genre": ["Drama", "Music"],
        "kpis": {
            "production_cost": 3300000,
            "revenue": 49197437,
            "cast_size": 8,
            "duration": 107
        },
        "people": {
            "director": "Damien Chazelle",
            "director_of_photography": "Sharone Meir",
            "sound_director": "Craig Mann",
            "cast": ["Miles Teller", "J.K. Simmons", "Melissa Benoist"]
        }
    }'),
    -- Movie 38
    ('{
        "title": "The Avengers",
        "rating": 8.0,
        "genre": ["Action", "Adventure", "Sci-Fi"],
        "kpis": {
            "production_cost": 220000000,
            "revenue": 1518812988,
            "cast_size": 17,
            "duration": 143
        },
        "people": {
            "director": "Joss Whedon",
            "director_of_photography": "Seamus McGarvey",
            "sound_director": "Christopher Boyes",
            "cast": ["Robert Downey Jr.", "Chris Evans", "Mark Ruffalo"]
        }
    }'),
    -- Movie 39
    ('{
        "title": "The Pianist",
        "rating": 8.5,
        "genre": ["Biography", "Drama", "Music"],
        "kpis": {
            "production_cost": 35000000,
            "revenue": 120072577,
            "cast_size": 9,
            "duration": 150
        },
        "people": {
            "director": "Roman Polanski",
            "director_of_photography": "Paweł Edelman",
            "sound_director": "Jean-Marie Blondel",
            "cast": ["Adrien Brody", "Emilia Fox", "Michał Żebrowski"]
        }
    }'),
    -- Movie 40
    ('{
        "title": "Toy Story",
        "rating": 8.3,
        "genre": ["Animation", "Adventure", "Comedy"],
        "kpis": {
            "production_cost": 30000000,
            "revenue": 373554033,
            "cast_size": 13,
            "duration": 81
        },
        "people": {
            "director": "John Lasseter",
            "director_of_photography": "Sharon Calahan",
            "sound_director": "Gary Rydstrom",
            "cast": ["Tom Hanks", "Tim Allen", "Don Rickles"]
        }
    }');
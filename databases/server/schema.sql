CREATE DATABASE IF NOT EXISTS chat;

USE chat;

CREATE TABLE IF NOT EXISTS usernames (
  id INTEGER, 
  name TEXT NOT NULL, 
  PRIMARY KEY (id)
);
CREATE TABLE IF NOT EXISTS rooms (
  id INTEGER, 
  name TEXT NOT NULL,
  PRIMARY KEY (id)
);
CREATE TABLE IF NOT EXISTS messages (
  id INTEGER, 
  message TEXT NOT NULL, 
  username_id INTEGER, 
  room_id INTEGER, 
  PRIMARY KEY (id),
  FOREIGN KEY (username_id) REFERENCES usernames (id),  
  FOREIGN KEY (room_id) REFERENCES rooms (id)
);

/* Create other tables and define schemas for them here! */

INSERT INTO usernames VALUES (1, 'jesus christ');
INSERT INTO usernames VALUES (2, 'satan');
INSERT INTO usernames VALUES (3, 'moses');
INSERT INTO rooms VALUES (1, 'nazareth');
INSERT INTO rooms VALUES (2, 'the depths below');
INSERT INTO rooms VALUES (3, 'the red sea');
INSERT INTO messages VALUES (1, 'i am going to part the red sea', 3, 3);

SELECT * from messages;
SELECT * from usernames;
SELECT * from rooms;

/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/


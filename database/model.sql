create database exam;

create table users(
   id serial primary key not null,
   email varchar(64) not null,
   last_name text not null,
   first_name text not null, 
   phone integer not null,
   username varchar(64) unique not null,
   password varchar(64) not null,
   created_at timestamp with time zone default CURRENT_TIMESTAMP
);

CREATE TABLE groups (
  id SERIAL PRIMARY KEY NOT NULL ,
  name VARCHAR(255) NOT NULL
);

CREATE TABLE students (
  id SERIAL PRIMARY KEY NOT NULL, 
  student_password VARCHAR(64) NOT NULL,
  student_username VARCHAR(64) NOT NULL,
  group_id INTEGER,
     FOREIGN KEY(group_id) 
      REFERENCES groups(id),
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL
);

CREATE TABLE exams (
  id SERIAL PRIMARY KEY NOT NULL,
  group_id INTEGER,
      FOREIGN KEY(group_id)
          REFERENCES groups(id),
  name VARCHAR(255) NOT NULL,
  start_time TIMESTAMP WITH TIME ZONE NOT NULL,
  end_time TIMESTAMP WITH TIME ZONE NOT NULL
);

CREATE TABLE exam_answers (
  id SERIAL PRIMARY KEY NOT NULL,
  exam_id INTEGER,
      FOREIGN KEY(exam_id)
          REFERENCES exams(id),
  student_id INT REFERENCES students(id),
  answers JSONB NOT NULL
);

CREATE TABLE student_exam_status (
  id SERIAL PRIMARY KEY NOT NULL,
  student_id INTEGER,
    FOREIGN KEY (student_id)
         REFERENCES students(id),
  exam_id INTEGER,
      FOREIGN KEY(exam_id) 
         REFERENCES exams(id),
  status BOOLEAN NOT NULL
);




CREATE TABLE evalutions(
  id serial primary key not null,
  baho integer default=0,
  created_at timestamp with time zone default CURRENT_TIMESTAMP 
);

CREATE TABLE exam_files (
  id SERIAL PRIMARY KEY NOT NULL,
  student_id INTEGER,
      FOREIGN KEY(student_id)
          REFERENCES students(id),
  exam_id INTEGER,
      FOREIGN KEY(exam_id) 
          REFERENCES exams(id),
  file_name VARCHAR(255) NOT NULL,
  created_at timestamp with time zone default CURRENT_TIMESTAMP
);


CREATE TABLE student_exam_scores (
  id SERIAL PRIMARY KEY NOT NULL,
  student_id INTEGER,
      FOREIGN KEY(student_id)
          REFERENCES students(id),
  exam_id INTEGER,
      FOREIGN KEY(exam_id) 
          REFERENCES exams(id),
  score INTEGER NOT NULL,
  isActive BOOLEAN NOT NULL
);

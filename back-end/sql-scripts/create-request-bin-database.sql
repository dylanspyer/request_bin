\c postgres
CREATE DATABASE request_bin;

\c request_bin

CREATE TABLE bins (
    id SERIAL PRIMARY KEY,
    webhook_token VARCHAR NOT NULL
);

CREATE TABLE incoming_requests (
    id SERIAL PRIMARY KEY,
    bin_id INT NOT NULL REFERENCES bins(id),
    path VARCHAR NOT NULL,
    method VARCHAR NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    mongo_id VARCHAR NOT NULL
);
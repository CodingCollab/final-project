use coding_collab_db;

# select all users
SELECT * FROM users;

-- # select all from userrequests
-- SELECT * FROM userrequests;

# select all from requests
SELECT * FROM requests;

# select all from languages
SELECT * FROM languages;

# select all from requestlanguages
SELECT * FROM requestlanguages;

# select all from acceptedby
SELECT * FROM acceptedby;

# select all from requested by
SELECT * FROM requestedby;

# select all requests from a specific user
SELECT u.firstName, u.lastName, u.userName, r.*, l.langName #, rb.*, ab.*
--  FROM users u
 FROM requestedby rb
	#INNER
    JOIN (users u, requests r, requestlanguages rl, languages l, acceptedby ab)
    ON u.userID = rb.requestedByUser_userID
    AND u.userID = ab.requestAcceptedBy_userID
    AND r.requestID = rb.requestedID
    AND r.requestID = ab.accepted_requestID
    AND r.requestID = rl.req_id
    AND rl.lang_id = l.langID;
--     WHERE u.userName = #username#;

# select all accepted requests by a specific user
SELECT u.firstName, u.lastName, u.userName, r.*, l.langName #, rb.*, ab.*
--  FROM users u
 FROM acceptedby ab
	#INNER
    JOIN (users u, requests r, requestlanguages rl, languages l, requestedby rb)
    ON u.userID = rb.requestedByUser_userID
    AND u.userID = ab.requestAcceptedBy_userID
    AND r.requestID = rb.requestedID
    AND r.requestID = ab.accepted_requestID
    AND r.requestID = rl.req_id
    AND rl.lang_id = l.langID;
--     WHERE u.userName = #username#;

use coding_collab_db;

# select all users
SELECT * FROM users;

# select all from userrequests
SELECT * FROM userrequests;

# select all from requests
SELECT * FROM requests;

# select all from languages
SELECT * FROM languages;

# select all from requestlanguages
SELECT * FROM requestlanguages;

# select all requests for a specific user
SELECT u.*, r.*, rl.*, l.* FROM userrequests ur
	INNER JOIN (users u, requests r, requestlanguages rl, languages l)
    ON u.userID = ur.user_id
    AND r.requestID = ur.request_id
    AND rl.req_id = r.requestID
    AND l.langID = rl.lang_id
    WHERE u.userName = #username#
    
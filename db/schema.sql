create database coding_collab_db;

use coding_collab_db;

CREATE TABLE `users` (
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `userName` varchar(255) NOT NULL,
  `userID` char(36) NOT NULL,
  `userPass` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`userID`),
  UNIQUE KEY `userName` (`userName`),
  UNIQUE KEY `userID` (`userID`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `userrequests` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` char(36) DEFAULT NULL,
  `user_name` varchar(255) DEFAULT NULL,
  `request_id` char(36) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `User ID - users_idx` (`user_id`),
  KEY `UserName - users_idx` (`user_name`),
  KEY `UserID - requests_idx` (`request_id`),
  CONSTRAINT `RequestID - requests` FOREIGN KEY (`request_id`) REFERENCES `requests` (`requestID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `UserID - users` FOREIGN KEY (`user_id`) REFERENCES `users` (`userID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `UserName - users` FOREIGN KEY (`user_name`) REFERENCES `users` (`userName`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `requests` (
  `requestID` char(36) NOT NULL,
  `requestName` varchar(255) NOT NULL,
  `requestContent` text NOT NULL,
  `requestOpen` tinyint(1) NOT NULL DEFAULT '0',
  `requestCompleted` tinyint(1) NOT NULL DEFAULT '0',
  `requestPrice` decimal(10,2) NOT NULL DEFAULT '20.00',
  `requestDueDate` datetime NOT NULL,
  `requestCompletedDate` datetime DEFAULT NULL,
  `requestedByUser_userID` char(36) NOT NULL,
  `requestedByUser_userName` varchar(255) NOT NULL,
  `requestAcceptedBy_userID` char(36) DEFAULT NULL,
  `requestAcceptedBy_userName` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`requestID`),
  UNIQUE KEY `requestID` (`requestID`),
  KEY `UserID - userrequests_idx` (`requestedByUser_userID`),
  KEY `UserName - userrequests_idx` (`requestedByUser_userName`),
  KEY `AcceptedUserID - userrequests_idx` (`requestAcceptedBy_userID`),
  KEY `AcceptedUserName - userrequests_idx` (`requestAcceptedBy_userName`),
  CONSTRAINT `AcceptedUserID - userrequests` FOREIGN KEY (`requestAcceptedBy_userID`) REFERENCES `userrequests` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `AcceptedUserName - userrequests` FOREIGN KEY (`requestAcceptedBy_userName`) REFERENCES `userrequests` (`user_name`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `RequestedUserID - userrequests` FOREIGN KEY (`requestedByUser_userID`) REFERENCES `userrequests` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `RequestedUserName - userrequests` FOREIGN KEY (`requestedByUser_userName`) REFERENCES `userrequests` (`user_name`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `languages` (
	`langID` int(11) NOT NULL AUTO_INCREMENT,
    `langName` varchar(255) NOT NULL,
    `createdAt` datetime NOT NULL,
    `updatedAt` datetime NOT NULL,
    PRIMARY KEY (`langID`),
    UNIQUE KEY `langID` (`langID`),
    UNIQUE KEY `langName` (`langName`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `requestlanguages` (
	`request_lang_id` int(11) NOT NULL AUTO_INCREMENT,
    `req_id` char(36) DEFAULT NULL,
    `lang_id` int(11) DEFAULT NULL,
    `lang_name` varchar(255) DEFAULT NULL,
    `createdAt` datetime NOT NULL,
    `updatedAt` datetime NOT NULL,
    PRIMARY KEY (`request_lang_id`),
    KEY `Request ID - requests_idx` (`req_id`),
    KEY `Language ID - languages_idx` (`lang_id`),
    KEY `Language Name - languages_idx` (`lang_name`),
    CONSTRAINT `ReqID - requests` FOREIGN KEY (`req_id`) REFERENCES `requests` (`requestID`) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT `LangID - languages` FOREIGN KEY (`lang_id`) REFERENCES `languages` (`langID`) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT `LangName - languages` FOREIGN KEY (`lang_name`) REFERENCES `languages` (`langName`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
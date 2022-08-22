ALTER TABLE Users AUTO_INCREMENT = 1;
ALTER TABLE Likes AUTO_INCREMENT = 1;
ALTER TABLE Dislikes AUTO_INCREMENT = 1;
INSERT INTO Users(email, password, nickname, age, address, gender, imageUrl, interest)
VALUES ("ramen@google.com", "147258", "박준일", 28, "충청", false, "image777", '01100');
INSERT INTO Users(email, password, nickname, age, address, gender, imageUrl, interest)
VALUES ("eggrice@naver.com", "258369", "박준이", 27, "제주", true, "image321", '11000');
INSERT INTO Users(email, password, nickname, age, address, gender, imageUrl, interest)
VALUES ("soyrice@kakao.com", "753159", "박준삼", 26, "인천", false, "image751", '11100');
INSERT INTO Users(email, password, nickname, age, address, gender, imageUrl, interest)
VALUES ("hello@gmail.com", "0123", "김태형", 30, "부산", false, "abc", '00101');
INSERT INTO Users(email, password, nickname, age, address, gender, imageUrl, interest)
VALUES ("world@naver.com", "4567", "최빛나", 31, "서울", true, "def", '11101');
INSERT INTO Users(email, password, nickname, age, address, gender, imageUrl, interest)
VALUES ("helllowworld@gmail.com", "8901", "이소영", 32, "경기", true, "ghi", '01010');
INSERT INTO Users(email, password, nickname, age, address, gender, imageUrl, interest)
VALUES ("testaa@test.com", "1111!!aa", "둘리", 52, "서울 도봉구", false, "img.png", '10010');
INSERT INTO Users(email, password, nickname, age, address, gender, imageUrl, interest)
VALUES ("testbb@test.com", "1111!!bb", "펭수", 10, "남극", true, "img.png", '11111');
INSERT INTO Users(email, password, nickname, age, address, gender, imageUrl, interest)
VALUES ("testcc@test.com", "1111!!cc", "미키마우스", 37, "강원도", false, "img.png", '11010');
INSERT INTO Users(email, password, nickname, age, address, gender, imageUrl, interest)
VALUES ("minsun@test.com", "Aa123!", "해리포터", 18, "대전", false, "img.png", '11100');
INSERT INTO Users(email, password, nickname, age, address, gender, imageUrl, interest)
VALUES ("dumbledore@test.com", "Bb123!", "덤블도어", 82, "춘천", false, "img.png", '10110');
INSERT INTO Users(email, password, nickname, age, address, gender, imageUrl, interest)
VALUES ("Hermine@test.com", "Cc123!", "헤르미온느", 20, "순천", true, "img.png", '11111');
INSERT INTO Users(email, password, nickname, age, address, gender, imageUrl, interest)
VALUES ("test111@test.com", "1234qwer!", "전지투", 23, "인천", false, "img.png", '10110');
INSERT INTO Users(email, password, nickname, age, address, gender, imageUrl, interest)
VALUES ("test222@test.com", "1234qwer", "전지쓰리", 24, "캘거리", true, "img.png", '10111');
INSERT INTO Users(email, password, nickname, age, address, gender, imageUrl, interest)
VALUES ("test333@test.com", "1234qwer", "전지포", 25, "폴란드", false, "img.png", '11110');
INSERT INTO Users(email, password, nickname, age, address, gender, imageUrl, interest)
VALUES ("test@test.com", "1234", "조권영", 20, "강원도", false, "zzz", '01100');
INSERT INTO Users(email, password, nickname, age, address, gender, imageUrl, interest)
VALUES ("test2@test.com", "1234", "오일남", 60, "서울", false, "zzz", '10100');
INSERT INTO Users(email, password, nickname, age, address, gender, imageUrl, interest)
VALUES ("test3@test.com", "1234", "김민선", 20, "독일", true, "zzz", '00101');
INSERT INTO Users(email, password, nickname, age, address, gender, imageUrl, interest)
VALUES ("test4@test.com", "1234", "전지원", 20, "서울", true, "zzz", '01110');
INSERT INTO Users(email, password, nickname, age, address, gender, imageUrl, interest)
VALUES ("test5@test.com", "1234", "이재철", 25, "대전", false, "zzz", '10101');
INSERT INTO Users(email, password, nickname, age, address, gender, imageUrl, interest)
VALUES ("test6@test.com", "1234", "용성령", 30, "서울", true, "zzz", '01101');
INSERT INTO Users(email, password, nickname, age, address, gender, imageUrl, interest)
VALUES ("test7@test.com", "1234", "두선아", 20, "중랑구", true, "zzz", '01010');
INSERT INTO Users(email, password, nickname, age, address, gender, imageUrl, interest)
VALUES ("test8@test.com", "1234", "박준수", 20, "서울", false, "zzz", '00101');
INSERT INTO Users(email, password, nickname, age, address, gender, imageUrl, interest)
VALUES ("test9@test.com", "1234", "유지완", 20, "서울", false, "zzz", '10100');
INSERT INTO Users(email, password, nickname, age, address, gender, imageUrl, interest)
VALUES ("test10@test.com", "1234", "이민석", 40, "서울", true, "zzz", '11100');

INSERT INTO Likes(userId, likeUserId)
VALUES (1, 4);
INSERT INTO Likes(userId, likeUserId)
VALUES (1, 9);
INSERT INTO Likes(userId, likeUserId)
VALUES (2, 1);
INSERT INTO Likes(userId, likeUserId)
VALUES (2, 7);
INSERT INTO Likes(userId, likeUserId)
VALUES (3, 4);
INSERT INTO Likes(userId, likeUserId)
VALUES (3, 9);
INSERT INTO Dislikes(userId, dislikeUserId)
VALUES (1, 3);
INSERT INTO Dislikes(userId, dislikeUserId)
VALUES (1, 10);
INSERT INTO Dislikes(userId, dislikeUserId)
VALUES (2, 6);
INSERT INTO Dislikes(userId, dislikeUserId)
VALUES (3, 1);
INSERT INTO Dislikes(userId, dislikeUserId)
VALUES (4, 5);
INSERT INTO Dislikes(userId, dislikeUserId)
VALUES (5, 1);
INSERT INTO Dislikes(userId, dislikeUserId)
VALUES (9, 1);



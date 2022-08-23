ALTER TABLE Users AUTO_INCREMENT = 1;
ALTER TABLE LikeAndDislikes AUTO_INCREMENT = 1;
#password : 123Qwe!!
INSERT INTO Users(email, password, nickname, age, address, gender, imageUrl, interest, x, y)
VALUES
("ramen@google.com", "a2dd48ed23d298cd868be56fb2897bad8bfd0a181acfa0effb650c1a597adef987acee4c6c6df601272d8017fef3a34da76a37a0f99a8ebb7ec0df843a1c9368", "박준일", 28, "충청", false, "image777", '01100', 37.60, 127.09), 
("eggrice@naver.com", "a2dd48ed23d298cd868be56fb2897bad8bfd0a181acfa0effb650c1a597adef987acee4c6c6df601272d8017fef3a34da76a37a0f99a8ebb7ec0df843a1c9368", "박준이", 27, "제주", true, "image321", '11000', 33.436, 126.733),
("soyrice@kakao.com", "a2dd48ed23d298cd868be56fb2897bad8bfd0a181acfa0effb650c1a597adef987acee4c6c6df601272d8017fef3a34da76a37a0f99a8ebb7ec0df843a1c9368", "박준삼", 26, "인천", false, "image751", '11100', 37.398, 126.685),
("hello@gmail.com", "a2dd48ed23d298cd868be56fb2897bad8bfd0a181acfa0effb650c1a597adef987acee4c6c6df601272d8017fef3a34da76a37a0f99a8ebb7ec0df843a1c9368", "김태형", 30, "부산", false, "abc", '00101', 35.162, 129.151),
("world@naver.com", "a2dd48ed23d298cd868be56fb2897bad8bfd0a181acfa0effb650c1a597adef987acee4c6c6df601272d8017fef3a34da76a37a0f99a8ebb7ec0df843a1c9368", "최빛나", 31, "서울", true, "def", '11101', 37.539, 126.975),
("helllowworld@gmail.com", "a2dd48ed23d298cd868be56fb2897bad8bfd0a181acfa0effb650c1a597adef987acee4c6c6df601272d8017fef3a34da76a37a0f99a8ebb7ec0df843a1c9368", "이소영", 32, "경기", true, "ghi", '01010', 37.430, 126.983),
("testaa@test.com", "a2dd48ed23d298cd868be56fb2897bad8bfd0a181acfa0effb650c1a597adef987acee4c6c6df601272d8017fef3a34da76a37a0f99a8ebb7ec0df843a1c9368", "둘리", 52, "서울 도봉구", false, "img.png", '10010', 37.665, 127.029),
("testbb@test.com", "a2dd48ed23d298cd868be56fb2897bad8bfd0a181acfa0effb650c1a597adef987acee4c6c6df601272d8017fef3a34da76a37a0f99a8ebb7ec0df843a1c9368", "펭수", 10, "남극", true, "img.png", '11111', 31.592, 126.643),
("testcc@test.com", "a2dd48ed23d298cd868be56fb2897bad8bfd0a181acfa0effb650c1a597adef987acee4c6c6df601272d8017fef3a34da76a37a0f99a8ebb7ec0df843a1c9368", "미키마우스", 37, "강원도", false, "img.png", '11010', 37.846, 127.735),
("minsun@test.com", "a2dd48ed23d298cd868be56fb2897bad8bfd0a181acfa0effb650c1a597adef987acee4c6c6df601272d8017fef3a34da76a37a0f99a8ebb7ec0df843a1c9368", "해리포터", 18, "대전", false, "img.png", '11100', 36.323, 127.374),
("dumbledore@test.com", "a2dd48ed23d298cd868be56fb2897bad8bfd0a181acfa0effb650c1a597adef987acee4c6c6df601272d8017fef3a34da76a37a0f99a8ebb7ec0df843a1c9368", "덤블도어", 82, "춘천", false, "img.png", '10110', 37.872, 127.748),
("Hermine@test.com", "a2dd48ed23d298cd868be56fb2897bad8bfd0a181acfa0effb650c1a597adef987acee4c6c6df601272d8017fef3a34da76a37a0f99a8ebb7ec0df843a1c9368", "헤르미온느", 20, "순천", true, "img.png", '11111', 34.947, 127.493),
("test111@test.com", "a2dd48ed23d298cd868be56fb2897bad8bfd0a181acfa0effb650c1a597adef987acee4c6c6df601272d8017fef3a34da76a37a0f99a8ebb7ec0df843a1c9368", "전지투", 23, "인천", false, "img.png", '10110', 37.442, 126.707),
("test222@test.com", "a2dd48ed23d298cd868be56fb2897bad8bfd0a181acfa0effb650c1a597adef987acee4c6c6df601272d8017fef3a34da76a37a0f99a8ebb7ec0df843a1c9368", "전지쓰리", 24, "캘거리", true, "img.png", '10111', 43.633, 139.382),
("test333@test.com", "a2dd48ed23d298cd868be56fb2897bad8bfd0a181acfa0effb650c1a597adef987acee4c6c6df601272d8017fef3a34da76a37a0f99a8ebb7ec0df843a1c9368", "전지포", 25, "폴란드", false, "img.png", '11110', 43.451, 115.695),
("test@test.com", "a2dd48ed23d298cd868be56fb2897bad8bfd0a181acfa0effb650c1a597adef987acee4c6c6df601272d8017fef3a34da76a37a0f99a8ebb7ec0df843a1c9368", "조권영", 20, "강원도", false, "zzz", '01100', 37.337, 127.938),
("test2@test.com", "a2dd48ed23d298cd868be56fb2897bad8bfd0a181acfa0effb650c1a597adef987acee4c6c6df601272d8017fef3a34da76a37a0f99a8ebb7ec0df843a1c9368", "오일남", 60, "서울", false, "zzz", '10100', 37.548, 126.955),
("test3@test.com", "a2dd48ed23d298cd868be56fb2897bad8bfd0a181acfa0effb650c1a597adef987acee4c6c6df601272d8017fef3a34da76a37a0f99a8ebb7ec0df843a1c9368", "김민선", 20, "독일", true, "zzz", '00101', 38.137, 116.511),
("test4@test.com", "a2dd48ed23d298cd868be56fb2897bad8bfd0a181acfa0effb650c1a597adef987acee4c6c6df601272d8017fef3a34da76a37a0f99a8ebb7ec0df843a1c9368", "전지원", 20, "서울", true, "zzz", '01110', 37.548, 127.002),
("test5@test.com", "a2dd48ed23d298cd868be56fb2897bad8bfd0a181acfa0effb650c1a597adef987acee4c6c6df601272d8017fef3a34da76a37a0f99a8ebb7ec0df843a1c9368", "이재철", 25, "대전", false, "zzz", '10101', 36.322, 127.391),
("test6@test.com", "a2dd48ed23d298cd868be56fb2897bad8bfd0a181acfa0effb650c1a597adef987acee4c6c6df601272d8017fef3a34da76a37a0f99a8ebb7ec0df843a1c9368", "용성령", 30, "서울", true, "zzz", '01101', 36.040, 129.349),
("test7@test.com", "a2dd48ed23d298cd868be56fb2897bad8bfd0a181acfa0effb650c1a597adef987acee4c6c6df601272d8017fef3a34da76a37a0f99a8ebb7ec0df843a1c9368", "두선아", 20, "중랑구", true, "zzz", '01010', 37.60, 127.09),
("test8@test.com", "a2dd48ed23d298cd868be56fb2897bad8bfd0a181acfa0effb650c1a597adef987acee4c6c6df601272d8017fef3a34da76a37a0f99a8ebb7ec0df843a1c9368", "박준수", 20, "서울", false, "kang.PNG", '00101', 37.554, 127.010),
("test9@test.com", "a2dd48ed23d298cd868be56fb2897bad8bfd0a181acfa0effb650c1a597adef987acee4c6c6df601272d8017fef3a34da76a37a0f99a8ebb7ec0df843a1c9368", "유지완", 20, "서울", false, "zzz", '10100', 37.598, 126.934),
("test10@test.com", "a2dd48ed23d298cd868be56fb2897bad8bfd0a181acfa0effb650c1a597adef987acee4c6c6df601272d8017fef3a34da76a37a0f99a8ebb7ec0df843a1c9368", "이민석", 40, "서울", true, "zzz", '11100', 37.558, 127.020);

INSERT INTO LikeAndDislikes(userId, targetUserId, isLike)
VALUES
(1, 4, true),
(1, 9, true),
(2, 1, true),
(2, 7, true),
(3, 4, true),
(3, 9, true),
(10, 9, true),
(10, 11, true),
(23, 5, true),
(22, 18, true),
(1, 3, false),
(1, 10, false),
(2, 6, false),
(3, 1, false),
(4, 5, false),
(5, 1, false),
(13, 2, false),
(20, 14, false),
(18, 3, false),
(17, 10, false);



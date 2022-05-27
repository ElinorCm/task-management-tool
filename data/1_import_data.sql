--
-- Base de données :  "okanban"
--

--
-- Déchargement des données de la table "user"
--

INSERT INTO "user" ("id", "firstname", "lastname", "email", "password") VALUES
(1, 'Minnie', 'Mouse', 'minniemouse@oclock.io', '$2y$10$wS68TSW78XSlfeJDNWVMkeu8HS2WhQiTaI3N4./X2EZwKx48rde6K'),
(2, 'Donald', 'Duck', 'donaldduck@oclock.io', '$2y$10$Xj.IrhtrV6ZSB3d3.85YBuwmDrX/Re.OGZY5pbs3M9gW.kEB6wa7u');


--
-- Déchargement des données de la table "list"
--

INSERT INTO "list" ("id", "name", "position", "user_id") VALUES
(1, 'TODO', 1, 1),
(2, 'WIP', 2, 1),
(3, 'DONE', 3, 1),
(4, 'TODO', 1, 2),
(5, 'WIP', 2, 2),
(6, 'DONE', 3, 2);


--
-- Déchargement des données de la table "card"
--

INSERT INTO "card" ("id", "name", "position", "color", "list_id") VALUES
(1, 'MCD', 1, '#FA8072',3),
(2, 'user-stories', 2,'#F08080',3),
(3, 'MLD', 1,'#F08080',2),
(4, 'Database', 2,'#FA8072',2),
(5, 'Home page', 1,'#800080',1);

--
-- Déchargement des données de la table "tag"
--

INSERT INTO "tag" ("id", "name", "color") VALUES
(1, 'P1','#F7DC6F'),
(2, 'P2','#F8C471'),
(3, 'P3','#DC7633');

--
-- Déchargement des données de la table "card_has_tag"
--

INSERT INTO "card_has_tag" ("card_id", "tag_id") VALUES
(1, 3),
(2, 2),
(3, 2),
(4, 1),
(5, 1);

COMMIT;


BEGIN;


SELECT setval('user_id_seq', (SELECT MAX(id) from "user"));
SELECT setval('list_id_seq', (SELECT MAX(id) from "list"));
SELECT setval('card_id_seq', (SELECT MAX(id) from "card"));
SELECT setval('tag_id_seq', (SELECT MAX(id) from "tag"));


COMMIT;
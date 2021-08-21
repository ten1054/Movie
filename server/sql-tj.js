var SQL = {
    user:{
        select:'select * from user',
        insert:'INSERT INTO `movie`.`user` (`username`, `password`) VALUES ',
        selectmovie:'select * from movie',
        selecttoopic:'SELECT * FROM movie WHERE id>= ((SELECT MAX(id) FROM movie)-(SELECT MIN(id) FROM movie)) * RAND() + (SELECT MIN(id) FROM movie)  LIMIT 5',
        selecthot:'SELECT * from movie ORDER BY hot DESC LIMIT 9',
        selectalldata:'select * from movie',
        selectmessage:'select * from message',
        selectparentmessage:'select * from parentmessage',
        selectchildmessage:'select * from childmessage',
        insertparentmessage:'INSERT INTO `movie`.`parentmessage` (`message1`, `userid`,`username`,`time`) VALUES ',
        insertchildmessagetrue:'INSERT INTO `movie`.`childmessage` (`message2`, `fromuser`,`touser`,`time`,`fromuserID`,`touserID`,`textID`) VALUES ',
        insertchildmessagefalse:'INSERT INTO `movie`.`childmessage` (`message2`, `fromuser`,`time`,`fromuserID`,`textID`) VALUES ',
    }
}
module.exports = SQL;
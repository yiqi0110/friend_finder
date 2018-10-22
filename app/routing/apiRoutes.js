var friends = require("../data/friends");

module.exports = function(app){

    app.get("/api/friends", function(req, res){
        res.json(friends);
    })

    app.post("/api/friends", function(req, res){

        var match ={
            name: "",
            image: "",
            friendDif: 100
        };

        var userData = req.body;
        var userScores = userData.scores;
        var totalDif = 0;

        for (var i = 0; i < friends.length; i++){
            // console.log(friends[i]);
            totalDif = 0;
            for(var j = 0; j <friends[i].scores[j]; j++){
                
                totalDif += Math.abs(parseInt(userScores[j]) - parseInt(friends[i].scores[j]));

                if(totalDif <= match.friendDif){
                    match.name = friends[i].name;
                    match.image = friends[i].image;
                    match.friendDif = totalDif;
                }
            }
        }

        friends.push(userData);

        res.json(match);
    })
};
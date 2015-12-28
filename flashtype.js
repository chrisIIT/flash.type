var key, keys, keyz, found, goodColors, badColors, percent, gameBegun, randomLetter, randomLetter2, correctLetter, amtRight, amtWrong, rArray, finished, accuracy, editArray, nextLet, curr;
//INITIALIZE CONDITIONS
gameBegun = false;
keys = ['Q','W','E','R','T','Y','U','I','O','P','A','S','D','F','G','H','J','K','L','Z','X','C','V','B','N','M'];
randomLetter = keys[Math.floor(Math.random()*(keys.length))];
randomLetter2 = keys[Math.floor(Math.random()*(keys.length))];
//next-previous array
rArray = [];
//create previous and next functions
editArray = function(ar)
{
    var current = 0;
    ar.next = (function(){return (++current >= this.length) ? false : this[current];});
    ar.prev = (function(){return (--current < 0) ? false : this[current];});
    return ar;
}
editArray(rArray);
//used to create initial random letter and allow user to begin with any keyboard input
function generateLetterInit()
{
    generateLetterInit = noop; 
    curr=0;
    rArray.push(randomLetter); 
    $("#middle").text(rArray[curr]).fadeIn("slow");
    rArray.push(randomLetter2);
    finished = true;
    console.log(finished);
}
//actual function that will generate new letter on each successful letter entered
function generateLetter()
{      
    var pos2 = 1;
    randomLetter2 = keys[Math.floor(Math.random()*(keys.length))];
    randomLetter3 = keys[Math.floor(Math.random()*(keys.length))];
    $("#middle").text(rArray.next()).animate({marginleft: "-20px"},300, function(){$(this).animate({marginright: "20px"},300);});   
    $("#left").text(rArray[curr]).fadeIn("slow");
    rArray.push(randomLetter3);
    $("#right").text(randomLetter3).fadeIn("slow");
    curr++;
    pos2++;
}
//no operation function to kill generateLetterInit()
function noop(){};
//correct-incorrect array storage
amtRight = [];
amtWrong = [];
//HIDE KEYBOARD
$(document).ready(function(){
    var mLeft = $("#keyboard").css("marginLeft");
    var bodyWidth = parseFloat($("#body").css("width"));
    var keyboardWidth = parseFloat($("#keyboard").css("width"));
    var freeSpace = bodyWidth - keyboardWidth;
    var equalShare = freeSpace/2;
    var out = false;
    //keep keyboard centered on window resize
    $(window).on('resize',function(){
       var bodyWidth = parseFloat($("#body").css("width"));
       var keyboardWidth = parseFloat($("#keyboard").css("width"));
       var freeSpace = bodyWidth - keyboardWidth;
       var equalShare = freeSpace/2;
        $("#keyboard").css("margin-left",equalShare);
        mLeft=equalShare;
    });
    $("#hideButton").click(function(){
        if (out == false)
            {
                //alternate hiding animation
                //$("#keyboard").animate({opacity:0},300);
                $("#keyboard").animate({"margin-left":'-100%'},300)
                $("#hideButton").text("Unhide");
                out = true;
            }
            else
            {
                $("#keyboard").animate({"margin-left":mLeft},300);
                $("#hideButton").text("Hide");
                out = false;
                //alternate hiding animation
                //$("#keyboard").animate({opacity:1},300);     
            }   
    });
    //RESET DATA
        $("#reset").click(function(){
            amtRight = [];
            amtWrong = [];
            accuracy = 0;
            $("#c").html(amtRight+'&nbsp;').show();
            $("#ac").html(accuracy+"%").show();
            $("#ic").html(amtWrong+'&nbsp;').show();
        });
});
//BEGIN KEYBOARD EVENTS
$(window).bind("keypress",function(){
    generateLetterInit();
});
$(window).bind("keydown",function(e){
key = String.fromCharCode(e.keyCode);
box = document.getElementsByClassName("box");
keyz = document.getElementsByClassName("keyz");
found = false;
gameBegun = true;
accuracy = (amtRight/(amtRight+amtWrong)*100).toFixed(2);
if (gameBegun == true && finished == true)
    {
    //check if acceptable keys are entered
    for (var a =0; a<keys.length && !found;a++)
        {
            if (keys[a] == key)
                {
                    //check if letter entered is correct; if it is show more, else don't
                    if (key == rArray[curr])
                    {
                        correctLetter = true;
                        generateLetter();
                        //$("#test").text(rArray).fadeIn("slow");   
                        amtRight++;
                        $("#c").text(amtRight).show();
                        $("#ac").text(accuracy+"%").show();
                    }
                    else
                    {
                        correctLetter = false;
                        amtWrong++;
                        $("#ic").text(amtWrong).show();
                        $("#ac").text(accuracy+"%").show();
                    }
                    for (var i =0;i<keyz.length;i++)
                       {
                        if (key == keyz[i].innerHTML)
                            {
                                //display letter corresponding to keypress; green for correct key, red for incorrect
                                if (correctLetter == true)
                                    {
                                        $(box[i]).animate({backgroundColor: "#28B463"}, 100, function(){
                                            $(this).animate({backgroundColor: "white"},100)});    
                                        $("#checkmark").animate({opacity: 1},200, function(){
                                            $(this).animate({opacity: 0},200)});
                                    }
                                else
                                    {
                                        $(box[i]).animate({backgroundColor: "#E74C3C"}, 100, function(){
                                            $(this).animate({backgroundColor: "white"},100)});    
                                        $("#ex").animate({opacity: 1},200, function(){
                                            $(this).animate({opacity: 0},200)});
                                        $("#wrongInput").html(key).animate({opacity: 1},200,function(){
                                            $(this).animate({opacity: 0},200)});
                                    }
                            }
                       }
                }
        }
    }
});
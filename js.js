$(document).ready(function(){
    
    var submit_button = document.getElementById("submit");
    
    function enable_submit_button(enable){
        submit_button.disabled = !enable;
    }
    function username_valid(username){
        var userEx = /^[a-zA-Z0-9]{8,15}$/;
        return userEx.test(username);
    }
    function image_link_valid(image_link){
        var imgEx = /.(jpg|png|gif)$/;
        return imgEx.test(image_link);
    }
    function comment_valid(comment){
        var commentEx = /^[a-zA-Z0-9\.,\?! ]{1,100}$/;
        return commentEx.test(comment);
    }
    function movie_valid(movie){
        var movieEx = /^[a-zA-z ]+$/;
        return movieEx.test(movie);
    }
    
    function response(){
        var username = document.getElementById("userName");
        var image_link = document.getElementById("img");
        var comment = document.getElementById("comment");
        var movie = document.getElementById("movieName");

        var posts = document.getElementById("posts");

        var valid_username = false;
        var valid_image_link = false;
        var valid_comment = false;
        var valid_movie = false;
        var enable_submit = false;
	
        enable_submit_button(enable_submit);

        username.onkeyup = function(){
            valid_username = username_valid(username.value);

            if(valid_username){
                username.style.backgroundColor = "white";
            } else{
                username.style.backgroundColor = "#red"; 
            }
            if(username.value==""){
                username.style.backgroundColor = "white";
            }


            enable_submit = valid_username && 
                            valid_image_link && 
                            valid_comment && 
                            valid_movie;

            enable_submit_button(enable_submit);
        }

        image_link.onkeyup = function(){
            valid_image_link = image_link_valid(image_link.value);

            if(valid_image_link){
                image_link.style.backgroundColor = "white";
            } else{
                image_link.style.backgroundColor = "#red"; 
            }
            if(image_link.value==""){
                image_link.style.backgroundColor = "white";
            }


            enable_submit = valid_username && 
                            valid_image_link && 
                            valid_comment && 
                            valid_movie;

            enable_submit_button(enable_submit);
        }

        comment.onkeyup = function(){
            valid_comment = comment_valid(comment.value);

            if(valid_comment){
                comment.style.backgroundColor = "white";
            } else{
                comment.style.backgroundColor = "#red"; 
            }
            if(comment.value==""){
                comment.style.backgroundColor = "white";
            }

            enable_submit = valid_username && 
                            valid_image_link && 
                            valid_comment && 
                            valid_movie;

            enable_submit_button(enable_submit);
        }

        movie.onkeyup = function(){
            valid_movie = movie_valid(movie.value);

            if(valid_movie){
                movie.style.backgroundColor ="white";
            } else{
                movie.style.backgroundColor ="red"; 
            }
            if(movie.value==""){
                movie.style.backgroundColor ="white";
            }

            enable_submit = valid_username && 
                            valid_image_link && 
                            valid_comment && 
                            valid_movie;

            enable_submit_button(enable_submit);
        }

        submit_button.onclick = function(){

            $.ajax({
                url: "http://www.omdbapi.com/?t="+movie.value,
                dataType: "jsonp",
                
                success:function(resp){
                    console.log(resp);
                    displayDiv = document.createElement("div");
                    displayImg = document.createElement("img");
                    displayComment = document.createElement("div");
                    displayPoster = document.createElement("img");
                    displayUser = document.createElement("div");
                    displayTitle = document.createElement("div");

                    displayDiv.className = "newDiv";

                    image_src = image_link.value;
                    comment_text = comment.value;
                    username_text = username.value;
                    poster_src = resp.Poster;

                    displayImg.src = image_src;
                    displayComment.innerHTML = comment_text;
                    displayPoster.src = poster_src;
                    displayUser.innerHTML = username_text;
                    displayTitle.innerHTML = "<h1>"+resp.Title+"</h1>";
                    
                    displayDiv.appendChild(displayImg);
                    displayDiv.appendChild(displayComment);
                    displayDiv.appendChild(displayPoster);
                    displayDiv.appendChild(displayUser);
                    displayDiv.appendChild(displayTitle);

                    displayImg.className = "displayImg";
                    displayComment.className = "displayComment";
                    displayPoster.className = "displayPoster";
                    displayUser.className = "displayUser";
                    displayTitle.className = "displayTitle";

                    posts.appendChild(displayDiv);
                    
                }
            })
        }
    }
$(document).ready(response)    
})
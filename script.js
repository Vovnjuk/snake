$( document ).ready(function() {
	render();
	start();
	place_food();
	move();
});

var snake = [[0, 3], [0, 2], [0,1], [0,0]];
var direction = 4; //right

var render = function() {
	grid_height = 10;
	grid_width = 10;
	for (var i = 0; i < grid_height; i++) {
		for (var j = 0; j < grid_width; j++) {
			$ ("#grid").append( '<div class="cell" id=i' + i + 'j' + j + '></div>');
		};
		$ ("#grid").append( '<br>');
	};
	
};
var start = function () {
	$.each(snake, function( index, value ) {
 	draw_snake(value);
	});
};

var draw_snake = function ( cordinates ) {
	$ ("#" + array_to_id( cordinates )).addClass("snake");
};

var remove_snake = function ( cordinates ) {
	$ ("#" + array_to_id( cordinates )).removeClass("snake");
};

var array_to_id = function (array) {
	var x = 'i' + array[0] + 'j' + array[1];
	return x;
};

$( "#grid" ).keypress(function() {
  console.log( "Handler for .keypress() called." );
});

document.onkeydown = function change_direction(e) {

    e = e || window.event;

    if (e.keyCode == '38') {
    	new_direction = 2// up key
    }
    else if (e.keyCode == '40') {
        new_direction = 3// down arrow
    }
    else if (e.keyCode == '37') {
       new_direction = 1// left arrow
    }
    else if (e.keyCode == '39') {
       new_direction = 4// right arrow
    }
    if (direction + new_direction != 5) {direction = new_direction;}

};

var move = function () {
	remove_snake(snake[snake.length-1]);

	for (var i = snake.length - 1; i > 0; i--) {
		snake[i] = snake[i-1].slice();
	};

    if (direction === 2) { //up
    	snake[0][0]=snake[0][0]-1;
    }
    else if (direction === 3) { //down
    	snake[0][0]=snake[0][0]+1;
    }
    else if (direction === 1) { //left
       	snake[0][1]=snake[0][1]-1;
    }
    else if (direction === 4) { //right
    	snake[0][1]=snake[0][1]+1;
    };
    
    start(); // draw snake

 	if (snake[0][0] < 0 || snake[0][0] >= grid_height || snake[0][1] < 0 || snake [0][1] >= grid_width) {
		endgame();
		return;
	}
	if ($(".snake").length != snake.length) {
		endgame();
		return;
	}
	if ( array_to_id ( snake[0] ) === array_to_id ( food )) {
    	snake.push([]);
    	$ ("#" + array_to_id( food )).removeClass("food");
		place_food();
	}

    setTimeout(move,200);
};

var place_food = function () {
	food = [];
	cordinate_x = Math.floor(Math.random() * grid_height);
	cordinate_y = Math.floor(Math.random() * grid_width);
	food.push (cordinate_x,cordinate_y);
	if ( $ ("#" + array_to_id( food )).hasClass("snake")) {
		place_food();
	}
	else {
		$ ("#" + array_to_id( food )).addClass("food");
	};
};

var endgame = function () {
	alert ("You lost!");
};
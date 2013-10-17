var Font = (function () {
	var
		// allowed values = random, sameOrigin1, off
		animation = 'random',
		radius = 5,
		// allowed values = random, triangle, circle, square
		shape = 'random',
		// alowed values = all css colors and 'random'
		color = 'random',
		height,
		width,
		timer,
		// for sameOrigin2 animation
		frequency = 500,
		AnimeId,
		colors = ['greenyellow','aqua','chartreuse','orange','sandybrown','thistle'],
		acceleration = 0.5,
		friction = 0.1,
		sides = {
			'triangle': 3,
			'circle': 0,
			'square': 4,
		},
		// for generating random sides see getSides()
		side = ['triangle', 'circle', 'square'];
		atoms = [],
		context = null,
		requestAnimFrame = (function(){
			return  window.requestAnimationFrame   || 
					window.webkitRequestAnimationFrame || 
					window.mozRequestAnimationFrame    || 
					window.oRequestAnimationFrame      || 
					window.msRequestAnimationFrame     || 
					function( callback ){
					window.setTimeout(callback, 1000 / 60);
			};
		})(),
		letter = {

			A: (function () {
				var
					w2h   = 0.9,   // private
					total = 6;	 	 // private (may be it has no meaning)
					// height to radius probable ratio 50/4

				/*
				*	@desc returns the points which make the letter A, similarly for other letters
				* @param {number} x starting x-coordinate
				* @param {number} y starting y-coordinate
				* @param {number} height the height of the letter
				* @return {object} data the object has the width property and points property containing all the points
				*/
				function draw (x, y, height) {
					var
						width     = w2h * height,
						hypotenus = Math.sqrt(Math.pow(height, 2) + Math.pow(width / 2, 2)),
						center_x  = x,
						center_y  = y + height,
						sin       = height / hypotenus,
						cos       = width / (2 * hypotenus),
						data      = {
							points: [],
							width: 0
						};

					for ( var i = 0; i < total; i++ ) {
						data.points.push({x: center_x, y: center_y});
						center_x += ((hypotenus / (total - 1)) * cos);
						center_y -= ((hypotenus / (total - 1)) * sin);
					}

					center_y += (2 * ((hypotenus / (total - 1)) * sin));

					for ( var i = 0; i < (total - 1); i++ ) {
						data.points.push({x: center_x, y: center_y});
						center_x += ((hypotenus / (total - 1)) * cos);
						center_y += ((hypotenus / (total - 1)) * sin);
					}
					// drawing horizontal line
					center_x = x + 0.4 * width;
					center_y = y + (height * 3.5 / 5);
					data.points.push({x: center_x, y: center_y});
					center_x = x + 0.6 * width;
					data.points.push({x: center_x, y: center_y});

					data.width = width;
					//console.log(data);
					return data;
				}

				return {
					getPoints: draw
				};
			})(),

			B: (function () {
				var 
					w2h = 0.4,
					total = 6;

				function draw (x, y, height) {
					var
						width = w2h * height,
						center_x = x,
						center_y = y,
						data = {
							points: [],
							width: 0
						};

					for( var i = 0; i < total; i++ ) {
						data.points.push({x: center_x, y: center_y});
						center_y += (height / (total - 1));
					}

					center_x = x + width / 2.5;
					center_y = y;
					data.points.push({x: center_x, y: center_y});
					center_y = y + height / 2;
					data.points.push({x: center_x, y: center_y});
					center_y = y + height;
					data.points.push({x: center_x, y: center_y});
					center_x += (width / 2.5);
					center_y = y + height / 10;
					data.points.push({x: center_x, y: center_y});
					center_y = y + 0.4 * height;
					data.points.push({x: center_x, y: center_y});
					center_y = y + 0.6 * height;
					data.points.push({x: center_x, y: center_y});
					center_y = y + height - (height / 10);
					data.points.push({x: center_x, y: center_y});
					center_x += (width / 5);
					center_y = y + 0.25 * height;
					data.points.push({x: center_x, y: center_y});
					center_y = y + 0.75 * height;
					data.points.push({x: center_x, y: center_y});

					

					data.width = width;
					return data;
				}

				return {
					getPoints: draw
				};
			})(),

			E: (function () {
				var
					w2h = 0.35,
					total = 6;

				function draw (x, y, height) {
					var 
						width = w2h * height,
						center_x = x,
						center_y = y,
						data = {
							points: [],
							width: 0
						};

					for(var i = 0; i < total; i++) {
						data.points.push({x: center_x, y: center_y});
						center_y += (height / (total - 1));
					}

					center_x = x + 0.47 * width;
					center_y = y;

					for(var i = 0; i < 3; i++) {
						data.points.push({x: center_x, y: center_y});
						center_y += (height / 2);
					}

					center_x = x + width;
					center_y = y;

					for(var i = 0; i < 3; i++) {
						data.points.push({x: center_x, y: center_y});
						center_y += (height / 2);
					}

					data.width = width;
					return data;
				}

				return {
					getPoints: draw
				};
			})(),

			F: (function () {
				var
					w2h = 0.38,
					total = 6;

				function draw (x, y, height) {
					var 
						width = w2h * height,
						center_x = x,
						center_y = y,
						data = {
							points: [],
							width: 0
						};

					for(var i = 0; i < total; i++) {
						data.points.push({x: center_x, y: center_y});
						center_y += (height / (total - 1));
					}

					center_x = x + 0.47 * width;
					center_y = y;

					for(var i = 0; i < 2; i++) {
						data.points.push({x: center_x, y: center_y});
						center_y += (height / 2);
					}

					center_x = x + width;
					center_y = y;

					for(var i = 0; i < 2; i++) {
						data.points.push({x: center_x, y: center_y});
						center_y += (height / 2);
					}

					data.width = width;
					return data;
				}

				return {
					getPoints: draw
				};
			})(),

			L: (function () {
				var
					w2h = 0.38,
					total = 6;

				function draw (x, y, height) {
					var 
						width = w2h * height,
						center_x = x,
						center_y = y,
						data = {
							points: [],
							width: 0
						};

					for(var i = 0; i < total; i++) {
						data.points.push({x: center_x, y: center_y});
						center_y += (height / (total - 1));
					}

					center_x = x + (width / 2);
					center_y = y + height;
					data.points.push({x: center_x, y: center_y});
					center_x = x + width;
					data.points.push({x: center_x, y: center_y});

					data.width = width;
					return data;
				}

				return {
					getPoints: draw
				};
			})(),

			P: (function () {
				var 
					w2h = 0.4,
					total = 6;

				function draw (x, y, height) {
					var
						width = w2h * height,
						center_x = x,
						center_y = y,
						data = {
							points: [],
							width: 0
						};

					for( var i = 0; i < total; i++ ) {
						data.points.push({x: center_x, y: center_y});
						center_y += (height / (total - 1));
					}

					center_x = x + width / 2.5;
					center_y = y;
					data.points.push({x: center_x, y: center_y});
					center_y = y + height / 2;
					data.points.push({x: center_x, y: center_y});
					center_x += (width / 2.5);
					center_y = y + height / 10;
					data.points.push({x: center_x, y: center_y});
					center_y = y + 0.4 * height;
					data.points.push({x: center_x, y: center_y});
					center_x += (width / 5);
					center_y = y + 0.25 * height;
					data.points.push({x: center_x, y: center_y});

					data.width = width;
					return data;
				}

				return {
					getPoints: draw
				};
			})(),

			H: (function () {
				var
					w2h = 0.5,
					total = 6;

				function draw (x, y, height) {
					var 
						width = w2h * height,
						center_x = x,
						center_y = y,
						data = {
							points: [],
							width: 0
						};

					for(var i = 0; i < total; i++) {
						data.points.push({x: center_x, y: center_y});
						center_y += (height / (total - 1));
					}

					center_x = x + width;
					center_y = y;

					for(var i = 0; i < total; i++) {
						data.points.push({x: center_x, y: center_y});
						center_y += (height / (total - 1));
					}

					center_x = x + (width / 3 - width / 30);
					center_y = y + 0.5 * height;
					data.points.push({x: center_x, y: center_y});
					center_x = x + (width - width / 3 + width / 30);
					data.points.push({x: center_x, y: center_y});


					data.width = width;
					return data;
				}

				return {
					getPoints: draw
				};
			})(),

			I: (function () {
				var
					w2h = 0.4,
					total = 6;

				function draw (x, y, height) {
					var 
						width = w2h * height,
						center_x = x + 0.5 * width,
						center_y = y,
						data = {
							points: [],
							width: 0
						};

					for(var i = 0; i < total; i++) {
						data.points.push({x: center_x, y: center_y});
						center_y += (height / (total - 1));
					}

					center_x = x;
					center_y = y;
					data.points.push({x: center_x, y: center_y});
					center_x = x + width;
					data.points.push({x: center_x, y: center_y});
					center_y = y + height;
					data.points.push({x: center_x, y: center_y});
					center_x = x;
					data.points.push({x: center_x, y: center_y});

					data.width = width;
					return data;
				}

				return {
					getPoints: draw
				};
			})(),

			T: (function () {
				var
					w2h = 0.7,
					total = 6;

				function draw (x, y, height) {
					var 
						width = w2h * height,
						center_x = x + 0.5 * width,
						center_y = y,
						data = {
							points: [],
							width: 0
						};

					for(var i = 0; i < total; i++) {
						data.points.push({x: center_x, y: center_y});
						center_y += (height / (total - 1));
					}

					center_x = x;
					center_y = y;
					data.points.push({x: center_x, y: center_y});
					center_x = x + 0.25 * width;
					data.points.push({x: center_x, y: center_y});
					center_x = x + 0.75 * width;
					data.points.push({x: center_x, y: center_y});
					center_x = x + width;
					data.points.push({x: center_x, y: center_y});

					data.width = width;
					return data;
				}

				return {
					getPoints: draw
				};
			})(),

			N: (function () {
				var
					w2h = 0.6,
					total = 6;

				function draw (x, y, height) {
					var 
						width = w2h * height,
						center_x = x,
						center_y = y,
						data = {
							points: [],
							width: 0
						};

					for(var i = 0; i < total; i++) {
						data.points.push({x: center_x, y: center_y});
						center_y += (height / (total - 1));
					}

					center_x = x + width;
					center_y = y;

					for(var i = 0; i < total; i++) {
						data.points.push({x: center_x, y: center_y});
						center_y += (height / (total - 1));
					}

					center_x = x + (2 / 7 * width);
					center_y = y + 0.15 * height;
					data.points.push({x: center_x, y: center_y});
					center_x += (1 / 7 * width);
					center_y = y + 0.35 * height;
					data.points.push({x: center_x, y: center_y});
					center_x += (1 / 7 * width);
					center_y = y + 0.55 * height;
					data.points.push({x: center_x, y: center_y});
					center_x += (1 / 7 * width);
					center_y = y + 0.75 * height;
					data.points.push({x: center_x, y: center_y});



					data.width = width;
					return data;
				}

				return {
					getPoints: draw
				};
			})(),

			D: (function () {
				var
					w2h = 0.6,
					total = 6;

				function draw (x, y, height) {
					var 
						width = w2h * height,
						center_x = x,
						center_y = y,
						data = {
							points: [],
							width: 0
						};

					for(var i = 0; i < total; i++) {
						data.points.push({x: center_x, y: center_y});
						center_y += (height / (total - 1));
					}

					center_x = x + (2 / 7 * width);
					center_y = y + 0.02 * height;
					data.points.push({x: center_x, y: center_y});
					center_y = y + (height - 0.02 * height);
					data.points.push({x: center_x, y: center_y});
					center_x += (2 / 7 * width);
					center_y = y + 0.10 * height;
					data.points.push({x: center_x, y: center_y});
					center_y = y + (height - 0.10 * height);
					data.points.push({x: center_x, y: center_y});
					center_x += (1.9 / 7 * width);
					center_y = y + 0.24 * height;
					data.points.push({x: center_x, y: center_y});
					center_y = y + (height - 0.24 * height);
					data.points.push({x: center_x, y: center_y});
					center_x = x + width;
					center_y = y + 0.4 * height;
					data.points.push({x: center_x, y: center_y});
					center_y = y + 0.6 * height;
					data.points.push({x: center_x, y: center_y});

					data.width = width;
					return data;
				}

				return {
					getPoints: draw
				};
			})(),

			C: (function () {
				var
					w2h = 0.5,
					total = 6;

				function draw (x, y, height) {
					var 
						width = w2h * height,
						center_x = x,
						center_y = y,
						data = {
							points: [],
							width: 0
						};
					x = x + width;
					center_x = x;
					data.points.push({x: center_x, y: center_y});
					center_y = y + height;
					data.points.push({x: center_x, y: center_y});
					center_x = x - (2 / 7 * width);
					center_y = y + 0.02 * height;
					data.points.push({x: center_x, y: center_y});
					center_y = y + (height - 0.02 * height);
					data.points.push({x: center_x, y: center_y});
					center_x -= (2 / 7 * width);
					center_y = y + 0.10 * height;
					data.points.push({x: center_x, y: center_y});
					center_y = y + (height - 0.10 * height);
					data.points.push({x: center_x, y: center_y});
					center_x -= (1.9 / 7 * width);
					center_y = y + 0.24 * height;
					data.points.push({x: center_x, y: center_y});
					center_y = y + (height - 0.24 * height);
					data.points.push({x: center_x, y: center_y});
					center_x = x - width;
					center_y = y + 0.4 * height;
					data.points.push({x: center_x, y: center_y});
					center_y = y + 0.6 * height;
					data.points.push({x: center_x, y: center_y});

					data.width = width;
					return data;
				}

				return {
					getPoints: draw
				};
			})(),

			J: (function () {
				var
					w2h = 0.6,
					total = 6;

				function draw (x, y, height) {
					var 
						width = w2h * height,
						center_x = x + 0.5 * width,
						center_y = y,
						data = {
							points: [],
							width: 0
						};

					for(var i = 0; i < total; i++) {
						data.points.push({x: center_x, y: center_y});
						center_y += (height / (total - 1));
					}
					center_x = x + 0.28 * width;
					center_y = y + height;
					data.points.push({x: center_x, y: center_y});
					center_x = x + 0.125 * width;
					center_y = y + 0.9 * height;
					data.points.push({x: center_x, y: center_y});


					center_x = x;
					center_y = y;
					data.points.push({x: center_x, y: center_y});
					center_x = x + 0.25 * width;
					data.points.push({x: center_x, y: center_y});
					center_x = x + 0.75 * width;
					data.points.push({x: center_x, y: center_y});
					center_x = x + width;
					data.points.push({x: center_x, y: center_y});

					data.width = width;
					return data;
				}

				return {
					getPoints: draw
				};
			})(),

			R: (function () {
				var 
					w2h = 0.4,
					total = 6;

				function draw (x, y, height) {
					var
						width = w2h * height,
						center_x = x,
						center_y = y,
						data = {
							points: [],
							width: 0
						};

					for( var i = 0; i < total; i++ ) {
						data.points.push({x: center_x, y: center_y});
						center_y += (height / (total - 1));
					}

					center_x = x + width / 2.5;
					center_y = y;
					data.points.push({x: center_x, y: center_y});
					center_y = y + height / 2;
					data.points.push({x: center_x, y: center_y});
					center_x += (width / 2.5);
					center_y = y + height / 10;
					data.points.push({x: center_x, y: center_y});
					center_y = y + 0.4 * height;
					data.points.push({x: center_x, y: center_y});
					center_x += (width / 5);
					center_y = y + 0.25 * height;
					data.points.push({x: center_x, y: center_y});

					center_x = x + 0.6 * width;
					center_y = y + 0.6 * height;
					data.points.push({x: center_x, y: center_y});
					center_x = x + 0.8 * width;
					center_y = y + 0.8 * height;
					data.points.push({x: center_x, y: center_y});
					center_x = x + width;
					center_y = y + height;
					data.points.push({x: center_x, y: center_y});



					data.width = width;
					return data;
				}

				return {
					getPoints: draw
				};
			})(),

			K: (function () {
				var
					w2h = 0.4,
					total = 6;

				function draw (x, y, height) {
					var 
						width = w2h * height,
						center_x = x,
						center_y = y,
						data = {
							points: [],
							width: 0
						};

					for(var i = 0; i < total; i++) {
						data.points.push({x: center_x, y: center_y});
						center_y += (height / (total - 1));
					}

					center_x = x + width / 4;
					center_y = y + (3 / 7 * height);
					data.points.push({x: center_x, y: center_y});
					center_y = y + (4 / 7 * height);
					data.points.push({x: center_x, y: center_y});
					center_x += width / 4;
					center_y = y + (2 / 7 * height);
					data.points.push({x: center_x, y: center_y});
					center_y = y + (5 / 7 * height);
					data.points.push({x: center_x, y: center_y});
					center_x += width / 4;
					center_y = y + (1 / 7 * height);
					data.points.push({x: center_x, y: center_y});
					center_y = y + (6 / 7 * height);
					data.points.push({x: center_x, y: center_y});
					center_x += width / 4;
					center_y = y;
					data.points.push({x: center_x, y: center_y});
					center_y = y + height;
					data.points.push({x: center_x, y: center_y});


					data.width = width;
					return data;
				}

				return {
					getPoints: draw
				};
			})(),

			U: (function () {
				var
					w2h = 0.5,
					total = 6;

				function draw (x, y, height) {
					var 
						width = w2h * height,
						center_x = x,
						center_y = y,
						data = {
							points: [],
							width: 0
						};

					for(var i = 1; i < total; i++) {
						data.points.push({x: center_x, y: center_y});
						center_y += (height / (total - 1));
					}

					center_x = x + width;
					center_y = y;

					for(var i = 1; i < total; i++) {
						data.points.push({x: center_x, y: center_y});
						center_y += (height / (total - 1));
					}

					center_x = x + width / 6;
					center_y = y + 0.95 * height;
					data.points.push({x: center_x, y: center_y});
					center_x += width / 3;
					center_y = y + height;
					data.points.push({x: center_x, y: center_y});
					center_x += width / 3;
					center_y = y + 0.95 * height;
					data.points.push({x: center_x, y: center_y});



					data.width = width;
					return data;
				}

				return {
					getPoints: draw
				};
			})(),

			Y: (function () {
				var
					w2h = 0.7,
					total = 6;

				function draw (x, y, height) {
					var 
						width = w2h * height,
						center_x = x + 0.5 * width,
						center_y = y + 0.6 * height,
						data = {
							points: [],
							width: 0
						};

					for(var i = 0; i < (total / 2); i++) {
						data.points.push({x: center_x, y: center_y});
						center_y += (height / (total - 1));
					}

					center_x = x;
					center_y = y;
					data.points.push({x: center_x, y: center_y});
					center_x = x + width;
					data.points.push({x: center_x, y: center_y});
					center_x = x + width / 6;
					center_y = y + 0.2 * height;
					data.points.push({x: center_x, y: center_y});
					center_x = x + (5 * width / 6);
					data.points.push({x: center_x, y: center_y});
					center_x = x + width / 3;
					center_y = y + 0.4 * height;
					data.points.push({x: center_x, y: center_y});
					center_x = x + (2 * width / 3);
					data.points.push({x: center_x, y: center_y});


					data.width = width;
					return data;
				}

				return {
					getPoints: draw
				};
			})(),

			X: (function () {
				var
					w2h = 0.6,
					total = 6;

				function draw (x, y, height) {
					var 
						width = w2h * height,
						center_x = x,
						center_y = y,
						data = {
							points: [],
							width: 0
						};

					data.points.push({x: center_x, y: center_y});
					center_x = x + width;
					data.points.push({x: center_x, y: center_y});
					center_x = x + width / 6;
					center_y = y + 0.2 * height;
					data.points.push({x: center_x, y: center_y});
					center_x = x + (5 * width / 6);
					data.points.push({x: center_x, y: center_y});
					center_x = x + width / 3;
					center_y = y + 0.4 * height;
					data.points.push({x: center_x, y: center_y});
					center_x = x + (2 * width / 3);
					data.points.push({x: center_x, y: center_y});
					center_y = y + 0.6 * height;
					center_x = x + width / 3;
					data.points.push({x: center_x, y: center_y});
					center_x = x + (2 * width / 3);
					data.points.push({x: center_x, y: center_y});
					center_y = y + 0.8 * height;
					center_x = x + width / 6;
					data.points.push({x: center_x, y: center_y});
					center_x = x + (5 * width / 6);
					data.points.push({x: center_x, y: center_y});
					center_y = y + height;
					center_x = x;
					data.points.push({x: center_x, y: center_y});
					center_x = x + width;
					data.points.push({x: center_x, y: center_y});


					data.width = width;
					return data;
				}

				return {
					getPoints: draw
				};
			})(),

			W: (function () {
				var 
					w2h = 0.7,
					total = 6;

				function draw (x, y, height) {
					var
						width = w2h * height,
						center_x = x,
						center_y = y,
						line_width = width * 0.2,
						middle_width = width * 0.6,
						data = {
							points: [],
							width: 0
						};

					for( var i = 0; i < total; i++ ) {
						data.points.push({x: center_x, y: center_y});
						center_y += (height / (total - 1));
						center_x += (line_width / 6);
					}

					center_x = x + width;
					center_y = y;

					for( var i = 0; i < total; i++ ) {
						data.points.push({x: center_x, y: center_y});
						center_y += (height / (total - 1));
						center_x -= (line_width / 6);
					}

					center_x = x + line_width + middle_width * 0.25;
					center_y = y + height - 0.16 * height;
					data.points.push({x: center_x, y: center_y});
					center_x = x + line_width + middle_width * 0.75;
					data.points.push({x: center_x, y: center_y});
					center_y = y + height - 0.32 * height;
					center_x = x + line_width + middle_width * 0.5;
					data.points.push({x: center_x, y: center_y});
					center_y -= 0.16 * height;
					data.points.push({x: center_x, y: center_y});

					data.width = width;
					return data;
				}

				return {
					getPoints: draw
				};
			})(),

			V: (function () {
				var 
					w2h = 0.7,
					total = 6;

				function draw (x, y, height) {
					var
						width = w2h * height,
						center_x = x,
						center_y = y,
						line_width = width * 0.5,
						data = {
							points: [],
							width: 0
						};

					for( var i = 0; i < total; i++ ) {
						data.points.push({x: center_x, y: center_y});
						center_y += (height / (total - 1));
						center_x += (line_width / 5);
					}

					center_x = x + width;
					center_y = y;

					for( var i = 0; i < total; i++ ) {
						data.points.push({x: center_x, y: center_y});
						center_y += (height / (total - 1));
						center_x -= (line_width / 5);
					}

					data.width = width;
					return data;
				}

				return {
					getPoints: draw
				};
			})(),

			// opposite of W
			M: (function () {
				var 
					w2h = 0.8,
					total = 6;

				function draw (x, y, height) {
					var
						width = w2h * height,
						center_x = x,
						center_y = y + height,
						line_width = width * 0.2,
						middle_width = width * 0.6,
						data = {
							points: [],
							width: 0
						};

					for( var i = 0; i < total; i++ ) {
						data.points.push({x: center_x, y: center_y});
						center_y -= (height / (total - 1));
						center_x += (line_width / 6);
					}

					center_x = x + width;
					center_y = y + height;

					for( var i = 0; i < total; i++ ) {
						data.points.push({x: center_x, y: center_y});
						center_y -= (height / (total - 1));
						center_x -= (line_width / 6);
					}

					center_x = x + line_width + middle_width * 0.25;
					center_y = y + 0.16 * height;
					data.points.push({x: center_x, y: center_y});
					center_x = x + line_width + middle_width * 0.75;
					data.points.push({x: center_x, y: center_y});
					center_y = y + 0.32 * height;
					center_x = x + line_width + middle_width * 0.5;
					data.points.push({x: center_x, y: center_y});
					center_y += 0.16 * height;
					data.points.push({x: center_x, y: center_y});

					data.width = width;
					return data;
				}

				return {
					getPoints: draw
				};
			})(),

			Z: (function () {
				var 
					w2h = 0.7,
					total = 6;

				function draw (x, y, height) {
					var
						width = w2h * height,
						center_x = x,
						center_y = y,
						data = {
							points: [],
							width: 0
						};

					for(var i = 0; i < 4; i++) {
						center_y = y;
						data.points.push({x: center_x, y: center_y});
						center_y = y + height;
						data.points.push({x: center_x, y: center_y});
						center_x += (width / 3);
					}

					center_x = x + width;
					center_y = y;

					for(var i = 0; i < total; i++) {
						data.points.push({x: center_x, y: center_y});
						center_x -= (width / (total - 1));
						center_y += (height / (total -1));
					}

					data.width = width;
					return data;
				}

				return {
					getPoints: draw
				};
			})(),

			G: (function () {
				var
					w2h = 0.5,
					total = 6;

				function draw (x, y, height) {
					var 
						width = w2h * height,
						center_x = x,
						center_y = y,
						data = {
							points: [],
							width: 0
						};
					x = x + width;
					center_x = x;
					data.points.push({x: center_x, y: center_y});
					center_y = y + height;
					data.points.push({x: center_x, y: center_y});
					center_x = x - (2 / 7 * width);
					center_y = y + 0.02 * height;
					data.points.push({x: center_x, y: center_y});
					center_y = y + (height - 0.02 * height);
					data.points.push({x: center_x, y: center_y});
					center_x -= (2 / 7 * width);
					center_y = y + 0.10 * height;
					data.points.push({x: center_x, y: center_y});
					center_y = y + (height - 0.10 * height);
					data.points.push({x: center_x, y: center_y});
					center_x -= (1.9 / 7 * width);
					center_y = y + 0.24 * height;
					data.points.push({x: center_x, y: center_y});
					center_y = y + (height - 0.24 * height);
					data.points.push({x: center_x, y: center_y});
					center_x = x - width;
					center_y = y + 0.4 * height;
					data.points.push({x: center_x, y: center_y});
					center_y = y + 0.6 * height;
					data.points.push({x: center_x, y: center_y});
					center_y = y + 0.8 * height;
					center_x = x;
					data.points.push({x: center_x, y: center_y});
					center_y = y + 0.6 * height;
					data.points.push({x: center_x, y: center_y});
					center_x = x - (2 / 7 * width);
					data.points.push({x: center_x, y: center_y});


					data.width = width;
					return data;
				}

				return {
					getPoints: draw
				};
			})(),

			S: (function () {
				var
					w2h = 0.5,
					total = 6;

				function draw (x, y, height) {
					var 
						width = w2h * height,
						center_x = x,
						center_y = y,
						data = {
							points: [],
							width: 0
						};
			
					center_x = x + width;
					data.points.push({x: center_x, y: center_y});
					center_x = x;
					center_y = y + height;
					data.points.push({x: center_x, y: center_y});
					center_x = x + 0.7 * width;
					center_y = y;
					data.points.push({x: center_x, y: center_y});
					center_x = x + 0.43 * width;
					center_y = y + 0.03 * height;
					data.points.push({x: center_x, y: center_y});
					center_x = x + 0.57 * width;
					center_y = y + 0.97 * height;
					data.points.push({x: center_x, y: center_y});
					center_y = y + height;
					center_x = x + 0.3 * width;
					data.points.push({x: center_x, y: center_y});
					center_x = x + 0.16 * width;
					center_y = y + 0.1 * height;
					data.points.push({x: center_x, y: center_y});
					center_x = x + 0.84 * width;
					center_y = y + 0.9 * height;
					data.points.push({x: center_x, y: center_y});
					center_x = x;
					center_y = y + 0.25 * height;
					data.points.push({x: center_x, y: center_y});
					center_x = x + width;
					center_y = y + 0.75 * height;
					data.points.push({x: center_x, y: center_y});
					center_x = x + 0.2 * width;
					center_y = y + 0.4 * height;
					data.points.push({x: center_x, y: center_y});
					center_x = x + 0.5 * width;
					center_y = y + 0.5 * height;
					data.points.push({x: center_x, y: center_y});
					center_x = x + 0.8 * width;
					center_y = y + 0.6 * height;
					data.points.push({x: center_x, y: center_y});



					data.width = width;
					return data;
				}

				return {
					getPoints: draw
				};
			})(),

			O: (function () {
				var
					w2h = 0.6,
					total = 6;

				function draw (x, y, height) {
					var 
						width = w2h * height,
						center_x = x + 0.5 * width,
						center_y = y,
						data = {
							points: [],
							width: 0
						};

					data.points.push({x: center_x, y: center_y});
					center_y = y + 0.05 * height;
					center_x = x + 0.2 * width;
					data.points.push({x: center_x, y: center_y});
					center_x = x + 0.8 * width;
					data.points.push({x: center_x, y: center_y});
					center_y = y + 0.22 * height;
					center_x = x + 0.05 * width;
					data.points.push({x: center_x, y: center_y});
					center_x = x + 0.95 * width;
					data.points.push({x: center_x, y: center_y});
					center_y = y + 0.4 * height;
					center_x = x;
					data.points.push({x: center_x, y: center_y});
					center_x = x + width;
					data.points.push({x: center_x, y: center_y});
					center_y = y + 0.6 * height;
					center_x = x;
					data.points.push({x: center_x, y: center_y});
					center_x = x + width;
					data.points.push({x: center_x, y: center_y});
					center_x = x + 0.05 * width;
					center_y = y + 0.78 * height;
					data.points.push({x: center_x, y: center_y});
					center_x = x + 0.95 * width;
					data.points.push({x: center_x, y: center_y});
					center_x = x + 0.2 * width;
					center_y = y + 0.95 * height;
					data.points.push({x: center_x, y: center_y});
					center_x = x + 0.8 * width;
					data.points.push({x: center_x, y: center_y});
					center_x = x + 0.5 * width;
					center_y = y + height;
					data.points.push({x: center_x, y: center_y});

					data.width = width;
					return data;
				}

				return {
					getPoints: draw
				};
			})(),

			Q: (function () {
				var
					w2h = 0.7,
					total = 6;

				function draw (x, y, height) {
					var 
						width = w2h * height,
						center_x = x + 0.5 * width,
						center_y = y,
						data = {
							points: [],
							width: 0
						};

					data.points.push({x: center_x, y: center_y});
					center_y = y + 0.05 * height;
					center_x = x + 0.2 * width;
					data.points.push({x: center_x, y: center_y});
					center_x = x + 0.8 * width;
					data.points.push({x: center_x, y: center_y});
					center_y = y + 0.22 * height;
					center_x = x + 0.05 * width;
					data.points.push({x: center_x, y: center_y});
					center_x = x + 0.95 * width;
					data.points.push({x: center_x, y: center_y});
					center_y = y + 0.4 * height;
					center_x = x;
					data.points.push({x: center_x, y: center_y});
					center_x = x + width;
					data.points.push({x: center_x, y: center_y});
					center_y = y + 0.6 * height;
					center_x = x;
					data.points.push({x: center_x, y: center_y});
					center_x = x + width;
					data.points.push({x: center_x, y: center_y});
					center_x = x + 0.05 * width;
					center_y = y + 0.78 * height;
					data.points.push({x: center_x, y: center_y});
					center_x = x + 0.95 * width;
					data.points.push({x: center_x, y: center_y});
					center_x = x + 0.2 * width;
					center_y = y + 0.95 * height;
					data.points.push({x: center_x, y: center_y});
					center_x = x + 0.8 * width;
					data.points.push({x: center_x, y: center_y});
					center_x = x + 0.5 * width;
					center_y = y + height;
					data.points.push({x: center_x, y: center_y});
					center_x = x + 0.7 * width;
					center_y = y + 0.78 * height;
					data.points.push({x: center_x, y: center_y});
					center_x = x + 0.9 * width;
					center_y = y + 1.1 * height;
					data.points.push({x: center_x, y: center_y});


					data.width = width;
					return data;
				}

				return {
					getPoints: draw
				};
			})(),

			' ': (function () {
				var
					w2h = 0;

				function draw (x, y, height) {
					var 
						width = w2h * height,
						data = {
							points: [],
							width: 0
						};

					data.width = width;
					return data;
				}
				return {
					getPoints: draw
				};
			})(),
		};

	function initConfig (data) {
		context                 = data.context ? data.context : context;
		Shape.prototype.context = context;
		height                  = data.context.canvas.height ? data.context.canvas.height : height;
		width                   = data.context.canvas.width ? data.context.canvas.width : width;
		radius                  = data.radius ? data.radius : radius;
		color                   = data.color ? data.color : color;
		animation               = data.animation ? data.animation : animation;
		shape                   = data.shape ? data.shape : shape;
		acceleration						= data.acceleration ? data.acceleration : acceleration;
		friction								= data.friction ? data.friction : friction;
		
		if(AnimeId) {
			window.cancelAnimationFrame(AnimeId);
		}
	}

	function create (x, y, size, string, data) {
		if(data) {
			radius    = data.radius ? data.radius : radius;
			color     = data.color ? data.color : color;
			animation = data.animation ? data.animation : animation;
			shape     = data.shape ? data.shape : shape;
		}
		// info is the object returned by the letter
		var info;
		
		atoms  = [];
		x      = x || 0;
		y      = y || 0;
		size   = size || 50;
		string = string || '';

		for(var i = 0; i < string.length; i++) {
			info = letter[string[i]].getPoints(x, y, size);
			atoms = atoms.concat(info.points);
			x += (info.width + size * 0.4);
		}
		timer = Date.now();
		animate();
	}
	// implement this function
	function createFrame () {
	}

	function animate () {
		var data = {};
		for(var i = 0; i < atoms.length; i++) {
			data.center = {
				x: atoms[i].x,
				y: atoms[i].y,
			};
			data.pos = getPos(atoms[i].x, atoms[i].y);
			data.radius = radius;
			data.sides = getSides();
			data.color = getColor();
			data.vel = getVel();
			atoms[i] = new Shape(data);
		}

		if (animation != 'off') {
			loop();
		}
		else {
			clearCanvas();
			draw();
		}
	}

	function getPos (x, y) {
		switch(animation) {
			case 'random':
				return new Vector(Math.random() * width, Math.random() * height);
			case 'sameOrigin1':
				return new Vector(radius, radius);
			case 'sameOrigin2':
				return new Vector(radius, radius);
			case 'off':
				return new Vector(x, y);
		}
		return new Vector(x, y);
	}

	function getVel () {
		switch(animation) {
			case 'random':
				return new Vector(Math.random() * 20 - 10, Math.random() * 20 - 10);
			case 'sameOrigin1':
				return new Vector(5, 5);
			case 'sameOrigin2':
				return new Vector(5, 5);
			case 'off':
				return new Vector(0, 0);
		}
		return new Vector(0, 0);
	}

	function getSides () {
		if(shape == 'random') {
			return sides[side[Math.round(Math.random() * 2)]];
		}
		else {
			return sides[shape];
		}
	}

	function getColor () {
		if(color == 'random') {
			return colors[Math.round(Math.random() * (colors.length - 1))];
			//return '#'+ ('000000' + Math.floor(Math.random()*16777215).toString(16)).slice(-6);
		}
		else {
			return color;
		}
	}

	function loop () {
		clearCanvas();
		if(animation !== 'sameOrigin2') {
			update();
			draw();
		}
		else {
			updateSameOrigin2();
		}	
		queue();
	}

	function clearCanvas () {
		context.clearRect(0, 0, width, height);
	}

	function updateSameOrigin2 () {
		var length;
		if(animation == 'sameOrigin2') {
			length = Math.floor((Date.now() - timer) / 100);
			length = length > atoms.length ? atoms.length : length;
		}
		else {
			length = atoms.length;
		}
		for(var i = 0; i < length; i++) {
			atoms[i].update();
		}
		for(var i = 0; i < length; i++) {
			atoms[i].draw();
		}
	}

	function update () {
		for(var i = 0; i < atoms.length; i++) {
			atoms[i].update();
		}
	}

	function draw () {
		for(var i = 0; i < atoms.length; i++) {
			atoms[i].draw();
		}
	}

	function queue() {
		AnimeId = requestAnimFrame(loop);
	}

	function Vector( x, y ) {
		this.x = x;
		this.y = y;
	}

	Vector.prototype.add = function( vector ) {
		this.x += vector.x;
		this.y += vector.y;
	};

	function Shape (data) {
		this.center = data.center;
		this.pos = data.pos;
		this.radius = data.radius;
		this.color = data.color || 'black';
		this.sides = data.sides || 0;
		this.vel = data.vel || new Vector(0, 0);
		this.acc = data.acc || new Vector(0, 0); 
	}

	Shape.prototype = {
		acceleration: acceleration,
		friction: friction,
		
		draw: function () {
			var 
				r = this.radius,
				x = this.pos.x,
				y = this.pos.y,
				c = this.context,
				sides = this.sides,
				angle = 0,
				counterclockwise = false;

			c.fillStyle = this.color || 'black';	

			if(sides === 0) {
				c.beginPath();
				c.arc(x, y, r, 0, 2 * Math.PI);
				c.fill();
				return;
			} 	
			// Compute vertex position and begin a subpath there
			c.moveTo(x + r * Math.sin(0), y - r * Math.cos(0));
			var delta = 2 * Math.PI / sides; // Angle between vertices
			
			for(var i = 1; i < sides; i++) { // For remaining vertices
				// Compute angle of this vertex
				angle += counterclockwise?-delta:delta;
				// Compute position of vertex and add a line to it
				c.lineTo(x + r * Math.sin(angle), y - r * Math.cos(angle));
			}

			c.closePath(); // Connect last vertex back to the first
			c.fill();		
		},

		update: function () {
			var
				dist_x = this.center.x - this.pos.x,
				dist_y = this.center.y - this.pos.y,
				distance = Math.sqrt(dist_x * dist_x + dist_y * dist_y);
			
			this.acc.x = acceleration * (dist_x / distance);
			this.acc.y = acceleration * (dist_y / distance);
			this.vel.x *= (1 - friction);
			this.vel.y *= (1 - friction);
			this.vel.add(this.acc);
			this.pos.add(this.vel);
		},
	};

	return {
		create: create,
		initConfig: initConfig
	};
})();
$(function () {

	var
		string,
		animation,
		size,
		color,
		speed;
		canvas = $('#mycanvas')[0],
		ctx = canvas.getContext('2d'),
		pattern = {
			blue_pattern: {
				start: 'white',
				stop: '2d77cc'
			},
			simple_black: {
				start: 'black',
				stop: 'black'
			},
			green_pattern: {
				start: 'white',
				stop: 'chartreuse'
			},
			black_pattern: {
				start: 'black',
				stop: 'white'
			}
		}
	
	var regex = /^([A-Z]+)$/;
	$('#animate_button').click(function () {
		string = $('#string_input > input').val();
		string = string.toUpperCase();
		if(!regex.test(string)) {
			alert('only alphabets allowed');
		}
		animation = $('#animation_input > select').val();
		size = $('#size_input > select').val() * 30;
		color = $('#color_input > select').val();
		speed = $('#speed_input > select').val() / 5;	

		Font.initConfig({
			context: ctx,
			color: color,
			animation: animation,
			shape: 'circle',
			acceleration: speed,
			gradient: true,
			gradObject: pattern[color]
			/*{
				start: 'white',
				//stop: '#5cabff'
				//stop: '#2D77CC'
				stop: 'chartreuse'
			}*/
		});
		var length = string.length * size * 0.9;
		Font.create((canvas.width - length)/2, 350, size, string, {radius: size/8});

	})
})
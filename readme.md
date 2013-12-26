# E-Learning suite

jQuery plugins in the process of being extracted from some content I created when doing tutoring work.

* [define.js](http://xiaodili.com/define)
* [mcq.js](http://xiaodili.com/mcq)

## define.js

Tooltips help streamline the flow of text; they can to used to bring clarity and extra information to a discussion.

Takes a JSON object of definitions and applies them to html to create tooltips.

Demo [here](http://xiaodili.com/define).

### Usage

Definitions are placed in JSON:

	my_definitions: {
		def1: "Explanation goes here",
		def2: "One more time"
	}

In HTML, wrap the words or phrases that needs to be defined:

	<div id='area'>
		...
		<span data-define="def1">term or phrase</span>
		...
	</div>

Initialise with:

	$('#area').define({dictionary: my_definitions});

Result:

	<div id='area'>
		...
		<a href='#' class='tooltip' title='Explanation goes here'>term or phrase</a>
		...
	</div>

Visually, this can be further augmented using a tooltip plugin such as jQueryUI or qTips.

### Options

By default, the class given to the tooltips are `tooltip`. To change this to comply with your own styling, pass in the `class_name` field:
	
	$('#area').define({dictionary: my_definitions, class_name: "custom_style_tooltip"});

## mcq.js

A JSON template for generating multiple choice quizzes.

Demo [here](http://xiaodili.com/mcq).

### Usage

Questions and answer key are defined in JSON format:

	var mcqs = {[
		{
			question: "What is 1 + 1?",
			options: ["1", "2", "3"],
			correct: 1
		},
		{
			question: "How many licks does it take to get to the centre of a tootsie roll?",
			options: [
				{answer: "120", feedback: "It's probably more than that."},
				42,
				{answer: "this is a rhetorical question", feedback: "Well done. You have passed the sphinx's test."}
			],
			hint: "Why don't you try it and find out?",
			correct: 2,
		}
	]};

	$('#mcq_area').mcq(questions: my_questions);

* Options are given in an array. They can either be values, or JSON objects with a `feedback` field.
* `correct` refers to the index of the correct answer in zero based numbering.
* A `hint` button can be specified with the message to be revealed on click.

### Options



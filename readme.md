# E-Learning suite

jQuery plugins in the process of being extracted from some content I created when doing tutoring work.

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
			correct: 2
		}
	]};

	$('#mcq_area').mcq({questions: my_questions});

* Options are given in an array. They can either be values, or JSON objects with a `feedback` field.
* `correct` refers to the index of the correct answer in zero based numbering.
* A `hint` button can be specified with the message to be revealed on click.

### Options

Custom outcome messages can be displayed if passed in as strings with `unselected_msg`, `correct_msg` and `incorrect_msg` fields.

If working with MathJax, can use the `mathjax_render` boolean to reprocess the quiz area (`false` by default).

For css stylings, the generated classes are all prefixed with `mcq-*`. If you want to change these, pass in the appropriate `class_*` fields. Consult the browser's element inspector to see all the classes used.

For example:

	$('#mcq_area').mcq({
		questions: my_questions,
		class_feedback: "my_awesome_feedback_css_styling",
		correct_msg: "Hmmph, lucky guess!",
		mathjax_render: true
	});

(function($) {
	var methods = {
		'init': function(options) {
			var settings = $.extend({
				class_question: "mcq-question",
				class_options: "mcq-options",
				class_feedback: "mcq-feedback",
				class_check: "mcq-check",
				class_hint: "mcq-hint",
				class_hintcontents: "mcq-hintcontents",
				class_reset: "mcq-resetall",
				class_correct: "mcq-correct",
				class_incorrect: "mcq-incorrect",
				class_qcontents: "mcq-qcontents",
				class_unselected: "mcq-unselected",

				unselected_msg: "Select a question!",
				correct_msg: "Correct!",
				incorrect_msg: "Wrong!",

				mathjax_render: false
			}, options);

			var questions = settings.questions.questions;

			return this.each(function() { 
				//wrap it:
				var $this = $(this);

				//injecting the html:
				var content = "";
				for (var i = 0; i < questions.length; i++ ) {
					var question = questions[i];
					content += "<div class='mcq-question'>";
					content += "<div class='mcq-qcontents'>" + question.question + "</div>";
					content += "<form class='mcq-options'>";
					var options = question.options;
					for (var j = 0; j < options.length; j++) {
						content += "<label><input type='radio' name='choice'>";
						if (typeof options[j] == "string") {
							content += options[j];
						} else {
							content += options[j].answer;
						}
						content += "</input></label>";

						var fbmsg = '';
						if (options[j].hasOwnProperty('feedback')) {
							fbmsg = options[j].feedback;
						}
						content += "<div class='mcq-feedback'>" + fbmsg + "</div>";

						content += "<br/>";

					}
					content += "</form>";
					content += "<button class='mcq-check'>Check</button>";
					if (question.hint) {
						content += "<button class='mcq-hint'>Hint</button>";
						content += "<div class='mcq-hintcontents'></div>";
					}
					content += "</div>";
				}
				content += "<button class='mcq-checkall'>Check all</div>";
				content += "<button class='mcq-resetall'>Reset</div>";

				$this.html(content);

				//adding the interactivity:
				var $questions = $this.find('.mcq-question');

				$questions.each(function(i) {
					var $$this = $(this);


					var check = $$this.find('button.mcq-check');
					check.bind('click', function() {

						var options = $$this.find('input[name=choice]');
						var selected = $$this.find('input[name=choice]:checked');
						var index = options.index(selected);
						var correct = questions[i].correct;

						if (typeof correct === 'object') {
							correct = correct.answer;
						}


						$$this.find("."+settings.class_correct).remove();
						$$this.find("."+settings.class_incorrect).remove();
						$$this.find("."+settings.class_unselected).remove();

						if (index == -1) {
							$$this.find("."+settings.class_qcontents).append("<span class='"+settings.class_unselected+"'>" + settings.unselected_msg + "</span>");
						}
						else if (index != correct) {

							//need to append on a correct/incorrect message:
							var label = $($$this.find("label")[index]);
							label.append("<span class='"+settings.class_incorrect+"'>" + settings.incorrect_msg + "</span>");

							var feedbacks = $this.find('.mcq-feedback');

							//hide all the feedbacks:
							feedbacks.each(function() {
								$(this).hide();
							});

							if (questions[i].options[index].hasOwnProperty('feedback')) {
								var feedback = $($$this.find('.mcq-feedback')[index]);
								feedback.show();
							}

						}
						else { //might get away without including this.
							var label = $($$this.find("label")[index]);
							label.append("<span class='"+settings.class_correct+"'>" + settings.correct_msg + "</span>");
						}
					});

					//feedbacks:
					var feedback = $$this.find('.mcq-feedback');
					feedback.hide();

					//hints:
					var hint = $$this.find('button.mcq-hint');
					//initialise hint:
					if (hint.length == 1) {
							var hint_contents = $$this.find('.mcq-hintcontents');
							hint_contents.html(questions[i].hint);
							hint_contents.hide();
						hint.bind('click', function() {
							if (hint_contents.is(':hidden')) {
								hint_contents.slideDown('fast');
							}
							else {
								hint_contents.hide();
							}
						});
					}

				});

				//overall controllers:
				var checkall = $this.find('.mcq-checkall');

				checkall.bind('click', function() {
					//check all of them.
					var checks = $questions.find('button.mcq-check');
					checks.trigger('click');
				});

				var resetall = $this.find('.mcq-resetall');

				resetall.bind('click', function() {

					$questions.each(function() {
						var _this = $(this);
						_this.find('.' + settings.class_correct).remove();
						_this.find('.' + settings.class_incorrect).remove();
						_this.find("."+settings.class_unselected).remove();
						_this.find('.mcq-feedback').hide();
						_this.find('input[name=choice]').prop('checked', false);
						_this.find('.mcq-hintcontents').hide();
					});

				});

				if(settings.mathjax_render == true) {
					MathJax.Hub.Typeset(this);
				}

			});
		},
		'reset': function() {
			$questions.each(function() {
				var _this = $(this);
				_this.find('.mcq-feedback').html('');
				_this.find('input[name=choice]').prop('checked', false);
				_this.find('.mcq-hintcontents').html('');
			});
		}
	};

	$.fn.mcq = function(method) {
		if (methods[method]) {
			//if it exists, call (and return) the method
			return methods[method].apply(this,Array.prototype.slice.call(arguments, 1));
		}
		else if (typeof method === 'object' || !method) {
			return methods.init.apply(this, arguments);
		}
		else {
			$.error('Method ' + method + 'does not exist.');
		}
	};
})(jQuery);


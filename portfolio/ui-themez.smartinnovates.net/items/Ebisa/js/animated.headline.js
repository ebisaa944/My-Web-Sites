/*!
 * Enhanced Animated Headlines
 * Modern, performant, and feature-rich text animation library
 * Version: 2.0.0
 */

(function($) {
    "use strict";

    $.fn.animatedHeadline = function(options) {
        var settings = $.extend({
            // Animation timing
            animationDelay: 2500,
            // Loading bar effect
            barAnimationDelay: 3800,
            barWaiting: 800,
            // Letters effect
            lettersDelay: 50,
            // Type effect
            typeLettersDelay: 150,
            selectionDuration: 500,
            typeAnimationDelay: 1300,
            // Clip effect
            revealDuration: 600,
            revealAnimationDelay: 1500,
            // New effects
            fadeDelay: 800,
            slideDelay: 1000,
            bounceDelay: 600,
            // Auto start
            autoStart: true,
            // Pause on hover
            pauseOnHover: true,
            // Randomize order
            randomize: false,
            // Loop animation
            loop: true,
            // Start delay
            startDelay: 1000,
            // Performance mode
            performanceMode: true,
            // Accessibility
            ariaLive: 'polite',
            // Callbacks
            onWordChange: null,
            onAnimationStart: null,
            onAnimationComplete: null
        }, options);

        return this.each(function() {
            var $headline = $(this);
            
            // Initialize headline
            initHeadline($headline, settings);
        });
    };

    function initHeadline($headline, settings) {
        // Add ARIA attributes for accessibility
        $headline.attr({
            'aria-live': settings.ariaLive,
            'role': 'marquee'
        });

        // Insert <i> element for each letter of changing words
        if ($headline.hasClass('letters')) {
            singleLetters($headline.find('b'), settings);
        }

        // Initialize animation if auto-start is enabled
        if (settings.autoStart) {
            setTimeout(function() {
                animateHeadline($headline, settings);
            }, settings.startDelay);
        }

        // Add pause on hover functionality
        if (settings.pauseOnHover) {
            $headline.hover(
                function() {
                    $headline.addClass('paused');
                },
                function() {
                    $headline.removeClass('paused');
                    if (!$headline.hasClass('initialized')) {
                        animateHeadline($headline, settings);
                    }
                }
            );
        }

        // Mark as initialized
        $headline.addClass('initialized');

        // Trigger initialization callback
        if (typeof settings.onAnimationStart === 'function') {
            settings.onAnimationStart.call($headline);
        }
    }

    function singleLetters($words, settings) {
        $words.each(function() {
            var $word = $(this),
                letters = $word.text().split(''),
                selected = $word.hasClass('is-visible'),
                isRTL = $('html').attr('dir') === 'rtl';

            for (var i = 0; i < letters.length; i++) {
                if ($word.parents('.rotate-2').length > 0) {
                    letters[i] = '<em>' + letters[i] + '</em>';
                }
                var letterClass = selected ? 'in' : '';
                letters[i] = '<i class="' + letterClass + '" aria-hidden="true">' + letters[i] + '</i>';
            }

            var newLetters = letters.join('');
            $word.html(newLetters).css('opacity', 1);
        });
    }

    function animateHeadline($headline, settings) {
        if ($headline.hasClass('paused')) return;

        var duration = settings.animationDelay;

        // Randomize word order if enabled
        if (settings.randomize) {
            randomizeWords($headline.find('.cd-words-wrapper'));
        }

        if ($headline.hasClass('loading-bar')) {
            duration = settings.barAnimationDelay;
            setTimeout(function() {
                $headline.find('.cd-words-wrapper').addClass('is-loading');
            }, settings.barWaiting);
        } else if ($headline.hasClass('clip')) {
            var $spanWrapper = $headline.find('.cd-words-wrapper'),
                newWidth = $spanWrapper.width() + 10;
            $spanWrapper.css('width', newWidth);
        } else if (!$headline.hasClass('type')) {
            // Assign to .cd-words-wrapper the width of its longest word
            var $words = $headline.find('.cd-words-wrapper b'),
                width = 0;

            $words.each(function() {
                var wordWidth = $(this).width();
                if (wordWidth > width) width = wordWidth;
            });

            $headline.find('.cd-words-wrapper').css('width', width);
        }

        // Trigger animation
        setTimeout(function() {
            hideWord($headline.find('.is-visible').eq(0), $headline, settings);
        }, duration);
    }

    function hideWord($word, $headline, settings) {
        if ($headline.hasClass('paused')) return;

        var $nextWord = takeNext($word, settings.randomize);

        // Callback before word change
        if (typeof settings.onWordChange === 'function') {
            settings.onWordChange.call($word, $nextWord);
        }

        if ($headline.hasClass('type')) {
            var $parentSpan = $word.parent('.cd-words-wrapper');
            $parentSpan.addClass('selected').removeClass('waiting');

            setTimeout(function() {
                $parentSpan.removeClass('selected');
                $word.removeClass('is-visible').addClass('is-hidden')
                    .children('i').removeClass('in').addClass('out');
            }, settings.selectionDuration);

            setTimeout(function() {
                showWord($nextWord, $headline, settings, settings.typeLettersDelay);
            }, settings.typeAnimationDelay);

        } else if ($headline.hasClass('letters')) {
            var bool = ($word.children('i').length >= $nextWord.children('i').length);
            hideLetter($word.find('i').eq(0), $word, bool, settings);
            showLetter($nextWord.find('i').eq(0), $nextWord, bool, settings);

        } else if ($headline.hasClass('clip')) {
            $word.parents('.cd-words-wrapper').animate({
                width: '2px'
            }, settings.revealDuration, function() {
                switchWord($word, $nextWord);
                showWord($nextWord, $headline, settings);
            });

        } else if ($headline.hasClass('loading-bar')) {
            $word.parents('.cd-words-wrapper').removeClass('is-loading');
            switchWord($word, $nextWord);
            setTimeout(function() {
                hideWord($nextWord, $headline, settings);
            }, settings.barAnimationDelay);
            setTimeout(function() {
                $word.parents('.cd-words-wrapper').addClass('is-loading');
            }, settings.barWaiting);

        } else if ($headline.hasClass('fade')) {
            $word.animate({ opacity: 0 }, settings.fadeDelay, function() {
                switchWord($word, $nextWord);
                $nextWord.animate({ opacity: 1 }, settings.fadeDelay);
                setTimeout(function() {
                    hideWord($nextWord, $headline, settings);
                }, settings.animationDelay);
            });

        } else if ($headline.hasClass('slide')) {
            $word.animate({ marginLeft: '-100%' }, settings.slideDelay, function() {
                switchWord($word, $nextWord);
                $nextWord.css('marginLeft', '100%').animate({ marginLeft: '0%' }, settings.slideDelay);
                setTimeout(function() {
                    hideWord($nextWord, $headline, settings);
                }, settings.animationDelay);
            });

        } else if ($headline.hasClass('bounce')) {
            $word.animate({
                top: '-20px',
                opacity: 0
            }, settings.bounceDelay, function() {
                switchWord($word, $nextWord);
                $nextWord.css({ top: '20px', opacity: 0 })
                    .animate({ top: '0px', opacity: 1 }, settings.bounceDelay);
                setTimeout(function() {
                    hideWord($nextWord, $headline, settings);
                }, settings.animationDelay);
            });

        } else {
            // Default rotate effect
            switchWord($word, $nextWord);
            setTimeout(function() {
                hideWord($nextWord, $headline, settings);
            }, settings.animationDelay);
        }
    }

    function showWord($word, $headline, settings, duration) {
        if ($headline.hasClass('type')) {
            showLetter($word.find('i').eq(0), $word, false, settings, duration);
            $word.addClass('is-visible').removeClass('is-hidden');

        } else if ($headline.hasClass('clip')) {
            $word.parents('.cd-words-wrapper').animate({
                'width': $word.width() + 10
            }, settings.revealDuration, function() {
                setTimeout(function() {
                    hideWord($word, $headline, settings);
                }, settings.revealAnimationDelay);
            });
        }
    }

    function hideLetter($letter, $word, bool, settings) {
        if (!$letter.length) return;

        $letter.removeClass('in').addClass('out');

        if (!$letter.is(':last-child')) {
            setTimeout(function() {
                hideLetter($letter.next(), $word, bool, settings);
            }, settings.lettersDelay);
        } else if (bool) {
            setTimeout(function() {
                hideWord(takeNext($word, settings.randomize), $word.closest('.cd-headline'), settings);
            }, settings.animationDelay);
        }

        if ($letter.is(':last-child') && $('html').hasClass('no-csstransitions')) {
            var nextWord = takeNext($word, settings.randomize);
            switchWord($word, nextWord);
        }
    }

    function showLetter($letter, $word, bool, settings, duration) {
        if (!$letter.length) return;

        duration = duration || settings.lettersDelay;
        $letter.addClass('in').removeClass('out');

        if (!$letter.is(':last-child')) {
            setTimeout(function() {
                showLetter($letter.next(), $word, bool, settings, duration);
            }, duration);
        } else {
            if ($word.parents('.cd-headline').hasClass('type')) {
                setTimeout(function() {
                    $word.parents('.cd-words-wrapper').addClass('waiting');
                }, 200);
            }
            if (!bool) {
                setTimeout(function() {
                    hideWord($word, $word.closest('.cd-headline'), settings);
                }, settings.animationDelay);
            }
        }
    }

    function takeNext($word, randomize) {
        var $siblings = $word.parent().children();
        
        if (randomize) {
            var randomIndex = Math.floor(Math.random() * $siblings.length);
            return $siblings.eq(randomIndex);
        }
        
        return (!$word.is(':last-child')) ? $word.next() : $siblings.eq(0);
    }

    function takePrev($word) {
        return (!$word.is(':first-child')) ? $word.prev() : $word.parent().children().last();
    }

    function switchWord($oldWord, $newWord) {
        $oldWord.removeClass('is-visible').addClass('is-hidden');
        $newWord.removeClass('is-hidden').addClass('is-visible');
    }

    function randomizeWords($wrapper) {
        var $words = $wrapper.children(),
            wordsArray = $words.toArray();

        // Shuffle array
        for (var i = wordsArray.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = wordsArray[i];
            wordsArray[i] = wordsArray[j];
            wordsArray[j] = temp;
        }

        // Reappend words in random order
        $wrapper.empty().append(wordsArray);
    }

    // Public methods
    $.fn.animatedHeadline.pause = function() {
        return this.each(function() {
            $(this).addClass('paused');
        });
    };

    $.fn.animatedHeadline.resume = function() {
        return this.each(function() {
            var $headline = $(this);
            $headline.removeClass('paused');
            if (!$headline.data('animatedHeadline')) {
                $headline.animatedHeadline($headline.data('animatedHeadline-settings'));
            }
        });
    };

    $.fn.animatedHeadline.destroy = function() {
        return this.each(function() {
            var $headline = $(this);
            $headline.removeClass('initialized paused')
                .find('.cd-words-wrapper').removeAttr('style')
                .find('b').removeClass('is-visible is-hidden')
                .find('i').remove();
        });
    };

    // Initialize on document ready (legacy support)
    $(document).ready(function() {
        $('.cd-headline').each(function() {
            var $headline = $(this);
            if (!$headline.data('animatedHeadline-initialized')) {
                $headline.animatedHeadline();
                $headline.data('animatedHeadline-initialized', true);
            }
        });
    });

})(jQuery);

// Legacy support for original initialization
jQuery(document).ready(function($) {
    // Initialize headlines that aren't using the new plugin method
    $('.cd-headline').not('[data-animatedHeadline-initialized]').each(function() {
        var $headline = $(this);
        
        // Set animation timing (legacy defaults)
        var animationDelay = 2500,
            barAnimationDelay = 3800,
            barWaiting = barAnimationDelay - 3000,
            lettersDelay = 50,
            typeLettersDelay = 150,
            selectionDuration = 500,
            typeAnimationDelay = selectionDuration + 800,
            revealDuration = 600,
            revealAnimationDelay = 1500;

        // Legacy initialization functions
        function initHeadline() {
            singleLetters($('.cd-headline.letters').find('b'));
            animateHeadline($('.cd-headline'));
        }

        function singleLetters($words) {
            $words.each(function() {
                var word = $(this),
                    letters = word.text().split(''),
                    selected = word.hasClass('is-visible');
                for (var i in letters) {
                    if (word.parents('.rotate-2').length > 0) letters[i] = '<em>' + letters[i] + '</em>';
                    letters[i] = (selected) ? '<i class="in">' + letters[i] + '</i>' : '<i>' + letters[i] + '</i>';
                }
                var newLetters = letters.join('');
                word.html(newLetters).css('opacity', 1);
            });
        }

        function animateHeadline($headlines) {
            var duration = animationDelay;
            $headlines.each(function() {
                var headline = $(this);

                if (headline.hasClass('loading-bar')) {
                    duration = barAnimationDelay;
                    setTimeout(function() {
                        headline.find('.cd-words-wrapper').addClass('is-loading');
                    }, barWaiting);
                } else if (headline.hasClass('clip')) {
                    var spanWrapper = headline.find('.cd-words-wrapper'),
                        newWidth = spanWrapper.width() + 10;
                    spanWrapper.css('width', newWidth);
                } else if (!headline.hasClass('type')) {
                    var words = headline.find('.cd-words-wrapper b'),
                        width = 0;
                    words.each(function() {
                        var wordWidth = $(this).width();
                        if (wordWidth > width) width = wordWidth;
                    });
                    headline.find('.cd-words-wrapper').css('width', width);
                }

                setTimeout(function() {
                    hideWord(headline.find('.is-visible').eq(0));
                }, duration);
            });
        }

        function hideWord($word) {
            var nextWord = takeNext($word);

            if ($word.parents('.cd-headline').hasClass('type')) {
                var parentSpan = $word.parent('.cd-words-wrapper');
                parentSpan.addClass('selected').removeClass('waiting');
                setTimeout(function() {
                    parentSpan.removeClass('selected');
                    $word.removeClass('is-visible').addClass('is-hidden').children('i').removeClass('in').addClass('out');
                }, selectionDuration);
                setTimeout(function() {
                    showWord(nextWord, typeLettersDelay);
                }, typeAnimationDelay);

            } else if ($word.parents('.cd-headline').hasClass('letters')) {
                var bool = ($word.children('i').length >= nextWord.children('i').length);
                hideLetter($word.find('i').eq(0), $word, bool, lettersDelay);
                showLetter(nextWord.find('i').eq(0), nextWord, bool, lettersDelay);

            } else if ($word.parents('.cd-headline').hasClass('clip')) {
                $word.parents('.cd-words-wrapper').animate({
                    width: '2px'
                }, revealDuration, function() {
                    switchWord($word, nextWord);
                    showWord(nextWord);
                });

            } else if ($word.parents('.cd-headline').hasClass('loading-bar')) {
                $word.parents('.cd-words-wrapper').removeClass('is-loading');
                switchWord($word, nextWord);
                setTimeout(function() {
                    hideWord(nextWord);
                }, barAnimationDelay);
                setTimeout(function() {
                    $word.parents('.cd-words-wrapper').addClass('is-loading');
                }, barWaiting);

            } else {
                switchWord($word, nextWord);
                setTimeout(function() {
                    hideWord(nextWord);
                }, animationDelay);
            }
        }

        function showWord($word, $duration) {
            if ($word.parents('.cd-headline').hasClass('type')) {
                showLetter($word.find('i').eq(0), $word, false, $duration);
                $word.addClass('is-visible').removeClass('is-hidden');

            } else if ($word.parents('.cd-headline').hasClass('clip')) {
                $word.parents('.cd-words-wrapper').animate({
                    'width': $word.width() + 10
                }, revealDuration, function() {
                    setTimeout(function() {
                        hideWord($word);
                    }, revealAnimationDelay);
                });
            }
        }

        function hideLetter($letter, $word, $bool, $duration) {
            $letter.removeClass('in').addClass('out');

            if (!$letter.is(':last-child')) {
                setTimeout(function() {
                    hideLetter($letter.next(), $word, $bool, $duration);
                }, $duration);
            } else if ($bool) {
                setTimeout(function() {
                    hideWord(takeNext($word));
                }, animationDelay);
            }

            if ($letter.is(':last-child') && $('html').hasClass('no-csstransitions')) {
                var nextWord = takeNext($word);
                switchWord($word, nextWord);
            }
        }

        function showLetter($letter, $word, $bool, $duration) {
            $letter.addClass('in').removeClass('out');

            if (!$letter.is(':last-child')) {
                setTimeout(function() {
                    showLetter($letter.next(), $word, $bool, $duration);
                }, $duration);
            } else {
                if ($word.parents('.cd-headline').hasClass('type')) {
                    setTimeout(function() {
                        $word.parents('.cd-words-wrapper').addClass('waiting');
                    }, 200);
                }
                if (!$bool) {
                    setTimeout(function() {
                        hideWord($word);
                    }, animationDelay);
                }
            }
        }

        function takeNext($word) {
            return (!$word.is(':last-child')) ? $word.next() : $word.parent().children().eq(0);
        }

        function takePrev($word) {
            return (!$word.is(':first-child')) ? $word.prev() : $word.parent().children().last();
        }

        function switchWord($oldWord, $newWord) {
            $oldWord.removeClass('is-visible').addClass('is-hidden');
            $newWord.removeClass('is-hidden').addClass('is-visible');
        }

        // Initialize legacy version
        initHeadline();
    });
});
/**
 * @fileoverview QUnit test 
 * @copyright Bertrand Chevrier 2012
 * @author Bertrand Chevrier <chevrier.bertrand@gmail.com>
 * @license GPL
 * 
 * @module test/removablearea_test
 */

/*global QUnit:false, module:false, test:false, asyncTest:false, expect:false*/
/*global start:false, stop:false ok:false, equal:false, notEqual:false, deepEqual:false*/
/*global notDeepEqual:false, strictEqual:false, notStrictEqual:false, raises:false*/
(function($) {

  module('jQuery#removableArea', {
    setup: function() {
      this.targets = $('#qunit-fixture').children();
    }
  });

	test('is plugin loaded in jQuery', 1, function(){
		ok( (typeof $.fn.removableArea === 'function'), "the plugin should be available from jQuery.fn");
	});

    asyncTest("does the plugin initialize", function(){
 		
		expect(this.targets.length)

		this.targets.bind('init.removablearea', function(){
				strictEqual(1, $('.removable-ctrl', this).length);
				start();
			});
		this.targets.removableArea();
	});

	asyncTest("does the plugin launch removed event", function(){

        expect(1);

        this.targets
			.removableArea({
				warning: false
			})
			.bind('removed.removablearea', function(){
            	ok( true );   
				start(); 
            });
		$('.removable-ctrl', this.targets.first()).trigger('click');
    });

	test("does the plugin removes the element", function(){
		this.targets
            .removableArea({
                warning: false
            });
		$('.removable-ctrl', this.targets.first()).trigger('click');
		equal(2, $('#qunit-fixture').children().length);
	});

}(jQuery));

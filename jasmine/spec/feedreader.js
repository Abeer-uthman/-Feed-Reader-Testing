/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

$(function() {

    // This suite of 3 tests about the RSS feeds definitions
    describe('RSS Feeds', function() {

        // This is a test to make sure that the allFeeds variable has been defined and that it is not empty.
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

       // This is a test to make sure that the url at allFeeds objects defined and not embty which have to be start by "http://"
         it('has a URL not empty', function(){
           allFeeds.forEach(function(feed){
             expect(feed.url).toBeDefined();
             expect(feed.url).toContain('http:\/\/');
           });
         });

       // This is a test to make sure that the name at allFeeds objects defined and not embty which its length greater than 0
         it('has a name defined', function(){
           allFeeds.forEach(function(feed){
             expect(feed.name).toBeDefined();
             expect(feed.name.length).not.toBe(0);
           });
         });
    });

    // This suite of 2 tests about The menu
    describe('The menu', function() {

        // This is a test to ensures the menu element is hidden by default
         it('the menu element is hidden', function(){
          expect(document.body.classList).toContain('menu-hidden');
         });

         // This is a test that ensures the menu changes visibility when the menu icon is clicked
          it('the menu icon is clicked', function(){
            var menuIcon = document.getElementsByClassName('menu-icon-link');
            menuIcon.click();
           expect(document.body.classList).not.toContain('menu-hidden');

           menuIcon.click();
          expect(document.body.classList).toContain('menu-hidden');
          });
        });

    // This suite of 1 test about Initial Entries
    describe('Initial Entries', function() {

      //useing beforeEach for testing asynchronous operations.
          beforeEach(function(done){
           loadFeed(0,function(){
           done();
        });
      });

      // This is a test that ensures there is at least a single entry element within the feed container
      it('there is at least a single entry element within the feed container', function(done){
       var entry = document.getElementsByClassName('entry');
       expect(entry.length).not.toBe(0);
       done();
      });
 });
    // This suite of 1 test about New Feed
    describe('New Feed Selection', function() {

        //define global variables to use within this suite
         var initContent;
         var newContent;

         //useing beforeEach for testing asynchronous operations.
         beforeEach(function(done){
           loadFeed(1,function(){
             initContent = document.getElementsByClassName('feed').innerHTML;
             loadFeed(2,function(){
                newContent = document.getElementsByClassName('feed').innerHTML;
                done();
            });
        });
    });


    // This is a test that ensures when a new feed is loaded the content actually changes
    it('the content actually changes', function(done){

     //use setTimeout function to try delay the tests until the beforeEach run and set the innerHTML of the feeds at the global variables
      setTimeout(function() {
      expect(initContent).toBeDefined();
      expect(newContent).toBeDefined();
      expect(initContent).not.toEqual(newContent);
    }, 5000);
      done();
   });

   afterEach(function()
   {
      loadFeed(0);
   });

  });
}());

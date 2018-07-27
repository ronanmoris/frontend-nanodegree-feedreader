/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against the application.
 */

/* placing all of the tests within the $() function,
 * to ensure they don't run until the DOM is ready.
 */
$(
  (function() {
    /* This suite is all about the RSS feeds definitions, the
      * allFeeds variable in our application.
      */
    describe("RSS Feeds", function() {
      /* it tests to make sure that the allFeeds variable has been
        * defined and that it is not empty.
        */
      it("are defined", function() {
        expect(allFeeds).toBeDefined();
        expect(allFeeds.length).not.toBe(0);
      });

      /* test loops through each feed in the allFeeds object
        * and ensures it has a URL defined
        * and that the URL is not empty.
        */
      it("has URL defined and not empty", function() {
        allFeeds.forEach(function(feed) {
          expect(feed.url).toBeDefined();
          expect(feed.url.length).not.toBe(0);
        });
      });

      /* loops through each feed in the allFeeds object and
        * ensures it has a name defined and that the name is
        * not empty.
        */
      it("has name defined and not empty", function() {
        allFeeds.forEach(function(feed) {
          expect(feed.name).toBeDefined();
          expect(feed.name.length).not.toBe(0);
        });
      });
    });

    describe("The menu", function() {
      /* test that ensures the menu element is hidden by default.
        * You'll have to analyze the HTML and the CSS to determine
        * how we're performing the hiding/showing of the menu element.
        */
      it("should be hidden by default", function() {
        expect($("body").hasClass("menu-hidden")).toBe(true);
      });
    });

    /* test that ensures the menu displays when clicked and hides when
      * clicked again.
      */
    it("should change visibility if clicked", function() {
      let menuIcon = $(".menu-icon-link");

      menuIcon.click();
      expect($("body").hasClass("menu-hidden")).toBe(false);
      menuIcon.click();
      expect($("body").hasClass("menu-hidden")).toBe(true);
    });

    describe("Initial Entries", function() {
      /* test that ensures when the loadFeed function is called
        * and completes its work, there is at least a single
        * .entry element within the .feed container.
        */

      beforeEach(function(done) {
        loadFeed(0, done);
      });

      it("makes sure there is at least one feed in the .feed container", function(done) {
        let articleEntry = $(".entry");
        expect(articleEntry.length).toBeGreaterThan(0);
        done();
      });
    });

    describe("New Feed Selection", function() {
      /* test that ensures when a new feed is loaded by the loadFeed
        * function that the content actually changes.
        */
      let previousFeed, currentFeed;
      beforeEach(function(done) {
        loadFeed(0, function() {
          previousFeed = $(".entry").html();
          done();
          loadFeed(1, function() {
            currentFeed = $(".entry").html();
            done();
          });
        });
      }); //closes beforeEach

      it("ensures that content/feeds will be displayed if changed", function(done) {
        expect(previousFeed).not.toEqual(currentFeed);
        done();
      });
    }); //closes describe New Feed Selection
  })()
);

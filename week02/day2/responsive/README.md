# Responsive and Bootstrap

As discussed in class, responsive web design is extremely important
due to the proliferation of web-enabled devices of all shapes and
sizes, from tiny phone screens to massive monitors and everything
in between. Did you know that 65% of Facebook traffic already comes
from mobile devices, and that more than half of Facebook's users have
_never used the site on anything but mobile?_ It's important that all
modern web pages and applications be built for a range of viewing sizes.

One of the easiest ways to build responsive web pages which work
across a wide range of device sizes is with the modern Bootstrap
framework. Bootstrap is primarily a library of intelligent CSS styles
that auto-adjust your content, moving things around to fit the screen
size. However, Bootstrap also contains a set of powerful components
including buttons, icons, bars, etc., and some Javascript to tie it
all together. In this exercise, you'll be using Bootstrap's
responsive grid system and one component.

You're going to expand on the Horello landing page you built yesterday
by adding some responsive elements to make the page function better on a
small screen. Your goal is to add the responsive elements in
[this page][live-04] (try shrinking the width of the browser window
to see).

## A few important details

- You'll be working in the `skeleton` directory. Unlike yesterday's
exercise, you'll be writing both HTML and CSS this time. HTML goes in
the `index.html` file and CSS (for Part 2) goes in `css/media.css`.
- By now you should be extremely comfortable with Chrome's Developer
Tools. If you still have any questions about it, spend some time with
a TA today. You'll continue to rely heavily upon this tool all week.

## Part 1: Media query

Screenshots:
- [start][ss-01a]
- [goal (small)][ss-01b]

While Bootstrap makes responsive web development easier, you can
build a responsive site without Bootstrap. In fact, Bootstrap's
responsive system is built on top of a fundamental CSS building block
called a media query. Let's get started with responsive by adding a
couple of media queries. In later parts, we'll see how to do
responsive with Bootstrap.

Simply put, media queries allow us to introduce bits of CSS that only
apply when a set of conditions is true, like an if statement. The most
common type of media query is based on screen size, in particular,
screen width, which is an effective way of differentiating whether a
page is being viewed on a phone, a tablet, or a larger screen. (You can
use media queries to test other conditions, such as screen orientation,
but we'll keep it simple for now.) We can introduce breakpoints which
alter the page layout above or below a certain threshold, e.g.:

![responsive]

<sub>(Image Copyright w3schools.com)</sub>

Open up the [skeleton HTML] file in your web browser and text editor.
Try shrinking the browser window down to the width of a mobile phone
and see how the page currently responds. Notice how the padding
around each of the page sections--which looks fine at large
size--seems disproportionately large when you shrink the size down,
and takes up too much space in between the content sections. You
should see something which looks like [this][ss-01a].

Now take a look at the [live site][live-04]. Try shrinking this page
down as well, and notice how it behaves as you slowly increase the size.
First, around the width of a tablet, a little bit of padding appears;
then, around the size of a desktop browser, even more padding appears
You should see something which looks like [this][ss-01b].

It's worth mentioning that, when designing and building a responsive web
page or application, you should _begin with the mobile design_ and
progressively add content and features for larger screen sizes. This is
called _progressive enhancement_ and it tends to result in a better
experience than the opposite approach (_graceful degradation_). We did
already build a landing page for desktop viewing, but that's easily
remedied. Shrink your browser down to a smaller [screen resolution], fix
things for the mobile case first, and structure your media queries to
kick in _above a certain screen size_.

Now that you've got the basic concepts, it's time to get down to
business. Try adding media queries to the [skeleton CSS] file to do
the following:

- default section padding is 0 vertical, 20px horizontal
- for a screen width greater than or equal to 650px, use 40px
vertical, 20px horizontal padding
- for a screen width greater than or equal to 900px, use 80px
vertical, 20px horizontal padding

Take a look at these screenshots to see what this should look like in
the Chrome Developer Tools. By now you should be very comfortable doing
this sort of in-line analysis using the Developer Tools.

- [small (mobile) view][small]
- [medium (tablet) view][med]
- [large (desktop) view][large]

Here's a hint: in addition to the default `section` CSS selector,
you'll need two media query selectors. Remember, order matters!

With the media queries in place, reload the page and try resizing the
browser window to see the padding appear and disappear. It should
look much better at the smallest size. Nifty, right?

Supplemental reading (optional):
- [Mobile First presentation]
- [Mobile-First Responsive Web Design]
- [Mobile First Design: Why It’s Great and Why It Sucks]

[skeleton HTML]: ./skeleton/index.html
[skeleton CSS]: ./skeleton/css/media.css
[live Trello site]: https://trello.com/
[screen resolution]: http://mediag.com/news/popular-screen-resolutions-designing-for-all/
[Using media queries]: https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries
[responsive]: ./img/responsive.png
[Mobile First presentation]: http://www.lukew.com/presos/preso.asp?26
[Mobile-First Responsive Web Design]: http://bradfrost.com/blog/web/mobile-first-responsive-web-design/
[Mobile First Design: Why It’s Great and Why It Sucks]: https://codemyviews.com/blog/mobilefirst
[ss-01a]: ./img/ss-01a.png
[ss-01b]: ./img/ss-01b.png
[large]: ./img/large.png
[med]: ./img/med.png
[small]: ./img/small.png

## Part 2: Installing Bootstrap

This is the first project where you'll be including a third-party
library. In this Part, you'll add the Bootstrap CSS library and two
of its dependencies: the Bootstrap JS library and the jQuery library.
Take a moment to read Bootstrap's [Getting Started] section, which
contains instructions on how to download and install the necessary code.

Don't worry if this doesn't make much sense to you right now! You'll be
learning about tools like `bower` and `npm` soon (these are used in more
complex projects where you're preprocessing and compiling a bunch of
code together), and you'll go in depth with jQuery very soon (it's a
Javascript library that makes interacting with the DOM and page elements
much easier). We're going to go with the first, simplest option for now:
[Bootstrap CDN]. This just requires copying a few lines of HTML and
pasting them into your own code.

Open up the [skeleton HTML] file and find the comment that refers to
"PART 2". Copy and paste the [Bootstrap CDN] code here (note that
you can leave out the second part, "Optional theme", if you like as
we won't be using it). We also need to add jQuery as Bootstrap
depends upon it. Find the "jQuery" code in [Bootstrap template] and
copy that over too.

(CDN stands for [Content delivery network], and it's a mechanism that
copies and stores copies of frequently-accessed, static content, such
as images and code, across a global network of servers, reducing load
times and making pages load faster.)

Note that location matters! It's important that we load the Bootstrap
library _before_ loading our own CSS file. Remember from yesterday
that CSS selectors are applied first in order of specificity, more
specific selectors first, then in the order they're loaded, where the
last match wins. We want our selectors to override selectors of equal
specificity inside Bootstrap, so our style code must be loaded
_after_ Bootstrap.

[Getting Started]: http://getbootstrap.com/getting-started/#download
[Bootstrap CDN]: http://getbootstrap.com/getting-started/#download-cdn
[Content delivery network]: https://en.wikipedia.org/wiki/Content_delivery_network
[Getting started]: http://getbootstrap.com/getting-started/
[Bootstrap template]: http://getbootstrap.com/getting-started/#template

Supplemental reading (optional):
- Bootstrap's [Getting started]

## Part 3: Horizontal elements

Screenshots:
- [start][ss-03a]
- [goal (small)][ss-03b]
- [goal (large)][ss-03c]

With Bootstrap in place, let's use it to add a responsive element.
Bootstrap uses a _grid system_ to achieve responsiveness: all content
must be put inside columns, and these columns automatically stack
when the screen size changes (using media queries!). It's fully
documented at [Grid system], but unfortunately, Bootstrap's docs are
obtuse. Here's what you need to know:

- Content goes in columns (actually `div` elements with `.col-*`
classes)
- Columns live inside rows (the `.row` class)
- Rows live inside a container (the `.container` or `
.container-fluid` classes)
- Columns can have a width of one or more; there are twelve total
columns on the page, so you can split these up as you like (e.g.,
6+6, or 4+4+4, or...)
- Use `.col-sm-*` to stack a row of columns only on extra small devices
(phones); use `col-md-*` to stack on extra small and small devices
(phones and tablets)
- Putting this all together, use the class `col-sm-4` for a column of
width four (i.e., 1/3 of the page width) which stacks on extra small
devices; use the class `col-md-6` for a column of width six (i.e., 50%
page width) which stacks on small and extra small devices, etc.
- You can use two classes together. For instance if you use `col-sm-8
col-md-6`, it will take up 6 columns (half the page) on laptops and
medium-sized desktops and 8 columns on smaller devices and tablets.

Here's what the grid system looks like visually:

![grid]

We're going to use the grid system to lay out the app buttons in the
second-to-last section of the page. We want these to be spaced out,
side by side, on larger devices, and to neatly stack vertically on
smaller devices.

You won't actually need to write any CSS to accomplish this. That's
the magic of Bootstrap! By properly arranging the elements and
applying Bootstrap responsive grid classes, the content will
magically line up.

Find the "PART 3" comment in the [skeleton HTML]. Follow these steps
to make the buttons responsive:

1. Add a `container-fluid` class at the top level
1. Add a `row` class inside of it
1. Choose the right `col-*` class and wrap the three buttons in it

Reload and check if the buttons are properly aligned! They should
stack nicely as the page width shrinks.

Supplemental reading (optional):
- Bootstrap's [Grid system]
- [Bootstrap layout]

[Grid system]: http://getbootstrap.com/css/#grid
[Bootstrap layout]: http://bootstrap-sass.happyfuncorp.com/bootstrap-sass/layout/README.html
[grid]: ./img/grid.jpg
[ss-03a]: ./img/ss-03a.png
[ss-03b]: ./img/ss-03b.png
[ss-03c]: ./img/ss-03c.png

## Part 4: Menu bar

Screenshots:
- [goal (medium)][ss-04a]
- [goal (medium zoomed)][ss-04b]
- [goal (small)][ss-04c]
- [goal (small expanded)][ss-04d]
- [goal (small expanded zoomed)][ss-04e]

In this final Part, you're going to get a taste of the power of
Bootstrap to help build interactive, responsive user
interfaces &mdash; something we will rely heavily upon over the next few days
to build a real web app. Take a look at the Bootstrap [Components] to
get an idea for the sort of components you get out of the box with
Bootstrap. Your task is to add a nav bar with a drop-down menu to the
top of the landing page. It should look like [this][ss-04a] before
collapsing (at medium and large size), and like [this][ss-04c] after
collapsing (at small size).

Again, you won't need to write any CSS for this Part, since Bootstrap's
prebuilt classes take care of all the styling you'll need. Look for
the "PART 4" comment in the skeleton HTML file. Based on the sample
code in [Navbar], try adding a static navbar with the following
structure:

- Title: Horello
- Home
- About
- Contact
- Dropdown
  - Action
  - Another action
  - Something else here
  - (Nav header)
  - Separated link
  - One more separated link

Your site is really beginning to look and feel like a modern
application, isn't it? Just wait until you see what comes next!
Notice, in particular, how your responsive menu neatly collapses and
expands as the screen width changes, and works well on small devices
including phones.

[Components]: http://getbootstrap.com/components/
[Navbar]: http://getbootstrap.com/components/#navbar
[live-04]: http://horizons-school-of-technology.github.io/week02/day2/responsive/solution/index.html
[ss-04a]: ./img/ss-04a.png
[ss-04b]: ./img/ss-04b.png
[ss-04c]: ./img/ss-04c.png
[ss-04d]: ./img/ss-04d.png
[ss-04e]: ./img/ss-04e.png

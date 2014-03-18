uldl.js
=======

Quick and Dirty Javascript hack for estimating a user's upload and download speeds to your server.

Eventually, this is going to be a lovely jquery plugin, if I can be bothered, but I'm still working
towards that. For now it's just anything goes - it already depends on jquery though.

Trying it Out
-------------

First, create the object files, all ~200mb of them.

    ./create-download-objects.sh

This will take a while. Once it's done, run a web server, e.g:

    php -S localhost:8001

Then, in your browser of choice, go to:

    http://localhost:8001/example.html

And click "Test Download Speed".  It'll print the result when it's done. Note that because you are
running it on your local computer, it'll be pretty damn fast! Try it on a remote web server if you
want to see some more realistic numbers.

Known Issues
------------

See the github issue tracker at https://github.com/grundleborg/uldl.js/issues for outstanding tasks,
and to report any bugs you find.

Merge requests welcome.



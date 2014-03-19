/*
 * This file is part of uldl.js
 *
 * Copyright (C) 2014 George Goldberg <george@grundleborg.com>
 *
 * uldl.js is a bit of javascript for measuring how fast users can upload and download from your
 * web server. It's not the most accurate tool on earth, but it gives you a bit of an idea.
 *
 *                            *** This Depends on jQuery ***
 *
 * The code is based on the following article:
 * http://coding.smashingmagazine.com/2011/11/14/analyzing-network-characteristics-using-javascript-and-the-dom-part-1/
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and
 * associated documentation files (the "Software"), to deal in the Software without restriction,
 * including without limitation the rights to use, copy, modify, merge, publish, distribute,
 * sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *  
 * The above copyright notice and this permission notice shall be included in all copies or
 * substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT
 * NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
 * DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */


// This function takes an array of test objects (see README.md), uses them to estimate the speed
// at which the user can download from the server they are hosted on, and calls "callback" with
// the result (in bytes per second).
var measureDownloadSpeed = function(objects, callback)
{
    // This is called to caclulate the result once all the objects that are going to be downloaded
    // have been downloaded.
    var determineSpeed = function() {
        if (last_successful_object === 0) {
            callback(0);
            return;
        }

        speed = last_successful_object.size / 
            ((last_successful_object.end - last_successful_object.start) / 1000);
        callback(speed);
    };

    var i = 0;
    var last_successful_object;
    
    // Load all the objects from the server, whilst timing them.
    var loadObjects = function() {
        // Log end-time and clear timeouts.
        if (i > 0) {
            objects[i-1].end = +new Date;
            clearTimeout(objects[i-1].timer);
        }

        // Handle the 3 possible end cases of the download-batch
        if (i >= objects.length) {
            last_successful_object = objects[i-1];
            determineSpeed();
        } else if (i > 1 && objects[i-1].expired) {
            last_successful_object = objects[i-2];
            determineSpeed();
        } else if (i == 1 && objects[i-1].expired) {
            last_successful_object = 0;
            determineSpeed();

        // Start the first download going
        } else {
            objects[i].start = +new Date;
            objects[i].timer = setTimeout(function() {
                    objects[i-1].expired=true;
                    // Call loadObjects() here because otherwise we'll be waiting
                    // for the ajax call to complete before we get a result, which could
                    // be a while, considering it has timed out.
                    loadObjects();
                }, objects[i].timeout);
            
            // Actually get the object.
            $.get(objects[i].url).success(function() { 
                if (!objects[i-1].expired) {
                    loadObjects(); 
                } 
            });
        }
        i++;
    };

    // Let's go!
    loadObjects();
};

function formatSpeedNicely(speed)
{
    if (speed < 100) {
        return ""+speed.toFixed(1)+" Bytes/s";
    } else if (speed < 1024) {
        return ""+speed.toFixed(0)+" Bytes/s";
    } else if (speed < 102400) {
        return ""+(speed / 1024).toFixed(1)+" KB/s";
    } else if (speed < 1048576) {
        return ""+(speed / 1024).toFixed(0)+" KB/s";
    } else if (speed < 104857600) {
        return ""+(speed / 1048576).toFixed(1)+" MB/s";
    } else if (speed < (1024*1024*1024)) {
        return ""+(speed / 1048576).toFixed(0)+" MB/s";
    } else {
        return ""+(speed / (1024*1024*1024)).toFixed(1)+" GB/s";
    }
}



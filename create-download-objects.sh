#!/bin/bash

# This script creates the download objects for testing uldl.js
# It uses random data, so this can TAKE A WHILE TO RUN.
#
# Have fun.
echo "Starting to Create Files. This WILL TAKE A WHILE!"
mkdir -p objects
dd if=/dev/urandom of=objects/1.jpg bs=1 count=11483
dd if=/dev/urandom of=objects/2.jpg bs=1 count=40658
dd if=/dev/urandom of=objects/3.jpg bs=1 count=164897
dd if=/dev/urandom of=objects/4.jpg bs=1 count=381756
dd if=/dev/urandom of=objects/5.jpg bs=1 count=1234664
dd if=/dev/urandom of=objects/6.jpg bs=1 count=4509613
dd if=/dev/urandom of=objects/7.jpg bs=1 count=9084559
dd if=/dev/urandom of=objects/8.jpg bs=1 count=19200000
dd if=/dev/urandom of=objects/9.jpg bs=1 count=153600000
echo "Done creating files (they're in objects/*.jpg and aren't really jpgs)."



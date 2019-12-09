#!/bin/bash

#Author :sbjit

git add .
echo "enter the commit message"
read msg
git commit -m"$msg"
git push -u origin master
#!/usr/bin/bash


gawk -v TEST_NUM=$1 '{ redir = ( TEST_NUM == "" ? ">/dev/null" : "" );  if (TEST_NUM == "" || NR == TEST_NUM ) {print NR " " $0; system($0 redir); }}' test.sh

#!/bin/bash

echo "Minifying html..."
for F in $(find ./_site -name '*.html')
do
    echo $F
    cp $F _tmp.html
    npx minify _tmp.html > $F
    rm _tmp.html
done

echo "Minifying css..."
for F in $(find ./_site -name '*.css')
do
    echo $F
    cp $F _tmp.css
    npx minify _tmp.css > $F
    rm _tmp.css
done

echo "Minifying javascript..."
for F in $(find ./_site -name '*.js')
do
    echo $F
    cp $F _tmp.js
    npx minify _tmp.js > $F
    rm _tmp.js
done

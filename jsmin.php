#!/bin/env php
<?php

$fileName = 'test.js';
$outputFileName = 'test-out.js';

if (file_exists($fileName)) {
    var_dump("FROM IO");
    $test = file_get_contents($fileName);
} else {
    var_dump("FROM URI");
    $get = file_get_contents('https://raw.githubusercontent.com/twbs/bootstrap/master/dist/js/bootstrap.js');
    $test = $get;
    file_put_contents($fileName, $get);
}

if (empty($test)) {
    die("Failed to read input");
}

$lines = explode("\n", $test);
if (empty($lines)) {
    die("Could not get lines!");
}

$pool = [];
$words = [];

foreach(range('a', 'z') as $letter1) {
    foreach(range('a', 'z') as $letter2) {
        $pool[] = $letter1.$letter2;
    }
}

//var_dump($pool);
//var_dump(count($pool));

foreach($lines as $line) {
    preg_match_all('/var ([a-z]+)/is', $line, $matches);
    if (! empty($matches[1][0]) && strlen($matches[1][0]) > 2) {
        if (!in_array($matches[1][0], $words)) {
            $words[] = $matches[1][0];
        }
    }
}

foreach($words as $w) {
    $test = str_replace(
        "var {$w}",
        "var ".array_shift($pool),
        $test
    );
}

file_put_contents($outputFileName, $test);
//var_dump($test);
//var_dump($words);

//array_shift($replace);
/*foreach($replace as $r) {
    var_dump($r);
}*/

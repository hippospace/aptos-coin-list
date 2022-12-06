#!/bin/bash
move-to-ts -c -o typescript/lib
cp typescript/lib/src/* -r typescript/src/lib

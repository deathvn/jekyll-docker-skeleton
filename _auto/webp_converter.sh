#!/bin/bash

function webp_converter {
    F_INP=$1
    F_OUT="${F_INP%.*}.webp"
    if [ ! -f "$F_OUT" ]
    then
        if [ ${F_INP##*.} == "png" ]
        then
            # Converting PNG images
            cwebp -quiet -lossless "$F_INP" -o "$F_OUT"
        else
            # Converting others image format (JPEG) with 90% quality
            cwebp -quiet -q 90 "$F_INP" -o "$F_OUT"
        fi
        echo -e "${GREEN}Converted:${NC} $F_INP -> $F_OUT"
    else
        echo -e "${RED}Existed:${NC} $F_OUT"
    fi
}

if [ ! -z "$1" ] # Check if folder image has been passed to argument
then
    printf "${BLUE}Converting images in $1 to webp format...${NC}\n\n"
    # Converting JPEG images
    for F_INP in                                \
        $(find $1 -type f -and -iname "*.jpg")  \
        $(find $1 -type f -and -iname "*.jpeg") \
        $(find $1 -type f -and -iname "*.png")
    do
        webp_converter $F_INP
    done
    printf "\n${BLUE}Done!${NC}\n"
else
    echo "Folder image not found"
fi

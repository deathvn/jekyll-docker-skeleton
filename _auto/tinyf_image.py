import os
import sys
# setting path to current project folder (in docker container)
sys.path.append('/srv/jekyll')

from _config import const

import tinify

class bcolors:
    HEADER = '\033[95m'
    OKBLUE = '\033[94m'
    OKCYAN = '\033[96m'
    OKGREEN = '\033[92m'
    WARNING = '\033[93m'
    FAIL = '\033[91m'
    ENDC = '\033[0m'
    BOLD = '\033[1m'
    UNDERLINE = '\033[4m'

tinify.key = os.getenv('TINIFY_KEY')
compressed = const.IMG_COMPRESSED_LOG

def compress_1_image(img_path):
    try:
        source = tinify.from_file(img_path)
        source.to_file(img_path)
    except:
        print("Compress error at", img_path)
        return
    print("Compressed", img_path)


def read_compress_folder():
    with open(compressed, "r") as f:
        fin_folder = f.read()

    fin_folder = fin_folder.split('\n')
    return fin_folder


def add_compress_folder(new_folder_path):
    with open(compressed, "a") as f:
        f.write(f"{new_folder_path}\n")


def compress_all(img_folder):
    # List of all images files
    img_list = [ _fi for _fi in os.listdir(img_folder) if (_fi.split('.')[-1] in ['jpg', 'jpeg', 'png']) ]

    for img_file_name in img_list:
        img_path = os.path.join(img_folder, img_file_name)
        compress_1_image(img_path)

    print("Done")


if __name__=="__main__":    
    if (len(sys.argv)!=2):
        print ("Wrong command, Use this bitch!!!")
        print ("python tinyf_image.py <folder-path>")

    else:
        img_folder = os.path.join(sys.argv[1], '') # Path to folder contain images
        compressed_list = read_compress_folder()

        folder_text = f"{bcolors.OKGREEN}{img_folder}{bcolors.ENDC}"
        if (img_folder in compressed_list):
            print (f"All images in {folder_text} have been compressed")
        else:
            print (f"Compressing all images in {folder_text}")
            compress_all(img_folder)
            add_compress_folder(img_folder)
            print ("Done compression")

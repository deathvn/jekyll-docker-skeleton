import os
import pkg_resources

installed_libs = [f'{i.key}=={i.version}' for i in pkg_resources.working_set]

with open('./requirements.txt') as lib_file:
    new_lib = lib_file.readline().strip()
    if new_lib and (new_lib not in installed_libs):
        cmd = f'python3 -m pip install {new_lib} --force-reinstall'
        print(cmd)
        os.system(cmd)

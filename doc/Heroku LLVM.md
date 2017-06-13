# Heroku LLVM 

Setup: 

* Ubuntu 16.04 Server Image
* Install `cmake`, `gcc`, `g++`, `git`, and `checkinstall`

## Building LLVM
```bash
git clone https://github.com/llvm-mirror/llvm.git
cd llvm

mkdir build && cd build
cmake -DLLVM_TARGETS_TO_BUILD=host -DCMAKE_BUILD_TYPE=MinSizeRel -DLLVM_EXPERIMENTAL_TARGETS_TO_BUILD=WebAssembly -DLLVM_INCLUDE_EXAMPLES=OFF -DLLVM_INCLUDE_TESTS=OFF -DCLANG_INCLUDE_TESTS=OFF -DCMAKE_INSTALL_PREFIX=$(pwd)/../release ..
make -j 2 
```

## Package Release

```bash
cd ../release
tar czvf llvm-5.0-heroku-20170613.tar.gz ./*
```
